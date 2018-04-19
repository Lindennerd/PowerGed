const activeDirectory = require('activedirectory');
const config = require('../config');

const ad = new activeDirectory(config.activeDirectory);

module.exports = ad;