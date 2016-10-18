'use strict';

var r = require('couchbase');
var utils = require('../services/utilsService');

var getConn = function () {
    return require('../server.js').CouchBaseConnection();
}

var getBucket = function () {
    return require('../server.js').CouchBaseBucket();
}

module.exports = function (app, url) {

    app.get('/api/couchbase/:id', function (req, res) {
        getBucket().get(req.params.id, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('get id OK');
            res.json(result);
        });
    })

    app.get('/api/couchbase', function (req, res) {
        var N1qlQuery = getConn().N1qlQuery;
        var query = N1qlQuery.fromString('select * from default');

        getBucket().query(query, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('get OK');
            res.json(result);
        });
    })

    app.post('/api/couchbase', function (req, res) {
        var data = {
            id: req.body.id,
            number: req.body.number,
            date: req.body.date,
            customer: req.body.customer,
            amount: req.body.amount
        }

        getBucket().upsert(req.body.id, data, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('post OK');
            res.json(result);
        });
    })

    app.delete('/api/couchbase/:id', function (req, res) {
        getBucket().remove(req.params.id, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('delete OK');
            res.json(result);
        });
    })

    app.patch('/api/couchbase/:id', function (req, res) {
        var data = {
            id: req.params.id,
            number: req.body.number,
            date: req.body.date,
            customer: req.body.customer,
            amount: req.body.amount
        }

        getBucket().replace(req.params.id, data, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('post OK');
            res.json(result);
        });
    })
}