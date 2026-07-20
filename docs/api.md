# 📡 API Documentation

> [!NOTE]
> This document describes all REST API endpoints exposed by HireMatch. It serves as the primary API reference for frontend developers and contributors.

---

# 🌍 Base URL

Development

```text
http://localhost:3000/api
```

Production

```text
https://hirematch.xyz/api
```

---

# 🔐 Authentication APIs

## Register User

| Property | Value |
|----------|-------|
| Method | POST |
| Endpoint | /auth/register |
| Authentication | ❌ |

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "********"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

## Login

| Property | Value |
|----------|-------|
| Method | POST |
| Endpoint | /auth/login |
| Authentication | ❌ |

Creates:

- JWT
- HTTP-only Cookie

---

## Logout

| Property | Value |
|----------|-------|
| Method | POST |
| Endpoint | /auth/logout |
| Authentication | ✅ |

Clears authentication cookie.

---

## Current User

| Property | Value |
|----------|-------|
| Method | GET |
| Endpoint | /auth/me |
| Authentication | ✅ |

Returns authenticated user information.

---

# 📄 Resume APIs

## Upload Resume

| Property | Value |
|----------|-------|
| Method | POST |
| Endpoint | /resume/upload |
| Authentication | ✅ |

Responsibilities:

- Validate PDF
- Extract Resume Text
- Clean Resume Text
- Upload PDF to AWS S3
- Store Metadata

---

## Analyze Resume

| Property | Value |
|----------|-------|
| Method | POST |
| Endpoint | /resume/analyze/:id |
| Authentication | ✅ |

Responsibilities:

- Fetch cleaned text
- Send to Groq
- Receive JSON
- Store Results

---

## Resume History

| Property | Value |
|----------|-------|
| Method | GET |
| Endpoint | /resume/history |
| Authentication | ✅ |

Returns previous resume analyses.

---

## Get Resume

| Property | Value |
|----------|-------|
| Method | GET |
| Endpoint | /resume/:id |
| Authentication | ✅ |

Returns complete resume details.

---

# 👤 Profile APIs

## Get Profile

GET /profile

---

## Update Profile

PUT /profile

---

# ⚠️ HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# 🔒 Authentication

Protected APIs require:

- Valid JWT
- HTTP-only Cookie
- Authentication Middleware

---

# 📖 API Response Format

Successful responses follow a consistent JSON structure.

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```