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
            let userSocketTo = socketUsers[gameAdd.game_user_with];
            let sendReq = {}
            sendReq.params = {};
            sendReq.body = message;
            sendReq.params.lang = 'en';
            gameController.addGame(sendReq).then(data => {
                userSocket.emit('Msg', data)
                userSocketTo.emit('Msg', data)
            }).catch(err => {
                userSocket.emit('Msg', err);
                userSocketTo.emit('Msg', err)

            })

        });
        //==============send Challenge ===========

        //============== accept Challenge ===========
        socket.on('acceptChallange', (updateReq) => {
            //console.log(updateReq.game_user_with);process.exit()
            let userSocketTo = socketUsers[updateReq.game_user_with];
            let userSocket = socketUsers[updateReq.game_user_by];
            // console.log(userSocketTo);process.exit()
            var updateObj = {
                game_status: updateReq.game_status,
                game_id: updateReq.game_id,
                game_bet: updateReq.game_bet
            }
            let sendReq = {}
            sendReq.params = {};
            sendReq.body = updateObj;
            sendReq.params.lang = 'en';
            gameController.updateGame(sendReq).then(data => {
                console.log(data, 'dddddaaaaatttttttaaa')
                userSocket.emit('UpdateMsg', data);
                userSocketTo.emit('UpdateMsg', data);
            }).catch(err => {
                userSocket.emit('UpdateMsg', err);
                userSocketTo.emit('UpdateMsg', err);
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