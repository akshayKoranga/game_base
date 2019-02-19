// let allServices = (function () {
// ----------------- Define Module -----------------
let Promise = require('bluebird'),
    _ = require('underscore'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs'),
    fs = require('fs'),
    Sequelize = require('../../db'),
    Op = Sequelize.Op,
    constants = require('../utils/constants'),

    // ---------------- Middleware ------------
    request = require('../middleware/request'),
    upload = require('../middleware/storage')('selfie_fight'),
    // ----------------- model -----------------
    userModel = require('../models/user'), // ---- user model
    gameModel = require('../models/gameModel'), // ---- game model
    // ----------------- Services -----------------
    userService = require('./user/userService'), // ---- user service
    gameService = require('./game/gameService'), // ---- game service
    // ----------------- Helper function -----------------

    {
        sendPush,
        localNotification
    } = require('../helpers/notification_base'); // call achievement function 
//    console.log(userAuth.dummy);process.exit()
module.exports = {
    // ------- Module -------
    Sequelize,
    // ------- base service functions -------
    constants,
    Op,
    // ------- Middleware -------
    request,
    upload,
    // ------- helper function -------
    sendPush,
    localNotification,
    // ------- Define models -------
    userModel,
    gameModel,
    // ------- Define services -------
    userService,
    gameService
};