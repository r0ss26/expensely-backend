'use strict';

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var awsAccessKey = process.env.AWS_KEY;
var awsSecret = process.env.AWS_SECRET;
var bucketName = process.env.BUCKET_NAME;

//Configure storage on S3
var s3 = new _awsSdk2.default.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecret,
    region: 'ap-southeast-2'
});

//set destination and filename
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// })

// Check File Type
//define filter for multer uploads
var fileFilter = function fileFilter(req, file, cb) {
    console.log(file);
    //reject file if not jpeg or png or jpg or gif
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
    }
};

// const imageFilter = (req, file, cb) => {
//     // accept image only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };


//configure multer for uploading multiple files (max 4)
var upload = (0, _multer2.default)({
    //storage: storage,
    storage: (0, _multerS2.default)({
        s3: s3,
        bucket: bucketName,
        acl: "public-read",
        metadata: function metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function key(req, file, cb) {
            // console.log("file", file)
            //cb(null, Date.now().toString() + '-' + file.originalname)
            cb(null, Date.now().toString() + '-' + _path2.default.extname(file.originalname));
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 5 MB
    fileFilter: fileFilter

});

module.exports = upload;
//# sourceMappingURL=upload.js.map