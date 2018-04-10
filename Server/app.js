var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');
var fileUpload = require('express-fileupload');
var morgan = require('morgan');

var db = require('./database');

var base = require('./controllers/base');
var baseSchema = require('./controllers/baseSchema');
var baseItems = require('./controllers/baseItems');
var file = require('./controllers/file');
var search = require('./controllers/search');

var app = express();

app.use(morgan('combined'));
app.use(fileUpload());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(cors());

app.use('/client', express.static('./Client'));

app.get('/', function (req, res) {
    res.redirect('/client');
})

app.use('/file', file);
app.use('/base', base);
app.use('/baseSchema', baseSchema);
app.use('/baseItems', baseItems);
app.use('/search', search);

app.listen(9085, function () {
    console.log('Servindo na porta ' + process.env.PORT);
})

module.exports = app;