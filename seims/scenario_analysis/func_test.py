import pickle

from seims.preprocess.utility import read_data_items_from_txt
from seims.pygeoc.pygeoc.raster.raster import RasterUtilClass
from seims.pygeoc.pygeoc.utils.utils import StringClass


class TextReader:
    """Print and number lines in a text file."""

    def __init__(self, filename):
        self.filename = filename
        self.file = open(filename)
        self.lineno = 0

    def readline(self):
        self.lineno += 1
        line = self.file.readline()
        if not line:
            return None
        if line.endswith('\n'):
            line = line[:-1]
        return "%i: %s" % (self.lineno, line)

    def __getstate__(self):
        state = self.__dict__.copy()
        del state['file']
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)
        file = open(self.filename)
        for _ in range(self.lineno):
            file.readline()
        self.file = file


def main():
    ws = r'C:\z_data\ChangTing\seims_models\model_youwuzhen_10m_longterm'
    sce_id = 163157379
    rasterf = '%s\OUTPUT%d\SED_OL_SUM.tif' % (ws, sce_id)
    r = RasterUtilClass.read_raster(rasterf)
    rasterf2 = '%s\OUTPUT%d\SOER_SUM.tif' % (ws, sce_id)
    r2 = RasterUtilClass.read_raster(rasterf2)
    print ('SED_OL sum: %s, SOER sum: %f' % (r.get_sum(), r2.get_sum()))
    sedf = '%s\OUTPUT%d\sed.txt' % (ws, sce_id)
    sed_data = read_data_items_from_txt(sedf)
    sed_sum = 0.
    for item in sed_data:
        item = StringClass.split_string(item[0], ' ', True)
        if len(item) < 3:
            continue
        sed_sum += float(item[2])
    print (sed_sum)


def pickle_demo():
    reader = TextReader(r'D:\tmp\test.txt')
    print(reader.readline())
    print(reader.readline())
    s = pickle.dumps(reader)
    new_reader = pickle.loads(s)
    print (new_reader.readline())


if __name__ == '__main__':
    main()
