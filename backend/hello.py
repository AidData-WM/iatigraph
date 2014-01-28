from flask import Flask, jsonify

from models import *
from sample_data import *

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/activity/")
@app.route("/activity/<id>")
def show_activity(id=None):

    if not id:
        id = 2015       # just a default

    if not sample_activity.get(id, None):
        id = 2015       # will be a 404 error eventually...

    return jsonify(results = sample_activity[id].to_array())
    # we use an array right now, but this could easily turn into an ORM query

if __name__ == "__main__":
    app.run(debug=True)
