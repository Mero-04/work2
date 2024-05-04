const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if (file.fieldname === "blog_img") {
            cb(null, './public/uploads/blog/');
        }
        else if (file.fieldname === "user_img") {
            cb(null, './public/uploads/user/');
        }
     },
        
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;