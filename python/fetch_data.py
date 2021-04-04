"""
This scripts serves the fetching of all the required data sources.
Saving files in "data" folder (project-level)
"""
# libs
import urllib
import pathlib
import os

# variables
setup = True # permission to create folders if necessary
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

def checkFolderStructure(base_path, folders, base = "data"):
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
    # check base
    if not os.path.exists(base_path / base):
        notfound.append(base_path / base)
        return notfound
    # next level
    path = base_path / base
    # check each folder
    for folder in folders:
        if not os.path.exists(path / folder):
            if not folder in notfound:
                notfound.append(folder)

    return notfound




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
    print("Execution")