var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');

/* MOCK */
var bases = require('./bases.json');

var app = express();
app.use(bodyParser.json())

app.use(cors())

app.use('/client', express.static('../Client'));

app.post('/login', function(req,res,next){
    console.log(req.body);
    next();
});

app.get('/bases', function(req, res, next){
    res.send(bases);

    next();
})

app.listen('6969', function() {
    console.log('coco');
})