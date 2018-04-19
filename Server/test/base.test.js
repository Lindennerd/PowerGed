var server = require('../app');
var request = require('supertest')(server);
var should = require('should');
var helpers = require('./helpers');

describe('# GET /node/powerged/server/base', function () {
    before(helpers.authentication);

    it('Testa se consegue buscar as bases', function (done) {
        this.timeout(200);
        request.get('/node/powerged/server/base')
            .set('x-access-token', helpers.token)
            .expect(function (res) {
                if(res.body.message) res.body.message.should.not.equal('Nenhum token recebido');
                else {
                    res.body.length.should.be.aboveOrEqual(1);
                }
            })
            .end(done);
    })
});