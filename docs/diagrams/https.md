# 🔒 HTTPS Setup Diagram

> [!NOTE]
> This document illustrates how HTTPS is configured in the production deployment of HireMatch.

---

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                        🔒 HIREMATCH HTTPS ARCHITECTURE                       │
└──────────────────────────────────────────────────────────────────────────────┘


                           👤 User Browser
                                 │
                                 │ HTTPS (443)
                                 ▼
                        🌍 hirematch.xyz
                                 │
                                 ▼
                        GoDaddy DNS Records
                                 │
                                 ▼
                        AWS Elastic IP Address
                                 │
                                 ▼
                     ┌────────────────────────┐
                     │         Nginx          │
                     │────────────────────────│
                     │ SSL Termination        │
                     │ Let's Encrypt Cert     │
                     │ Certbot Integration    │
                     └───────────┬────────────┘
                                 │
                      Internal HTTP Requests
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼

      ┌────────────────────┐          ┌────────────────────┐
      │ Frontend Container │          │ Backend Container  │
      │────────────────────│          │────────────────────│
      │ React Production   │          │ Express.js API     │
      │ Port :5173         │          │ Port :3000         │
      └────────────────────┘          └────────────────────┘

                                 │
                                 ▼
                     🔄 Automatic Renewal
                                 │
                                 ▼
                     Certbot → Let's Encrypt

```

</div>

---

## 📌 Summary

- DNS resolves the custom domain to the EC2 instance.
- Nginx handles all HTTPS requests.
- Let's Encrypt provides free SSL certificates.
- Certbot automates certificate issuance and renewal.
- Docker containers communicate internally over HTTP.
- Only HTTPS is exposed to the public.

---

> [!TIP]
> Separating SSL management from the application simplifies deployment and allows certificates to be renewed without modifying the application code.