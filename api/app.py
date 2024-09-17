from flask import Flask

from data.data import get_skaters

app = Flask(__name__)


@app.route("/skaters")
def get_skater():
    with app.app_context():
        return get_skaters()
