import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({

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
    resumeUrl:{
        type:String,
        required:true
    },

    //Raw text extracted from the pdf file

    extractedText:{
        type:String,
        required:true,
    },
    cleanedText:{
        type:String,
        default:"",
    },

},{timestamps:true});

export default mongoose.model("Resume",resumeSchema);