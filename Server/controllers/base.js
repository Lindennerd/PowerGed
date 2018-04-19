var database = require('../services/database');
var express = require('express');
var basesRouter = express.Router();

basesRouter.get('/', function (req, res) {
    database.connect(function (db, closeClient) {

        var result = db.listCollections()
        result.toArray().then(function (array) {
            var collections = array
                .filter(function (collection, index) {
                    return !collection.name.startsWith('system') 
                        && !collection.name.endsWith('SCHEMAS')
                        && !collection.name.startsWith('fs');
                })
                .map(function (collection) {
                    return collection.name;
                });

            res.send(collections);
        });
    })
})

basesRouter.post('/', function(req, res){
    database.connect(function(db, closeClient){
        try {
            db.createCollection(req.body.baseName);
            db.createCollection(req.body.baseName + " SCHEMA");

            var schemaCollection = db.collection(req.body.baseName + " SCHEMA");
            schemaCollection.insert(req.body);

            res.send('collection created');
        } catch(err) {
            res.send(err);
        }

    })
});

module.exports = basesRouter;