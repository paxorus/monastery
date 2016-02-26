var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.get('/db', function(req,res){
	mongo(req,res);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

function mongo(req,res){
	// return all Pokemon names
	MongoClient.connect('mongodb://tectonic:2birds2stones@ds017258.mlab.com/seismic-test', function(err, db) {
		if(err) throw err;
		// var collection = db.collection('new');
		// var query=collection.find();
		res.render('pages/db',{name:"Paxorus"});
	});
}