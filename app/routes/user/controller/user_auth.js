
let {
    //-------module------------------
    // ------- base service functions -------
    Sequelize,
    Op,
    // ------- Middleware -------

    // ------- helper function -------
    // ------- Define models -------
    userModel,
    // ------- Define services -------
    userService,

} = require('../../../services');

let userAuth = {


    // Add address
    addUser: function (data) {
        if (data) {
            return true
        } else {
            return false
        }
        // return new Promise((resolve, reject) => {
        //     addressModel.addressSchema.create(addressDetail).then(function (data) { //------ successfully created
        //         resolve(data);
        //     }).catch(err => {
        //         reject(err);
        //     });
        // });
    },
};

module.exports = userAuth; // Get method global