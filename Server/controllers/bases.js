var database = require('../database');
var express = require('express');
var basesRouter = express.Router();

basesRouter.get('/', function (req, res) {
    database.connect(function (database, closeClient) {

        var result = database.listCollections()
        result.toArray().then(function (array) {
            var collections = array
                .filter(function (collection, index) {
                    return !collection.name.startsWith('system') && !collection.name.endsWith('SCHEMA');
                })
                .map(function (collection) {
                    return collection.name;
                });

            res.send(collections);
        });
    })
})

basesRouter.get('/:baseName', function (req, res) {
    database.connect(function (database, closeClient) {
        var collection = database.collection(req.params.baseName);
        collection.find({}).toArray(function (err, docs) {
            res.send(docs);           
        });
    });
});

module.exports = basesRouter;

