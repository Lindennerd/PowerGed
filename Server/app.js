var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');

var bases = require('./controllers/bases');
var baseSchema = require('./controllers/baseSchema');

var app = express();

app.use(bodyParser.json())
app.use(cors())

app.use('/client', express.static('./Client'));

app.use('/bases', bases);
app.use('/baseSchema', baseSchema);

app.listen('6969', function() {
    console.log('coco');
})