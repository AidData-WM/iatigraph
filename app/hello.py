from flask import Flask, render_template, jsonify, abort

from models import *
from sample_data import *

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/templates/<path:template_name>")
def template(template_name):
    return render_template(template_name)


@app.route("/activity/")
@app.route("/activity/<int:id>")
def show_activity(id=None):

    if not id:
        abort(404)

    if not sample_activity.get(id, None):
        abort(404)

    return jsonify(results = sample_activity[id].to_array())
    # we use an array right now, but this could easily turn into an ORM query


@app.route("/search/")
@app.route("/search/<term>")
def search(term=None):
    result = {}

    if not term:
        result['results'] = 0
        return jsonify(results = result)

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
