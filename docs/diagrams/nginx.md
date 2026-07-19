# 🌐 Nginx Reverse Proxy Diagram

> [!NOTE]
> This document illustrates how Nginx routes requests between the internet and the internal Docker containers.

---

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                    🌐 HIREMATCH NGINX REVERSE PROXY                          │
└──────────────────────────────────────────────────────────────────────────────┘


                           🌍 Internet
                                │
                                │ HTTPS (443)
                                ▼
                      ┌──────────────────────┐
                      │        Nginx         │
                      │   Reverse Proxy      │
                      │  SSL Termination     │
                      └──────────┬───────────┘
                                 │
                 ┌───────────────┴────────────────┐
                 │                                │
                 ▼                                ▼

      Frontend Requests                     API Requests
      ( / , /dashboard )                 ( /api/* )

                 │                                │
                 ▼                                ▼

      ┌────────────────────┐        ┌────────────────────┐
      │ Frontend Container │        │ Backend Container  │
      │────────────────────│        │────────────────────│
      │ React Production   │        │ Express.js API     │
      │ 127.0.0.1:5173     │        │ 127.0.0.1:3000     │
      └────────────────────┘        └────────────────────┘

```

</div>

---

## 📌 Summary

- Nginx is the only publicly exposed service.
- HTTPS traffic terminates at Nginx.
- Frontend requests are served by the React container.
- API requests are forwarded to the Express backend.
- Internal Docker ports remain inaccessible from the public internet.

---

> [!TIP]
> Nginx acts as the gateway between users and the Dockerized application, providing routing, HTTPS, security, and efficient request handling.