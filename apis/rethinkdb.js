'use strict';

var r = require('rethinkdb');
var utils = require('../services/utilsService');

var getConn = function () {
    return require('../server.js').rethinkDbConnection();
}

module.exports = function (app, url) {

    app.get('/api/rethinkdb/:id', function (req, res) {
        r.table('orders').get(req.params.id).
            run(getConn(), function (err, result) {
                if (err) return utils.sendError(res, err, 500);
                console.log('get id OK');
                res.json(result);
            });
    })

    app.get('/api/rethinkdb', function (req, res) {
        r.table('orders').run(getConn(), function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) return utils.sendError(res, err, 500);
                console.log('get OK');
                res.json(result);
            });
        });
    })

    app.post('/api/rethinkdb', function (req, res) {
        r.table('orders').insert({
            id: req.body.id,
            number: req.body.number,
            date: req.body.date,
            customer: req.body.customer,
            amount: req.body.amount
        }).run(getConn(), function (err, result) {
            if (err) return utils.sendError(res, err, 500);
            console.log('post OK');
            res.json(result);
        })
    })

    app.delete('/api/rethinkdb/:id', function (req, res) {
        r.table('orders').get(req.params.id).
            delete().run(getConn(), function (err, result) {
                if (err) return utils.sendError(res, err, 500);
                console.log('delete OK');
                res.json(result);
            });
    })

    app.patch('/api/rethinkdb/:id', function (req, res) {
        r.table('orders').get(req.params.id).
            update({
                number: req.body.number,
                date: req.body.date,
                customer: req.body.customer,
                amount: req.body.amount
            }).run(getConn(), function (err, result) {
                if (err) return utils.sendError(res, err, 500);
                console.log('patch OK');
                res.json(result);
            });
    })
}