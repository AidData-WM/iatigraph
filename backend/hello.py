from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/activity/<id>")
def show_activity(id):
    
    activity = {}
    activity['id'] = 2015

    activity['provider'] = []

    p = {}
    p['id'] = 1075;
    p['amount'] = 132412
    p['date'] = '2014-01-03'
    activity['provider'].append(p)

    p = {}
    p['id'] = 1076;
    p['amount'] = 876453
    p['date'] = '2013-12-07'
    activity['provider'].append(p)

    activity['recipient'] = []

    r = {}
    r['id'] = 3112;
    r['amount'] = 123
    r['date'] = '2011-12-07'
    activity['recipient'].append(r)

    r = {}
    r['id'] = 3113;
    r['amount'] = 112323
    r['date'] = '2012-08-07'
    activity['recipient'].append(r)

    r = {}
    r['id'] = 3114;
    r['amount'] = 64535
    r['date'] = '2014-01-07'
    activity['recipient'].append(r)

    activity['name'] = 'This is an activity!'
    activity['date'] = '2014-01-27'
    activity['status'] = 'Implementation'
    activity['recipient_country'] = 'ZM'
    activity['sector'] = 'Food aid/Food security programmes'
    
    return jsonify(results = activity)

if __name__ == "__main__":
    app.run(debug=True)
