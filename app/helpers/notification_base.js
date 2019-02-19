function sendPush(device_token, payload_obj) {
    let FCM = require('fcm-node');
    const serverKey = 'AAAAb-_MrjU:APA91bHO4tXMtGltgOuQXrRHWKZqM7g4XF-3EF2z4KBZa4q-dFwW6ZtU4xhpHaa2dgk2ONMOrhk9SYuD-5CvehE5gz2TPS_Y1eAO7MAxLRgFo3G_zmzv4nm_KBM7BzN4t4kXbnvXgybr';
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