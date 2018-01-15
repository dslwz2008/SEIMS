#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""Base class of parameters sensitivity analysis.
    @author   : Liangjun Zhu
    @changelog: 17-12-22  lj - initial implementation.\n
                18-1-11   lj - integration of screening method and variant-based method.\n
"""
import os
import sys
import json

if os.path.abspath(os.path.join(sys.path[0], '..')) not in sys.path:
    sys.path.append(os.path.abspath(os.path.join(sys.path[0], '..')))

import matplotlib

if os.name != 'nt':  # Force matplotlib to not use any Xwindows backend.
    matplotlib.use('Agg', warn=False)
import matplotlib.pyplot as plt
import numpy
from pygeoc.utils import FileClass, UtilClass
# Morris screening method
from SALib.sample.morris import sample as morris_spl
from SALib.analyze.morris import analyze as morris_alz
from SALib.plotting.morris import horizontal_bar_plot, covariance_plot
# FAST variant-based method
from SALib.sample.fast_sampler import sample as fast_spl
from SALib.analyze.fast import analyze as fast_alz

from preprocess.db_mongodb import ConnectMongoDB
from config import PSAConfig
from preprocess.utility import read_data_items_from_txt
from userdef import evaluate_model_response, get_evaluate_output_name_unit
from run_seims import MainSEIMS
from figure import sample_histograms, save_png_eps


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


class Sensitivity(object):
    """Base class of Sensitivity Analysis."""

    def __init__(self, psa_cfg):
        """
        Initialization.
        Args:
            psa_cfg: PSAConfig object.
        """
        self.cfg = psa_cfg
        self.param_defs = dict()
        self.param_values = None
        self.run_count = 0
        self.output_values = None
        self.psa_si = dict()

    def run(self):
        """PSA workflow."""
        self.read_param_ranges()
        self.generate_samples()
        self.write_param_values_to_mongodb()
        self.evaluate_models()
        self.calculate_sensitivity()
        self.plot_samples_histogram()
        if self.cfg.method == 'morris':
            self.plot_morris()

    def read_param_ranges(self):
        """Read param_rng.def file

           name,lower_bound,upper_bound,group,dist
           (group and dist are optional)

            e.g.,
             Param1,0,1[,Group1][,dist1]
             Param2,0,1[,Group2][,dist2]
             Param3,0,1[,Group3][,dist3]

        Returns:
            a dictionary containing:
            - names - the names of the parameters
            - bounds - a list of lists of lower and upper bounds
            - num_vars - a scalar indicating the number of variables
                         (the length of names)
            - groups - a list of group names (strings) for each variable
            - dists - a list of distributions for the problem,
                        None if not specified or all uniform
        """
        # read param_defs.json if already existed
        if not self.param_defs:
            if FileClass.is_file_exists(self.cfg.outfiles.param_defs_json):
                with open(self.cfg.outfiles.param_defs_json, 'r') as f:
                    self.param_defs = UtilClass.decode_strs_in_dict(json.load(f))
                return
        # read param_range_def file and output to json file
        client = ConnectMongoDB(self.cfg.hostname, self.cfg.port)
        conn = client.get_conn()
        db = conn[self.cfg.spatial_db]
        collection = db['PARAMETERS']

        names = list()
        bounds = list()
        groups = list()
        dists = list()
        num_vars = 0
        items = read_data_items_from_txt(self.cfg.param_range_def)
        for item in items:
            if len(item) < 3:
                continue
            # find parameter name, print warning message if not existed
            cursor = collection.find({'NAME': item[0]}, no_cursor_timeout=True)
            if not cursor.count():
                print ('WARNING: parameter %s is not existed!' % item[0])
                continue
            num_vars += 1
            names.append(item[0])
            bounds.append([float(item[1]), float(item[2])])
            # If the fourth column does not contain a group name, use
            # the parameter name
            if len(item) >= 4:
                groups.append(item[3])
            else:
                groups.append(item[0])
            if len(item) >= 5:
                dists.append(item[4])
            else:
                dists.append('unif')
        if groups == names:
            groups = None
        elif len(set(groups)) == 1:
            raise ValueError('Only one group defined, results will not bemeaningful')

        # setting dists to none if all are uniform
        # because non-uniform scaling is not needed
        if all([d == 'unif' for d in dists]):
            dists = None

        self.param_defs = {'names': names, 'bounds': bounds,
                           'num_vars': num_vars, 'groups': groups, 'dists': dists}

        # Save as json, which can be loaded by json.load()
        json_data = json.dumps(self.param_defs, indent=4, cls=NumpyEncoder)
        with open(self.cfg.outfiles.param_defs_json, 'w') as f:
            f.write(json_data)

    def generate_samples(self):
        """Sampling and write to a single file and MongoDB 'PARAMETERS' collection"""
        if self.param_values is None or len(self.param_values) == 0:
            if FileClass.is_file_exists(self.cfg.outfiles.param_values_txt):
                self.param_values = numpy.loadtxt(self.cfg.outfiles.param_values_txt)
                self.run_count = len(self.param_values)
                return
        if not self.param_defs:
            self.read_param_ranges()
        if self.cfg.method == 'morris':
            self.param_values = morris_spl(self.param_defs, self.cfg.morris.N,
                                           self.cfg.morris.num_levels, self.cfg.morris.grid_jump,
                                           optimal_trajectories=self.cfg.morris.optimal_t,
                                           local_optimization=self.cfg.morris.local_opt)
        elif self.cfg.method == 'fast':
            self.param_values = fast_spl(self.param_defs, self.cfg.fast.N, self.cfg.fast.M)
        else:
            raise ValueError('%s method is not supported now!' % self.cfg.method)
        self.run_count = len(self.param_values)
        # Save as txt file, which can be loaded by numpy.loadtxt()
        numpy.savetxt(self.cfg.outfiles.param_values_txt,
                      self.param_values, delimiter=' ', fmt='%.4e')

    def write_param_values_to_mongodb(self):
        # update Parameters collection in MongoDB
        if self.param_values is None or len(self.param_values) == 0:
            self.generate_samples()
        client = ConnectMongoDB(self.cfg.hostname, self.cfg.port)
        conn = client.get_conn()
        db = conn[self.cfg.spatial_db]
        collection = db['PARAMETERS']
        for idx, pname in enumerate(self.param_defs['names']):
            v2str = ','.join(str(v) for v in self.param_values[:, idx])
            collection.find_one_and_update({'NAME': pname}, {'$set': {'CALI_VALUES': v2str}})
        client.close()

    def evaluate_models(self):
        """Run SEIMS for objective output variables, and write out.
        """
        if self.output_values is None or len(self.output_values) == 0:
            if FileClass.is_file_exists(self.cfg.outfiles.output_values_txt):
                self.output_values = numpy.loadtxt(self.cfg.outfiles.output_values_txt)
                return
        assert(self.run_count > 0)
        cali_seqs = range(self.run_count)
        model_cfg_dict = {'bin_dir': self.cfg.seims_bin, 'model_dir': self.cfg.model_dir,
                          'nthread': self.cfg.seims_nthread, 'lyrmethod': self.cfg.seims_lyrmethod,
                          'hostname': self.cfg.hostname, 'port': self.cfg.port,
                          'scenario_id': 0}

        def build_seims_model(modelcfg_dict, cali_idx):
            """Build SEIMS model with specified calibration ID."""
            tmpm = MainSEIMS(modelcfg_dict['bin_dir'], modelcfg_dict['model_dir'],
                             nthread=modelcfg_dict['nthread'], lyrmtd=modelcfg_dict['lyrmethod'],
                             ip=modelcfg_dict['hostname'], port=modelcfg_dict['port'],
                             sceid=modelcfg_dict['scenario_id'], caliid=cali_idx)
            evaluate_model_response(tmpm)

        #cali_models = map(build_seims_model, [model_cfg_dict] * self.run_count, cali_seqs)
        try:
            # parallel on multiprocesor or clusters using SCOOP
            from scoop import futures
            self.output_values = list(futures.map(build_seims_model,
                                                  [model_cfg_dict] * self.run_count, cali_seqs))
            #self.output_values = list(futures.map(evaluate_model_response, cali_models))
        except ImportError or ImportWarning:
            # serial
            self.output_values = list(map(build_seims_model,
                                          [model_cfg_dict] * self.run_count, cali_seqs))
            #self.output_values = list(map(evaluate_model_response, cali_models))
        if not isinstance(self.output_values, numpy.ndarray):
            self.output_values = numpy.array(self.output_values)
        numpy.savetxt(self.cfg.outfiles.output_values_txt,
                      self.output_values, delimiter=' ', fmt='%.4e')

    def calculate_sensitivity(self):
        """Calculate Morris elementary effects.
           It is worth to be noticed that evaluate_models() allows to return
           several output variables, hence we should calculate each of them separately.
        """
        if not self.psa_si:
            if FileClass.is_file_exists(self.cfg.outfiles.psa_si_json):
                with open(self.cfg.outfiles.psa_si_json, 'r') as f:
                    self.psa_si = UtilClass.decode_strs_in_dict(json.load(f))
                    return
        if self.output_values is None or len(self.output_values) == 0:
            self.evaluate_models()
        if self.param_values is None or len(self.param_values) == 0:
            self.generate_samples()
        if not self.param_defs:
            self.read_param_ranges()
        row, col = self.output_values.shape
        assert (row == self.run_count)
        for i in range(col):
            if self.cfg.method == 'morris':
                tmp_Si = morris_alz(self.param_defs,
                                    self.param_values,
                                    self.output_values[:, i],
                                    conf_level=0.95, print_to_console=True,
                                    num_levels=self.cfg.morris.num_levels,
                                    grid_jump=self.cfg.morris.grid_jump)
            elif self.cfg.method == 'fast':
                tmp_Si = fast_alz(self.param_defs, self.output_values[:, i],
                                  print_to_console=True)
            else:
                raise ValueError('%s method is not supported now!' % self.cfg.method)
            self.psa_si[i] = tmp_Si
        # print (self.psa_si)
        # Save as json, which can be loaded by json.load()
        json_data = json.dumps(self.psa_si, indent=4, cls=NumpyEncoder)
        with open(self.cfg.outfiles.psa_si_json, 'w') as f:
            f.write(json_data)

    def plot_samples_histogram(self):
        """Save plot as png(300 dpi) and eps (vector)."""
        # Plots histogram of all samples
        if not self.param_defs:
            self.read_param_ranges()
        if self.param_values is None or len(self.param_values) == 0:
            self.generate_samples()
        histfig = plt.figure()
        sample_histograms(histfig, self.param_values, self.param_defs.get('names'),
                          self.cfg.morris.num_levels,
                          {'color': 'black', 'histtype': 'step'})
        plt.tight_layout()
        save_png_eps(plt, self.cfg.psa_outpath, 'samples_histgram')
        # close current plot in case of 'figure.max_open_warning'
        plt.cla()
        plt.clf()
        plt.close()

    def plot_morris(self):
        """Save plot as png(300 dpi) and eps (vector)."""
        output_name, output_unit = get_evaluate_output_name_unit()
        if not self.psa_si:
            self.calculate_sensitivity()
        for i, v in enumerate(output_name):
            unit = output_unit[i]
            fig, (ax1, ax2) = plt.subplots(1, 2)
            horizontal_bar_plot(ax1, self.psa_si.get(i), {}, sortby='mu_star', unit=unit)
            covariance_plot(ax2, self.psa_si.get(i), {}, unit=unit)
            save_png_eps(plt, self.cfg.psa_outpath, 'mu_star_%s' % v)
            # close current plot in case of 'figure.max_open_warning'
            plt.cla()
            plt.clf()
            plt.close()


if __name__ == '__main__':
    from config import get_psa_config

    cf, method = get_psa_config()
    cfg = PSAConfig(cf, method=method)

    print (cfg.param_range_def)

    saobj = Sensitivity(cfg)
    # saobj.calculate_sensitivity()
    saobj.plot_samples_histogram()
    # saobj.plot_morris()
