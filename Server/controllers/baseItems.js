var database = require('../database');
var express = require('express');

var baseItemsRouter = express.Router();

baseItemsRouter.get('/', function (req, res) {
    if (!req.query.baseName) {
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
    function insertItem (collection, item, callback) {
        collection.insertOne(item).then(function (result) {
            var insertedId = result.insertedId;
            callback({ "insertedId": insertedId });
        });
    }

    database.connect(function (db) {
        var collection = db.collection(req.body.baseName);
        var item = req.body.item;
        item.path = req.body.path;

        if (req.body.file) {
            if(req.body.file.startsWith('data:')) {
                req.body.file = req.body.file.replace(/(data:.*base64,)/, '')
            }

            var fileBinary = new Buffer(req.body.file, 'base64');
            var fileName = req.body.fileName ? req.body.fileName : 'a-file';
            database.uploadFile(fileBinary, fileName ,function (file) {
                item.file = file._id;
                insertItem(collection, item, function(id) {
                    res.send(id);
                });
            });
        } else {
            insertItem(collection, item, function(id) {
                res.send(id);
            });
        }
    });
});

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
                if (err) {
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