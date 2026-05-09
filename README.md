# multi-tenant-api-platform

A multi-tenant API management platform built with Node.js, Express, PostgreSQL, Prisma, Redis, BullMQ, React, and Docker.

Users can:

- Create tenants/workspaces
- Generate API keys
- Track API usage
- View request logs
- Test APIs using generated keys
- Manage tenant members

---

# Tech Stack

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- JWT Authentication

## Frontend
- React
- Vite
- TailwindCSS
- shadcn/ui
- TanStack Query
- React Router

## DevOps
- Docker

---

# Features

## Authentication
- Register/Login
- JWT based auth
- Protected routes

## Multi Tenant System
- Each tenant has:
  - users
  - api keys
  - usage
  - logs

## API Key Management
- Generate API keys
- Delete/Revoke keys
- Rate limit support
- Raw key shown once

## Usage Analytics
- Daily request counts
- Weekly usage
- Active API keys
- Usage charts
- API usage logs

## Request Logging
Every API request stores:
- path
- method
- response time
- status code
- tenant
- api key

## Tenant Management
- Edit tenant name
- Add tenant members
- Role based access

## Background Jobs
BullMQ workers process:
- request logging
- usage aggregation

## Scheduled Jobs
BullMQ workers process:
- clean logs older than 30 days everyday at 2am
- log daily usage summary every day at midnight

---

# Project Structure

```
project-root/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# Setup

## 1. Create .env

```env
POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=Pass123
POSTGRES_DB=multi_tenant_api_platform
POSTGRES_PORT=5432

REDIS_PORT=6379
REDIS_HOST=redis

FRONTEND_PORT=5173
BACKEND_PORT=3000

DATABASE_URL=postgresql://postgres_user:Pass123@postgres:5432/multi_tenant_api_platform

API_KEY_SECRET=apikeysecret
JWT_SECRET=supersecret
```

---

## 2. Start Docker Containers

```bash
docker compose up --build
```

---

## 3. Run Prisma Migrations

```bash
docker compose exec backend npx prisma migrate dev
```

---

## 4. Seed Database

```bash
docker compose exec backend npx prisma db seed
```

---

# Access App

Frontend:
```txt
http://localhost:5173
```

Backend:
```txt
http://localhost:3000
```

Prisma Studio:
```txt
http://localhost:5555
```
---

## Postman Collection

Postman collection in the `/postman` folder.

---

# Documentation

- [API Overview](./docs/API.md)
- [High Level Architecture](./docs/ARCHITECTURE.md)
- [Database Design](./docs/DATABASE.md)

---

# Future Improvements

- API key expiration
- usage quotas
- email-based tenant invitations
- advanced analytics dashboard
- pagination for logs and usage tables
- search and filtering
- real time logs using WebSockets
- Horizontal worker scaling to handle more workload
- API key permissions/scopes
- CI/CD pipeline integration

