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
                    resolve(constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                } else {
                    // Parse req  body
                    let userDetails = request.parseRequestBody(body, userModel.userParams);
                    let condition = {
                        user_social_sign_id: userDetails.user_social_sign_id,
                        user_social_sign_type: userDetails.user_social_sign_type
                    };
                    userService.findUser(condition).then(userData => {
                        if (userData) {
                            let statusCode = new constants.response().VALUE_NOT_UNIQUE;
                            return resolve(constants.response.sendFailure('ALREADY_EXIST', req.params.lang, statusCode));
                        } else {
                            //------staticPage parametrs--------------
                            userService.addUser(userDetails).then(userAdded => {
                                resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userAdded, req.params.lang));
                            }).catch(function (err) {
                                console.log(err);
                                let statusCode = new constants.response().SERVER_ERROR;
                                reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                            });
                        }
                    }).catch(function (err) {
                        console.log(err);
                        let statusCode = new constants.response().SERVER_ERROR;
                        reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                    });
                }
            });
        } catch (e) {
            console.log(e);
            let statusCode = new constants.response().SERVER_ERROR;
            return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
        }
    },


    // Login User
    loginUser: function (req) {
        try {
            let user_social_sign_id = req.body.user_social_sign_id ? req.body.user_social_sign_id : '';
            let user_social_sign_type = req.body.user_social_sign_type ? req.body.user_social_sign_type : '';
            // Check mandatory params 
            return new Promise((resolve, reject) => {
                if (user_social_sign_id.trim() == '' || user_social_sign_type.trim() == '') {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve(constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                } else {
                    // Parse req  body
                    let condition = {
                        user_social_sign_id,
                        user_social_sign_type
                    };
                    userService.findUser(condition).then(userData => {
                        if (userData) {
                            resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userData, req.params.lang));
                        } else {
                            let statusCode = new constants.response().NOT_FOUND;
                            return resolve(constants.response.sendFailure('INVAILD_USER_CRUD', req.params.lang, statusCode));
                        }
                    }).catch(function (err) {
                        console.log(err);
                        let statusCode = new constants.response().SERVER_ERROR;
                        reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                    });
                }
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
            let user_id = req.body.user_id ? req.body.user_id : '';

            // Check mandatory params 
            return new Promise((resolve, reject) => { 
                if (user_id.trim() == '') {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve(constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                } else {
                    // Parse req  body
                    let condition = {
                        user_id
                    };
                    userService.findUser(condition).then(objectData => {
                        if (objectData) {
                            let user_first_name = req.body.user_first_name ? req.body.user_first_name : objectData.user_first_name;
                            let user_last_name = req.body.user_last_name ? req.body.user_last_name : objectData.user_last_name;
                            let user_timezone = req.body.user_timezone ? req.body.user_timezone : objectData.user_timezone;
                            let user_device_type = req.body.user_device_type ? req.body.user_device_type : objectData.user_device_type;
                            let user_device_token = req.body.user_device_token ? req.body.user_device_token : objectData.user_device_token;
                            let user_lat = req.body.user_lat ? req.body.user_lat : objectData.user_lat;
                            let user_long = req.body.user_long ? req.body.user_long : objectData.user_long;

                            let updateData = { // update query
                                user_first_name,
                                user_last_name,
                                user_timezone,
                                user_device_type,
                                user_device_token,
                                user_lat,
                                user_long
                            };
                            userService.updateUser(updateData, condition).then(objectData => {
                                userService.findUser(condition).then(UpdatedData => {
                                    resolve(constants.response.sendSuccess('UPDATE_PROFILE_SUCCESS', UpdatedData, req.params.lang));
                                    //-------------- NOt found or bad req
                                }).catch(err => {
                                    let statusCode = new constants.response().BAD_REQUEST;
                                    resolve(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode))
                                })
                                //--------------- Unable to update 
                            }).catch(function (err) {
                                console.log(err);
                                let statusCode = new constants.response().BAD_REQUEST;
                                reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                            });
                        } else {
                            let statusCode = new constants.response().NOT_FOUND;
                            resolve(constants.response.sendFailure('INVAILD_USER_CRUD', req.params.lang, statusCode));
                        }
                    }).catch(function (err) {
                        console.log(err);
                        let statusCode = new constants.response().SERVER_ERROR;
                        reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                    });
                }
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
            let user_id = req.query.user_id ? req.query.user_id : '';

            // Check mandatory params 
            return new Promise((resolve, reject) => {
                if (user_id.trim() == '') {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve(constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                } else {
                    // Parse req  body
                    let condition = {
                        user_id
                    };
                    userService.findUser(condition).then(userData => {
                        if (userData) {
                            resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userData, req.params.lang));
                        } else {
                            let statusCode = new constants.response().NOT_FOUND;
                            resolve(constants.response.sendFailure('INVAILD_USER_CRUD', req.params.lang, statusCode));
                        }
                    }).catch(function (err) {
                        console.log(err);
                        let statusCode = new constants.response().SERVER_ERROR;
                        reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                    });
                }
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
            let user_id = req.query.user_id ? req.query.user_id : '';
            // Check mandatory params 
            return new Promise((resolve, reject) => {
                if (user_id.trim() == '') {
                    let statusCode = new constants.response().PARAMETER_MISSING;
                    resolve(constants.response.sendFailure('MANDATORY_PARAMETER_MISSING', req.params.lang, statusCode));
                } else {
                    // Parse req  body
                    let condition = {
                        user_id
                    };
                    userService.findUser(condition).then(userData => {
                        if (userData) {
                            resolve(constants.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', userData, req.params.lang));
                        } else {
                            let statusCode = new constants.response().NOT_FOUND;
                            resolve(constants.response.sendFailure('INVAILD_USER_CRUD', req.params.lang, statusCode));
                        }
                    }).catch(function (err) {
                        console.log(err);
                        let statusCode = new constants.response().SERVER_ERROR;
                        reject(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
                    });
                }
            });
        } catch (e) {
            console.log(e);
            let statusCode = new constants.response().SERVER_ERROR;
            return (constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
        }
    },
};

module.exports = userAuth; // Get method global