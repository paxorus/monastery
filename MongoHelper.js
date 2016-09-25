/**
 * Prakhar Sahay 09/24/2016
 *
 * Abstraction layer for MongoClient
 */

var util = require('util');
// var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;

function MongoHelper(config) {

	var helper = this;

	this.connect = function () {
		var format = "mongodb://%s:%s@ds017258.mlab.com:17258/%s"
		var url = util.format(format, config.username, config.password, config.db);
		this.promise = new Promise(function (resolve, reject) {
			MongoClient.connect(url, function(err, db) {
				if (err) {
					reject(err);
				}
				resolve(db);
			});
		});
	}

	this.find = function (collection, then) {
		this.promise.then(function (db) {
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

	this.insert = function (collection, data, then) {
		this.promise.then(function (db) {
			console.log(db.collection(collection).insertOne);
			db.collection(collection).insertOne({name: data.name}, function (err, result) {
				if (err) {
					throw err;
				}
				db.close();
				then(result);
			});
		});
	}

	this.delete = function (collection, data, then) {
		this.promise.then(function (db) {
			db.collection(collection).deleteOne({name: data.name}, function (err, result) {
				if (err) {
					throw err;
				}
				db.close();
				then(result);
			});
		});
	}

	this.connect();
}

module.exports = MongoHelper;