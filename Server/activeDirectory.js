const activeDirectory = require('activedirectory');

const config = {
    // url: 'ldap://dc.domain.com',
    // baseDN: 'dc=domain,dc=com',
    // username: 'username@domain.com',
    // password: 'password'

    url: 'LDAP://powerpatria.corp',
    baseDN: 'CN=Users,DC=domain',
    username: 'POWERPATRIA\\localservices',
    password: 'p1m4g1ng'
}

const ad = new activeDirectory(config);

module.exports = ad;