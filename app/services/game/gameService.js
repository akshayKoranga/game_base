let Sequelize = require('../../../db');
const Op = Sequelize.Op;
const gameModel = require('../../models/gameModel'); // ---- game service


let gameService = {
    // Add game
    addUser: (gameDetail) => {
        return new Promise((resolve, reject) => {
            gameModel.gameSchema.create(gameDetail).then(function (data) { //------ successfully created
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },

    // update game
    updateUser: (updateData, condition) => {
        return new Promise((resolve, reject) => {
            gameModel.gameSchema.update(updateData, {
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
            gameModel.gameSchema.findOne({
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
            gameModel.gameSchema.findAll({
                attributes: {
                    exclude: ["game_password"]
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
            gameModel.gameSchema.findAll({
                attributes: {
                    exclude: ["game_password"]
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
            gameModel.gameSchema.destroy({
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
            gameModel.colorSchema
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

    // Get count of game
    getOnBoardCountUser: () => {
        return new Promise((resolve, reject) => {
            Sequelize.query("SELECT (SELECT COUNT(*) FROM tbl_game WHERE DATE(game_created_on) > (NOW() - INTERVAL 7 DAY))as seven_days,(SELECT COUNT(*) FROM tbl_game WHERE DATE(game_created_on) > (NOW() - INTERVAL 1 DAY)) as today_game ,(SELECT COUNT(*) FROM tbl_game) as total_game", { // raw query for plain object 
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

module.exports = gameService; // Get method global