# 🔑 Environment Variables

> [!NOTE]
> This document describes all environment variables required to run HireMatch. Sensitive values are never committed to version control.

---

# 🎯 Objective

Environment variables separate configuration from source code, allowing different environments (development and production) to use different settings securely.

---

# 📁 Backend (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| PORT | ✅ | Backend server port |
| NODE_ENV | ✅ | Environment mode |
| CLIENT_URL | ✅ | Frontend application URL |
| MONGO_URI | ✅ | MongoDB Atlas connection string |
| JWT_SECRET | ✅ | Secret used to sign JWT tokens |
| JWT_EXPIRES_IN | ✅ | JWT expiration duration |
| COOKIE_SECRET | ✅ | Cookie signing secret (if used) |
| GROQ_API_KEY | ✅ | Groq AI API key |
| AWS_ACCESS_KEY_ID | ✅ | AWS IAM access key |
| AWS_SECRET_ACCESS_KEY | ✅ | AWS IAM secret key |
| AWS_REGION | ✅ | AWS deployment region |
| AWS_BUCKET_NAME | ✅ | S3 bucket name |

---

# 🎨 Frontend (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| VITE_API_URL | ✅ | Backend API URL |

---

# 🔒 Security Guidelines

Environment files should:

- Never be committed
- Be included in `.gitignore`
- Use strong secrets
- Be rotated periodically
- Remain server-side only

---

# 📁 Example Structure

Backend

```text
backend/
    ├── .env
```

Frontend

```text
frontend/
    ├── .env
```

---

# ⚙️ Environment Separation

Different environments should maintain separate configuration.

| Environment | Purpose |
|------------|----------|
| Development | Local Development |
| Production | AWS EC2 Deployment |

---

# 🎯 Design Decisions

- Configuration separated from source code.
- Sensitive credentials never hardcoded.
- Frontend and backend maintain independent configuration.
- Secrets remain server-side whenever possible.

---

# 📖 Related Documentation

- Deployment Guide
- AWS Architecture
- Docker Architecture
- Security Architecture