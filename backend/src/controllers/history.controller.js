import Analysis from "../models/analysis.model.js";

export const getAnalysisHistory = async(req,res)=>{
    try{
        const history = await Analysis.find({
            userId:req.user._id,

        })
        .populate("resumeId","fileName")
        .sort({createdAt:-1});
        
        return res.status(200).json({
            success:true,
            history,
        });
    }catch(err){
        console.error(error);

        return res.status(500).json({
            success:false,
            messsage:"Failed to fetch history",
        });
    }
};