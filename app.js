var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');

app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride());

app.use(express.static(__dirname + '/public'));

app.db = mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/battle');
console.log("connected to database");

var routes = require('./routes/index.js');
// home page
app.get('/', routes.index);

var api = require('./routes/api.js');
app.get('/api/games', api.index);
app.post('/api/games', api.create);
app.get('/api/games/:id', api.detail);
app.post('/api/games/:id/join', api.join);

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
