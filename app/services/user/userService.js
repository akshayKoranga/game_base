let Sequelize = require('../../../db');
const Op = Sequelize.Op;
const userModel = require('../../models/user'); // ---- user service


let userService = {

    // Add user
    addUser: (userDetail) => {
        return new Promise((resolve, reject) => {
            userModel.UserSchema.create(userDetail).then(function (data) { //------ successfully created
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },

    // update user
    updateUser: (updateData, condition) => {
        return new Promise((resolve, reject) => {
            userModel.UserSchema.update(updateData, {
                where: condition
            }).then(function (data) {
                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },

    // Find single row
    findUser: (condition) => {
        return new Promise((resolve, reject) => {
            userModel.UserSchema.findOne({
                where: condition,
            }).then(function (data) {
                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },

    // Find multiple rows
    findMultipleUser: (condition) => {
        return new Promise((resolve, reject) => {
            userModel.UserSchema.findAll({
                attributes: {
                    exclude: ["user_password"]
                },
                where: condition,
            }).then(function (data) {
                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },

    // Find multiple rows by simple limit paging
    findUserByPaging: (condition, order, limit) => {
        return new Promise((resolve, reject) => {
            userModel.UserSchema.findAll({
                attributes: {
                    exclude: ["user_password"]
                },
                where: condition,
                order: order,
                limit: limit,
            }).then(function (data) {
                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },

    // Delete rows
    deleteUser: (condition) => {
        return new Promise((resolve, reject) => {
            userModel.UserSchema.destroy({
                where: condition
            }).then(function (data) {
                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },
    // Delete rows
    getMultipleColor: (condition) => {
        return new Promise((resolve, reject) => {
            userModel.colorSchema
                .findAll({
                    where: condition,
                }).then(function (data) {
                    resolve(data);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    // Get count of user
    getOnBoardCountUser: () => {
        return new Promise((resolve, reject) => {
            Sequelize.query("SELECT (SELECT COUNT(*) FROM tbl_user WHERE DATE(user_created_on) > (NOW() - INTERVAL 7 DAY))as seven_days,(SELECT COUNT(*) FROM tbl_user WHERE DATE(user_created_on) > (NOW() - INTERVAL 1 DAY)) as today_user ,(SELECT COUNT(*) FROM tbl_user) as total_user", { // raw query for plain object 
                replacements: [],
                type: Sequelize.QueryTypes.SELECT
                //-- default sucess meassge 
            }).then(function (result) {
                resolve(result)
            }).catch(err => {
                reject(err)
            });
        });
    },
};

module.exports = userService; // Get method global