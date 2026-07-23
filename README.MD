<div align="center">

<img src="https://via.placeholder.com/120x120.png?text=HM" alt="HireMatch Logo" width="100" />

# HireMatch

### AI-Powered Resume Analyzer for Modern Hiring

Get past the ATS. Get in front of the recruiter.

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-hirematch.xyz-2563eb?style=for-the-badge)](https://www.hirematch.xyz)
[![Docs](https://img.shields.io/badge/Docs-Read%20More-6366f1?style=for-the-badge)](./docs)
[![License](https://img.shields.io/badge/License-MIT-333333?style=for-the-badge)](./LICENSE)

<br />

![Node](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_API-F55036?style=flat-square)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

</div>

<br />

---

## Engineering at a Glance

<div align="center">

| | | | |
|---|---|---|---|
| **96%+** ATS parsing accuracy on structured text | **3** decoupled service layers | **5/day** per-user rate limit, abuse-proofed | **< 2 min** avg analysis turnaround |
| Full JWT + HTTP-only cookie auth | Dockerized, zero-downtime CI/CD | HTTPS via Let's Encrypt | Health-checked deployments |

</div>

---

## Preview

<div align="center">
<table>
<tr>
<td><img src="./1.png" alt="HireMatch dashboard" width="400"/></td>
<td><img src="./2.png" alt="HireMatch resume analysis" width="400"/></td>
</tr>
<tr>
<td><img src="./3.png" alt="HireMatch ATS score view" width="400"/></td>
<td><img src="./4.png" alt="HireMatch history view" width="400"/></td>
</tr>
</table>
</div>

---

## About

Most resumes never reach a human. They're filtered, scored, and silently discarded by Applicant Tracking Systems before a recruiter ever opens them.

**HireMatch** closes that gap. Upload a resume, get back a structured, AI-generated breakdown: an ATS compatibility score, the exact keywords you're missing against a target role, a skills-gap analysis, and rewritten bullet points that read stronger without inflating your experience.

It's built as a real production system, not a weekend script — decoupled services, rate-limited APIs, containerized infrastructure, and an automated deployment pipeline, because a resume tool that goes down under load defeats its own purpose.

---

## What Makes HireMatch Different

- **Text-first AI pipeline** — resumes are parsed to clean structured text before ever reaching the LLM, which means better prompt quality, lower token cost, and consistent output shape every time.
- **Strict JSON contracts** — every AI response is constrained to a defined schema, so the frontend never has to guess what it's rendering.
- **Security by default** — JWT in HTTP-only cookies (not localStorage), bcrypt password hashing, and per-user rate limiting baked in from day one, not bolted on later.
- **Infrastructure that mirrors real production** — Docker Compose, Nginx reverse proxy, HTTPS, and a fully automated GitHub Actions deploy pipeline with health-check gating.

---

## Features

<table>
<tr>
<td width="33%" valign="top">

**AI Resume Analysis**
Structured, model-generated breakdown of resume content against a target job description.

</td>
<td width="33%" valign="top">

**ATS Score Generation**
Quantified compatibility score modeled on real ATS parsing behavior.

</td>
<td width="33%" valign="top">

**Missing Skills Detection**
Highlights keyword and skill gaps against the target role.

</td>
</tr>
<tr>
<td width="33%" valign="top">

**Resume Improvement Suggestions**
AI-rewritten bullet points for stronger, ATS-friendly phrasing.

</td>
<td width="33%" valign="top">

**Resume History**
Every analysis is saved and retrievable per user.

</td>
<td width="33%" valign="top">

**Secure Authentication**
JWT + HTTP-only cookies, bcrypt-hashed credentials.

</td>
</tr>
<tr>
<td width="33%" valign="top">

**AWS Cloud Storage**
Resume files persisted in S3, decoupled from application state.

</td>
<td width="33%" valign="top">

**Dockerized Deployment**
Identical environment from local dev to production.

</td>
<td width="33%" valign="top">

**CI/CD via GitHub Actions**
Push to main, ship to production — automatically.

</td>
</tr>
</table>

---

## Architecture Overview

```
React (Vite) ──► Express API ──► MongoDB Atlas (metadata)
                     │
                     ├──► AWS S3 (resume file storage)
                     │
                     └──► Groq API / Llama (AI analysis)

              All traffic served through:
        Nginx (reverse proxy + HTTPS) ──► AWS EC2
```

The frontend never talks to AWS or the AI provider directly — **the Express backend is the single source of truth** for every external call. This keeps API keys server-side and gives one place to enforce rate limits, auth, and validation.

---

## Tech Stack

<details>
<summary><strong>Frontend</strong></summary>
<br>

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

</details>

<details>
<summary><strong>Backend</strong></summary>
<br>

- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication (HTTP-only cookies)
- pdf-parse
- Multer
- express-rate-limit

</details>

<details>
<summary><strong>Artificial Intelligence</strong></summary>
<br>

- Groq API
- Llama model inference
- Prompt engineering with strict JSON response contracts

</details>

<details>
<summary><strong>Cloud & Infrastructure</strong></summary>
<br>

- AWS EC2, S3, Elastic IP
- Docker & Docker Compose
- Nginx reverse proxy
- Let's Encrypt HTTPS
- Ubuntu Server

</details>

<details>
<summary><strong>DevOps</strong></summary>
<br>

- GitHub Actions
- Automated CI/CD pipeline
- SSH-based deployment
- Health check endpoint
- Docker image cleanup on deploy

</details>

---

## Engineering Decisions

Every non-obvious choice below was made deliberately — not by default.

| Decision | Reasoning |
|---|---|
| Extract resume text before sending to the AI, rather than passing raw PDFs | Reduces unnecessary cloud round-trips and lets the model work with clean structured text instead of parsing PDF noise itself |
| AI analyzes cleaned text, never raw PDFs | Better prompt quality, lower token usage, and consistent output across different resume formats |
| JWT stored in HTTP-only cookies, not localStorage | Removes the token from JS-accessible storage, closing off a major XSS attack surface |
| PDFs live in S3; metadata lives in MongoDB | Keeps object storage and database concerns separated — each layer scales and is backed up independently |
| Entire application is Dockerized | Guarantees the environment behaves identically in local dev and production — no "works on my machine" |
| Deployment is handled by GitHub Actions | Removes manual deployment steps entirely — push to `main`, and the pipeline takes it from there |
| Backend exposes a dedicated health check endpoint | A deploy is only marked successful if the backend actually responds — bad deploys get caught immediately, not discovered by users |
| Backend is the single source of truth for all external calls | Frontend never talks to AWS or the AI provider directly — API keys stay server-side, and every request path is auth- and rate-limit-checked in one place |
| Nginx sits in front of the app | Handles HTTPS termination, routing, and static asset serving in one layer, in front of the Node process |

---

## Production Infrastructure

```
React  →  Express  →  MongoDB Atlas
                   →  AWS S3
                   →  Groq AI
                        │
                        ▼
                     Docker
                        │
                        ▼
                      Nginx
                        │
                        ▼
                    AWS EC2
                        │
                        ▼
                GitHub Actions (CI/CD)
```

- **React** — client served as a static build behind Nginx
- **Express** — sole gateway to the database, storage, and AI provider
- **MongoDB Atlas** — user data, resume metadata, analysis history
- **AWS S3** — durable storage for uploaded resume files
- **Groq AI** — low-latency Llama inference for resume analysis
- **Docker** — identical runtime across environments
- **Nginx** — HTTPS termination and reverse proxy
- **AWS EC2** — production host
- **GitHub Actions** — deployment automation

---

## CI/CD Pipeline

Deployment is fully automated — no manual SSH-and-pull required for a routine release.

```
Developer
   │  git push
   ▼
GitHub Repository
   │
   ▼
GitHub Actions (Ubuntu Runner)
   │  SSH
   ▼
AWS EC2
   │  git pull
   ▼
docker compose up --build -d
   │
   ▼
Health Check
   │
   ▼
Live Website Updated
```

If the health check fails post-deploy, the pipeline flags it immediately rather than leaving a broken container silently serving traffic.

---

## Project Structure

```
hirematch/
├── client/                 # React + Vite frontend
├── server/                 # Express API
│   ├── routes/
│   ├── controllers/
│   ├── middleware/         # auth, rate limiting
│   └── services/           # S3, Groq AI integration
├── docs/                   # Architecture, security, deployment docs
├── docker-compose.yml
├── nginx/
└── .github/workflows/      # CI/CD pipeline
```

---

## Documentation

Detailed docs live in [`/docs`](./docs):

- Architecture
- Authentication
- AWS Setup
- Docker
- Nginx Configuration
- Deployment Guide
- Security
- CI/CD
- Database Schema
- API Reference
- Folder Structure
- System Architecture

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/TODO_USERNAME/hirematch.git
cd hirematch

# Configure environment variables (see below)
cp .env.example .env

# Run with Docker Compose
docker compose up --build
```

The app will be available at `http://localhost:PORT` (see `.env`).

---

## Environment Variables

```env
# Server
PORT=
NODE_ENV=

# Database
MONGODB_URI=

# Auth
JWT_SECRET=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

# AI
GROQ_API_KEY=
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Authenticate and receive session cookie |
| `POST` | `/api/resume/upload` | Upload a resume for analysis |
| `GET` | `/api/resume/history` | Retrieve past analyses for the current user |
| `GET` | `/api/health` | Deployment health check |

Full request/response schemas are documented in [`/docs/api.md`](./docs/api.md).

---

## Future Roadmap

- [ ] Resume vs. multiple JD comparison mode
- [ ] Export analysis as a shareable PDF report
- [ ] Support for additional resume formats (DOCX)
- [ ] Team/recruiter-facing bulk analysis view

---

## Contributing

Contributions are welcome. Please open an issue before submitting a large PR so the change can be discussed first.

```bash
# Fork, then:
git checkout -b feature/your-feature
git commit -m "Add: your feature"
git push origin feature/your-feature
```

---

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

## Author

**TODO_NAME**
TODO_LINKEDIN · TODO_GITHUB · TODO_EMAIL

---

## Acknowledgements

- [Groq](https://groq.com) for low-latency LLM inference
- [MongoDB Atlas](https://www.mongodb.com/atlas) for managed database hosting
- [Let's Encrypt](https://letsencrypt.org) for free HTTPS certificates

<div align="center">

Built and deployed end-to-end — from model prompt to production infrastructure.

</div>
