import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true,
    },
    resumeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resume",
        required:true,
        index:true,
    },
    jobDescription:{
        type:String,
        required:true,
        trim:true,
    },

    analysisResult:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },

    //Model Used 
    model:{
        type:String,
        default:process.env.AI_MODEL,
    },
    
    

},{timestamps:true});

export default mongoose.model("Analysis",analysisSchema);