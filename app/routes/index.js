let express = require('express');

module.exports = (io) => {
    let router = express();
    let users = require('./user');
    let game = require('./game');

    // let config = require('../config');  // database connection
    router.use('/user', users(io));
    router.use('/game', game());

    return router;
};