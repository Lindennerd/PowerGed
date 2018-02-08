var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');

var app = express();
app.use(bodyParser.json())

app.use(cors())

app.use('/client', express.static('../Client'));

app.post('/login', function(req,res,next){
    console.log(req.body);
    next();
});

app.listen('6969', function() {
    console.log('coco');
})