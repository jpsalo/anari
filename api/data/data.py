import os
import pandas as pd
from flask import Response, current_app

storage_options = {"User-Agent": "Mozilla/5.0"}

skaters = {
    "file_name": "skaters.pkl",
    "url": "https://moneypuck.com/moneypuck/playerData/seasonSummary/2023/regular/skaters.csv",
}


def load_data(file_name, data_url):
    file = current_app.root_path + "/data/" + file_name
    if os.path.isfile(file):
        df = pd.read_pickle(file)
    else:
        df = pd.read_csv(data_url, storage_options=storage_options)
        pd.to_pickle(df, file)
    return df


def jsonify(df: pd.DataFrame, orient=None):
    return Response(df.to_json(orient=orient), mimetype="application/json")


def error_response():
    return Response("Not found", status=400, mimetype="application/json")


def get_skaters():
    df = load_data(skaters["file_name"], skaters["url"])
    df = df[df["situation"] == "all"]
    return df


def get_player(player_id):
    df = load_data(skaters["file_name"], skaters["url"])
    df = df[df["situation"] == "all"]
    df = df[df["playerId"] == player_id]
    return df
