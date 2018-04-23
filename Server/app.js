var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');
var fileUpload = require('express-fileupload');
var morgan = require('morgan');

var config = require('./config');
var db = require('./services/database');

var authMiddleware = require('./middlewares/authMiddleware');
var base = require('./controllers/base');
var baseSchema = require('./controllers/baseSchema');
var baseItems = require('./controllers/baseItems');
var file = require('./controllers/file');
var search = require('./controllers/search');
var authentication = require('./controllers/authentication');

var app = express();

app.set('secret', config.secret);

app.use(morgan('dev'));
app.use(fileUpload());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(cors());

app.use('/node/powerged/client', express.static('../Client'));
app.use('/node/powerged/viewerjs', express.static('../ViewerJS'));

app.use('/node/powerged/server/auth', authentication);
app.use('/node/powerged/server/file', file);

app.use('/node/powerged/server/base', authMiddleware, base);
app.use('/node/powerged/server/baseSchema', authMiddleware, baseSchema);
app.use('/node/powerged/server/baseItems', authMiddleware, baseItems);
app.use('/node/powerged/server/search', authMiddleware, search);

app.listen(config.devPort, function () {
    console.log('Servindo na porta ' + config.devPort);
})

module.exports = app;