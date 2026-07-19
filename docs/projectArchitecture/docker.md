# 🐳 Docker Architecture

> [!NOTE]
> This document explains how Docker is used within HireMatch to provide a consistent, isolated, and production-ready deployment environment.

---

# 🎯 Objective

Docker enables HireMatch to run consistently across development and production by packaging the application and its dependencies into isolated containers.

The primary objectives include:

- Environment consistency
- Simplified deployment
- Container isolation
- Dependency management
- Production-ready infrastructure
- Easy scalability

---

# 🧩 Container Overview

HireMatch currently consists of two application containers.

| Container | Responsibility |
|-----------|----------------|
| 🎨 Frontend Container | Serves the React application through Nginx. |
| ⚙️ Backend Container | Hosts the Express.js REST API and business logic. |

Both containers are orchestrated using **Docker Compose**.

---

# 📊 Container Communication

The complete Docker architecture diagram is maintained separately.

➡️ **Diagram:** `docs/diagrams/docker.md`

---

# 📦 Frontend Container

The frontend container is responsible for:

- Serving the React production build
- Hosting static assets
- Handling client-side routing
- Forwarding API requests through Nginx

The container exposes **port 80 internally**, while Docker maps it to **127.0.0.1:5173** on the EC2 instance.

---

# ⚙️ Backend Container

The backend container is responsible for:

- Authentication
- Resume upload
- Resume processing
- AI communication
- Database interaction
- AWS S3 integration

The backend listens on **port 3000**, mapped to **127.0.0.1:3000**.

---

# 🔗 Container Communication

Docker Compose automatically creates an internal network where containers communicate securely.

The frontend communicates with the backend using the Docker service name rather than public IP addresses.

This keeps inter-container communication isolated from the public internet.

---

# 🔄 Startup Workflow

When Docker Compose starts:

1. Docker builds both images.
2. Containers are created.
3. Internal Docker network is established.
4. Backend starts first.
5. Frontend starts.
6. Nginx serves the React application.
7. Application becomes accessible through the domain.

---

# 🔒 Security Considerations

Several deployment decisions improve security.

- Containers are not publicly exposed.
- Services are bound to localhost.
- Nginx is the only public entry point.
- Internal communication occurs over Docker's private network.
- Environment variables remain outside the images.

---

# ⚙️ Docker Compose Responsibilities

Docker Compose manages:

- Multi-container orchestration
- Build process
- Restart policies
- Internal networking
- Container lifecycle

---

# 🎯 Key Design Decisions

Several architectural decisions improved deployment quality.

- Separate frontend and backend containers.
- Use Docker Compose instead of manually starting containers.
- Restrict container ports to localhost.
- Delegate public traffic handling to Nginx.
- Build production-ready images instead of running development servers.

---

# 📈 Future Improvements

Planned enhancements include:

- Multi-stage Docker builds
- Health checks
- Image optimization
- CI/CD image deployment
- Docker image registry
- Kubernetes migration

---

# 📖 Related Documentation

- System Architecture
- Deployment Architecture
- AWS Infrastructure
- Nginx Reverse Proxy
- Security Architecture