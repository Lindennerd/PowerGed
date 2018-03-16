var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');

var base = require('./controllers/base');
var baseSchema = require('./controllers/baseSchema');
var baseSchema = require('./controllers/baseItems');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/client', express.static('./Client'));

app.use('/base', base);
app.use('/baseSchema', baseSchema);
app.use('/baseItems', baseSchema);

app.listen('6969', function() {
    console.log('coco');
})