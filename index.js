/**
 * Prakhar Sahay 02/26/2016
 *
 * Main application server script. To run server: node index.js
 */

var express = require('express');
var app = express();
var format = require('util').format;
var querystring = require('querystring');
var MongoHelper = require('./MongoHelper');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index');
});


// db lookup should happen for below page loads, for now page will access localStorage

app.get('/forest', function(req, res) {
	res.render('pages/forest');
});

app.get('/branch/:parentId', function(req, res) {
	var parentId = req.params.parentId;
	res.render('pages/branch', {parentId: parentId});
});

app.get('/branch', function(req, res) {
	res.render('pages/branch', {parentId: 'root'});
});

app.get('/leaf/:issueId', function(req, res) {
	var issueId = req.params.issueId;
	res.render('pages/leaf', {issueId: issueId});
});

app.get('/leaf', function(req, res) {
	res.render('pages/leaf', {issueId: 'root'});
});

var config = {
	db: 'seismic-test',
	username: 'tectonic',
	password: '2birds2stones'
};



app.get('/db', function (req, res) {
	var db = new MongoHelper(config);
	db.find('new', function (docs) {
		res.render('pages/db', {docs: docs});
	});
});

app.put('/db', function (req, res) {
	// read in PUT body
	var body = [];
	req.on("data", function (chunk) {
		body.push(chunk);
	}).on("end", function () {
		body = Buffer.concat(body).toString();
		var data = querystring.parse(body);
		var db = new MongoHelper(config);
		db.insert('new', data, function (success) {
			res.send(success);
		});
	});
});

app.delete('/db', function (req, res) {
	// read in DELETE body
	var body = [];
	req.on("data", function (chunk) {
		body.push(chunk);
	}).on("end", function () {
		body = Buffer.concat(body).toString();
		var data = querystring.parse(body);
		var db = new MongoHelper(config);
		db.delete('new', data, function (success) {
			res.send(success)
		});
	});
});

// make 404 pages
// app.use(function (err, req, res, next) {
// 	console.error(err.stack);
// 	res.status(404).send('Sorry, mate, we couldn\'t find this page');
// 	res.status(500).send('Something broke!');
// });


// for the server console
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});