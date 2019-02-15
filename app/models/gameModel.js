let validator = require('../utils/validators');
// let bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
let sequelize = require('../../db');
let _ = require('underscore');

//const sequelize = require('../../DB/db_sequelize.js');


// User Table columns
let gameParams = [{
        key: 'game_first_name',
        required: true,
        default: ''
    },
    {
        key: 'game_last_name',
        required: false,
        default: ''
    },
    {
        key: 'game_phone_no',
        required: false,
        default: ''
    },
    {
        key: 'game_timezone',
        required: false,
        default: ''
    },
    {
        key: 'game_device_type',
        required: false,
        default: 2
    },
    {
        key: 'game_device_token',
        required: false,
        default: ''
    },
    {
        key: 'game_profile_pic',
        required: false,
        default: ''
    },
    {
        key: 'game_lat',
        required: false,
        default: 0
    },
    {
        key: 'game_long',
        required: false,
        default: 0
    },
    {
        key: 'game_phone_code',
        required: false,
        default: 0
    }
];


let gameValidations = {
    // Signup Fields validation
    validateUserSignup: (body) => {
        let mandatoryParams = _.where(gameParams, {
            required: true
        }).map(obj => obj.key);
        var flag = validator.checkForEmptyFields(body, mandatoryParams);
        if (flag === 1) {
            return flag;
        }
        // flag = validator.isEmailValid(body.game_email); // && validator.isValidLatitude && validator.isValidLongitude;
        return flag;
    },

    // Login fields validation
    validateUserLogin: (body) => {
        let mandatoryParams = ['game_email', 'game_password'];
        var flag = validator.checkForEmptyFields(body, mandatoryParams);
        if (flag === 1) {
            return flag;
        }
        flag = validator.isEmailValid(body.game_email);
        return flag;
    }

};


const tableName = 'selfie_fight_game';


const hooks = {
    // let hashPwd = bcrypt.hashSync(password);
    beforeCreate(game) {
        //        game.game_password = bcrypt.hashSync(game.dataValues.game_password); // eslint-disable-line no-param-reassign
    },
};
const UserSchema = sequelize.define('User', {
    game_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    game_created_on: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    // game_updated_on: {
    //     type: Sequelize.DATE(3),
    //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    // },
    game_first_name: Sequelize.STRING,
    game_last_name: Sequelize.STRING,
    game_lat: Sequelize.DOUBLE,
    game_long: Sequelize.DOUBLE,
    game_timezone: Sequelize.STRING,
    game_social_sign_type: Sequelize.INTEGER,
    game_social_sign_id: Sequelize.STRING,
}, {
    hooks,
    timestamps: false,
    tableName
});



module.exports.gameParams = gameParams;
module.exports.gameValidations = gameValidations;
module.exports.UserSchema = UserSchema;
module.exports.dummy = 'UserSchema';