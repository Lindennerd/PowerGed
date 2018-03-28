var database = require('../database');
var express = require('express');
var mime = require('mime');

var filesRouter = express.Router();

filesRouter.get('/:id', function (req, res) {
    database.downloadFile(req.params.id, function (file, err) {
        if (err) {
            res.status(500).send(err);
        } else {

            res.set('Content-Type', mime.getType(file.metadata.filename));
            res.setHeader('Content-disposition', 'attachment; filename=' + file.metadata.filename);

            if (file.fileStream) {
                file.fileStream.pipe(res);
            } else {
                res.sendStatus(404).send('Documento não encontrado');
            }
        }
    });
})

module.exports = filesRouter;