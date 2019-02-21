let express = require('express');

module.exports = function game(io) {

    let api = express.Router();

    let gameController = require('./controller/game_controller');
    let socketUsers = {};
    // -----------------------define all dependencies -----------------

    io.on('connection', (socket) => {
        console.log('SerVer CONNECTED')
        socket.on('addUser', (userID) => {
            console.log(userID, 'userID');
            socketUsers[userID] = socket;
            console.log(socketUsers)
        });
        //==============send challnges ===========
        socket.on('sendChallenge', (gameAdd) => {
            console.log(gameAdd, 'gameReq');
            let message = {
                game_user_by: gameAdd.game_user_by,
                game_user_with: gameAdd.game_user_with,
                meassge: 'user_first_name' + 'challange you to play game'
            }
            let userSocket = socketUsers[gameAdd.game_user_by];
            userSocket.emit('Msg', message);
            let sendReq = {};
            sendReq.body = message
            gameController.addGame(sendReq);
        });
        //==============send Challenge ===========

        //============== accept Challenge ===========
        socket.on('acceptChallange', (gameReq) => {
            let userSocket = socketUsers[userID];

            var message = {
                user_id: 'gameAdded.user_id',
                user_first_name: 'gameAdded.user_first_name',
                meassge: 'user_first_name' + 'challange you to play game'
            }
            userSocket.emit('Msg', message).then(data => {
                akn(message)
            })
        });
        //============== accept Challenge ===========
    });


    // ****************** Insert game ****************** */
    api.put('/:lang/add_game', async (req, res) => {
        return gameController.addGame(req).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
    });


    api.put('/:lang/update_game', async (req, res) => {
        return gameController.updateGame(req).then(data => {
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
    // api.put('/:lang/update_game', async (req, res) => {
    //     return gameController.updateGame(req, io).then(data => {
    //         return res.json(data);
    //     }).catch(err => {
    //         return res.json(err);
    //     })
    // });

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