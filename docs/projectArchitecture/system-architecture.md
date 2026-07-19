# 🏗️ System Architecture

> [!NOTE]
> This document provides a high-level overview of HireMatch's architecture. It explains how the major subsystems interact while maintaining scalability, security, modularity, and separation of concerns. Detailed visual diagrams are maintained separately under the `docs/diagrams/` directory.

---

# 🎯 Objective

The architecture of HireMatch was designed around modern software engineering principles to ensure maintainability, scalability, and production readiness.

Primary objectives include:

- Modular application structure
- Secure client-server communication
- Efficient resume processing
- AI-powered resume analysis
- Cloud-native deployment
- Scalable infrastructure
- Easy maintenance and future extensibility

Rather than tightly coupling every subsystem, each component owns a single responsibility and communicates through clearly defined interfaces.

---

# 🧩 Major System Components

| Component | Responsibility |
|-----------|----------------|
| 🎨 React Frontend | User Interface & Client-side Routing |
| ⚙️ Express Backend | Business Logic & REST APIs |
| 🗄️ MongoDB Atlas | Stores Users, Resume Metadata & Analysis History |
| ☁️ AWS S3 | Secure PDF Storage |
| 🤖 Groq AI | ATS Resume Analysis |
| 🐳 Docker | Containerization |
| 🌐 Nginx | Reverse Proxy & HTTPS |
| 🚀 AWS EC2 | Production Hosting |

---

# 📊 High-Level System Flow

The complete system architecture diagram is maintained separately for better readability and easier maintenance.

➡️ **Diagram:** `docs/diagrams/system-architecture.md`

---

# 🔄 Request Lifecycle

Every request inside HireMatch follows a predictable lifecycle.

### 1️⃣ User Interaction

Users interact with the application through the React frontend.

Examples include:

- User Registration
- User Login
- Resume Upload
- Resume History
- Profile Management

---

### 2️⃣ API Communication

The frontend communicates exclusively with the Express backend using REST APIs.

The frontend never communicates directly with:

- MongoDB Atlas
- AWS S3
- Groq AI

All business logic remains centralized inside the backend.

---

### 3️⃣ Resume Processing Pipeline

When a resume is uploaded:

1. Backend receives the PDF.
2. Resume text is extracted using `pdf-parse`.
3. Extracted text is cleaned and normalized.
4. Original PDF is uploaded to AWS S3.
5. Cleaned text is sent to Groq AI.
6. AI generates ATS analysis.
7. Results are stored inside MongoDB.
8. Structured JSON is returned to the frontend.

---

### 4️⃣ Data Persistence

The system persists:

- User Accounts
- Resume Metadata
- Extracted Resume Text
- Cleaned Resume Text
- AI Analysis
- Resume History

Original PDF files remain securely stored inside AWS S3.

---

# 🏛️ Architectural Layers

| Layer | Responsibility |
|--------|----------------|
| 🎨 Presentation Layer | React User Interface |
| 🌐 API Layer | REST APIs |
| ⚙️ Business Layer | Authentication, Resume Processing & AI Integration |
| 🗄️ Data Layer | MongoDB Atlas |
| ☁️ Storage Layer | AWS S3 |
| 🤖 AI Layer | Groq LLM |
| 🚀 Infrastructure Layer | Docker, Nginx & AWS EC2 |

---

# ⚙️ Design Principles

The architecture follows several engineering principles.

### Separation of Concerns

Each subsystem owns one responsibility.

### Backend as the Single Source of Truth

All business logic and third-party integrations remain inside the backend.

### Cloud-Native Design

Infrastructure services remain independent from application logic.

### Modular Design

Authentication, AI, storage, deployment, and infrastructure remain isolated.

### Stateless Communication

Every request contains sufficient information for processing without relying on server-side session state.

---

# 📈 Scalability Considerations

The architecture supports future enhancements including:

- GitHub Actions CI/CD
- Redis
- Background Job Queues
- Multiple AI Providers
- Horizontal Scaling
- Kubernetes
- Microservices

without requiring significant architectural changes.

---

# 🎯 Key Design Decisions

- Resume text is extracted before uploading the original PDF to AWS S3.
- AI communicates only with cleaned resume text.
- MongoDB stores processed information while AWS S3 stores original files.
- Backend acts as the single gateway for all external services.
- Docker and Nginx separate infrastructure responsibilities from application logic.

---

# 📖 Related Documentation

- 🔐 Authentication Architecture
- 🤖 Resume Analysis Architecture
- ☁️ AWS Infrastructure
- 🐳 Docker Architecture
- 🌐 Nginx Reverse Proxy
- 🚀 Deployment Architecture
- 🛡️ Security Architecture

---

> [!IMPORTANT]
> The complete system diagram is documented separately inside **`docs/diagrams/system-architecture.md`**.