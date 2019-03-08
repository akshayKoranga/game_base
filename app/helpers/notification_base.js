function sendPush(device_token, payload_obj) {
    let FCM = require('fcm-node');
    const serverKey = '';
    const fcm = new FCM(serverKey);
    var result = JSON.stringify(payload_obj);
    var result = payload_obj;

    const message = {
        to: device_token,
        data: result,
        priority: 'high'
    };

    //callback style
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("err", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    var value = "success";
    return value;
}

function localNotification(payload_obj) {
    // ------ send local notification ---------------
    var value = "success";
    return value;
}

module.exports = {
    sendPush,
    localNotification
};
