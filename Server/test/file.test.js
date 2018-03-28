var server = require('../app');
var request = require('supertest')(server);
var should = require('should');

describe('#GET /file ', function(){
    it('Testa a pesquisa de um arquivo no gridFS', function(done){
        request.get('/file/'+"5abba0eb661d3f248898b6e3")
            .expect(function(result){
                result.type.should.equal('image/jpeg');
            }).end(done);
    });
})