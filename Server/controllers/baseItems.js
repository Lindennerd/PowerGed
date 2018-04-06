var database = require('../database');
var express = require('express');
var fileR = require('../file');

var baseItemsRouter = express.Router();

baseItemsRouter.get('/', function (req, res) {
    if (!req.query.baseName) {
        res.sendStatus(500);
        return;
    }
    database.connect(function (db, closeClient) {
        var collection = db.collection(req.query.baseName.toString());
        var filterJson = JSON.parse(req.query.filter);

        if (req.query.projection) {
            var projection = JSON.parse(req.query.projection);
            collection.find(filterJson, projection).toArray(function (err, docs) {
                res.send(docs);
            });
        } else {
            collection.find(filterJson).toArray(function (err, docs) {
                res.send(docs);
            });
        }
    });
});

baseItemsRouter.post('/', function (req, res) {
    var params = req.body.parameters ? JSON.parse(req.body.parameters) : req.body;  

    var file = new fileR(
        params.file ? params.file : req.files, 
        params.fileName ? params.fileName : req.files.file.name);

    database.connect(function (db) {
        var collection = db.collection(params.baseName);
        var item = params.item;
        item.path = params.path;

        if (file.hasFile()) {
            file.extractContent(req.files.file.mimetype, function(err, content) {
                if(!content) content = '';
                if(err) res.status(500).send(err);
                else {
                    item.content = content;
                    database.uploadFile(file.data, file.fileName, function (uploaded) {
                        item.file = uploaded._id;
                        insertItem(collection, item, function (id) {
                            res.send(id);
                        });
                    });
                }
            });
        } else {
            insertItem(collection, item, function (id) {
                res.send(id);
            });
        }
    });

    function insertItem(collection, item, callback) {
        collection.insertOne(item).then(function (result) {
            var insertedId = result.insertedId;
            callback({ "insertedId": insertedId });
        });
    }
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