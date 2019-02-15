let _ = require('underscore');
let Promise = require('bluebird');

parseRequestBody = (body, paramsArr) => {
    let keys = paramsArr.map(obj => obj.key);
    var requestBody = {};
    keys.forEach(key => {
        body[key] === undefined || body[key] == '' ? requestBody[key] = _.findWhere(paramsArr, {
            key: key
        }).default : requestBody[key] = body[key];
    });
    return requestBody;
};

module.exports.parseRequestBody = parseRequestBody;