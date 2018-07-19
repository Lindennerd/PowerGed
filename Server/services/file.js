var fs = require('fs');
var pdfReader = require('pdf-text-extract');
var tmp = require('tmp');
var config = require('../config');

function file(file, fileName) {
    this.convertToBuffer(file);
    this.fileName = fileName;
}

file.prototype.hasFile = function () {
    return this.data != null;
}

file.prototype.convertToBuffer = function (file) {
    if (!file) this.data = null;
    if (typeof file === "object") {
        this.data = file.file.data;
    } else {
        if (file.startsWith('data:')) {
            var replaced = file.replace(/(data:.*base64,)/, '');
            this.data = Buffer(replaced, 'base64');
        } else {
            if (!this.data) this.data = Buffer(file, 'base64');
        }
    }
}

file.prototype.extractContent = function (mimetype, callback) {
    var self = this;

    switch (mimetype) {
        case 'application/pdf':
            tmp.dir(function (err, path) {
                var tmpFile = path + tmp.fileName + '.pdf';
                fs.writeFile(tmpFile, self.data, function () {

                    pdfReader(tmpFile, null, config.pdftotext, function (err, result) {
                        if (err) callback(err);
                        else {
                            callback(null, result.join());
                            return;
                        }
                    });
                });
            });
            break;

        case 'plain/text':
            callback(null, this.data.toString('utf-8'));
            break;

        default:
            callback({ message: 'Invalid file type ' + mimetype });
    }
}

module.exports = file;