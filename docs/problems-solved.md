# 🐛 Problems Solved

> [!NOTE]
> This document records the major technical challenges encountered while building HireMatch and the solutions implemented. These experiences significantly improved debugging skills and architectural understanding.

---

# 🎯 Objective

Every production project encounters challenges. Rather than hiding them, this document captures the debugging process and engineering decisions behind each solution.

---

# 🔐 Authentication Issues

## Problem

JWT authentication occasionally returned unauthorized responses.

### Root Cause

Authentication cookies were not being sent correctly between the frontend and backend.

### Solution

- Configured HTTP-only cookies.
- Enabled `withCredentials`.
- Updated CORS configuration.

---

# 🌐 Axios API Calls

## Problem

Frontend API requests failed after deployment.

### Root Cause

Requests were still pointing to `localhost`.

### Solution

- Introduced relative API paths.
- Routed requests through Nginx.

---

# 🐳 Docker Networking

## Problem

Containers could not communicate reliably.

### Root Cause

Application relied on localhost instead of Docker networking.

### Solution

- Used Docker Compose networking.
- Communicated using service names.
- Restricted exposed ports to localhost.

---

# ☁️ AWS Elastic IP

## Problem

The application became unreachable after instance restarts.

### Root Cause

Public IP addresses changed.

### Solution

Attached an Elastic IP to the EC2 instance.

---

# 🌍 DNS Configuration

## Problem

Custom domain configuration failed.

### Root Cause

Conflicting DNS records.

### Solution

Removed conflicting records and updated A/CNAME entries.

---

# 🔒 HTTPS Configuration

## Problem

The website was served over HTTP.

### Root Cause

SSL certificates were missing.

### Solution

- Installed Certbot.
- Generated Let's Encrypt certificates.
- Configured Nginx for HTTPS.

---

# 🔑 SSH Connectivity

## Problem

SSH connection timed out.

### Root Cause

Security Group rules restricted SSH access.

### Solution

Updated inbound rules and verified the correct public IPv4 address.

---

# 🤖 AI Integration

## Problem

LLM responses were inconsistent.

### Root Cause

Prompt design allowed unstructured responses.

### Solution

Designed a strict JSON prompt with explicit formatting rules.

---

# 📄 Resume Processing

## Problem

AI analysis depended on uploaded PDF files.

### Root Cause

The backend sent raw files directly to the LLM.

### Solution

Introduced a preprocessing pipeline:

- Extract Text
- Clean Text
- Store in MongoDB
- Analyze only cleaned text

This reduced processing complexity and improved consistency.

---

# 🧹 Documentation

## Problem

Project knowledge became difficult to track.

### Root Cause

Important architectural decisions were undocumented.

### Solution

Created a dedicated `docs/` directory with architecture, diagrams, deployment guides, API documentation, and engineering notes.

---

# 🎯 Biggest Problem Solved

The most significant improvement was transforming HireMatch from a locally running MERN application into a fully deployed production system featuring Docker, Nginx, HTTPS, AWS infrastructure, cloud storage, AI integration, and comprehensive documentation.