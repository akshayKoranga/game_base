
let {
    //-------module------------------
    // ------- base service functions -------
    Sequelize,
    Op,
    constants,
    // ------- Middleware -------
    request,
    // ------- helper function -------
    // ------- Define models -------
    gameModel,
    // ------- Define services -------
    gameService,

} = require('../../../services');
// let userService = require('../../../services/user/userService');
let gameController = {

    // Add User
    addGame: function (req) {
        try {
            const {
                body
            } = req;
            // Check mandatory params 
            return new Promise((resolve, reject) => {
                if (userModel.userValidations.validateUserSignup(body) === 1) {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve (constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                }
                // Parse req  body
                let userDetails = request.parseRequestBody(body, userModel.userParams);
                //------staticPage parametrs--------------
                userService.addUser(userDetails).then(userAdded => {
                    resolve (constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userAdded, req.params.lang));
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    reject (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                });
            });
        } catch (e) {
            console.log(e);
            let statusCode = new constants.response().SERVER_ERROR;
            return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
        }
    },

    // Update User
    updateGame: function (req) {
        try {
            const {
                body
            } = req;
            // Check mandatory params 
            return new Promise((resolve, reject) => {
                if (userModel.userValidations.validateUserSignup(body) === 1) {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve (constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                }
                // Parse req  body
                let userDetails = request.parseRequestBody(body, userModel.userParams);
                //------staticPage parametrs--------------
                userService.addUser(userDetails).then(userAdded => {
                    resolve (constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userAdded, req.params.lang));
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    reject (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                });
            });
        } catch (e) {
            console.log(e);
            let statusCode = new constants.response().SERVER_ERROR;
            return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
        }
    },

     // Get all User
     getGame: function (req) {
        try {
            const {
                body
            } = req;
            // Check mandatory params 
            return new Promise((resolve, reject) => {
                if (userModel.userValidations.validateUserSignup(body) === 1) {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve (constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                }
                // Parse req  body
                let userDetails = request.parseRequestBody(body, userModel.userParams);
                //------staticPage parametrs--------------
                userService.addUser(userDetails).then(userAdded => {
                    resolve (constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userAdded, req.params.lang));
                }).catch(function (err) {
                    console.log(err);
                    let statusCode = new constants.response().SERVER_ERROR;
                    reject (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                });
            });
        } catch (e) {
            console.log(e);
            let statusCode = new constants.response().SERVER_ERROR;
            return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
        }
    }
};

module.exports = gameController; // Get method global