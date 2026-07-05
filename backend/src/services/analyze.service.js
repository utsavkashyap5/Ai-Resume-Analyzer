import aiClient from "../config/aiClient.js";
import { SYSTEM_PROMPT } from './../prompts/resumeAnalyzer.prompt.js';
import { cleanResumeText } from './../utils/cleanResumeText.js';
import { safeJsonParse } from "../utils/safeJsonParse.js";
export const analyzeResume = async (cleanResumeText,jobDescription) =>{
    try{
        const response = await aiClient.chat.completions.create({
            model:process.env.AI_MODEL,

            temperature:0.2,

            response_format:{
                type:"json_object",
            },

            messages:[
                {
                    role:"system",
                    content:SYSTEM_PROMPT,
                },
                {
                    role:"user",
                    content:`
                    Resume:
                    ${cleanResumeText}
                    
                    Job Description:
                    ${jobDescription}`,
                },
            ],
        });
        return {
            analysis: safeJsonParse(
            response.choices[0].message.content
            ),
        };
    }catch(error){
        console.error("Analze Service Error:",error);
        throw new Error("Failed to analyze resume");
    }
};
