import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype !== "application/pdf"){
            return cb(new Error("Only PDF files are allowed."));
        }
        cb(null,true);    
    },
    limits:{
        fileSize:5*1024*1024,
    },
});
export default upload;