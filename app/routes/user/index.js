let express = require('express');

module.exports = function users() {

    let api = express.Router();

    let userAuth = require('./controller/user_auth');

    // -----------------------define all dependencies -----------------



    // ****************** Insert user ****************** */
    api.post('/:lang/register', async (req, res) => {
        return userAuth.addUser(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });


    // ****************** Get all user ****************** */
    api.get('/:lang/all_user', async (req, res) => {
        return userAuth.getAllUser(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });

    // ****************** update user ****************** */
    api.put('/:lang/update_user', async (req, res) => {
        return userAuth.updateUser(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });

    // ****************** Get single user ****************** */
    api.get('/:lang/user_profile', async (req, res) => {
        return userAuth.userProfile(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });



    return api;
};