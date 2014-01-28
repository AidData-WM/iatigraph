from models import *

sample_activity = {}

sample_activity[1075] = Activity()
sample_activity[1075].id = 1075
sample_activity[1075].name = 'This is an activity!'
sample_activity[1075].date = '2014-01-27'
sample_activity[1075].status = 'Implementation'
sample_activity[1075].recipient_country = 'ZM'
sample_activity[1075].sector = 'Food aid/Food security programmes'

sample_activity[1076] = Activity()
sample_activity[1076].id = 1076
sample_activity[1076].name = 'This is an activity!'
sample_activity[1076].date = '2014-01-27'
sample_activity[1076].status = 'Implementation'
sample_activity[1076].recipient_country = 'ZM'
sample_activity[1076].sector = 'Food aid/Food security programmes'

sample_activity[2015] = Activity()
sample_activity[2015].id = 2015
sample_activity[2015].name = 'This is an activity!'
sample_activity[2015].date = '2014-01-27'
sample_activity[2015].status = 'Implementation'
sample_activity[2015].recipient_country = 'ZM'
sample_activity[2015].sector = 'Food aid/Food security programmes'

sample_activity[2015].add_provider(sample_activity[1075], '132412', '2014-01-03')
sample_activity[2015].add_provider(sample_activity[1076], '48215', '2013-08-12')

sample_activity[3012] = Activity()
sample_activity[3012].id = 3012
sample_activity[3012].name = 'This is an activity!'
sample_activity[3012].date = '2014-01-27'
sample_activity[3012].status = 'Implementation'
sample_activity[3012].recipient_country = 'ZM'
sample_activity[3012].sector = 'Food aid/Food security programmes'

sample_activity[3013] = Activity()
sample_activity[3013].id = 3013
sample_activity[3013].name = 'This is an activity!'
sample_activity[3013].date = '2014-01-27'
sample_activity[3013].status = 'Implementation'
sample_activity[3013].recipient_country = 'ZM'
sample_activity[3013].sector = 'Food aid/Food security programmes'

sample_activity[3014] = Activity()
sample_activity[3014].id = 3014
sample_activity[3014].name = 'This is an activity!'
sample_activity[3014].date = '2014-01-27'
sample_activity[3014].status = 'Implementation'
sample_activity[3014].recipient_country = 'ZM'
sample_activity[3014].sector = 'Food aid/Food security programmes'

sample_activity[2015].add_recipient(sample_activity[3012], '32412', '2014-10-30')
sample_activity[2015].add_recipient(sample_activity[3013], '51228', '2011-08-21')
sample_activity[2015].add_recipient(sample_activity[3014], '215', '2013-08-11')


