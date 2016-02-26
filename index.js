// var cool = require('cool-ascii-faces');
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
	// res.render('pages/db',{name:"Paxorus"});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

function mongo(req,res){
	// return all Pokemon names
	// var mongoConn=new MongoConn('seismic-test','new');
	// mongoConn.find(function(docs){
	// 	res.render('pages/db',{name:""+docs.length});
	// });
	var mongoConn=new MongoConn('seismic-test','new',function(docs){
		res.render('pages/db',docs[0]);
	});
}

function MongoConn(dbName,collName,render){
	// this.queue=new Queue();
	var x=this;
	MongoClient.connect('mongodb://tectonic:2birds2stones@ds017258.mlab.com:17258/'+dbName, function(err, db) {
		if(err) throw err;
		x.db=db;
		x.collection=db.collection(collName);
		x.findBack(render);
		// this.queue.next();
	});

	// this.find=function(render){
	// 	this.queue.wait(function(render){findBack(render)});
	// }

	this.findBack=function(render){
		var docs=[];
		var cursor=x.collection.find();
		cursor.each(function(err,doc){
			if(err) throw err;
			if(doc!=null){
				docs.push(doc);
			}else{
				x.db.close();
				render(docs);
			}
		});
		// this.queue.next();
	}


}

// function Queue(){
// 	this.array=[];

// 	this.wait=function(callback){
// 		this.array.push(callback);
// 	}

// 	this.next=function(){
// 		if(array.length==0) return;
// 		var func=unshift(this.array);
// 		func();
// 	}
// }