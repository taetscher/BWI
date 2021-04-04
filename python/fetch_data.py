"""
This scripts serves the fetching of all the required data sources.
Saving files in "data" folder (project-level)
"""
# libs
import urllib
import pathlib
import os

# variables
setup = True # permission to create folders
base_path = pathlib.Path("..") # project level
url_dem = "https://cms.geo.admin.ch/ogd/topography/DHM25_MM_ASCII_GRID.zip"
url_meteo = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-aktuell/VQHA80.csv"
url_precip = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-aktuell/VQHA98.csv"
url_boundaries = "https://data.geo.admin.ch/ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill/shp/21781/ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill.zip"

# current settings
data = ["10min_meteo", "10min_precip", "swissBOUNDARIES", "DHM25"]
folders = ["meteorological", "meteorological", "boundaries", "dem"]
urls = [url_meteo, url_precip, url_boundaries, url_dem]
folder_dict = dict(zip(data, folders))
data_dict = dict(zip(data, urls))

def getMissingFolders(base_path, folders, base = "data"):
    """
    This function checks if the folder structure is set up for data download.
    Returns list of missing folders.

    :param base_path: base path
    :param base: base folder
    :param folders: folders to check
    :returns list of missing folders
    """
    # list to store missing folders
    notfound = []
    path = base_path / base
    # check base
    if not os.path.exists(base_path / base):
        notfound.append(base_path / base)
        notfound.append([path / folder for folder in set(folders)])
    # base ok - check folders
    else:
        for folder in folders:
            if not os.path.exists(path / folder):
                if not folder in notfound:
                    notfound.append(folder)
        notfound = [path / folder for folder in notfound]

    return notfound

def setupFolderStructure(missingfolders):
    """
    Creates all missing folders required for data fetching
    Disregards file-paths.

    :param missingfolders: list of Path objects (missing folders)
    """
    for folder in missingfolders:
        if folder.isdir():
            os.mkdir(folder)



def fetchMeteoData(url, custom_location = False):
    """
    This function fetches data from meteorological stations of the Federal Office of Meteorology and
    Climatology (MeteoSwiss) via Opendata.Swiss.

    TODO: Currently dummy function returning True

    :param url: download link
    :param custom_location: folder-path. Can be set if you want to save data in custom location.
    :return: True if successful, False if download wasn't successful
    """
    return True

def fetchDEM(url, custom_location = False):
    """
    This function fetches digital elevation model data for Switzerland.
    Data:

    TODO: Currently dummy function returning True

    :param url: download link
    :param custom_location: folder-path. Can be set if you want to save data in custom location
    :return: True if successful, False if download wasn't successful
    """
    return True

def fetchSwissBoundaries(url, custom_location = False):
    """
    This function fetches border base-data provided by Swisstopo via Opendata.Swiss.

    TODO: Currently dummy function returning True

    :param url: download link
    :param custom_location: folder-path. Can be set if you want to save data in custom location
    :return: True if successful, False if download wasn't successful
    """
    return True


if __name__ == "__main__":

    # Check + prepare folder setting
    missing = getMissingFolders(base_path, folders)
    # create missing folders
    if (len(missing) > 0) and setup:
        setupFolderStructure(missing)
    else:
        print("The following folders couldn't be created:")
        for folder in missing:
            print(folder)
        raise PermissionError("No permission to create folders.\n" +
                              "Either create folders manually, or set variable 'setup' to True!")

    # Begin of fetching data
    