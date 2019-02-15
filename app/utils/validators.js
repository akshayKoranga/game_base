
class validateRequestData {
    static checkForEmptyFields (paramObj, mandatoryFieldsArr) {
        var isEmpty = 0;
        if (Object.keys(paramObj).length < mandatoryFieldsArr.length) {
            isEmpty = 1;
            return isEmpty;
        }
        mandatoryFieldsArr.forEach(element => {
            if (paramObj[element] === undefined || paramObj[element] === '') {
                isEmpty = 1;

            }
        });
        return isEmpty;
    }

    static isEmailValid (email) {
        if (email === '') {
            return 0;
        }
        let regex =/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    static isValidLongitude (point) {
        let regex = /^[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/g;
        return regex.test(point);
    }
    static isValidLatitude (point) {
        let regex = /^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?)$/g;
        return regex.test(point);
    }
}



module.exports = validateRequestData;
