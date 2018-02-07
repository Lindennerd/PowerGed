var express = require("express");
var cors = require('cors');

var app = express();

app.use(cors())

app.post('/login', function(req,res){
    res.send();
    next();
});

app.listen('6969', function() {
    console.log('coco');
})