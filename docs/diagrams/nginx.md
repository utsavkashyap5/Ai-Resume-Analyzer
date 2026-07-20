# 🌐 Nginx Reverse Proxy Diagram

> [!NOTE]
> This diagram illustrates how requests travel from the internet to the HireMatch application. It highlights the role of DNS, HTTPS, Nginx, Docker networking, and the application containers.

---

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                  🌐 HIREMATCH PRODUCTION REQUEST FLOW                                    │
└──────────────────────────────────────────────────────────────────────────────────────────┘


                               🌍 Internet
                                    │
                                    ▼
                        https://hirematch.xyz
                                    │
                                    ▼
                       GoDaddy DNS Resolution
                                    │
                                    ▼
                           AWS Elastic IP
                                    │
                                    ▼
                     ┌──────────────────────────┐
                     │     AWS EC2 Instance     │
                     │      Ubuntu Server       │
                     └─────────────┬────────────┘
                                   │
                          HTTPS :443 / HTTP :80
                                   │
                                   ▼
                     ┌──────────────────────────┐
                     │         Nginx            │
                     │──────────────────────────│
                     │ • Reverse Proxy          │
                     │ • SSL Termination        │
                     │ • Request Routing        │
                     │ • Static File Serving    │
                     └─────────────┬────────────┘
                                   │
                         Docker Internal Network
                                   │
             ┌─────────────────────┴─────────────────────┐
             │                                           │
             ▼                                           ▼

 ┌──────────────────────────┐              ┌──────────────────────────┐
 │   Frontend Container      │              │   Backend Container      │
 │──────────────────────────│              │──────────────────────────│
 │ React Production Build    │              │ Express REST API         │
 │ Nginx Static Server       │              │ Authentication           │
 │ Internal Port :80         │              │ Resume Processing        │
 └─────────────┬────────────┘              │ AI Integration           │
               │                           │ Internal Port :3000      │
               │                           └─────────────┬────────────┘
               │                                         │
               │                                         │
               │                    ┌────────────────────┴────────────────────┐
               │                    │                                         │
               ▼                    ▼                                         ▼

      MongoDB Atlas           AWS S3 Storage                          Groq LLM API
      User Data               Original PDF Files                     Resume Analysis
      Resume Data
      AI Results

```

</div>

---

## 📌 Request Flow

1. User opens **https://hirematch.xyz**
2. GoDaddy resolves the domain to the AWS Elastic IP.
3. The request reaches the EC2 instance.
4. Nginx accepts the HTTPS connection.
5. SSL/TLS is terminated by Nginx.
6. Nginx decides where to route the request.
7. Frontend requests are served by the React container.
8. API requests are forwarded to the Express backend.
9. Backend communicates with:
   - MongoDB Atlas
   - AWS S3
   - Groq AI
10. JSON response is returned to the frontend.
11. React renders the updated UI.

---

## 📌