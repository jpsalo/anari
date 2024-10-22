from chat import Chat
from data_utils import error_response, get_player, get_skaters, jsonify_df
from flask import Flask, jsonify, request
from player_comparison import find_nearest_players
from summarize_data import compute_summary_statistics
import os

app = Flask(__name__)
# https://flask.palletsprojects.com/en/2.3.x/cli/#environment-variables-from-dotenv
# https://github.com/pallets/flask/pull/4995
app.config["FLASK_ENV"] = os.getenv("FLASK_ENV")

with app.app_context():
    df = get_skaters()
    statistics = compute_summary_statistics(df)
    assistant = Chat(statistics)


@app.route("/skaters")
def skaters():
    with app.app_context():
        df = get_skaters()
        df = df[["playerId", "name", "team"]]
        return jsonify_df(df, orient="records")


@app.route("/players/<player_id>")
def player(player_id):
    with app.app_context():
        df = get_player(int(player_id))
        if df.empty:
            return error_response()
        df = df[["playerId", "name", "team"]]
        return jsonify_df(df.iloc[0])


@app.route("/players/<player_id>/nearest")
def nearest_players(player_id):
    with app.app_context():
        df_all = get_skaters()
        df = find_nearest_players(df_all, int(player_id))
        df = df[["playerId", "name", "team"]]
        return jsonify_df(df, orient="records")


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")
    agent_text = assistant.ask(question)
    data = {"agentText": agent_text}
    return jsonify(data)
