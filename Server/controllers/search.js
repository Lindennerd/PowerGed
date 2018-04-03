var database = require('../database');
var express = require('express');
var searchRouter = express.Router();

searchRouter.get('/', function(req, res){
    if(req.query.parameters && req.query.baseName) {

        var parameters = req.query.parameters.map(function(element, index){
            return JSON.parse(element);
        });

        database.connect(function(db){
            db.collection(req.query.baseName).find({$or: parameters})
                .toArray(function(err, docs){
                    res.send(docs);
                });
        })        

    } else {
        res.status(400).send("Pesquisa Inválida");
    }
});

module.exports = searchRouter;