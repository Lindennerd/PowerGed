var server = require('../app');
var request = require('supertest')(server);
var config = require('../config');

module.exports = {
    token: null,
    authentication: function (done) {
        request.post('/node/powerged/server/auth')
            .send({ 
                username: config.test.credentials.username, 
                password: config.test.credentials.password 
            })
            .end(function (err, res) {
                this.token = res.body.token;
                done();
            });
    }
}