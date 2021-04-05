"""
This scripts serves the fetching of all the required data sources.
Saving files in "data" folder (project-level)
"""
# libs
import requests
import pathlib
import os

# variables
setup = True # permission to create folders
fetchAll = True # if all data should be fetched (False = no base data)
base_path = pathlib.Path("..") # project level
url_meteo = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-aktuell/VQHA80.csv"
meta_meteo = "https://data.geo.admin.ch/ch.meteoschweiz.messnetz-automatisch/ch.meteoschweiz.messnetz-automatisch_de.csv"
url_precip = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-aktuell/VQHA98.csv"
url_boundaries = "https://data.geo.admin.ch/ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill/shp/21781/ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill.zip"
url_dem = "https://cms.geo.admin.ch/ogd/topography/DHM25_MM_ASCII_GRID.zip"
urls = [url_meteo, url_precip, url_boundaries, url_dem]
# list with custom names (data descriptive)
data = ["10min_meteo", "10min_precip", "meta_meteo", "swissBOUNDARIES", "DHM25"]
# list of corresponding storage folders
folders = ["meteorological", "meteorological", "meteorological", "boundaries", "dem"]
# filenames
filenames = ["10min_meteo.csv", "10min_preip.csv", "meteo_metadata.csv", "swissBOUNDARIES3D.zip", "DHM25_ASCII.zip"]

# dictionary with download information
data_dict = dict(zip(data, list(zip(folders, urls, filenames))))

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


def download_data(url, outdir, filename):
    """
    Function to fetch data from url and save to outdir

    :param url: link to data
    :param outdir: Path object
    :param filename: str
    :return: True or False
    """
    try:
        with requests.get(url) as req:
            with open(outdir / filename, 'wb') as f:
                for chunk in req.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
        return True
    except Exception as e:
        print(e)
        return False




def fetchAllData(data_dict, base_path = base_path, base = "data"):
    """
    This function fetches all data listed in 'data_dict'
    Stores data in corresponding 'folder_dict' locations

    Info: keys should be identical in each dictionary!

    :param data_dict: dictionary with download information (url, outfolder, filename)
    :returns success: list with information of download success for each file [True/False]
    """
    keys = data_dict.keys()
    path = base_path / base
    success = [False for i in range(len(keys))]
    for i, key in enumerate(keys):

        # get download-info
        outfolder, url, filename = data_dict.get(key)

        # download data
        success[i] = download_data(url, path / outfolder, filename)

    return success


def fetchData(key, data_dict, base_path = base_path, base = "data"):
    """
    This function serves the data-download of INDIVIDUAL datasets required for the BWI.

    :param key: str, naming the type of the data
    :param data_dict: dict, containing all download information
    :return: True if success, False if fail
    """
    if not key in data_dict.keys():
        print("Key not contained in data-dictionary!\nPlease select a valid data-key!")
        return False

    # specifications
    path = base_path / base
    outfolder, url, filename = data_dict.get(key)
    # download data
    success = download_data(url, path / outfolder, filename)

    return success


if __name__ == "__main__":

    # Check + prepare folder setting
    missing = getMissingFolders(base_path, folders)

    # case 1: create missing folders automatically
    if (len(missing) > 0) and setup:
        setupFolderStructure(missing)

    # case 2: missing folders and no permission to create
    if (len(missing) > 0) and not setup:
        print("The following folders couldn't be created:")
        for folder in missing:
            print(folder)
        raise PermissionError("No permission to create folders.\n" +
                              "Either create folders manually, or set variable 'setup' to True!")

    # Begin of fetching data
    # TODO: check dependencies with data_dict before changing
    base_path = base_path / "data"
    folders = [base_path / folder for folder in folders]

    # download data
    if fetchAll: # fetchAll = useful if setting up project for the first time
        fetchAllData(data_dict)
    else:
        print("Download individually here / as required")
        fetchData("10min_meteo", data_dict)
