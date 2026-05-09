# API Overview

## Auth
- POST /auth/register
- POST /auth/login
- POST /auth/logout

## User
- GET /user/me

## Tenant
- POST /tenant/create
- POST /tenant/add-user
- GET /tenant/me
- GET /tenant/users
- PATCH /tenant/

## API Keys
- POST /api-key/create
- GET /api-keys/:api_key_id
- GET /api-keys/
- DELETE /api-keys/:api_key_id

## Request Log
- GET /logs/all
- GET /logs/all/:api_key_id

## Usage
- GET /usage/summary
- GET /usage/summary/:api_key_id
- GET /usage/chart
- GET /usage/chart/:api_key_id
- GET /usage/endpoints
- GET /usage/endpoints/:api_key_id
- GET /usage/by-key
- GET /usage
- GET /usage/:api_key_id

## Books API
- GET /books/all


