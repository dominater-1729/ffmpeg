const multer = require("multer");
// const multerConfig = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log("hre");
//         cb(null, "./temp");
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split("/")[1];
//         console.log("hre")
//         cb(null, `image-${Date.now()}.${ext}`);
//     },
// });

// const fileUpload = multer({ storage: multerConfig });

// module.exports = fileUpload;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;