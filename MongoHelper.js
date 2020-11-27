/**
 * Prakhar Sahay 09/24/2016
 *
 * Abstraction layer for MongoClient.
 */

var MongoClient = require('mongodb').MongoClient;

var promise;

exports.connect = function () {
	promise = new Promise(function (resolve, reject) {
		const username = "elements-reader-writer";
		password = "LDwRv4PYpGMfLGuT";

		const url = `mongodb+srv://${username}:${password}@cluster0.dv8ga.mongodb.net?retryWrites=true&w=majority`;
		const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
		client.connect(err => {
			if (err) {
				reject(err);
			}
			resolve(client);
		});
	});
}

exports.find = function (collection, then) {
	exports.connect();
	promise.then(function (client) {
		var docs = [];
		var cursor = client.db("main-db").collection(collection).find();

		cursor.each(function(err, doc) {
			if (err) {
				throw err;
			}
			if (doc != null) {
				docs.push(doc);
			} else {
				client.close();
				then(docs);
			}
		});
	});
}

exports.insert = function (collection, data, then) {
	exports.connect();
	promise.then(function (client) {
		client.db("main-db").collection(collection).insertOne({name: data.name}, function (err, result) {
			if (err) {
				throw err;
			}
			client.close();
			then(result);
		});
	});
}

exports.delete = function (collection, data, then) {
	exports.connect();
	promise.then(function (client) {
		client.db("main-db").collection(collection).deleteOne({name: data.name}, function (err, result) {
			if (err) {
				throw err;
			}
			client.close();
			then(result);
		});
	});
}

