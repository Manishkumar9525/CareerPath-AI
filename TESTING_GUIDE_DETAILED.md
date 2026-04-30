# CareerPath AI - API Testing Guide

This guide explains how to test CareerPath AI backend APIs using Postman.

## Table of Contents

1. Prerequisites
2. Start Backend
3. Import Postman Collection
4. Test Flow (Recommended Order)
5. Endpoint Coverage Checklist
6. Common Issues and Fixes

## Prerequisites

- Postman installed
- Backend dependencies installed
- backend/.env configured with valid keys

Postman collection file:

- CareerPath_AI_Postman_Collection.json

## Start Backend

```bash
cd backend
npm install
npm run dev
```

Verify backend:

```bash
curl http://localhost:5000/api/health
```

Expected response includes server running status.

## Import Postman Collection

1. Open Postman
2. Click Import
3. Select CareerPath_AI_Postman_Collection.json
4. Confirm collection appears in sidebar

## Test Flow (Recommended Order)

### 1) Health and Smoke Tests

- GET /api/health
- GET /api/test

### 2) Authentication

1. POST /api/auth/signup
2. POST /api/auth/verify-otp
3. POST /api/auth/login
4. GET /api/auth/me

After login, copy JWT token and set Authorization header for protected routes:

```text
Authorization: Bearer <token>
```

### 3) Roadmap Lifecycle

1. POST /api/roadmap/generate
2. GET /api/roadmap
3. GET /api/roadmap/:id
4. PATCH /api/roadmap/:id/task
5. DELETE /api/roadmap/:id (optional cleanup)

Key validation points:

- Duplicate input should reuse existing roadmap (no duplicate regeneration)
- Task toggle updates completion state and progress
- Progress increases/decreases correctly based on completed tasks

### 4) Profile

1. GET /api/profile
2. PUT /api/profile/update
3. POST /api/profile/upload-image
4. DELETE /api/profile/delete-image

Validation points:

- Stats fields reflect roadmap/task state correctly
- Avatar updates and deletion return expected success responses

### 5) Chat

1. POST /api/chat
2. GET /api/chat
3. GET /api/chat/:id
4. DELETE /api/chat/:id

Validation points:

- Chat is scoped to authenticated user
- New chat receives chatId
- Existing chat retrieval shows stored messages

## Endpoint Coverage Checklist

- [ ] Auth signup
- [ ] OTP verification
- [ ] Login and JWT retrieval
- [ ] Protected auth route
- [ ] Roadmap generation
- [ ] Roadmap duplicate reuse behavior
- [ ] Roadmap list and single fetch
- [ ] Task toggle and progress recalculation
- [ ] Profile fetch and stat verification
- [ ] Profile update
- [ ] Profile image upload/delete
- [ ] Chat send/list/single/delete
- [ ] Health and test routes

## Common Issues and Fixes

### 401 Unauthorized

- Missing or invalid token
- Use fresh token from login endpoint

### 400 Invalid input

- Check request body fields and indexes
- Ensure roadmap/task indexes are valid for toggle endpoint

### 500 Internal error on roadmap generation

- Verify GROQ_API_KEY
- Check external API quotas and network errors

### OTP not delivered

- Verify Gmail app password configuration
- Confirm 2FA enabled on Gmail account

### YouTube resources missing

- Verify YOUTUBE_API_KEY and API enablement

### Cloudinary upload failure

- Verify CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET

## Notes for QA and Recruiter Demo

For demo reliability, keep one verified test user and a known roadmap scenario to quickly validate:

- Auth works
- Roadmap appears on dashboard
- Task toggle changes progress
- Profile stats reflect task completion
