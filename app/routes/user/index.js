let express = require('express');

module.exports = function users() {

    let api = express.Router();
    let userAuth = require('./controller/user_auth');

    // -----------------------define all dependencies -----------------



    //=======================================================================================================//
    //*
    //*                                 Insert user (Post)
    //*                          Desc = This Api Insert new user   
    //========================================================================================================//
    api.post('/:lang/register', async (req, res) => {
        try {
            let yoo = userAuth.addUser(0)//.then(data => {
                // if (data) {
                //     return res.json("yaataattatatatat");

                // } else {
                //     return res.json("npppppppppp");

                // }
                    return res.json(yoo);

           // })
        } catch (e) {
            console.log(e)
            return res.json("err aa gya phir ab kya kaare bawas");

            console.log(e);
            let statusCode = new constants.response().SERVER_ERROR;
            return res.json(constants.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode));
        }
    });
    //************************************* End of Register user ************************************** */




    return api;
};