# High Level Architecture

The platform is built using a multi-tenant architecture where each tenant has isolated:

- users
- API keys
- request logs
- usage analytics

The system consists of:

- React frontend
- Express backend
- PostgreSQL database
- Redis queue system
- BullMQ workers

---

# High Level Architecture

```txt
Frontend (React)
       │
       v
Backend API (Express)
       │
       ├── PostgreSQL (Prisma ORM)
       │
       └── Redis Queue
               │
               v
         BullMQ Workers
```

---

# Frontend Architecture

## Stack

- React
- Vite
- React Router
- TanStack Query
- TailwindCSS
- shadcn/ui
- Recharts

---

## State Management

TanStack Query is used for:

- server state caching
- automatic refetching
- mutations
- query invalidation
- user session
- API keys
- usage analytics
- tenant members

---

## Routing

Protected routes are handled using authentication checks from:

```txt
/user/me
```

Unauthenticated users are redirected to:

```txt
/login
```

---

# Backend Architecture

## Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ

---

## Backend Layers

```txt
Routes
  ↓
Controllers
  ↓
Services
  ↓
Prisma ORM
  ↓
PostgreSQL
```

### Routes
Handle API endpoints.

### Controllers
Handle request/response flow.

### Services
Contain business logic.

### Prisma ORM
Handles database queries and relationships.

---

# Authentication Flow

Authentication uses JWT tokens.

## Flow

```txt
Login/Register
      ↓
Generate JWT
      ↓
Frontend stores token in HttpCookie
      ↓
Token sent in Authorization header
      ↓
Backend auth middleware verifies token
```

---

# Multi Tenant Isolation

Each resource belongs to a tenant using:

```txt
tenant_id
```

All queries are filtered using the authenticated user's tenant.

This prevents tenants from accessing each other's:
- users
- logs
- API keys
- analytics

---

# API Key System

Generated API keys contain:

- raw key (shown only once, can copy)
- hashed version stored in DB
- rate limit configuration

## Flow

```txt
Client sends API key
       ↓
Hash incoming key
       ↓
Compare with stored hash
       ↓
Validate key + tenant
```

---

# Request Logging System

Every API request stores:

- path
- method
- status code
- response time
- API key
- tenant

Logging is handled asynchronously using queues.

---

# Queue Architecture

BullMQ + Redis are used for background processing.

---

## Worker Responsibilities

### Request Log Worker
Stores request logs asynchronously.

### Usage Aggregation Worker
Updates API usage statistics.

---

# Request Lifecycle

```txt
Incoming Request
       ↓
Auth Middleware
       ↓
API Key Validation
       ↓
Controller Logic
       ↓
Response Sent
       ↓
Queue Job Added
       ↓
Worker Processes Job
       ↓
Logs + Usage Stored
```

---

# Database Design

Main entities:

- Tenant
- User
- ApiKey
- RequestLog
- ApiUsage

---

# Relationships

## Tenant
Has many:
- users
- API keys
- logs
- usage records

## User
Belongs to one tenant.

## ApiKey
Belongs to:
- tenant
- creator user

## RequestLog
Belongs to:
- tenant
- API key

## ApiUsage
Stores aggregated request counts per:
- API key
- path
- date

---

# Role Based Access

## ADMIN

Can:
- edit tenant name
- add members
- generate API keys
- delete API keys
- view usage
- view logs
- use APIs

## MEMBER

Can:
- view usage
- view logs
- use APIs

Restricted from tenant management actions.

---

# Docker Architecture

Services run in isolated containers:

```txt
postgres
redis
backend
frontend
```