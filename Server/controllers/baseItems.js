var database = require('../database');
var express = require('express');

var baseItemsRouter = express.Router();

baseItemsRouter.get('/:baseName', function (req, res) {
    database.connect(function (db, closeClient) {
        var collection = db.collection(req.params.baseName);
        collection.find({}).toArray(function (err, docs) {
            res.send(docs);           
        });
    });
});

baseItemsRouter.post('/', function(req, res){
    database.connect(function(db) {
        var collection = db.collection(req.baseName);
        collection.insert(req.body.items);
        
        res.send('Inserted Itens');
    })
})

module.exports = baseItemsRouter;