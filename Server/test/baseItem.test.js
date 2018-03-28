var server = require('../app');
var request = require('supertest')(server);
var should = require('should');

var sampleItem = require('./mocks/sampleItem');
var sampleFolder = require('./mocks/sampleFolder');
var sampleEmptyFolder = require('./mocks/sampleEmptyFolder');
var image = require('./mocks/image')

describe('#1 GET /baseItems', function () {
    it('Testa se consegue buscar os itens da raiz da árvore', function (done) {
        this.timeout(300);
        request.get('/baseItems')
            .query({
                "baseName": "Funcionarios Pouco Açucar",
                "filter": "{ \"path\": null }"
            }).expect(function (response) {
                should.equal(response.body.length, 2, "Esperados 2 itens na lista da base de testes");
                should.equal(response.body[0].path, null, "Para ser raiz o path deve ser nulo");
            }).end(done);
    });

    it('Testa a pesquisa de um item na base por uma propriedade', function (done) {
        this.timeout(300);
        request.get('/baseItems').query({
            "baseName": "Funcionarios Pouco Açucar",
            "filter": "{ \"fields.value\": \"0278857074\" }"
        }).expect(function (response) {
            response.body.length.should.be.aboveOrEqual(1);
        }).end(done);
    });
});

describe('#2 POST /baseItems', function () {
    it('Testa inserção de documento na base', function (done) {
        this.timeout(300);
        request.post('/baseItems')
            .set('Content-Type', 'application/json')
            .send({
                "baseName": "Funcionarios Pouco Açucar",
                "path": ",Setor de Vendas,CallCenter,Coordenadoria,",
                "item": sampleItem
            }).expect(200).end(done);
    });

    it('Testa o upload de um arquivo para o sistema', function (done) {
        this.timeout(300);
        request.post('/baseItems')
            .set('Content-Type', 'application/json')
            .send({
                "baseName": "Funcionarios Pouco Açucar",
                "path": ",Setor de Vendas,CallCenter,",
                "item": sampleItem,
                "file": image.imageb64,
                "fileName": "testeFile.jpg"
            }).expect(function(res){
                console.log(res.InsertedId);
            }).end(done);
    })
});

describe("#3 PUT /baseItems", function () {
    it('Testa a edição de um documento na base', function (done) {
        this.timeout(300);
        request.put('/baseItems')
            .set('Content-Type', 'application/json')
            .send({
                "baseName": "Funcionarios Pouco Açucar",
                "filter": { "fields.value": "11111111111" },
                "update": { "name": "TESTE UPDATED" },
                "upsert": false
            }).expect(function (result) {
                result.body.nModified.should.equal(1);
            }).end(done);
    });
});

describe("#4 DELETE /baseItems", function () {
    it('Testa a deleção de um documento na base', function (done) {
        this.timeout(300);
        request.delete('/baseItems')
            .send({
                "baseName": "Funcionarios Pouco Açucar",
                "filter": { "fields.value": "11111111111" },
                "justOne": true,
                "isFolder": false,
                "folderName": null
            }).expect(function (result) {
                //console.log(result.n);
                result.body.n.should.be.aboveOrEqual(1);
            }).end(done);
    });

    it('Testa deleção de pasta com items', function (done) {
        this.timeout(300);
        request.delete('/baseItems')
            .send({
                "baseName": "Funcionarios Pouco Açucar",
                "filter": { "name": "Coordenadoria" },
                "justOne": true,
                "isFolder": true,
                "folderName": "Coordenadoria"
            }).expect(function (result) {
                result.body.should.have.property('deletedItem').which.is.a.Number();
                result.body.should.have.property('deletedChildrens').which.is.a.Number();
            }).end(done);
    })
})