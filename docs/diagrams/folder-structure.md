# 📁 Folder Structure — HireMatch: AI Resume Analyzer

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           HIRE MATCH                                       │
│                    AI-Powered Resume Analyzer                              │
└────────────────────────────────────────────────────────────────────────────┘

                                ┌──────────────┐
                                │  docker-     │
                                │  compose.yml  │
                                └──────────────┘

       ┌──────────────────────────────┬──────────────────────────────┐
       │                              │                              │
       ▼                              ▼                              ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────────┐
│   frontend   │             │   backend    │             │      docs        │
│  (React +    │             │  (Node.js +  │             │  (Documentation)  │
│   Vite)      │             │   Express)   │             │                  │
└──────┬───────┘             └──────┬───────┘             └────────┬─────────┘
       │                            │                              │
       │                            │                              │
┌──────┴──────────┐          ┌──────┴──────────┐          ┌───────┴──────────┐
│    public/      │          │    config/      │          │  architecture/   │
│  (Static        │          │  (DB, env,      │          │  (System design  │
│   assets)       │          │   app config)   │          │   docs)          │
└─────────────────┘          └─────────────────┘          └──────────────────┘
│                            │                              │
┌──────┴──────────┐          ┌──────┴──────────┐          ┌───────┴──────────┐
│    src/         │          │  controllers/   │          │    diagrams/     │
│  (React         │          │  (Request       │          │  (Architecture   │
│   source code)  │          │   handlers)     │          │   visuals)       │
└──────┬──────────┘          └─────────────────┘          └──────────────────┘
       │                     ┌─────────────────┐          ┌──────────────────┐
       │                     │  middleware/     │          │     images/      │
       │                     │  (Auth, upload,  │          │  (Screenshots,   │
       │                     │   validation)    │          │   assets)        │
       │                     └─────────────────┘          └──────────────────┘
       │                     ┌─────────────────┐          ┌──────────────────┐
       │                     │    models/       │          │ project-        │
       │                     │  (Mongoose       │          │ overview.md     │
       │                     │   schemas)       │          └──────────────────┘
       │                     └─────────────────┘          ┌──────────────────┐
       │                     ┌─────────────────┐          │ tech-stack.md    │
       │                     │    routes/       │          └──────────────────┘
       │                     │  (API route      │          ┌──────────────────┐
       │                     │   definitions)   │          │ roadmap.md       │
       │                     └─────────────────┘          └──────────────────┘
       │                     ┌─────────────────┐          ┌──────────────────┐
       │                     │   services/      │          │ changelog.md     │
       │                     │  (Business       │          └──────────────────┘
       │                     │   logic, AI)     │
       │                     └─────────────────┘
       │                     ┌─────────────────┐
       │                     │    utils/        │
       │                     │  (Helpers,       │
       │                     │   formatters)    │
       │                     └─────────────────┘
       │                     ┌─────────────────┐
       │                     │   uploads/       │
       │                     │  (Resume files   │
       │                     │   temp storage)  │
       │                     └─────────────────┘
       │                     ┌──────────────────┬─────────────────┐
       │                     │   server.js       │  Dockerfile     │
       │                     │  (Entry point)    │  package.json   │
       │                     └──────────────────┴─────────────────┘
       │
┌──────┴──────────────────────────────────────────────────────────────────┐
│                           frontend/src/                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌──────────┐              │
│  │ assets/  │  │components/ │  │ context/ │  │  hooks/  │              │
│  │ (images, │  │ (Reusable  │  │ (React   │  │ (Custom  │              │
│  │  fonts,  │  │  UI parts) │  │  Context │  │  hooks)  │              │
│  │  styles) │  └────────────┘  │  provi-  │  └──────────┘              │
│  └──────────┘                  │  ders)   │                             │
│                                └──────────┘                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐              │
│  │layouts/  │  │  pages/  │  │  routes/   │  │services/ │              │
│  │ (Page    │  │ (Route   │  │ (Route     │  │ (API     │              │
│  │  shells) │  │  views)  │  │  config)   │  │  calls)  │              │
│  └──────────┘  └──────────┘  └────────────┘  └──────────┘              │
│                                                                         │
│  ┌────────┐  ┌────────────┐                                             │
│  │utils/  │  │  App.jsx   │  main.jsx                                   │
│  │(Helpers)│ │ (Root      │  (Entry point)                              │
│  └────────┘  │  component)│                                             │
│              └────────────┘                                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          ROOT FILES                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  docker-compose.yml   — Multi-container orchestration (FE + BE + DB)   │
│  README.md             — Project overview & setup instructions          │
│  LICENSE               — Open-source license                            │
│  .gitignore            — Ignored files for version control             │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 📌 Legend

| Symbol | Meaning |
|--------|---------|
| `📁 folder/` | Directory |
| `📄 file` | Source / config file |
| `—` | Description separator |
| `│ ─ ┬ └` | Box-drawing connectors |
