import Resume from '../models/resume.model.js'
import { analyzeResume } from '../services/analyze.service.js';
import Analysis from "../models/analysis.model.js"

export const analyzeResumeController = async (req,res) =>{
    try {
        const {resumeId} = req.params;
        const {jobDescription} = req.body;

        //validate Input
        if(!jobDescription){
            return res.stauts(400).json({
                success:false,
                message:"Job Desription is required.",
            });
        }

        //Fetech Resume
        const resume = await Resume.findById({
            _id:resumeId,
            userId:req.user._id,
        });

        if(!resume){
            return res.stauts(404).json({
                success:false,
                message:"Resume not found",
            });
        }
        
        const result = await analyzeResume(
            resume.cleanedText,
            jobDescription
        );

        console.log("AI token Usage:",result.usage);

        //Save analyis
        const analysis = await Analysis.create({
            userId:req.user._id,
            resumeId,
            jobDescription,
            analysisResult:result.analysis,
            provider:"Groq",
            model:process.env.AI_MODEL,

            
        });

        return res.status(200).json({
            success:true,
            analysis:result.analysis,
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};