# 🚀 Deployment Guide

> [!NOTE]
> This guide explains how to deploy **HireMatch – AI Resume Analyzer** to a production environment using AWS EC2, Docker, Nginx, Let's Encrypt, and a custom domain.

---

# 🎯 Deployment Overview

The deployment process consists of the following stages:

1. Prepare AWS Infrastructure
2. Configure the EC2 Instance
3. Clone the Repository
4. Configure Environment Variables
5. Build Docker Containers
6. Configure Nginx
7. Connect the Custom Domain
8. Enable HTTPS
9. Verify Deployment

---

# 🧰 Prerequisites

Before deployment, ensure the following services are available:

| Requirement | Status |
|-------------|--------|
| AWS Account | ✅ |
| Ubuntu EC2 Instance | ✅ |
| Elastic IP | ✅ |
| MongoDB Atlas | ✅ |
| AWS S3 Bucket | ✅ |
| Groq API Key | ✅ |
| Docker & Docker Compose | ✅ |
| Git | ✅ |
| Nginx | ✅ |
| Certbot | ✅ |
| Custom Domain | ✅ |

---

# ☁️ Step 1 — Prepare AWS EC2

- Launch an Ubuntu EC2 instance.
- Attach an Elastic IP.
- Configure Security Groups.
- Allow:
  - SSH (22)
  - HTTP (80)
  - HTTPS (443)

---

# 🔑 Step 2 — Connect to the Server

```bash
ssh -i "hirematch-key.pem" ubuntu@<EC2_PUBLIC_IP>
```

---

# 📦 Step 3 — Clone Repository

```bash
git clone <repository-url>
cd Ai-Resume-Analyzer
```

---

# ⚙️ Step 4 — Configure Environment Variables

Create the backend `.env` file.

Required variables include:

- MongoDB URI
- JWT Secret
- AWS Credentials
- S3 Bucket Name
- Groq API Key
- Cookie Configuration

---

# 🐳 Step 5 — Build Docker Containers

```bash
docker compose up --build -d
```

Verify:

```bash
docker ps
```

---

# 🌐 Step 6 — Configure Nginx

- Create a production server block.
- Configure reverse proxy.
- Route frontend requests.
- Forward `/api` requests to Express.

Test configuration:

```bash
sudo nginx -t
```

Restart:

```bash
sudo systemctl restart nginx
```

---

# 🌍 Step 7 — Configure Domain

Inside your DNS provider:

- Point the root domain to the EC2 Elastic IP.
- Configure the `www` record.
- Wait for DNS propagation.

---

# 🔒 Step 8 — Enable HTTPS

Generate SSL certificates:

```bash
sudo certbot --nginx
```

Verify:

```bash
https://hirematch.xyz
```

---

# ✅ Step 9 — Verify Deployment

Confirm:

- User Registration
- Login
- Resume Upload
- Resume Analysis
- Resume History
- Profile
- HTTPS
- Rate Limiting

All features should function correctly.

---

# 🔄 Updating the Application

Whenever new code is deployed:

```bash
git pull

docker compose up --build -d
```

---

# 🛠️ Useful Commands

### Docker

```bash
docker ps
docker images
docker logs hirematch-backend
docker logs hirematch-frontend
docker compose down
docker compose up -d
```

---

### Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

---

### SSL

```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

---

# 📖 Related Documentation

- Docker Architecture
- Nginx Reverse Proxy
- HTTPS Setup
- AWS Infrastructure
- Deployment Architecture