module.exports.localConfig = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "",
    "connectionLimit": 100,
    dialect: 'sqlite' || 'mysql' || 'postgres',
}

module.exports.appConstants = {    
    "bodyLimit": "50 mb",
    "port": process.env.PROCESS_PORT    //
}
module.exports.secretKeys = {
    "secret": process.env.SECRET_KEY
}