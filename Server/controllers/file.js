var database = require('../database');
var express = require('express');
var mime = require('mime');

var filesRouter = express.Router();

filesRouter.get('/:id', function (req, res) {
    database.downloadFile(req.params.id, function (file, err) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (file.fileStream) {
                res.set('Content-Type', mime.getType(file.metadata.filename));
                res.setHeader('Content-disposition', 'inline');
    
                file.fileStream.pipe(res);
            } else {
                res.status(404).send('Documento não encontrado');
            }
        }
    });
});

filesRouter.post('/', function(req, res){
    console.log(req.files);
    database.uploadFile(req.files.file.data, req.files.file.name, function(result){
        console.log(result);
    })
    res.send('Ok');
})

module.exports = filesRouter;