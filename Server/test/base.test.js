var server = require('../app');
var request = require('supertest')(server);
var should = require('should');

describe('# GET /base', function(){
    it('Testa se consegue buscar as bases', function(done){
        this.timeout(200);
        request.get('/base')
        .expect(200, done);
    })
});