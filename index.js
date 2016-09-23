// Prakhar Sahay 02/26/2016
// node index.js

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var querystring=require('querystring');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/forest', function(request, response) {
	response.render('pages/forest');
});

app.get('/branch', function(request, response) {
	response.render('pages/branch');
});

app.get('/leaf', function(request, response) {
	response.render('pages/leaf');
});

app.get('/db', function(req,res){
	new MongoHelper({
		db:'seismic-test',
		collection:'new',
		operation:'find',
		then:function(docs){res.render('pages/db',{docs:docs})}
	});
});

app.put('/db', function(req,res){
	// read in PUT body
	var body=[];
	req.on("data",function(chunk){
		body.push(chunk);
	}).on("end",function(){
		body=Buffer.concat(body).toString();
		var data=querystring.parse(body);
		new MongoHelper({
			db:'seismic-test',
			collection:'new',
			operation:'insert',
			data:data,
			then:function(success){res.send(success)}
		});
	});
});

app.delete('/db', function(req,res){
	// read in PUT body
	var body=[];
	req.on("data",function(chunk){
		body.push(chunk);
	}).on("end",function(){
		body=Buffer.concat(body).toString();
		var data=querystring.parse(body);
		new MongoHelper({
			db:'seismic-test',
			collection:'new',
			operation:'delete',
			data:data,
			then:function(success){res.send(success)}
		});
	});
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});






function MongoHelper(params){
	var helper=this;
	init("tectonic","2birds2stones");

	function init(username,password){
		var url=["mongodb://",username,":",password,"@ds017258.mlab.com:17258/",params.db].join("");
		MongoClient.connect(url,function(err,db){
			if(err) throw err;
			helper.db=db;// get db
			helper.collection=db.collection(params.collection);// get collection

			switch(params.operation){// call correct operation
				case "insert":helper.insert();break;
				case "find":helper.find();break;
				case "post":break;
				case "delete":helper.delete();break;
			}
		});
	}
	this.find=function(){
		var docs=[];
		var cursor=helper.collection.find();
		cursor.each(function(err,doc){
			if(err) throw err;
			if(doc!=null){
				docs.push(doc);
			}else{
				helper.db.close();
				params.then(docs);
			}
		});
	}
	this.insert=function(){
		this.collection.insertOne({name:params.data.name},function(err,result){
			if(err) throw err;
			helper.db.close();
			params.then(result);
		});
	}
	this.delete=function(){
		this.collection.deleteOne({name:params.data.name},function(err,result){
			if(err) throw err;
			helper.db.close();
			params.then(result);
		});
	}

}