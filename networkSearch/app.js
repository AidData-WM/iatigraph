//note to reader: i have no idea what functions are. that explains the code below


var mongoClient = require('mongodb').MongoClient;
var async = require('async');
var fs = require('fs');

var nodes = {}, 
		projects = {};

//connect to Mongodb (note the hardcoded config ;) )
//(this won't work unless you already have a full mongo clone of the IATI registry on your computer)
//get one here: https://github.com/owenscott/iati-to-mongo
mongoClient.connect('mongodb://127.0.0.1:27017/iatiToMongoDev', function(err, db) {
	
	var activities, distinctProviderActivities, distinctReceiverActivities;

	if(err) {
		console.log('Error connecting to mongodb');
		throw err;
	}



	//query for all provider orgs
	activities = db.collection('activities');



	async.parallel([
		function(callback) {
			//parallel: grab all distinct receiver activity IDs
			activities.distinct('iati-activity.iati-activity.transaction.receiver-org.@.receiver-activity-id', function(err, data) {
				if(err) {
					throw err;
				}
				//get projects in which each one occurs
				async.each(data, function (foreignProjectKey, callback) {
					var nodeProjectId
					activities.findOne({'iati-activity.iati-activity.transaction.receiver-org.@.receiver-activity-id':foreignProjectKey}, {'iati-activity.iati-activity.iati-identifier.text':1}, function (err, data) {
						if (err) {
							throw err;
						}
						nodeProjectId = data['iati-activity']['iati-activity']['iati-identifier'][0]['text'] || '';
						nodes[nodeProjectId] = nodes[nodeProjectId] || {};
						nodes[nodeProjectId].edges = nodes[nodeProjectId].edges || [];
						nodes[nodeProjectId].edges.push({
							type:'receiver',
							foreignProjectId: foreignProjectKey
						});
						activities.findOne({'iati-activity.iati-activity.iati-identifier.text': foreignProjectKey}, function(err, activity) {
							if (activity) {
								projects[activity['iati-activity']['iati-activity']['iati-identifier'][0]['text']] = activity['iati-activity']['iati-activity']; 
							}	
							callback();
						})
						
						
					})
					
				},
				//end of distinct receiver activity ID section
				function(err) {
					if (err) {
						throw err;
					}
					callback();
				});
			});
		},
				function(callback) {
			//parallel: grab all distinct provider activity IDs
			activities.distinct('iati-activity.iati-activity.transaction.provider-org.@.provider-activity-id', function(err, data) {
				if(err) {
					throw err;
				}
				//get projects in which each one occurs
				async.each(data, function (foreignProjectKey, callback) {
					var nodeProjectId
					activities.findOne({'iati-activity.iati-activity.transaction.provider-org.@.provider-activity-id':foreignProjectKey}, {'iati-activity.iati-activity.iati-identifier.text':1}, function (err, data) {
						if (err) {
							throw err;
						}
						nodeProjectId = data['iati-activity']['iati-activity']['iati-identifier'][0]['text'] || '';
						nodes[nodeProjectId] = nodes[nodeProjectId] || {};
						nodes[nodeProjectId].edges = nodes[nodeProjectId].edges || [];
						nodes[nodeProjectId].edges.push({
							type:'provider',
							foreignProjectId: foreignProjectKey
						});
						activities.findOne({'iati-activity.iati-activity.transaction.provider-org.@.provider-activity-id':foreignProjectKey}, function (err, data) {
							projects[data['iati-activity']['iati-activity']['iati-identifier'][0]['text']] = data['iati-activity']['iati-activity'];

							activities.findOne({'iati-activity.iati-activity.iati-identifier.text': foreignProjectKey}, function(err, activity) {
							if (activity) {
									projects[activity['iati-activity']['iati-activity']['iati-identifier'][0]['text']] = activity['iati-activity']['iati-activity']; 
								}	
								callback();
							})
						});
						

						
						
					})
					
				},
				//end of distinct receiver activity ID section
				function(err) {
					if (err) {
						throw err;
					}
					callback();
				});
			});
		}
		],
		//all parallel activities finished
		function (err) {
			if (err) {
				throw err;
			}
			var test = [];
			for (p in projects) {
				test.push(p);
			}
			fs.writeFileSync('./results/graph.json', JSON.stringify(nodes));
			fs.writeFileSync('./results/projects.json', JSON.stringify(projects));
			db.close();
		}
		);

});


// 'iati-activity.iati-activity.iati-identifier.text'
// 'iati-activity.iati-activity.transaction.provider-org.@.provider-activity.id'
// 'iati-activity.iati-activity.transaction.receiver-org.@.receiver-activity.id'


