var database = require('../database');
var express = require('express');

var baseItemsRouter = express.Router();

baseItemsRouter.get('/', function (req, res) {
    if(!req.query.baseName) {
        res.sendStatus(500);
        return;
    }
    database.connect(function (db, closeClient) {
        var collection = db.collection(req.query.baseName.toString());
        var filterJson = JSON.parse(req.query.filter);
        collection.find(filterJson).toArray(function (err, docs) {
            res.send(docs);
        });
    });
});

baseItemsRouter.post('/', function (req, res) {
    database.connect(function (db) {
        var collection = db.collection(req.body.baseName);
        var item = req.body.item;
        item.path = req.body.path;

        collection.insertOne(item).then(function (result) {
            res.send('Ok');
        });
    })
})

baseItemsRouter.put('/', function (req, res) {
    database.connect(function (db) {
        var collection = db.collection(req.body.baseName);
        collection.update(req.body.filter, { $set: req.body.update }, { upsert: req.body.upsert })
            .then(function (result) {
                res.send(result.result);
            });
    });
});

baseItemsRouter.delete('/', function (req, res) {
    database.connect(function (db) {
        var collection = db.collection(req.body.baseName);
        if (req.body.isFolder) {
            var regexPattern = ".*," + req.body.folderName + ".*";
            collection.deleteMany({ path: { $regex: regexPattern } }, function (err, deleteManyResult) {
                if(err) {
                    throw err;
                }
                collection.remove(req.body.filter, req.body.justOne).then(function (removeResult) {
                    res.send({
                        deletedItem: removeResult.result.n,
                        deletedChildrens: deleteManyResult.deletedCount
                    });
                });
            })
        } else {
            collection.remove(req.body.filter, req.body.justOne).then(function (result) {
                res.send(result.result);
            });
        }
    });

})

module.exports = baseItemsRouter;