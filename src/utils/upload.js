import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import path from 'path'
import dotenv from 'dotenv';


dotenv.config();

const awsAccessKey = process.env.AWS_KEY
const awsSecret = process.env.AWS_SECRET
const bucketName = process.env.BUCKET_NAME

//Configure storage on S3
const s3 = new aws.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecret,
    region: 'ap-southeast-2',
})

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
const fileFilter = (req, file, cb) => {
    //console.log(file)
    //reject file if not jpeg or png or jpg or gif
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
    }
}

// const imageFilter = (req, file, cb) => {
//     // accept image only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };



//configure multer for uploading multiple files (max 4)
const upload = multer({
    //storage: storage,
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        acl: "public-read",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            // console.log("file", file)
            //cb(null, Date.now().toString() + '-' + file.originalname)
            cb(null, Date.now().toString() + '-' + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 5 MB
    fileFilter: fileFilter

})

module.exports = upload