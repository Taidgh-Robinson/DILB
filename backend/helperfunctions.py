from os import listdir, remove
from os.path import isfile, join
from datascraper import generate_api_dataframes
import pandas as pd

RESP_PATH = "data/api-resp"

def load_all_games():
    ret = []
    onlyfiles = [f for f in listdir(RESP_PATH) if isfile(join(RESP_PATH, f))]
    for f in onlyfiles:
        df = pd.read_csv(RESP_PATH+"/"+f)
        ret.append(df.to_json())

    return ret

def load_game_by_id(id):
    return pd.read_csv(RESP_PATH + "/" + str(id) + ".csv")

def load_all_game_ids():
    onlyfiles = [f for f in listdir(RESP_PATH) if isfile(join(RESP_PATH, f))]
    return [f.split(".")[0] for f in onlyfiles]


def delete_previous_response_data():
    onlyfiles = [f for f in listdir(RESP_PATH) if isfile(join(RESP_PATH, f))]
    for f in onlyfiles:
        remove(path+"/"+f)
    path = "data/api-fetch"
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    for f in onlyfiles:
        remove(path+"/"+f)