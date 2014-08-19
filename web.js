
var express = require('express');
var logfmt = require('logfmt');
var jade = require('jade');
var app = express();

app.set('title','개역한글');
app.set('view engine','jade');
app.engine('jade',require('jade').__express);
app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/public'));

app.get('/bible', function(req,res){
	res.render('bible');
});
app.get('/read', function(req,res){
	res.set({'Content-Type':'text/html; charset=euc-kr'});
	res.render('read');
});
app.get('/getAll', function(req,res){
	res.contentType('text/html;charset=euc-kr');
	res.sendfile(__dirname + '/public/json/k_bible_1950_dos_kr.json'  );
});
app.use('/', function(req,res){
	res.send("Hello shma!");
});

var port = Number(process.env.PORT || 8001);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
