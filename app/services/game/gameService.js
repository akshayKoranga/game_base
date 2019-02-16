let Sequelize = require('../../../db');
const Op = Sequelize.Op;
const gameModel = require('../../models/gameModel'); // ---- game service
const userModel = require('../../models/user'); // ---- user service


let gameService = {
    // Add game
    addGame: (gameDetail) => {
        return new Promise((resolve, reject) => {
            gameModel.gameSchema.create(gameDetail).then(function (data) { //------ successfully created
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },

    // update game
    updateGame: (updateData, condition) => {
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
    findGame: (condition) => {
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
    findMultipleGameWithJoin: (condition) => {
        return new Promise((resolve, reject) => {

            gameModel.gameSchema.belongsTo(userModel.UserSchema, {
                as: 'game_by',
                foreignKey: 'game_user_by'
            });
            gameModel.gameSchema.belongsTo(userModel.UserSchema, {
                as: 'game_with',
                foreignKey: 'game_user_with'
            });
            gameModel.gameSchema.findAll({
                include: [{
                        model: userModel.UserSchema,
                        as: 'game_by',
                        attributes: {
                            exclude: ["user_social_sign_type", "user_social_sign_id"]
                        },
                        //required: true
                    },
                    {
                        model: userModel.UserSchema,
                        as: 'game_with',
                        attributes: {
                            exclude: ["user_social_sign_type", "user_social_sign_id"]
                        },
                        //required: true
                    }
                ],

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
     findMultipleGame: (condition) => {
        return new Promise((resolve, reject) => {

            gameModel.gameSchema.findAll({
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
    findGameByPaging: (condition, order, limit) => {
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
    deleteGame: (condition) => {
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
    getOnBoardCountGame: () => {
        return new Promise((resolve, reject) => {
            Sequelize.query("SELECT `Game`.`game_id`, `Game`.`game_created_on`, `Game`.`game_user_by`, `Game`.`game_user_with`, `Game`.`game_user_won`, `Game`.`game_user_lost`, `Game`.`game_status`, `game_by`.`user_id` AS `game_by.user_id`, `game_by`.`user_created_on` AS `game_by.user_created_on`, `game_by`.`user_first_name` AS `game_by.user_first_name`, `game_by`.`user_last_name` AS `game_by.user_last_name`, `game_by`.`user_lat` AS `game_by.user_lat`, `game_by`.`user_long` AS `game_by.user_long`, `game_by`.`user_timezone` AS `game_by.user_timezone`, `game_by`.`user_device_type` AS `game_by.user_device_type`, `game_by`.`user_device_token` AS `game_by.user_device_token`, `game_by`.`user_profile_pic` AS `game_by.user_profile_pic`, `game_by`.`user_status` AS `game_by.user_status`, `game_by`.`user_is_deleted` AS `game_by.user_is_deleted`, `game_with`.`user_id` AS `game_with.user_id`, `game_with`.`user_created_on` AS `game_with.user_created_on`, `game_with`.`user_first_name` AS `game_with.user_first_name`, `game_with`.`user_last_name` AS `game_with.user_last_name`, `game_with`.`user_lat` AS `game_with.user_lat`, `game_with`.`user_long` AS `game_with.user_long`, `game_with`.`user_timezone` AS `game_with.user_timezone`, `game_with`.`user_device_type` AS `game_with.user_device_type`, `game_with`.`user_device_token` AS `game_with.user_device_token`, `game_with`.`user_profile_pic` AS `game_with.user_profile_pic`, `game_with`.`user_status` AS `game_with.user_status`, `game_with`.`user_is_deleted` AS `game_with.user_is_deleted` FROM `selfie_fight_game` AS `Game` LEFT OUTER JOIN `selfie_fight_user` AS `game_by` ON `Game`.`game_user_by` = `game_by`.`user_id`LEFT OUTER JOIN `selfie_fight_user` AS `game_with` ON `Game`.`game_user_with` = `game_with`.`user_id` WHERE (`Game`.`game_user_by` = '1' OR `Game`.`game_user_with` = '1')", { // raw query for plain object 
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