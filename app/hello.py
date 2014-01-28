from flask import Flask, render_template, jsonify

from models import *
#from sample_data import *
from loaddata import *

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/templates/<path:template_name>")
def template(template_name):
    return render_template(template_name)


@app.route("/activity/")
@app.route("/activity/<id>")
def show_activity(id=None):

    if not id:
        #id = 'GB-CHC-283302-GDRC08'       # just a default
        id = 'GB-COH-06368740-DIPRA'

    if not activities.get(id, None):
        return "Not found", 404
        #id = 'GB-COH-06368740-DIPRA'       # will be a 404 error eventually...

    activity = activities[id]

    """
    # Moved to loaddata.py so we can build bi-directional links
    if actmap.get(id, None) and actmap[id].get('edges', None):
        for a in actmap[id]['edges']:
            if a['type'] == 'receiver':
                a2 = {'id': a['foreignProjectId']}
                if activities.get(a['foreignProjectId'], None):
                    a2['exists'] = 1
                    a2['name'] = activities[a['foreignProjectId']].name
                else:
                    a2['exists'] = 0
                
                activity.recipient.append(a2)
                
            if a['type'] == 'provider':
                a2 = {'id': a['foreignProjectId']}
                if activities.get(a['foreignProjectId'], None):
                    a2['exists'] = 1
                    a2['name'] = activities[a['foreignProjectId']].name
                else:
                    a2['exists'] = 0
                
                activity.provider.append(a2)
    """        

    return jsonify(results = activity.to_array())
    # we use an array right now, but this could easily turn into an ORM query


@app.route("/search/")
@app.route("/search/<path:term>")
def search(term=None):
    result = {}

    if not term:
        result['results'] = 0
        return jsonify(results = result)

    # super slow array search. one day it'll be a lightning fast database search ;)
    hits = []
    for a in activities:
        if activities[a].name.find(term) != -1 or activities[a].description.find(term) != -1:
            hits.append(activities[a])

    result['results'] = len(hits)
    result['activities'] = []
    for h in hits:
        result['activities'].append(h.id)

    return jsonify(results = result)

app.run(debug=True)

