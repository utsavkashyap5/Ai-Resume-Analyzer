# 🛡️ Security Architecture

> [!NOTE]
> Security was considered throughout the development of HireMatch rather than being added as an afterthought.

---

# 🎯 Security Objectives

HireMatch protects:

- User Accounts
- Authentication Sessions
- Uploaded Resumes
- AI Requests
- API Endpoints

---

# 🔐 Security Layers

| Layer | Protection |
|--------|------------|
| Authentication | JWT |
| Session | HTTP-only Cookies |
| Passwords | bcrypt |
| APIs | Middleware |
| Network | HTTPS |
| Headers | Helmet |
| Abuse Prevention | Rate Limiting |
| Secrets | Environment Variables |

---

# 📊 Security Diagram

➡️ **Diagram:** `docs/diagrams/security.md`

---

# 🔑 Authentication Security

Implemented using:

- JWT
- HTTP-only Cookies

No tokens are stored in Local Storage.

---

# 🔒 Password Protection

Passwords are:

- Salted
- Hashed
- Stored using bcrypt

Plain text passwords are never persisted.

---

# 🌐 HTTPS

All production traffic is encrypted.

SSL Certificates:

- Let's Encrypt
- Managed through Certbot

---

# 🛡️ API Protection

Protected routes require:

- Valid JWT
- Valid Cookie
- Middleware Verification

---

# 🚫 Rate Limiting

API abuse is prevented using:

- express-rate-limit

Current implementation:

- 5 AI analyses per day per user

---

# 🔐 Secret Management

Sensitive credentials are stored in:

```
.env
```

Examples:

- JWT Secret
- MongoDB URI
- AWS Keys
- Groq API Key

---

# 🎯 Design Decisions

- JWT instead of sessions
- HTTP-only cookies instead of Local Storage
- HTTPS everywhere
- Environment Variables
- Secure Docker Ports

---

# 🚀 Future Improvements

- Refresh Tokens
- MFA
- CSP Headers
- OAuth
- Secret Rotation
- AWS Secrets Manager

---

# 📖 Related Documentation

- Authentication
- HTTPS
- Nginx
- AWS