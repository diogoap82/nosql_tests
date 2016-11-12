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
var host = process.env.HOST || '104.199.127.213';

// APIs requests ===============================================================
require('./apis/rethinkdb.js')(app, url);
require('./apis/couchbase.js')(app, url);
require('./apis/mongodb.js')(app, url);

// Listen (start app with node server.js) ======================================
app.listen(port);
console.log('App listening on port ' + port);

// RetthinkDB connection =======================================================
console.log('Connecting to RethinkDB...');
var rethinkDb = require('rethinkdb');
var p = rethinkDb.connect({
    host: host,
    port: 28015,
    db: 'Demo'
});
p.then(function (conn) {
    exports.RethinkDbConnection = () => conn;
    console.log('RethinkDB connected on ' + conn.host + ':' + conn.port);
}).error(function (error) {
    console.log('RethinkDB connection error: ' + error);
});

// CouchBase connection ========================================================
console.log('Connecting to CouchBase...');
var couchBase = require('couchbase');
var cluster = new couchBase.Cluster('couchbase://' + host + '/');
var bucket = cluster.openBucket('default');
exports.CouchBaseConnection = () => couchBase;
exports.CouchBaseBucket = () => bucket;
console.log('CouchBase connected!');

// MongoDB connection ==========================================================
console.log('Connecting to MongoDB...');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + host + ':27017/demo';
mongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('MongoDB connection error: ' + err);
    } else {
        console.log('MongoDB connected!');
        exports.MongoDBConnection = () => db;
    }
});