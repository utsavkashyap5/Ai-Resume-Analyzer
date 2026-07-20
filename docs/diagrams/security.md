# 🛡️ Security Architecture Diagram

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                    🛡️ HIREMATCH SECURITY ARCHITECTURE                        │
└──────────────────────────────────────────────────────────────────────────────┘


                  👤 User Browser
                         │
                    HTTPS (443)
                         │
                         ▼
                     Nginx SSL
                         │
                  HTTP-only Cookie
                         │
                         ▼
                  Express Middleware
                         │
                 Verify JWT Token
                         │
                 ┌───────┴────────┐
                 │                │
                 ▼                ▼
            Authorized      Unauthorized
                 │                │
                 ▼                ▼
          Protected APIs       401 Error
                 │
                 ▼
             MongoDB Atlas

```

</div>