# 📊 Database Architecture Diagram

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                    🗄️ HIREMATCH DATABASE ARCHITECTURE                        │
└──────────────────────────────────────────────────────────────────────────────┘


                    👤 USERS COLLECTION
┌────────────────────────────────────────────────────┐
│ _id                                                │
│ name                                               │
│ email                                              │
│ password (bcrypt Hash)                             │
│ profileImage                                       │
│ createdAt                                          │
│ updatedAt                                          │
└──────────────────────┬─────────────────────────────┘
                       │
                       │  One User
                       │
                       ▼
                  Owns Multiple
                       │
                       ▼
                 📄 RESUMES COLLECTION

┌────────────────────────────────────────────────────┐
│ _id                                                │
│ userId (Reference → Users._id)                     │
│ originalFileName                                   │
│ resumeUrl (AWS S3)                                 │
│ extractedText                                      │
│ cleanedText                                        │
│ analysisResult (JSON)                              │
│ uploadedAt                                         │
│ analyzedAt                                         │
│ createdAt                                          │
│ updatedAt                                          │
└────────────────────────────────────────────────────┘

```

</div>

---

## 📌 Relationship

```
One User
     │
     ├──────── Resume 1
     ├──────── Resume 2
     ├──────── Resume 3
     └──────── Resume N
```