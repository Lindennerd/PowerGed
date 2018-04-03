var database = require('../database');
var express = require('express');
var baseSchemaRouter = express.Router();

baseSchemaRouter.get('/', function (req, res) {
    database.connect(function (database, closeClient) {
        var collection = database.collection(req.query.baseName);
        var aux = collection.distinct("fields.name")
            .then(function(result){
                res.send(result);
            });
    });
});

module.exports = baseSchemaRouter;
