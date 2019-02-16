let validator = require('../utils/validators');
// let bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
let sequelize = require('../../db');
let _ = require('underscore');

// Game Table columns
let gameParams = [{
        key: 'game_user_by',
        required: true,
        default: 0
    },
    {
        key: 'game_user_with',
        required: true,
        default: 0
    },
    {
        key: 'game_user_won',
        required: true,
        default: 0
    },
    {
        key: 'game_user_lost',
        required: true,
        default: 0
    },
    {
        key: 'game_status',
        required: false,
        default: 1
    },
];


let gameValidations = {
    // Game Fields validation
    validategame: (body) => {
        let mandatoryParams = _.where(gameParams, {
            required: true
        }).map(obj => obj.key);
        var flag = validator.checkForEmptyFields(body, mandatoryParams);
        if (flag === 1) {
            return flag;
        }
        return flag;
    }
};

function gameSchema() {


    const tableName = 'selfie_fight_game';

    return gameSchema = sequelize.define('Game', {
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
        game_user_by: Sequelize.INTEGER,
        game_user_with: Sequelize.INTEGER,
        game_user_won: Sequelize.INTEGER,
        game_user_lost: Sequelize.INTEGER,
        game_status: Sequelize.TINYINT,
    }, {
        timestamps: false,
        tableName
    });
}


module.exports.gameParams = gameParams;
module.exports.gameValidations = gameValidations;
module.exports.gameSchema = gameSchema();