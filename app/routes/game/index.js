let express = require('express');

module.exports = function users(io) {

    let api = express.Router();

    let gameController = require('./controller/game_controller');
    let socketUsers = {};
    // -----------------------define all dependencies -----------------

    io.on('connection', (socket) => {
        socket.on('addUser', (userID) => {
            socketUsers[userID] = socket;
        });
        //==============send challnges ===========
        socket.on('sendChallange', (gameAdded) => {
            let userSocket = socketUsers[userID];

            var message = {
                user_id: 'gameAdded.user_id',
                user_first_name: 'gameAdded.user_first_name',
                meassge: 'user_first_name' + 'challange you to play game'
            }
            userSocket.emit('Msg', message);
        });
    });
    //==============send challnges ===========


    // ****************** Insert game ****************** */
    api.put('/:lang/add_game', async (req, res, io) => {
        return gameController.addGame(req, io).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });


    api.put('/:lang/update_game', async (req, res) => {
        return gameController.updateGame(req, io).then(data => {
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
    api.put('/:lang/update_game', async (req, res) => {
        return gameController.updateGame(req, io).then(data => {
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