var database = require('../database');
var express = require('express');
var baseSchemaRouter = express.Router();

baseSchemaRouter.get('/:baseName', function (req, res) {
    database.connect(function (database, closeClient) {
        var collection = database.collection(req.params.baseName + ' SCHEMA');
        collection.find({}).toArray(function (err, docs) {
            res.send(docs);           
        });
    });
});

module.exports = baseSchemaRouter;
