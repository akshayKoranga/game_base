// let validator = require('../../validators');
// let bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
let sequelize = require('../../db');
let _ = require('underscore');

//const sequelize = require('../../DB/db_sequelize.js');


// User Table columns
let userParams = [{
        key: 'user_first_name',
        required: true,
        default: ''
    },
    {
        key: 'user_last_name',
        required: false,
        default: ''
    },
    {
        key: 'user_email',
        required: true,
        default: ''
    },
    {
        key: 'user_password',
        required: true,
        default: ''
    },
    {
        key: 'user_phone_no',
        required: false,
        default: ''
    },
    {
        key: 'user_timezone',
        required: false,
        default: ''
    },
    {
        key: 'user_device_type',
        required: false,
        default: 2
    },
    {
        key: 'user_device_token',
        required: false,
        default: ''
    },
    {
        key: 'user_verification_status',
        required: false,
        default: 1
    },
    {
        key: 'user_profile_pic',
        required: false,
        default: ''
    },
    {
        key: 'user_lat',
        required: false,
        default: 0
    },
    {
        key: 'user_long',
        required: false,
        default: 0
    },
    {
        key: 'user_phone_code',
        required: false,
        default: 0
    }
];


// const User = sequelize.define('tbl_user', {
//     user_email: Sequelize.STRING,
//     user_first_name: Sequelize.STRING,
//     user_last_name: Sequelize.STRING,
//     user_password: Sequelize.STRING,
//     user_lat: Sequelize.DOUBLE,
//     user_long: Sequelize.DOUBLE,
//     user_timezone: Sequelize.STRING,
//     user_address: Sequelize.STRING,
//     user_city: Sequelize.STRING,
//     user_state: Sequelize.STRING,
//     user_country: Sequelize.STRING,
//     user_zipcode: Sequelize.STRING,
//     user_phone_no: Sequelize.STRING,
//     user_social_sign_type: Sequelize.INTEGER,
//     user_social_sign_id: Sequelize.STRING,
//     user_device_type: Sequelize.ENUM('iOS', 'Android', 'Web'),
//     user_device_token: Sequelize.STRING,
//     user_profile_pic: Sequelize.STRING,
//     user_verification_status: Sequelize.ENUM('Not verified', 'Verified'),
//     user_status: Sequelize.INTEGER,
//     user_updated_on: Sequelize.TIMESTAMP,
//     user_created_on: Sequelize.NOW
//     // username: Sequelize.STRING,
//     // birthday: Sequelize.DATE
// });

let userValidations = {
    // Signup Fields validation
    validateUserSignup: (body) => {
        let mandatoryParams = _.where(userParams, {
            required: true
        }).map(obj => obj.key);
        var flag = validator.checkForEmptyFields(body, mandatoryParams);
        if (flag === 1) {
            return flag;
        }
        flag = validator.isEmailValid(body.user_email); // && validator.isValidLatitude && validator.isValidLongitude;
        return flag;
    },

    // Login fields validation
    validateUserLogin: (body) => {
        let mandatoryParams = ['user_email', 'user_password'];
        var flag = validator.checkForEmptyFields(body, mandatoryParams);
        if (flag === 1) {
            return flag;
        }
        flag = validator.isEmailValid(body.user_email);
        return flag;
    }

};


const tableName = 'selfie_fight_user';


const hooks = { 
    // let hashPwd = bcrypt.hashSync(password);
    beforeCreate(user) {
//        user.user_password = bcrypt.hashSync(user.dataValues.user_password); // eslint-disable-line no-param-reassign
    },
};
const UserSchema = sequelize.define('User', {
    user_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    user_created_on: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    // user_updated_on: {
    //     type: Sequelize.DATE(3),
    //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    // },
    user_first_name: Sequelize.STRING,
    user_last_name: Sequelize.STRING,
    user_lat: Sequelize.DOUBLE,
    user_long: Sequelize.DOUBLE,
    user_timezone: Sequelize.STRING,
    user_social_sign_type: Sequelize.INTEGER,
    user_social_sign_id: Sequelize.STRING,
    user_device_type: Sequelize.ENUM('iOS', 'Android', 'Web'),
    user_device_token: Sequelize.STRING,
    user_profile_pic: Sequelize.STRING,
    user_verification_status: Sequelize.ENUM('Not verified', 'Verified'),
    user_status: Sequelize.INTEGER,
    user_is_deleted: Sequelize.SMALLINT,
}, {
    hooks,
    timestamps: false,
    tableName
});



module.exports.userParams = userParams;
module.exports.UserSchema = UserSchema;