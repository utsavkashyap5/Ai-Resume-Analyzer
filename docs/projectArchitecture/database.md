# 🗄️ Database Architecture

> [!NOTE]
> This document explains how data is organized and managed within HireMatch. It describes the database design, collection responsibilities, relationships, and the reasoning behind the schema design.

---

# 🎯 Objective

The database architecture is designed to:

- Store user accounts securely.
- Persist resume information.
- Track AI analysis history.
- Minimize data duplication.
- Support future scalability.

MongoDB Atlas is used as the primary database due to its flexible document-based model and seamless cloud integration.

---

# 🧩 Database Collections

HireMatch currently consists of two primary collections.

| Collection | Purpose |
|------------|---------|
| 👤 Users | Stores user authentication and profile information. |
| 📄 Resumes | Stores uploaded resume metadata, extracted text, cleaned text, AI analysis, and AWS S3 file information. |

---

# 👤 Users Collection

Responsible for user authentication and ownership.

Stores:

- User Information
- Authentication Credentials
- Profile Information
- Account Creation Details

Each user may own multiple resumes.

---

# 📄 Resume Collection

Responsible for storing resume-related information.

Each resume contains:

- Resume Metadata
- AWS S3 File URL
- Extracted Resume Text
- Cleaned Resume Text
- AI Analysis Result
- Upload Timestamp
- Analysis Timestamp

The Resume collection acts as the central source of truth for resume processing.

---

# 🔗 Collection Relationship

The relationship between Users and Resumes follows a **One-to-Many** model.

One User

↓

Many Resumes

Every uploaded resume belongs to exactly one authenticated user.

---

# 📊 Database Responsibilities

| Responsibility | Collection |
|---------------|------------|
| Authentication | Users |
| Resume Ownership | Users + Resumes |
| Resume Metadata | Resumes |
| Extracted Text | Resumes |
| Cleaned Text | Resumes |
| AI Analysis | Resumes |
| Resume History | Resumes |

---

# ⚙️ Design Decisions

Several important design decisions were made.

- Resume data is separated from user data.
- AI analysis is stored instead of regenerated.
- Cleaned text is stored for future AI requests.
- Original PDF remains in AWS S3 instead of MongoDB.
- Resume ownership is enforced through User IDs.

---

# 📈 Future Improvements

Future database enhancements may include:

- Resume Versioning
- Soft Delete
- Bookmarked Analyses
- User Preferences
- AI Prompt Version Tracking
- Index Optimization
- Analytics Collection

---

# 📖 Related Documentation

- Resume Analysis Architecture
- AWS Architecture
- Authentication Architecture
- API Documentation