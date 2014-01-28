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


@app.route("/search/<term>")
def search(term=None):
    result = {}

    if not term:
        result['results'] = 0
        return jsonify(resuls = results)

    # super slow array search. one day it'll be a lightning fast database search ;)
    hits = []
    for a in sample_activity:
        if sample_activity[a].name.find(term) != -1 or sample_activity[a].description.find(term) != -1:
            hits.append(sample_activity[a])

    result['results'] = len(hits)
    result['activities'] = []
    for h in hits:
        result['activities'].append(h.id)

    return jsonify(results = result)


if __name__ == "__main__":
    app.run(debug=True)
