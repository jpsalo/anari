from flask import Flask

from player_comparison import find_nearest_pair
from data.data import error_response, get_player, get_skaters, jsonify

app = Flask(__name__)


@app.route("/skaters")
def skaters():
    with app.app_context():
        df = get_skaters()
        df = df[["playerId", "name", "team"]].head()
        return jsonify(df, orient="records")


@app.route("/players/<player_id>")
def player(player_id):
    with app.app_context():
        df = get_player(int(player_id))
        if df.empty:
            return error_response()
        df = df[["playerId", "name", "team"]]
        # TODO: Endpoint for this
        df_all = get_skaters()
        nearest = find_nearest_pair(df_all, df.iloc[0]["playerId"])
        print("nearest", nearest)
        return jsonify(df.iloc[0])
