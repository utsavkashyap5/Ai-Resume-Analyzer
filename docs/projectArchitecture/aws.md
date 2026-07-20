# ☁️ AWS Infrastructure Architecture

> [!NOTE]
> This document describes how Amazon Web Services (AWS) is used within HireMatch to provide secure, scalable, and production-ready cloud infrastructure.

---

# 🎯 Objective

AWS provides the cloud infrastructure required to deploy, host, and operate HireMatch in a production environment.

The infrastructure was designed to achieve:

- Reliable application hosting
- Secure resume storage
- Persistent networking
- Production-grade deployment
- Scalability
- High availability

---

# 🧩 AWS Services Used

| Service | Purpose |
|----------|---------|
| 🚀 Amazon EC2 | Hosts the production application |
| ☁️ Amazon S3 | Stores uploaded PDF resumes |
| 🌐 Elastic IP | Provides a static public IP |
| 🔐 Security Groups | Controls inbound and outbound traffic |

---

# 📊 AWS Infrastructure Diagram

The complete AWS architecture is documented separately.

➡️ **Diagram:** `docs/diagrams/aws.md`

---

# 🖥️ Amazon EC2

Ubuntu EC2 hosts:

- Docker Engine
- Frontend Container
- Backend Container
- Nginx
- Certbot

EC2 acts as the production server.

---

# ☁️ Amazon S3

AWS S3 stores:

- Original PDF resumes

The application never stores uploaded PDFs permanently on the EC2 instance.

---

# 🌍 Elastic IP

Elastic IP provides:

- Static IPv4 Address
- Stable DNS Mapping
- Persistent Public Endpoint

Without Elastic IP, restarting the instance could change the public IP.

---

# 🔐 Security Groups

Configured Rules:

| Port | Purpose |
|------|----------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |

---

# 🔄 Infrastructure Workflow

1. User accesses HireMatch.
2. DNS resolves the domain.
3. Traffic reaches the EC2 instance.
4. Nginx routes requests.
5. Docker containers process requests.
6. Backend stores PDFs in AWS S3.
7. MongoDB stores structured application data.

---

# ⚙️ Design Decisions

- EC2 instead of managed hosting.
- S3 for object storage.
- Elastic IP for stable deployments.
- Security Groups instead of exposing all ports.

---

# 📈 Future Improvements

- Application Load Balancer
- Auto Scaling Groups
- CloudFront CDN
- AWS Secrets Manager
- CloudWatch Monitoring
- AWS WAF

---

# 📖 Related Documentation

- Docker Architecture
- Nginx Architecture
- HTTPS Setup
- Deployment Guide