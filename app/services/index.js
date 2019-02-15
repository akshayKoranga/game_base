// let allServices = (function () {
    // ----------------- Define Module -----------------
let Promise = require('bluebird'),
    _ = require('underscore'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs'),
    fs = require('fs'),
    Sequelize = require('../../db'),
    Op = Sequelize.Op,
    // ----------------- model -----------------
    userModel = require('../models/user'), // ---- user service
    // ----------------- Services -----------------
    userService = require('./user/userService'); // ---- user service



module.exports = {
    // ------- Module -------
    Sequelize,
    // ------- base service functions -------
    Op,
    // ------- Middleware -------
    // ------- helper function -------
    // ------- Define models -------
    userModel,
    // ------- Define services -------
    userService,
};