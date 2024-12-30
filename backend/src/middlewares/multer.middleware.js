import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const path = "./public/temp"
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }

        cb(null, path); // Using the absolute path for temp storage
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})

export const upload = multer({ storage, });

