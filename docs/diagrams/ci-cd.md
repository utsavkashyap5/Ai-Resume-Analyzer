# 🔄 Continuous Integration & Continuous Deployment

> [!NOTE]
> Every push to the `main` branch automatically triggers a production deployment. No manual SSH, no manual Docker commands, and no manual server updates are required.

---

# 🚀 Production Deployment Pipeline

<div align="center">

```text

                                        🚀 HIREMATCH CI/CD PIPELINE


     ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
     │                             👨‍💻 Developer Workstation                                         │
     └───────────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           │
                                 Code Changes & Bug Fixes
                                           │
                                           ▼
                                  git push origin main
                                           │
                                           ▼

══════════════════════════════════════════════════════════════════════════════════════════════════════════════

                                    📦 GitHub Repository (main)

══════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                           │
                                           │ Push Event
                                           ▼

     ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
     │                            ⚙️ GitHub Actions Workflow                                          │
     │                                                                                               │
     │                     .github/workflows/deploy.yml                                              │
     └───────────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼

                            ☁️ Ubuntu Runner (Temporary VM)

                                           │
                                           ▼

                                  📥 Checkout Repository

                                           │
                                           ▼

                              🔐 Load GitHub Repository Secrets

                               • SSH_PRIVATE_KEY
                               • EC2_HOST

                                           │
                                           ▼

══════════════════════════════════════════════════════════════════════════════════════════════════════════════

                                   🔒 Secure SSH Connection

══════════════════════════════════════════════════════════════════════════════════════════════════════════════

                                           │
                                           ▼

                                 ☁️ AWS EC2 Ubuntu Server

                                           │
                                           ▼

                        cd /home/ubuntu/Ai-Resume-Analyzer

                                           │
                                           ▼

                                  git pull origin main

                                           │
                                           ▼

                           docker compose up --build -d

                                           │
                                           ▼

                           ❤️ Backend Health Verification

                       curl http://localhost:3000/api/health

                                           │
                         ┌─────────────────┴─────────────────┐
                         │                                   │
                         ▼                                   ▼

                  ✅ Health Check Passed             ❌ Health Check Failed

                         │                                   │
                         ▼                                   ▼

               🌍 Production Updated             GitHub Workflow Fails

                         │
                         ▼

              https://hirematch.xyz 🚀 Live


```

</div>

---

# ✨ Pipeline Highlights

| Feature | Status |
|---------|--------|
| 🚀 Automatic Deployment | ✅ |
| 🔐 SSH Authentication | ✅ |
| ☁️ AWS EC2 Deployment | ✅ |
| 🐳 Docker Compose | ✅ |
| ❤️ Health Check | ✅ |
| 🌐 HTTPS Enabled | ✅ |
| 🔄 Zero Manual Deployment | ✅ |
| 🧹 Docker Cleanup | ✅ |

---

> [!TIP]
> The entire deployment process is fully automated. Developers only need to push code to the `main` branch—GitHub Actions handles authentication, deployment, health verification, and updates the live production server automatically.