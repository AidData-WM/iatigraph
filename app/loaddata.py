import json
from models import *

print("Loading projects...")
projects = json.load(open('../networkSearch/results/projects.json', errors='replace'))

print("Loading graph...")
actmap = json.load(open('../networkSearch/results/graph.json', encoding='UTF-8', errors='replace'))

activities = {}
for pid in projects:
    p = projects[pid]
    a = Activity()

    a.id = pid

    if p.get('title', None):
        a.name = p['title'][0]['text']
    if p.get('description', None):
        description = p['description'][0]['text']

    a.date = ""
    if p.get('activity-date', None):
        for d in p['activity-date']:
            if d['@'].get('iso-date', None):
                a.date = "%s%s: %s\n" % (a.date, d['@']['type'], d['@']['iso-date'])

    a.recipient_country = ""
    if p.get('recipient-country', None):
        for c in p['recipient-country']:
            a.recipient_country = "%s%s\n" % (a.recipient_country, c['@']['code'])
        
    a.sector = ""
    if p.get('sector', None):
        for s in p['sector']:
            if s.get('@', None) and s['@'].get('code', None):
                a.sector = "%s%s - %s \n" % (a.sector, s['@']['code'], s.get('text', ""))
            else:
                a.sector = "%s%s \n" % (a.sector, s.get('text', ""))
        
    activities[pid] = a
