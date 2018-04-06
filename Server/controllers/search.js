var database = require('../database');
var express = require('express');
var searchRouter = express.Router();

searchRouter.get('/', function(req, res){
    if(req.query.parameters && req.query.baseName) {
        if(req.searchType == "0") {
            var parameters = req.query.parameters.map(function(element, index){
                return JSON.parse(element);
            });
    
            database.connect(function(db){
                db.collection(req.query.baseName).find({$or: parameters})
                    .toArray(function(err, docs){
                        if(err) res.status(500).send(err);
                        else res.send(docs);
                    });
            }); 
        } else {
            var parameters = JSON.parse(req.query.parameters);
            database.connect(function(db){
                db.collection(req.query.baseName).find({$text: { $search: parameters.q }})
                    .toArray(function(err, docs){
                        if(err) res.status(500).send(err);
                        else res.send(docs);
                    });
            }); 
        }     
    } else {
        res.status(400).send("Pesquisa Inválida");
    }
});

module.exports = searchRouter;