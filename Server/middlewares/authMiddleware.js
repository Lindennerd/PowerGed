const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddlewareRouter = express.Router();

authMiddlewareRouter.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) return res.status(401).json({message: 'Falha na autenticação', err: err});
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({message: 'Nenhum token recebido'});  
    }
});


module.exports = authMiddlewareRouter;