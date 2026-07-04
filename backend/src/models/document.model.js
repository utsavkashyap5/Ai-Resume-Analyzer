import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

    //Links this pdf directly to the user who uploaded it

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    //The permanent live url returned by AWS S3
    fileName:{
        type:String,
        required:true
    },

    //The unique key/path inside your S3 bucket 

    s3Key:{
        type:String,
        required:true
    },

    //Raw text extracted from the pdf file

    extractedText:{
        type:String,
        default:""
    }

},{timestamps:true});

const Document = mongoose.model("Document",documentSchema);

export default Document;