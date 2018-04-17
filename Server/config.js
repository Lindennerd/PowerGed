module.exports = {
    mongoConnection: 'mongodb://SVR19:27017',
    database: 'PowerGed',
    pdftotext: 'C:/poppler/bin/pdftotext.exe',
    devPort: 6969,
    prodPort: 9085,
    secret: 'powersecret',
    activeDirectory: {
        "url": "LDAP://powerpatria.corp",
        "baseDN": "CN=Users,DC=domain",
        "username": "POWERPATRIA\\localservices",
        "password": "p1m4g1ng"
    }
}