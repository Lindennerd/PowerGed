var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('./config');

function database() {}

database.prototype.connect = function(callback) {
    MongoClient.connect(config.mongoConnection, function(err, client){
        assert.equal(err, null, err);
        callback(client.db(config.database), function(){

            client.close();
        });


    })
}

module.exports = new database();