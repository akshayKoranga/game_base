let {
    //-------module------------------
    // ------- base service functions -------
    Sequelize,
    Op,
    constants,
    // ------- Middleware -------
    request,
    // ------- helper function -----
    // ------- Define models -------
    gameModel,
    // ------- Define services -------
    gameService,
    userService

} = require('../../../services');


let socketUsers = {};


// Add Game
function addGame(req) {
    try {
        const {
            body
        } = req;
        // Check mandatory params 
        return new Promise((resolve, reject) => {
            if (gameModel.gameValidations.validategame(body) === 1) {
                let statusCode = new constants.response().PARAMETER_MISSING;
                resolve(constants.response.sendSuccess('MANDATORY_PARAMETER_MISSING', statusCode, req.params.lang));
            } else {
                // Parse req  body
                let gameDetails = request.parseRequestBody(body, gameModel.gameParams);
                // -------- check user exist ------
                let userFindCondition = {
                    user_unique_id: gameDetails.game_user_with
                };

                userService.findUser(userFindCondition).then(userData => {
                    if (userData) {
                        gameService.addGame(gameDetails).then(gameAdded => {
                            return resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', gameAdded, req.params.lang));
                        }).catch(function (err) {
                            console.log(err);
                            let statusCode = new constants.response().SERVER_ERROR;
                            return reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                        });
                    } else {
                        console.log('hehererer');
                        let statusCode = new constants.response().NOT_FOUND;
                        return resolve(constants.response.sendSuccess('INVAILD_USER_CRUD', statusCode, req.params.lang));

                    }
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    return reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                });
            }
        });
    } catch (e) {
        console.log(e);
        let statusCode = new constants.response().SERVER_ERROR;
        return (constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
    }
}

// Update Game
function updateGame(req) {
    try {
        let game_id = req.body.game_id ? req.body.game_id : '';
        // Check mandatory params 
        return new Promise((resolve, reject) => {
            if (game_id.trim() == '') {
                let statusCode = new constants.response().PARAMETER_MISSING;
                resolve(constants.response.sendSuccess('MANDATORY_PARAMETER_MISSING', statusCode, req.params.lang));
            } else {
                // Parse req  body
                let condition = {
                    game_id
                };
                gameService.findGame(condition).then(objectData => {
                    if (objectData) {
                        let game_user_won = req.body.game_user_won ? req.body.game_user_won : objectData.game_user_won;
                        let game_user_lost = req.body.game_user_lost ? req.body.game_user_lost : objectData.game_user_lost;
                        let game_status = req.body.game_status ? req.body.game_status : objectData.game_status;
                        let game_bet = req.body.game_bet ? req.body.game_bet : objectData.game_bet;
                        
                        let updateData = { // update query
                            game_user_won,
                            game_user_lost,
                            game_status,
                            game_bet
                        };
                        gameService.updateGame(updateData, condition).then(objectData => {
                            gameService.findGame(condition).then(UpdatedData => {
                                resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', UpdatedData, req.params.lang));
                                //-------------- Not found or bad req
                            }).catch(err => {
                                let statusCode = new constants.response().BAD_REQUEST;
                                resolve(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang))
                            })
                            //--------------- Unable to update 
                        }).catch(function (err) {
                            console.log(err);
                            let statusCode = new constants.response().BAD_REQUEST;
                            reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                        });
                    } else {
                        let statusCode = new constants.response().NOT_FOUND;
                        resolve(constants.response.sendSuccess('INVAILD_USER_CRUD', statusCode, req.params.lang));
                    }
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                });
            }
        })
    } catch (e) {
        console.log(e);
        let statusCode = new constants.response().SERVER_ERROR;
        return (constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
    }
}


// Get single Game
function getGame(req) {
    try {
        let game_id = req.query.game_id ? req.query.game_id : '';

        // Check mandatory params 
        return new Promise((resolve, reject) => {
            if (game_id.trim() == '') {
                let statusCode = new constants.response().PARAMETER_MISSING;
                resolve(constants.response.sendSuccess('MANDATORY_PARAMETER_MISSING', statusCode, req.params.lang));
            } else {
                // Parse req  body
                let condition = {
                    game_id
                };
                gameService.findGame(condition).then(objectData => {
                    if (objectData) {
                        resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', objectData, req.params.lang));
                    } else {
                        let statusCode = new constants.response().NOT_FOUND;
                        resolve(constants.response.sendSuccess('INVAILD_USER_CRUD', statusCode, req.params.lang));
                    }
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                });
            }
        })
    } catch (e) {
        console.log(e);
        let statusCode = new constants.response().SERVER_ERROR;
        return (constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
    }
}

// Get user Games
function userGame(req) {
    try {
        let user_unique_id = req.query.user_unique_id ? req.query.user_unique_id : '';
        // Check mandatory params 
        return new Promise((resolve, reject) => {
            if (user_unique_id.trim() == '') {
                let statusCode = new constants.response().PARAMETER_MISSING;
                resolve(constants.response.sendSuccess('MANDATORY_PARAMETER_MISSING', statusCode, req.params.lang));
            } else {
                // Parse req  body
                let condition = {
                    [Op.or]: [{
                        game_user_by: user_unique_id
                    }, {
                        game_user_with: user_unique_id
                    }],
                    //game_user_by: user_unique_id
                };
                //gameService.getOnBoardCountGame(condition).then(objectData => {
                gameService.findMultipleGame(condition).then(objectData => {
                    if (objectData) {
                        useIdArray = []
                        for (var element of objectData) {
                            useIdArray.push(element.game_user_by);
                            useIdArray.push(element.game_user_with);
                        }
                        let userCondition = {
                            user_unique_id: {
                                [Op.in]: useIdArray,
                            },
                        }
                        userService.findMultipleUser(userCondition).then(userData => {
                            if (userData) {
                                let gameNewArray = [];

                                for (var element of objectData) {
                                    var element = element.get({
                                        plain: true
                                    })
                                    let user_by = userData.filter(function (obj) {
                                        return obj.user_unique_id == element.game_user_by;
                                    });
                                    let user_with = userData.filter(function (obj) {
                                        return obj.user_unique_id == element.game_user_with;
                                    });
                                    element.game_by = user_by[0];
                                    element.game_with = user_with[0];
                                    gameNewArray.push(element)
                                }
                                resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', gameNewArray, req.params.lang));
                            } else {
                                let statusCode = new constants.response().NOT_FOUND;
                                resolve(constants.response.sendSuccess('INVAILD_USER_CRUD', statusCode, req.params.lang));
                            }
                        }).catch(function (err) {
                            console.log(err);
                            let statusCode = new constants.response().SERVER_ERROR;
                            reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                        });
                    } else {
                        let statusCode = new constants.response().NOT_FOUND;
                        resolve(constants.response.sendSuccess('INVAILD_USER_CRUD', statusCode, req.params.lang));
                    }
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    reject(constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
                });
            }
        })
    } catch (e) {
        console.log(e);
        let statusCode = new constants.response().SERVER_ERROR;
        return (constants.response.sendSuccess('DEFAULT_FAILURE_MESSAGE', statusCode, req.params.lang));
    }
}


module.exports = {
    addGame,
    updateGame,
    getGame,
    userGame
};