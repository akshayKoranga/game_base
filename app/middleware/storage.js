let multer = require('multer');
const AWS = require('aws-sdk');
let multerS3 = require('multer-s3');

//***************************************************************************************************************** */
//
//                                    Upload file to s3 bucket using multer
//
//****************************************************************************************************************** */

const BUCKET_NAME = 'swift-spar-local'; // bucket name of s3
const IAM_USER_KEY = 'AKIAIRQ6IPGEKJMAR6BQ'; //  Rajat@emilence s3 key Access id key
const IAM_USER_SECRET = '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'; // Secret Key


let s3 = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
}); // define s3 var with new AWS.S3 object
//===================== export this variable =======================
let upload;
module.exports = (folder) => {
    try {
        upload = multer({
            storage: multerS3({
                s3: s3,
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                bucket: BUCKET_NAME + '/' + folder,
                metadata: function (req, file, cb) {
                    cb(null, {
                        fieldName: file.fieldname
                    });
                },
                key: function (req, file, cb) {
                    cb(null, Date.now().toString() + file.originalname);
                }
            })
        });
    } catch (error) {
        console.log('error occured', error)
    }
    return upload
};