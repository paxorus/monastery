/**
 * Prakhar Sahay 09/24/2016
 *
 * Abstraction layer for MongoClient.
 */

var mongoConfig = require('./mongoConfig');
var MongoClient = require('mongodb').MongoClient;

var promise;

exports.connect = function () {
	promise = new Promise(function (resolve, reject) {
		var url = mongoConfig.url();
		MongoClient.connect(url, function(err, db) {
			if (err) {
				reject(err);
			}
			resolve(db);
		});
	});
}

exports.find = function (collection, then) {
	exports.connect();
	promise.then(function (db) {
		var docs = [];
		var cursor = db.collection(collection).find();

		cursor.each(function(err, doc) {
			if (err) {
				throw err;
			}
			if (doc != null) {
				docs.push(doc);
			} else {
				db.close();
				then(docs);
			}
		});
	});
}

exports.insert = function (collection, data, then) {
	exports.connect();
	promise.then(function (db) {
		db.collection(collection).insertOne({name: data.name}, function (err, result) {
			if (err) {
				throw err;
			}
			db.close();
			then(result);
		});
	});
}

exports.delete = function (collection, data, then) {
	exports.connect();
	promise.then(function (db) {
		db.collection(collection).deleteOne({name: data.name}, function (err, result) {
			if (err) {
				throw err;
			}
			db.close();
			then(result);
		});
	});
}

