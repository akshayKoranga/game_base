// // module.exports = function userAuth() {
// userAuth = (function () {

//     let {
//         //-------module------------------
//         // ------- base service functions -------
//         Sequelize,
//         Op,
//         constants,
//         // ------- Middleware -------
//         request,
//         // ------- helper function -------
//         // ------- Define models -------
//         userModel,
//         // ------- Define services -------
//         userService,
//     } = require('../../../services');
//     //userService = require('../../../services/user/userService');



//     // Add user
//     addUser = function (req) {

//         //function addUser(req) {
//         try {
//             const {
//                 body
//             } = req;
//             console.log(userModel.dummy);
//             process.exit()
//             // Check mandatory params 
//             if (userModel.userValidations.validateUserSignup(body) === 1) {
//                 let statusCode = new constants.response().PARAMETER_MISSING;
//                 return (constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
//             }
//             // Parse req  body
//             let userDetails = request.parseRequestBody(body, userModel.userParams);
//             //------staticPage parametrs--------------
//             userService.addUser(userDetails).then(userAdded => {
//                 return (constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userAdded, req.params.lang));
//             }).catch(function (err) {
//                 console.log(err);
//                 let statusCode = new constants.response().SERVER_ERROR;
//                 return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
//             });
//         } catch (e) {
//             console.log(e);
//             let statusCode = new constants.response().SERVER_ERROR;
//             return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
//         }
//     }
//     let dummy = 'aaaa'
//     //  function dummy () {
//     //     return 1
//     //     console.log('yayaya ');
//     //     process.exit()
//     // }

//     // }
// })();
// // userAuth()
// // userAuth().dummy()
// console.log(userAuth.dummy);process.exit()
// module.exports = userAuth; // Get method global














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
    userModel,
    // ------- Define services -------
    userService,

} = require('../../../services');
// let userService = require('../../../services/user/userService');
let userAuth = {

    // Add User
    addUser: function (req) {
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
    updateUser: function (req) {
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
     getAllUser: function (req) {
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

    // Get user profile
    userProfile: function (req) {
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

    dummy: 'kyya'
};

module.exports = userAuth; // Get method global