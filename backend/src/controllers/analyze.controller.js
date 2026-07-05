import Resume from '../models/resume.model.js'
import { analyzeResume } from '../services/analyze.service.js';

export const analyzeResumeController = async (req,res) =>{
    try {
        const {resumeId} = req.params;
        const {jobDescription} = req.body;

        if(!jobDescription){
            return res.stauts(400).json({
                success:false,
                message:"Job Desription is required.",
            });
        }

        const resume = await Resume.findById(resumeId);

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