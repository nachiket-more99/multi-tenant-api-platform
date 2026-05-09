# Database Design

The application uses PostgreSQL as the database with Prisma ORM for schema management and querying.

The database is designed around a multi-tenant architecture where all major resources are isolated using:

```txt
tenant_id
```

This makes sure that tenants cannot access each other’s:
- users
- API keys
- request logs
- analytics

---

# Core Entities

## Tenant

Represents an organization/workspace.

Each tenant owns:
- users
- API keys
- request logs
- usage analytics

### Fields

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| name | String | Tenant/workspace name |
| created_at | DateTime | Creation timestamp |

---

## User

Represents authenticated users inside a tenant.

Users can have different roles:
- ADMIN
- MEMBER

### Fields

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| tenant_id | Int | Tenant reference |
| email | String | Unique email |
| hash_password | String | Hashed password |
| role | Role | User role |
| created_at | DateTime | Creation timestamp |

---

## ApiKey

Stores generated API keys.

The raw API key is never stored directly.
Only hashed versions are stored in the database.

### Fields

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| tenant_id | Int | Tenant reference |
| created_by | Int | User who created key |
| hash_key | String | Hashed API key |
| key_prefix | String | Visible short prefix |
| rate_limit | Int | Requests per minute |
| is_active | Boolean | Active/revoked status |
| last_used | DateTime | Last usage timestamp |
| created_at | DateTime | Creation timestamp |

---

## RequestLog

Stores individual API request logs.

Logs are inserted asynchronously using BullMQ workers.

### Fields

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| tenant_id | Int | Tenant reference |
| api_key_id | Int | API key reference |
| path | String | API route |
| method | String | HTTP method |
| status_code | Int | Response status |
| response_time | Int | Response time in ms |
| created_at | DateTime | Request timestamp |

---

## ApiUsage

Stores aggregated API usage analytics.

Instead of storing every analytics calculation dynamically,
usage counts are pre-aggregated by:
- API key
- path
- date

This improves dashboard performance.

### Fields

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| tenant_id | Int | Tenant reference |
| api_key_id | Int | API key reference |
| path | String | API route |
| count | Int | Request count |
| date | DateTime | Aggregation date |

---

# Relationships

## Tenant → Users

One tenant can have many users.

```txt
Tenant 1 ────< User
```

---

## Tenant → API Keys

One tenant can own multiple API keys.

```txt
Tenant 1 ────< ApiKey
```

---

## ApiKey → Request Logs

One API key can generate many request logs.

```txt
ApiKey 1 ────< RequestLog
```

---

## ApiKey → Usage Records

One API key can have multiple aggregated usage entries.

```txt
ApiKey 1 ────< ApiUsage
```

---

# Constraints

## Unique User Email

```txt
@@unique([tenant_id, email])
```

Prevents duplicate emails inside the same tenant.

---

## Unique API Key Hash

```txt
@unique
```

Ensures no duplicate API keys exist.

---

## Unique Usage Aggregation

```txt
@@unique([api_key_id, path, date])
```

Prevents duplicate usage records for the same:
- API key
- route
- date

---

# Security Design

## Password Storage

Passwords are hashed using bcrypt before storage.

Raw passwords are never stored.

---

## API Key Storage

API keys are hashed before insertion into the database.

Only:
- hash
- visible prefix

are stored.

The raw key is shown only once during creation.
