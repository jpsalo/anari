import os
from flask import Flask
from player_comparison import find_nearest_players
from data.data import error_response, get_player, get_skaters, jsonify

app = Flask(__name__)
# https://flask.palletsprojects.com/en/2.3.x/cli/#environment-variables-from-dotenv
# https://github.com/pallets/flask/pull/4995
app.config["FLASK_ENV"] = os.getenv("FLASK_ENV")


@app.route("/skaters")
def skaters():
    with app.app_context():
        df = get_skaters()
        df = df[["playerId", "name", "team"]]
        return jsonify(df, orient="records")


@app.route("/players/<player_id>")
def player(player_id):
    with app.app_context():
        df = get_player(int(player_id))
        if df.empty:
            return error_response()
        df = df[["playerId", "name", "team"]]
        return jsonify(df.iloc[0])


@app.route("/players/<player_id>/nearest")
def nearest_players(player_id):
    with app.app_context():
        df_all = get_skaters()
        df = find_nearest_players(df_all, int(player_id))
        df = df[["playerId", "name", "team"]]
        return jsonify(df, orient="records")
