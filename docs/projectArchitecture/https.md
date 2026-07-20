# 🔒 HTTPS Setup

> [!NOTE]
> This document explains how HTTPS is implemented in HireMatch using Nginx and Let's Encrypt. It covers SSL certificate generation, secure communication, automatic renewal, and the architectural decisions behind enabling HTTPS in production.

---

# 🎯 Objective

HTTPS ensures that all communication between users and HireMatch is encrypted, authenticated, and protected from interception.

The primary goals include:

- Encrypt client-server communication
- Authenticate the website identity
- Protect authentication cookies
- Improve application security
- Meet modern browser security standards

---

# 🧩 Components Involved

| Component | Responsibility |
|-----------|----------------|
| 🌐 Nginx | Terminates HTTPS connections and serves SSL certificates. |
| 🔐 Let's Encrypt | Provides free SSL/TLS certificates. |
| 🤖 Certbot | Generates, installs, and renews SSL certificates automatically. |
| 🌍 GoDaddy DNS | Maps the custom domain to the AWS EC2 instance. |
| ☁️ AWS EC2 | Hosts the production application. |

---

# 📊 HTTPS Architecture Diagram

The complete HTTPS setup diagram is maintained separately.

➡️ **Diagram:** `docs/diagrams/https.md`

---

# 🔄 HTTPS Setup Workflow

### 1️⃣ Domain Configuration

The custom domain (`hirematch.xyz`) is configured in GoDaddy DNS and points to the AWS EC2 Elastic IP.

---

### 2️⃣ DNS Resolution

When a user visits:

```text
https://hirematch.xyz
```

DNS resolves the domain to the EC2 instance.

---

### 3️⃣ Certificate Generation

Certbot communicates with Let's Encrypt to:

- Verify domain ownership
- Generate SSL certificates
- Install certificates into Nginx

Certificates generated:

- `fullchain.pem`
- `privkey.pem`

---

### 4️⃣ Secure Connection

Nginx receives the HTTPS request on port **443**.

It:

- Performs the SSL/TLS handshake
- Decrypts incoming traffic
- Forwards requests internally to the Docker containers over HTTP

---

### 5️⃣ Automatic Renewal

Certbot installs a scheduled renewal task that periodically checks certificate validity and renews certificates before expiration.

---

# 🔒 Security Benefits

HTTPS provides several security advantages.

### Encryption

Protects all data exchanged between the browser and the server.

---

### Authentication

Confirms that users are communicating with the legitimate HireMatch server.

---

### Cookie Protection

Authentication cookies marked as `Secure` are transmitted only over HTTPS.

---

### Data Integrity

Prevents attackers from modifying traffic during transmission.

---

# ⚙️ Design Decisions

Several deployment decisions were made.

- Used Let's Encrypt instead of self-signed certificates.
- Used Certbot for automated certificate management.
- Terminated SSL at Nginx instead of the application containers.
- Kept internal Docker communication on HTTP.
- Enabled automatic certificate renewal.

---

# 📈 Future Improvements

Potential enhancements include:

- HSTS (HTTP Strict Transport Security)
- OCSP Stapling
- TLS 1.3 Optimization
- HTTP/3 Support
- Stronger Cipher Suite Configuration

---

# 📖 Related Documentation

- Nginx Reverse Proxy
- Docker Architecture
- AWS Infrastructure
- Deployment Architecture
- Security Architecture

---

> [!IMPORTANT]
> HTTPS is terminated at the Nginx reverse proxy. Backend containers never directly handle SSL/TLS connections.