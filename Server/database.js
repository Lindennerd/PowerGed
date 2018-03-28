var mongo = require('mongodb');

var fs = require('fs');
var stream = require('stream');

var assert = require('assert');
var config = require('./config');

function connect(callback) {
    mongo.MongoClient.connect(config.mongoConnection, function (err, client) {
        assert.equal(err, null, err);
        callback(client.db(config.database), function () {
            client.close();
        });
    });
}

function database() { }

database.prototype.connect = function (callback) {
    connect(callback);
}

database.prototype.uploadFile = function (fileBinary, data, callback) {
    connect(function (db) {
        var bucket = new mongo.GridFSBucket(db);
        var bufferStream = stream.PassThrough();
        bufferStream.end(fileBinary);
        bufferStream.pipe(bucket.openUploadStream(data))
            .on('error', function (err) { throw err; })
            .on('finish', function (res) {
                callback(res);
            })
    });
}

database.prototype.downloadFile = function (id, callback) {
    connect(function (db) {
        try {
            var bucket = new mongo.GridFSBucket(db);
            var obId = new mongo.ObjectID(id);
            bucket.find({"_id": obId}).toArray()
            .then((results) => {
                if(results.length > 0) {
                    callback({
                        fileStream: bucket.openDownloadStream(obId),
                        metadata: results[0]
                    });
                }
            }).catch((err) => {
                callback(null, err);
            });
        } catch (err) {
            callback(null, err);
        }

    });
}

module.exports = new database();