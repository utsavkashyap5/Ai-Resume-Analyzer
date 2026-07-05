import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer and Senior Technical Recruiter.

Your task is to compare a candidate's resume against a job description and evaluate how well the resume matches the role.

You MUST return ONLY a valid JSON object.

IMPORTANT RULES

- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT wrap the response in backticks.
- Do NOT explain your reasoning.
- The output must be valid JSON.parse().

---------------------------------------------------

ATS SCORING

Return an INTEGER only.

Minimum: 0

Maximum: 100

Never return decimals.

Never return percentages.

Calculate the ATS score using:

- Skills Match (30%)
- Keywords Match (25%)
- Experience Relevance (20%)
- Projects (15%)
- Education (5%)
- Resume Quality & Formatting (5%)

---------------------------------------------------

MATCHED KEYWORDS

Return ONLY keywords that appear in BOTH the resume and job description.

---------------------------------------------------

MISSING KEYWORDS

Return ONLY keywords that exist in the job description but NOT in the resume.

---------------------------------------------------

SKILLS GAP

Return only the missing technical skills that would significantly improve the ATS score.

---------------------------------------------------

CATEGORY SCORES

Return integer values only.

Minimum 0

Maximum 100

---------------------------------------------------

WEAK BULLETS

Only rewrite bullets that already exist.

DO NOT:

- invent achievements
- invent metrics
- invent percentages
- invent technologies
- invent projects
- invent certifications

Improve only wording using stronger action verbs.

If there are no weak bullets, return an empty array.

---------------------------------------------------

RECOMMENDED PROJECTS

Recommend at most 3 realistic project ideas that would improve this resume for the target job.

---------------------------------------------------

RECOMMENDED CERTIFICATIONS

Recommend at most 3 relevant certifications.

---------------------------------------------------

SUMMARY

Exactly TWO sentences.

Sentence 1:
Overall ATS evaluation.

Sentence 2:
Most important improvement.

---------------------------------------------------

OUTPUT SCHEMA

{
  "ats_score": 0,
  "category_scores": {
    "skills": 0,
    "experience": 0,
    "projects": 0,
    "education": 0,
    "keywords": 0,
    "formatting": 0
  },
  "matched_keywords": [],
  "missing_keywords": [],
  "skills_gap": [],
  "strengths": [],
  "weak_bullets": [
    {
      "original": "",
      "rewritten": ""
    }
  ],
  "recommended_projects": [],
  "recommended_certifications": [],
  "summary": ""
}
`;

const resume = ` U T S A V K A S H Y A P MERN Stack Developer with AWS & Docker experience, building full-stack and AI-integrated products ready for production. +917007308342 utsavkashyap892@gmail.com LinkedIn GitHub Lucknow, India WORK EXPERIENCES | • Trainee Internship GRAStech Jun 2025 - Jul 2025 On-site India Designed and deployed a production-grade VPN on AWS EC2 using WireGuard , enabling secure remote access over a custom VPC network. Configured AWS infrastructure (EC2, VPC, S3) to support secure cloud environments, applying IAM policies and network segmentation best practices. Hardened cloud deployment pipeline by integrating Linux -based system security practices, reducing manual configuration overhead during setup. Technologies / Skills Used : AWS Console, Linux, GitHub PROJECTS | DrishtiVision – Deepfake Detection System Github Full Stack Web App Jan 2026 - Feb 2026 Architected a full-stack deepfake detection platform (image, video, live) using React, Node.js, Express.js , and FastAPI microservices . Engineered a FastAPI microservice for AI model inference , decoupled from Node.js backend via REST APIs for scalability. Secured all endpoints with JWT authentication, hashed passwords, and session management . Designed MongoDB schemas to store user data, media metadata, and detection results across multiple detection modes. Built a responsive React UI displaying real-time REAL/FAKE verdicts with confidence scores via backend API integration. Technologies / Tools Used : React.js, Node.js, Express.js, MongoDB, FastAPI, JWT, Tailwind CSS, REST APIs | HireMatch – Ai-Resume-Analyzer Github Full Stack Web App Jun 2026 - Jul 2026 Architected a full-stack AI SaaS platform (HireMatch) using React, Node.js, Express.js, and MongoDB with GPT-4o-mini -powered ATS scoring and keyword analysis. Engineered PDF ingestion pipeline via AWS S3 and pdf-parse , feeding extracted resume text into a structured OpenAI prompt returning JSON results. Designed a prompt engineering system returning ATS score, missing keywords, skills gap , and GPT-powered bullet rewrites in strict JSON format. Secured the app with JWT auth, bcrypt hashing , and per-user rate limiting (5 analyses/day) using express-rate-limit. Containerized frontend and backend with Docker, deployed on AWS EC2 with Nginx reverse proxy and HTTPS via Let's Encrypt. Technologies / Tools Used : React, Node.js, Express, MongoDB, Tailwind CSS, OpenAI API, AWS S3, ASW EC2, Docker, Nginx, JWT, bcrypt, pdf-parse, REST APIs EDUCATIONS | Babu Banarasi Das University Lucknow B.Tech – Computer Science and Engineering 2022 - 2026 | The Mussoorie International School Shahjahanpur Intermediate 2021 - 2022 | The Mussoorie International School Shahjahanpur High School 2019 - 2020 SKILLS Programming Languages : JavaScript, Python Runtime & Frameworks : React.js, Express.js, Tailwind CSS, FastAPI, Node.js Databases : MongoDB Cloud & DevOps : AWS, Docker AI & Integrations : OpenAI API / Gemini API, REST APIs, JWT CERTIFICATIONS Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate AWS Cloud Computing – Project-Based Summer Training LEADERSHIP & EXTRA-CURRICULAR ACTIVITIES Led a team as In-Game Leader (IGL) in an college E-Sports tournament, overseeing real-time strategy, team coordination, and decision- making under pressure. Volunteer, Voxen Esports Community – Assisted in planning and executing esports tournaments. Volunteer, Utkarsh Fest – Supported event coordination and on-ground execution. Participant, Technical & Esports Events – Engaged in college-level competitions, enhancing teamwork and problem-solving skills.
`
const jobDescription = `
Company: TechNova Solutions

Role: Full Stack MERN Developer

Requirements:
- Strong JavaScript knowledge
- React.js
- Node.js
- Express.js
- MongoDB
- REST APIs
- JWT Authentication
- Docker
- AWS
- Git
- Linux
- Problem Solving
- Team Collaboration

Responsibilities:
- Build scalable MERN applications.
- Develop secure REST APIs.
- Deploy applications on AWS.
- Work with Docker containers.
- Collaborate with cross-functional teams.
- Write clean and maintainable code.
`;

async function analyzeResume() {
  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL,

      temperature: 0.2,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `
Resume:

${resume}

-------------------------

Job Description:

${jobDescription}
          `,
        },
      ],
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
}

analyzeResume();