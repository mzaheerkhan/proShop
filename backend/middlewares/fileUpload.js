import multer from "multer";
import { v4 as uuidv4 } from "uuid"


const MiME_TYPE_MAP = {
"image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
}

const fileUpload = multer({
  limits: {fileSize:5000000},
  storage:multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/images")
    },
    filename:(req,file,cb)=>{
        const fileExtension = MiME_TYPE_MAP[file.mimetype]
        cb(null,file.originalname.split(" ").join("_").split(".")[0]+ uuidv4() + "." + fileExtension)
    }
  }),
  fileFilter:(req,file,cb)=>{
    const isValid = !!MiME_TYPE_MAP[file.mimetype]
    const error = isValid ? null : new Error("Invalid mime type. Select file e.g jpeg,png,jpg")
    cb(error,isValid)
  }
    
})

export default fileUpload