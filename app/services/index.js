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
    request = require('../middlewares/request'),
    // ----------------- model -----------------
    userModel = require('../models/user'), // ---- user model
    gameModel = require('../models/gameModel'), // ---- game model
    // ----------------- Services -----------------
    userService = require('./user/userService'), // ---- user service
    gameService = require('./game/gameService'); // ---- game service
//    console.log(userAuth.dummy);process.exit()
module.exports = {
    // ------- Module -------
    Sequelize,
    // ------- base service functions -------
    constants,
    Op,
    // ------- Middleware -------
    request,
    // ------- helper function -------
    // ------- Define models -------
    userModel,
    gameModel,
    // ------- Define services -------
    userService,
    gameService
};