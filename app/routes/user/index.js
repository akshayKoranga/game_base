let express = require('express');

module.exports = function users() {
    // var Upload = upload.fields([{
    //     name: 'user_profile_pic'
    // }]);
    let api = express.Router();
    let upload = require('../../middleware/storage')('selfie_fight');

    let userAuth = require('./controller/user_auth');

    // -----------------------define all dependencies -----------------



    // ****************** Insert user ****************** */
    api.post('/:lang/register', upload.fields([{
        name: 'user_profile_pic'
    }]), async (req, res) => {
        return userAuth.addUser(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });


    // ****************** Login user ****************** */
    api.post('/:lang/login', async (req, res) => {
        return userAuth.loginUser(req).then(data => {
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
    api.put('/:lang/update_user', upload.fields([{
        name: 'user_profile_pic'
    }]), async (req, res) => {
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

    // ****************** Find user ****************** */
    api.get('/:lang/search_profile', async (req, res) => {
        return userAuth.userProfile(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });



    return api;
};