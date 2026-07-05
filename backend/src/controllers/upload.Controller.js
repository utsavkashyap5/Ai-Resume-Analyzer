import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from '../db/s3.js';
import Resume from '../models/resume.model.js';
import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { cleanResumeText } from "../utils/cleanResumeText.js";

export const uploadResume  = async(req,res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"No PDF uploaded",
            });
        }
        //Extract the text from the pdf.
        const extractedText = await extractTextFromPDF(req.file.buffer);

        const cleanedText = cleanResumeText(extractedText);

       

        //Uplload to S3

        const key =`resumes/${Date.now()}-${req.file.originalname}`;

        await s3.send(
            new PutObjectCommand({
                Bucket:process.env.AWS_BUCKET_NAME,
                Key:key,
                Body:req.file.buffer,
                ContentType:req.file.mimetype
            })
        );

        const resumeUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        
        //Save to mongoDB
        const resume = await Resume.create({
            userId:req.user._id,
            fileName:req.file.originalname,
            resumeUrl,
            extractedText,
            cleanedText,
        });
        return res.status(200).json({
            success:true,
            message:"Resume uploaded successfully.",
            resumeId:resume._id,
            resumeUrl,
        });
        

    }catch(err){
        console.error(err);

        res.status(500).json({
            success:false,
            message:"Upload Failed",
        });
    }
};