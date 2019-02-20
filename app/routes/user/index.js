let express = require('express');

module.exports = function users(io) {
    // console.log(io);process.exit()
    // var Upload = upload.fields([{
    //     name: 'user_profile_pic'
    // }]);
    let api = express.Router();
    let upload = require('../../middleware/storage')('selfie_fight');

    let userAuth = require('./controller/user_auth');

    // -----------------------define all dependencies -----------------


    // ================sockets events are here =========================
    // io.on('connection', (socket) => {


    //     socket.on('addUser', (userID) => {
    //         socketUsers[userID] = socket;
    //     });

    //     socket.on('chatMessage', (chatID, sender, receiver) => {

    //         let msg = new Message({
    //             chat: chatID,
    //             time: moment().local().valueOf(),
    //             sender: sender,
    //             receiver: receiver,
    //         });

    //         let allUsers = [];
    //         allUsers.push(sender);
    //         allUsers.push(receiver);

    //         console.log("allUsers")
    //         console.log(allUsers)
    //         console.log("allUsers")
    //         console.log(senderRole)
    //         console.log("senderRole")
            

    //         allUsers.forEach((user) => {

    //             let userSocket = socketUsers[user];
    //             if (userSocket !== undefined) {


    //                 Chat.findById(msg.chat, (err, chat) => {
    //                     if (err) {
    //                         console.log('Request Unsuccessful!' + err);
    //                     } else {
    //                         if (!chat) {
    //                             console.log('Invalid ChatID');
    //                         } else {

    //                             for (var i = 0; i < chat.removeChat.length; i++) { 
    //                                 chat.removeChat.pop();
    //                             }

    //                             for (var i = 0; i < chat.deleteChat.length; i++) {
    //                                 chat.deleteChat.pop();
    //                             }

    //                             chat.lastMsg = message;
    //                             chat.lastMsgTime = moment().local().valueOf();
    //                             chat.lastMsgType = type;
    //                             chat.lastMsgSender = sender;
    //                             //chat.fullName = fullName;
    //                             chat.userPic = userPic;

    //                             userSocket.emit('newMessage', msg);


    //                             msg.save((err) => {
    //                                 if (err) {
    //                                     console.log(err);
    //                                 } else {
    //                                     chat.lastMsgID = msg._id;
    //                                     chat.save(err => {
    //                                         if (err) {
    //                                             console.log(err);
    //                                         }
    //                                     });

    //                             // ---notification 
    //                                 var pushMessage = "has sent you a message";
    //                                 console.log("pushMessage")
    //                                 console.log("pushMessage")
    //                                 console.log(pushMessage);
    //                                 console.log("pushMessage")
    //                                 console.log("pushMessage")
    //                                 if(senderRole  == 1 || senderRole == "1"){
    //                                     Account.findById(sender, (err, senderInfo) => {
    //                                     if (err) {
    //                                         console.log(err);
    //                                     } else {

    //                                         AccountMember.findById(receiver, (err, receiverInfo) => {
    //                                             if (err) {
    //                                                 console.log(err);
    //                                             } else {
    //                                                 receiverInfo.badge = receiverInfo.badge + 1;
    //                                                 var pushResponse = require('./msgNotify')(receiverInfo, senderInfo, chatID,  pushMessage, "3");

    //                                                 receiverInfo.save(err => {
    //                                                     if (err) {
    //                                                         console.log({ success: 0, message: 'Request unsuccessful of badge', error: err });
    //                                                     }
    //                                                 });
    //                                             }
    //                                         });
    //                                     }
    //                                 });
    //                                 }
    //                                 else {
    //                                     AccountMember.findById(sender, (err, senderInfo) => {
    //                                     if (err) {
    //                                         console.log(err);
    //                                     } else {

    //                                         Account.findById(receiver, (err, receiverInfo) => {
    //                                             if (err) {
    //                                                 console.log(err);
    //                                             } else {
    //                                                 receiverInfo.badge = receiverInfo.badge + 1;
    //                                             var pushResponse = require('./msgNotify')(receiverInfo, senderInfo, chatID,  pushMessage, "3");

                                                    
    //                                                 receiverInfo.save(err => {
    //                                                     if (err) {
    //                                                         console.log({ success: 0, message: 'Request unsuccessful of badge', error: err });
    //                                                     }
    //                                                 });
    //                                             }
    //                                         });
    //                                     }
    //                                 });
    //                                 }    
    //                                 }
    //                             });

    //                         }
    //                     }
    //                 });
    //             }
    //         });
    //     });

    //     // //is typing

    //     socket.on('isTyping', (user, chatID) => {

    //         Chat.findById(chatID, (err, chat) => {

    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 if (!chat) {
    //                     console.log('Invalid ChatId');
    //                 } else {

    //                     chat.users.forEach(userr => {
    //                         var userSockett = socketUsers[userr];
    //                         if (userr !== user) {

    //                             if (userSockett !== undefined) {
    //                                 var data = {};
    //                                 data.string = user + ' typing..';
    //                                 // data.userID = user;
    //                                 data.name = user;
    //                                 data.chatID = chatID;
    //                                 userSockett.emit('typing', data);
    //                             }
    //                         }
    //                     });

    //                 }

    //             }
    //         });
    //     });


    //     //==============read meassges ===========

    //     socket.on('msgRead', (userID, chatID, msgID) => {
    //         Message.findById(msgID, (err, message) => {
    //             if (err) {} else {
    //                 var userSocket = socketUsers[userID];
    //                 if (message.status === 2) {
    //                     if (userSocket !== undefined) {
    //                         userSocket.emit('Msg', message);
    //                     }
    //                 } else {
    //                     if (message.sender === userID) {
    //                         if (userSocket !== undefined) {
    //                             userSocket.emit('Msg', message);
    //                         }
    //                     } else {
    //                         message.status = 2;
    //                         message.save(err => {
    //                             if (err) {} else {

    //                                 Chat.findById(chatID, (err, chat) => {
    //                                     if (err) {
    //                                         console.log('error in msgRead3', err);
    //                                     } else {
    //                                         chat.users.forEach(user => {
    //                                             var userSockett = socketUsers[user];
    //                                             if (userSockett !== undefined) {
    //                                                 userSockett.emit('Msg', message);
    //                                             }
    //                                         });
    //                                     }
    //                                 });
    //                             }
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //     });

    //     //msg delivered

    //     socket.on('msgDelivered', (userID, chatID, msgID) => {
    //         var userSocket = socketUsers[userID];

    //         Message.findById(msgID, (err, message) => {
    //             if (err) {} else {
    //                 if (message.status === 2 || message.status === 3) {
    //                     userSocket.emit('msgDeliveredSuccess', message);
    //                 } else {
    //                     if (message.sender === userID) {
    //                         userSocket.emit('msgDeliveredSuccess', message);
    //                     } else {
    //                         message.status = 2;
    //                         message.save(err => {
    //                             if (err) {} else {
    //                                 Chat.findById(chatID, (err, chat) => {
    //                                     if (err) {
    //                                         console.log('error in msg delivered 3', err);
    //                                     } else {
    //                                         chat.users.forEach(user => {
    //                                             var userSockett = socketUsers[user];
    //                                             userSockett.emit('msgDeliveredSuccess', message);
    //                                         });
    //                                     }
    //                                 });
    //                             }
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //     });

    //     //end of msg delivered
    // });
    // ================End of sockets events =========================

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

    // ****************** update user ******************* */
    api.post('/:lang/update_user', upload.fields([{
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