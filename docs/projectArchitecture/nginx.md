# 🌐 Nginx Reverse Proxy Architecture

> [!NOTE]
> This document explains the role of Nginx within HireMatch. It describes how Nginx routes requests, manages HTTPS, improves security, and acts as the public entry point for the application.

---

# 🎯 Objective

Nginx acts as the gateway between users and the HireMatch application.

Its primary responsibilities include:

- Routing incoming requests
- Serving the frontend
- Forwarding API requests
- Managing HTTPS
- Hiding internal application ports
- Improving application security
- Enhancing deployment architecture

Rather than exposing application containers directly to the internet, all traffic flows through Nginx.

---

# 🧩 Responsibilities

| Responsibility | Description |
|----------------|-------------|
| 🌍 Reverse Proxy | Routes incoming requests to the correct application service. |
| 🔒 HTTPS | Terminates SSL/TLS connections using Let's Encrypt certificates. |
| 🎨 Frontend Serving | Serves the React production build. |
| 🔀 API Routing | Forwards `/api` requests to the Express backend. |
| 🛡️ Security | Hides internal application ports and containers. |
| 🚀 Performance | Efficiently serves static assets and manages client requests. |

---

# 📊 Nginx Architecture Diagram

The complete Nginx architecture diagram is maintained separately.

➡️ **Diagram:** `docs/diagrams/nginx.md`

---

# 🔄 Request Lifecycle

Every request follows a well-defined path.

### 1️⃣ User Request

The user visits:

```
https://hirematch.xyz
```

---

### 2️⃣ Nginx Receives the Request

Nginx becomes the first point of contact for every incoming request.

It determines whether the request should be:

- Served as a frontend page
- Forwarded to the backend API

---

### 3️⃣ Frontend Requests

Requests such as:

```
/
```

or

```
/dashboard
```

are served by the React frontend.

---

### 4️⃣ API Requests

Requests beginning with:

```
/api
```

are forwarded to the Express backend.

Example:

```
/api/auth/login
```

↓

Express API

↓

JSON Response

---

### 5️⃣ HTTPS Handling

Nginx manages:

- SSL Certificates
- HTTPS Encryption
- Secure Communication

The backend only receives internal HTTP requests.

---

# 🔒 Security Benefits

Nginx significantly improves application security.

### Hidden Internal Ports

The following ports remain inaccessible from the internet.

```
Frontend → 127.0.0.1:5173

Backend → 127.0.0.1:3000
```

Only port **443 (HTTPS)** is publicly exposed.

---

### Reverse Proxy Protection

Users never communicate directly with:

- Docker Containers
- Express Server

Every request passes through Nginx first.

---

### SSL Termination

HTTPS encryption is handled entirely by Nginx.

This keeps SSL configuration independent from the application.

---

# ⚙️ Design Decisions

Several important deployment decisions were made.

- Nginx acts as the single public entry point.
- Internal Docker ports remain private.
- HTTPS is terminated at Nginx.
- React and Express remain independent services.
- Static assets are served efficiently by Nginx.

---

# 📈 Future Improvements

Potential enhancements include:

- Load Balancing
- Gzip Compression
- HTTP/3
- Brotli Compression
- Request Caching
- Rate Limiting at Nginx
- Web Application Firewall (WAF)

---

# 📖 Related Documentation

- Docker Architecture
- AWS Architecture
- Deployment Architecture
- Security Architecture
- System Architecture

---

> [!IMPORTANT]
> The visual Nginx architecture diagram is maintained separately inside **`docs/diagrams/nginx.md`**.