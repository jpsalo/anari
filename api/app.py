from flask import Flask

from player_comparison import find_nearest_pair
from data.data import error_response, get_player, get_skaters, jsonify

app = Flask(__name__)

# TODO: if development: n_head = 20


@app.route("/skaters")
def skaters():
    with app.app_context():
        df = get_skaters()
        df = df[["playerId", "name", "team"]].head(20)
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
        nearest_ids_df = find_nearest_pair(df_all, int(player_id))
        # NOTE: Perhaps this is not the best way to do this
        nearest_df = nearest_ids_df.apply(
            lambda row: get_player(row["playerId"]).iloc[0],
            axis=1,
        )
        nearest_df = nearest_df[["playerId", "name", "team"]]
        return jsonify(nearest_df, orient="records")
