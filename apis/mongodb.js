'use strict';

var r = require('mongodb');
var utils = require('../services/utilsService');

var getConn = function () {
    return require('../server.js').MongoDBConnection();
}

module.exports = function (app, url) {

    app.get('/api/mongodb/:id', function (req, res) {
        getConn().collection('orders').find({ id: req.params.id }).limit(1).toArray(function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('get id OK');
            res.json(result);
        });
    })

    app.get('/api/mongodb', function (req, res) {
        getConn().collection('orders').find({}).limit(2).toArray(function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('get OK');
            res.json(result);
        });
    })

    app.post('/api/mongodb', function (req, res) {
        getConn().collection('orders').insertOne({
            id: req.body.id,
            number: req.body.number,
            date: req.body.date,
            customer: req.body.customer,
            amount: req.body.amount
        }, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('post OK');
            res.json(result);
        });
    })

    app.delete('/api/mongodb/:id', function (req, res) {
        getConn().collection('orders').deleteOne({ id: req.params.id }, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('delete OK');
            res.json(result);
        });
    })

    app.delete('/api/mongodb', function (req, res) {
        getConn().collection('orders').remove({}, function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('delete all OK');
            res.json(result);
        });
    })    

    app.patch('/api/mongodb/:id', function (req, res) {
        getConn().collection('orders').findOneAndUpdate({ id: req.params.id },
            {
                $set: {
                    number: req.body.number,
                    date: req.body.date,
                    customer: req.body.customer,
                    amount: req.body.amount
                }
            },
            {
                returnOriginal: false,
                upsert: true
            }
            , function (err, result) {
                if (err) return utils.sendError(res, err, 500);
                console.log('patch OK');
                res.json(result);
            });
    })
}