var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var url = require('url');

// Configuration ===============================================================
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

// Configuring variables =======================================================
var port = process.env.PORT || 3000;
var azureHost = '13.92.240.27';

// APIs requests ===============================================================
require('./apis/rethinkdb.js')(app, url);
require('./apis/couchbase.js')(app, url);

// Listen (start app with node server.js) ======================================
app.listen(port);
console.log('App listening on port ' + port);

// Retthink DB connection ======================================================
console.log('Connecting to RethinkDB...');
var rethinkDb = require('rethinkdb');
var p = rethinkDb.connect({
    host: azureHost,
    port: 28015,
    db: 'Demo'
});
p.then(function (conn) {
    exports.rethinkDbConnection = () => conn;
    console.log('RethinkDB connected on ' + conn.host + ':' + conn.port);
}).error(function (error) {
    console.log('RethinkDB connection error: ' + error);
});

// CouchBase connection ========================================================
console.log('Connecting to CouchBase...');
var couchBase = require('couchbase');
var cluster = new couchBase.Cluster('couchbase://' + azureHost + '/');
var bucket = cluster.openBucket('default');
exports.CouchBaseConnection = () => couchBase;
exports.CouchBaseBucket = () => bucket;
console.log('CouchBase connected!');