const express = require('express');
const jwt = require('jsonwebtoken');
const ad = require('../activeDirectory');
const config = require('../config');

const authRouter = express.Router();

authRouter.post('/', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send('Usuário ou senha não podem ser vazios');
        return;
    }

    ad.authenticate(req.body.username, req.body.password, function (err, auth) {
        if (err) {
            var errorMessage = null;
                if(err.code === "ENOENT") errorMessage = 'Falha de comunicação com o servidor';
            if(err.code === 49) errorMessage = 'Credenciais inválidas';
            res.status(400).send(errorMessage || err);
        } else {
            if (auth) {
                const token = jwt.sign({ username: req.body.username }, config.secret, {
                    expiresIn: 1440 // 24 horas
                });
                res.send({ message: 'logged!', token: token });
            } else {
                res.send('Usuário ou senha inválidos.');
            }
        }
    });

});

authRouter.get('/', (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) res.send({validation: false});
            else {
                res.send({validation: true, decoded: decoded});
            }
        })
    } else {
        res.send({validation: false, message: 'No Token'});
    }
})

module.exports = authRouter;