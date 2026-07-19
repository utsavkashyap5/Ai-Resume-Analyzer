# 🐳 Docker Architecture Diagram

> [!NOTE]
> This document illustrates how Docker containers communicate within HireMatch.

---

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                     🐳 HIREMATCH DOCKER ARCHITECTURE                         │
└──────────────────────────────────────────────────────────────────────────────┘


                           🌍 Internet
                                │
                                ▼
                        https://hirematch.xyz
                                │
                                ▼
                       ┌─────────────────┐
                       │      Nginx      │
                       │ Reverse Proxy   │
                       └────────┬────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
                 ▼                             ▼

      ┌────────────────────┐        ┌────────────────────┐
      │ Frontend Container │        │ Backend Container  │
      │────────────────────│        │────────────────────│
      │ React Production   │        │ Express.js API     │
      │ Static Assets      │        │ Business Logic     │
      │ Port 80            │        │ Port 3000          │
      └─────────┬──────────┘        └─────────┬──────────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                   Docker Internal Network
                               │
        ┌──────────────────────┴──────────────────────┐
        ▼                                             ▼

┌──────────────────────┐                  ┌──────────────────────┐
│   MongoDB Atlas      │                  │      AWS S3          │
│ Resume & User Data   │                  │  Resume Storage      │
└──────────────────────┘                  └──────────────────────┘

```

</div>

---

## 📌 Summary

- Docker isolates frontend and backend into independent containers.
- Docker Compose manages container orchestration.
- Containers communicate through Docker's internal network.
- Nginx is the only publicly exposed service.
- External services (MongoDB Atlas & AWS S3) remain outside the Docker network.