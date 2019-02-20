let express = require('express');

module.exports = function users() {

    let api = express.Router();

    let gameController = require('./controller/game_controller');

    // -----------------------define all dependencies -----------------



    // ****************** Insert game ****************** */
    api.post('/:lang/add_game', async (req, res) => {
        return gameController.addGame(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });


    // ****************** Get all game ****************** */
    api.get('/:lang/all_user_game', async (req, res) => {
        return gameController.userGame(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });

    // ****************** update game ****************** */
    api.post('/:lang/update_game', async (req, res) => {
        return gameController.updateGame(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });

    // ****************** Get single game ****************** */
    api.get('/:lang/single_game', async (req, res) => {
        return gameController.getGame(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });



    return api;
};