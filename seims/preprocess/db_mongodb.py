#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""MongoDB utility

    @author   : Liangjun Zhu

    @changelog:
    - 16-12-07  lj - rewrite for version 2.0
    - 17-06-27  lj - reorganize as basic class other than Global variables
    - 18-02-08  lj - compatible with Python3.
"""
from __future__ import absolute_import, unicode_literals

import os
import sys
if os.path.abspath(os.path.join(sys.path[0], '..')) not in sys.path:
    sys.path.insert(0, os.path.abspath(os.path.join(sys.path[0], '..')))

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, InvalidOperation
from preprocess.text import DBTableNames, ModelParamFields

# Explicit access to module level variables by accessing them explicity on the module
# refers to https://stackoverflow.com/a/35904211/4837280

# this is a pointer to the module object instance itself
this = sys.modules[__name__]

# we can explicitly make assignments on it
this.client = None

class ConnectMongoDB(object):
    """Connect to MongoDB, and close when finished."""

    def __init__(self, ip, port, maxPoolSize=None):
        """initial mongodb client by IP address and port.

        Starting with version 3.0 the MongoClient constructor no longer blocks while connecting to
         the server or servers, and it no longer raises ConnectionFailure if they are unavailable,
         nor ConfigurationError if the user's credentials are wrong.
         Instead, the constructor returns immediately and launches the connection process on
          background threads.
        --https://api.mongodb.com/python/current/api/pymongo/mongo_client.html
        """
        self.conn = MongoClient(ip, port, maxPoolSize=maxPoolSize)
        try:
            self.conn.admin.command('ismaster')
        except ConnectionFailure as err:
            sys.stderr.write('Could not connect to MongoDB: %s' % err)
            sys.exit(1)

    def get_conn(self):
        """get MongoDB connection."""
        return self.conn

    def close(self):
        """Close collection.

        Create this client once for each process, and reuse it for all operations.
        It is a common mistake to create a new client for each request, which is very inefficient.
        --https://stackoverflow.com/questions/41015490/how-can-i-force-pymongo-to-close-sockets

        So, for now, I will comment the close operation. By lj.
        """
        # self.conn.close()
        pass


class MongoQuery(object):
    """
    Query data from MongoDB
    """

    @staticmethod
    def get_init_parameter_value(db_model, param_name, field=ModelParamFields.value):
        """Query initial parameter value, raise exception if error occurs."""
        coll_param = db_model[DBTableNames.main_parameter]
        param_dict = coll_param.find_one({ModelParamFields.name: param_name})
        if param_dict is None or param_dict.get(field) is None:
            raise RuntimeError('%s item is not existed in MongoDB!' % param_name)
        return param_dict.get(field)


class MongoUtil(object):
    """Some utility functions."""

    @staticmethod
    def run_bulk(bulk, errmsg=''):
        """Execute bulk operations, do not raise exception."""
        try:
            bulk.execute()
        except InvalidOperation:
            print('WARNING: %s' % errmsg)


# Temporary solution for running SEIMS-based applications on Linux cluster
# Before running such applications such as scenarios_analysis/spatialunits/main_nsga2.py,
#   users must update the host and port!
this.host = '127.0.0.1'
this.port = 27017
this.client = ConnectMongoDB(ip=this.host, port=this.port).get_conn()
