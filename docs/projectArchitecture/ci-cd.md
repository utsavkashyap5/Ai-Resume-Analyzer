# 🔄 Continuous Integration & Continuous Deployment (CI/CD)

> [!NOTE]
> This document explains how HireMatch automatically builds, deploys, and validates every production release using GitHub Actions, Docker, and AWS EC2.

---

# 🎯 Objective

The CI/CD pipeline eliminates manual deployment by automatically deploying every successful push to the **main** branch.

The primary goals are:

- 🚀 Zero-touch deployment
- 🔐 Secure authentication
- 🐳 Automated container deployment
- ❤️ Production health verification
- ☁️ Cloud-native deployment
- 📈 Faster development cycle
- 🛡️ Reliable production releases

Instead of manually connecting to the production server after every code change, the deployment process is fully automated and validated before being considered successful.

---

# 🏗️ CI/CD Architecture Components

| Component | Responsibility |
|------------|----------------|
| 👨‍💻 Developer | Writes code and pushes changes |
| 📦 GitHub Repository | Stores source code and triggers workflows |
| ⚙️ GitHub Actions | Executes the deployment workflow |
| 🔐 GitHub Secrets | Securely stores deployment credentials |
| ☁️ AWS EC2 | Production application server |
| 🐳 Docker Compose | Builds and manages application containers |
| ❤️ Health Check API | Validates deployment success |

---

# 🔄 Deployment Lifecycle

Every deployment follows a predictable sequence.

### 1️⃣ Code Changes

The developer modifies the application locally.

Examples include:

- New Features
- Bug Fixes
- UI Improvements
- Documentation Updates

---

### 2️⃣ Git Push

The updated code is pushed to the **main** branch.

```bash
git push origin main
```

This immediately triggers the GitHub Actions workflow.

---

### 3️⃣ GitHub Actions Trigger

GitHub detects the push event and creates a fresh Ubuntu Runner.

The runner executes the deployment workflow defined in:

```text
.github/workflows/deploy.yml
```

---

### 4️⃣ Secure Authentication

The workflow loads deployment secrets securely.

Repository Secrets:

- SSH_PRIVATE_KEY
- EC2_HOST

Using these secrets, GitHub establishes a secure SSH connection with the production EC2 instance.

No credentials are stored inside the repository.

---

### 5️⃣ Production Deployment

After connecting to EC2, the workflow executes:

```bash
cd /home/ubuntu/Ai-Resume-Analyzer

git pull origin main

docker compose up --build -d
```

This updates the production server with the latest application code and rebuilds only the required containers.

---

### 6️⃣ Health Verification

Deployment is not considered successful until the backend responds correctly.

The workflow verifies:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

If the endpoint does not respond successfully, the workflow immediately fails.

---

### 7️⃣ Successful Deployment

Once every step completes successfully:

- New containers are running
- Production website is updated
- Previous containers are replaced
- Deployment finishes automatically

No manual server interaction is required.

---

# 🔐 Security Architecture

The deployment pipeline follows modern DevOps security practices.

### GitHub Secrets

Sensitive information never exists inside the repository.

Secrets include:

- SSH Private Key
- EC2 Host

---

### SSH Authentication

GitHub authenticates using an independent deployment key.

Developer SSH keys remain completely separate from deployment credentials.

This allows deployment access to be revoked without affecting developer access.

---

### Principle of Least Privilege

GitHub Actions receives only the permissions required for deployment.

It cannot access unrelated infrastructure or services.

---

# ❤️ Deployment Validation

Deployment success depends on more than successful execution.

Validation includes:

- Successful Git Pull
- Docker Build Completion
- Container Startup
- Backend Health Endpoint
- Exit Status Verification

Only after every validation succeeds is the deployment marked successful.

---

# 📈 Current Deployment Workflow

The current production deployment consists of:

1. Push to `main`
2. Trigger GitHub Actions
3. Checkout Repository
4. Load Repository Secrets
5. Connect to AWS EC2
6. Pull Latest Code
7. Rebuild Docker Containers
8. Verify Backend Health
9. Complete Deployment

---

# 🚀 Future Improvements

The architecture has been designed to support additional DevOps features such as:

- ✅ Continuous Integration Testing
- ✅ Automatic Rollback
- ✅ Deployment Notifications
- ✅ Staging Environment
- ✅ Branch-based Deployments
- ✅ Docker Layer Caching
- ✅ Blue-Green Deployment
- ✅ Kubernetes Migration

without requiring significant architectural changes.

---

# 📖 Related Documentation

Additional deployment documentation:

- 🐳 docker.md
- ☁️ aws.md
- 🌐 nginx.md
- 🔒 security.md
- 🚀 deploymentGuide.md
- 📊 diagrams/ci-cd.md

---

> [!IMPORTANT]
> This document explains the deployment architecture only. A detailed visual workflow illustrating every deployment stage is documented separately in **`docs/diagrams/ci-cd.md`**.