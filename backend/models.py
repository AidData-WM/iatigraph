from flask import jsonify

# Hey hey, what do you know, this could easy be adapted to an ORM!

class Activity:
    id = ""
    name = ""
    description = ""
    date = ""
    recipient_country = ""
    sector = ""

    provider = []
    recipient = []

    def __init__(self):
        self.provider = []
        self.recipient = []

    def add_provider(self, activity, amount=None, date=None):
        txn = Transaction()
        txn.origin_activity = activity
        txn.target_activity = self
        txn.amount = amount
        txn.date = date

        self.provider.append(txn)
        activity.recipient.append(txn)

        return txn

    def add_recipient(self, activity, amount=None, date=None):
        return activity.add_provider(self, amount, date)
        
    def to_array(self):
        arr = {}
        arr['id'] = self.id
        arr['name'] = self.name
        arr['description'] = self.description
        arr['date'] = self.date
        arr['recipient_country'] = self.recipient_country
        arr['sector'] = self.sector

        arr['provider'] = []
        for p in self.provider:
            arr['provider'].append(p.to_array())

        arr['recipient'] = []
        for r in self.recipient:
            arr['recipient'].append(r.to_array())

        return arr

class Transaction:
    id = ""
    origin_activity = ""
    target_activity = ""
    amount = ""
    date = ""

    def to_array(self):
        arr = {}
        arr['id'] = self.id
        arr['origin_activity'] = self.origin_activity.id
        arr['target_activity'] = self.target_activity.id
        arr['amount'] = self.amount
        arr['date'] = self.date

        return arr

