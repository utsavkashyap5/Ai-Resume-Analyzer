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

//Delete Api 

export const deleteAnalysis = async (req,res) =>{
    try{
        const {analysisId} = req.params;

        const analysis = await Analysis.findOneAndDelete({
            _id:analysisId,
            userId:req.user._id,
        });

        if(!analysis){
            return res.status(404).json({
                success:false,
                message:"Analysis not found.",
            });
        }

        return res.status(200).json({
            success:true,
            message:"Analysis Deleted Successfully",
        });
}catch(err){
    console.error(err);

    return res.status(500).json({
        success:false,
        message:"Failed to delete analysis."
    });
}
};