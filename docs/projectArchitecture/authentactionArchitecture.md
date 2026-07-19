# 🔐 Authentication Architecture

> [!NOTE]
> This document explains the authentication subsystem of HireMatch. It covers user registration, login, authorization, protected routes, JWT generation, cookie management, middleware validation, and logout workflow.

---

# 🎯 Objective

The authentication system is responsible for securely identifying users, protecting private resources, and maintaining authenticated sessions without exposing sensitive information.

The architecture was designed with the following goals:

- Secure user authentication
- Stateless authorization
- Password protection
- Protected API routes
- Secure cookie handling
- Scalable authentication flow

---

# 🏛️ Authentication Overview

HireMatch follows a **JWT-based Authentication Architecture** using **HTTP-only Cookies**.

Instead of storing authentication tokens inside Local Storage or Session Storage, JWT tokens are stored inside secure cookies, making the application more resistant to common client-side attacks.

Authentication is handled entirely by the backend while the frontend simply consumes protected APIs.

---

# 🧩 Authentication Components

| Component | Responsibility |
|-----------|----------------|
| **React Frontend** | Collects user credentials and communicates with authentication APIs. |
| **Express Backend** | Validates user credentials and generates JWT tokens. |
| **MongoDB Atlas** | Stores user information securely. |
| **JWT** | Represents the authenticated user session. |
| **HTTP-only Cookie** | Stores JWT securely inside the browser. |
| **Authentication Middleware** | Validates incoming JWT tokens before allowing access to protected resources. |

---

# 👤 User Registration Flow

The registration process creates a new user account while ensuring password security.

### Registration Steps

1. User enters registration details.
2. Frontend validates the form.
3. Data is sent to the backend.
4. Backend validates all required fields.
5. Password is hashed using **bcrypt**.
6. User document is stored inside MongoDB Atlas.
7. Backend returns a successful registration response.

---

# 🔑 User Login Flow

After registration, users authenticate using their email and password.

### Login Steps

1. User submits login credentials.
2. Backend searches the user in MongoDB.
3. Password is compared using bcrypt.
4. If credentials are valid:
   - JWT token is generated.
   - HTTP-only cookie is created.
5. Response is returned to the frontend.
6. User is redirected to the dashboard.

---

# 🍪 JWT Cookie Architecture

Instead of exposing authentication tokens to JavaScript, HireMatch stores JWT inside HTTP-only cookies.

Benefits include:

- JavaScript cannot directly access the token.
- Reduced XSS attack surface.
- Automatic cookie handling by the browser.
- Cleaner authentication implementation.

---

# 🛡️ Protected Route Flow

Every protected request follows the same lifecycle.

1. Browser automatically includes authentication cookie.
2. Request reaches Express backend.
3. Authentication middleware extracts JWT.
4. JWT signature is verified.
5. User identity is attached to the request.
6. Protected controller executes.
7. Response is returned.

If verification fails:

- HTTP 401 Unauthorized is returned.
- Protected resources remain inaccessible.

---

# 🚪 Logout Flow

Logout simply invalidates the authenticated session.

Steps:

1. User clicks Logout.
2. Backend clears the authentication cookie.
3. Browser removes stored JWT.
4. User is redirected to Login.
5. Protected APIs become inaccessible.

---

# 🔒 Security Measures

Several security layers have been implemented.

### Password Security

- Passwords are never stored in plain text.
- bcrypt hashing is used before persistence.

---

### Token Security

- JWT is digitally signed.
- Token verification occurs on every protected request.

---

### Cookie Security

Authentication cookies are:

- HTTP-only
- Secure (Production)
- Automatically sent by the browser
- Cleared during logout

---

### Route Protection

Protected APIs require:

- Valid JWT
- Valid user account
- Successful middleware verification

Unauthorized users cannot access:

- Dashboard
- Profile
- Resume History
- Resume Analysis

---

# 📂 Authentication Files

| File | Responsibility |
|------|----------------|
| authController.js | Registration, Login, Logout |
| authMiddleware.js | JWT Verification |
| User.js | User Schema |
| authRoutes.js | Authentication Routes |
| api.js | Axios Configuration |
| ProtectedRoute.jsx | Frontend Route Protection |

---

# ⚙️ Design Decisions

Several important architectural decisions were made.

### JWT over Session Authentication

JWT enables stateless authentication, making scaling easier.

---

### HTTP-only Cookies over Local Storage

Cookies reduce exposure of authentication tokens to client-side JavaScript.

---

### Password Hashing

bcrypt prevents passwords from being stored in readable format.

---

### Backend Validation

All authentication decisions are performed by the backend to ensure trust boundaries remain intact.

---

# 🚀 Future Improvements

The authentication architecture can be extended with:

- Refresh Tokens
- Email Verification
- Password Reset
- Multi-Factor Authentication (MFA)
- OAuth (Google / GitHub)
- Session Management
- Device Tracking

---

# 📖 Related Documentation

Authentication interacts with several other subsystems.

- Project Architecture
- API Documentation
- Security Architecture
- Database Schema
- Deployment Architecture

These documents provide additional implementation details while this document focuses exclusively on the authentication subsystem.

## 📊 Authentication Flow Diagram

The complete authentication diagrams are documented here:

➡️ **../diagrams/authentication-diagrams.md**