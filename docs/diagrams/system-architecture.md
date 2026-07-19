# 📊 System Architecture Diagram

> [!NOTE]
> This document contains the visual representation of HireMatch's high-level architecture. The detailed explanation is available in **`docs/architecture/system-architecture.md`**.

---

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                        📄 HIREMATCH RESUME ANALYSIS PIPELINE                │
└──────────────────────────────────────────────────────────────────────────────┘

                              👤 USER
                                 │
                                 ▼
                     Upload Resume (PDF)
                                 │
                                 ▼
                 ┌─────────────────────────┐
                 │     Express Backend     │
                 │   Resume Upload API     │
                 └────────────┬────────────┘
                              │
                              ▼
                     📑 Extract Resume Text
                          (pdf-parse)
                              │
                              ▼
                  🧹 Clean & Normalize Text
                              │
          ┌───────────────────┴────────────────────┐
          │                                        │
          ▼                                        ▼
 ┌──────────────────────┐               ┌──────────────────────┐
 │    MongoDB Atlas     │               │       AWS S3         │
 │──────────────────────│               │──────────────────────│
 │ • User ID            │               │ • Original PDF       │
 │ • Resume Metadata    │               │ • Permanent Storage  │
 │ • Extracted Text     │               └──────────────────────┘
 │ • Cleaned Text       │
 │ • Status             │
 └──────────┬───────────┘
            │
            │ Resume Ready
            ▼

══════════════════════════════════════════════════════════════════════════════════

                    👤 User Clicks "Analyze"
                              │
                              ▼
                  Fetch Cleaned Resume Text
                       from MongoDB Atlas
                              │
                              ▼
                   🤖 Groq AI (LLM Analysis)
                              │
                              ▼
                  📊 Structured JSON Response
                              │
                              ▼
             Store Analysis Results in MongoDB
                              │
                              ▼
                 📈 Return Results to Frontend
                              │
                              ▼
                    🎨 React Dashboard UI

```

</div>

---

## 📌 Diagram Summary

The system follows a layered client-server architecture where:

- React provides the presentation layer.
- Express acts as the central business layer.
- MongoDB stores structured application data.
- AWS S3 stores original resume files.
- Groq AI performs ATS analysis on cleaned resume text.
- Docker, Nginx, and AWS EC2 provide the production infrastructure.

---

> [!TIP]
> This diagram represents the overall system architecture only. Detailed subsystem diagrams (Authentication, Resume Analysis, AWS, Docker, Deployment, etc.) are maintained in their respective files under `docs/diagrams/`.