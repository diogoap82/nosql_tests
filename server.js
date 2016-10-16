var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var url = require('url');
var rethinkDb = require('rethinkdb');

// Configuration ===============================================================
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

// Configuring variables =======================================================
var port = process.env.PORT || 3000;
//var env = process.env.NODE_ENV || 'development';
//app.locals.ENV = env;
//app.locals.ENV_DEVELOPMENT = env == 'development';
var azureHost = '13.92.188.193';

// APIs requests ===============================================================
require('./apis/rethinkdb.js')(app, url);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log('App listening on port ' + port);

console.log('Connecting to RethinkDB...');
var p = rethinkDb.connect({
    host: azureHost,
    port: 28015,
    db: 'Demo'
});
p.then(function (conn) {
    exports.rethinkDbConnection = () => conn;
    console.log('RethinkDB connected on' + conn.host + ':' + conn.port);
}).error(function (error) {
    console.log(error);
});