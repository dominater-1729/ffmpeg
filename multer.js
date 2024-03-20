const multer = require("multer");
const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./temp");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `image-${Date.now()}.${ext}`);
    },
});

const fileUpload = multer({ storage: multerConfig });

module.exports = fileUpload;