import multer from "multer"

const storege = multer.memoryStorage();

const upload = multer({storege: storege})

export default upload;