# CareerPath AI - Backend Documentation

This document explains backend architecture, data flow, API surface, and core business logic.

## Backend Overview

CareerPath AI backend is a REST API built with:

- Node.js + Express
- MongoDB + Mongoose
- JWT auth
- Groq API for roadmap and chat generation
- YouTube Data API for resources
- Cloudinary for profile images
- Nodemailer for OTP emails

Base URL: http://localhost:5000/api

## Responsibilities

- Authentication: signup, OTP verify, login
- Roadmap generation/reuse and retrieval
- Task completion toggle and progress calculations
- Profile retrieval/update with computed statistics
- Chat create/read/delete per user

## Architecture

1. Request hits route
2. Auth middleware validates JWT where required
3. Controller validates payload and ownership
4. DB and external APIs are called
5. JSON response returned to frontend

## Folder Structure

```text
backend/
├── config/
│   ├── db.js
│   └── cloudinary.js
├── controllers/
│   ├── authController.js
│   ├── roadmapController.js
│   ├── profileController.js
│   ├── chatController.js
│   ├── youtubeController.js
│   └── testController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Roadmap.js
│   └── Chat.js
├── routes/
│   ├── authRoutes.js
│   ├── roadmapRoutes.js
│   ├── profileRoutes.js
│   ├── chatRoutes.js
│   ├── youtubeRoutes.js
│   └── testRoutes.js
├── utils/
│   ├── resourceService.js
│   ├── mailSender.js
│   ├── cloudinary.js
│   ├── geminiHelper.js
│   └── mockRoadmapGenerator.js
├── server.js
└── package.json
```

## Data Models (High-Level)

### User

- Identity: name, email, password
- Verification: otp, otpExpiry, isVerified
- Profile: bio, location, career, avatar, avatarPublicId

### Roadmap

- userId, goal, skills, duration, career
- steps[] -> weeks[] -> tasks[]
- progress, isCompleted

### Chat

- user, title, messages[]

## API Overview

### Auth

- POST /auth/signup
- POST /auth/verify-otp
- POST /auth/login
- POST /auth/resend-otp
- GET /auth/me

### Roadmap

- POST /roadmap/generate
- GET /roadmap
- GET /roadmap/:id
- PATCH /roadmap/:id/task
- DELETE /roadmap/:id

### Profile

- GET /profile
- PUT /profile/update
- POST /profile/upload-image
- DELETE /profile/delete-image

### Chat

- POST /chat
- GET /chat
- GET /chat/:id
- DELETE /chat/:id

## Core Logic Explained

### Roadmap Generation and Reuse

When POST /roadmap/generate is called:

1. goal and duration are normalized
2. existing roadmap is searched using case-insensitive goal + duration for same user
3. if found, existing roadmap is returned (reuse path)
4. if not found, AI roadmap is generated, enriched with resources, and stored

This prevents duplicate roadmap creation and reduces unnecessary AI requests.

### Task Toggle and Progress Calculation

When PATCH /roadmap/:id/task is called:

1. month/week/task indexes are validated
2. selected task completed state is toggled
3. week completed is recalculated from all week tasks
4. roadmap progress recalculated using:

progress = round((completedTasks / totalTasks) * 100)

5. roadmap isCompleted is updated when progress reaches 100

### Dashboard Data Flow

- frontend calls GET /roadmap
- backend returns recent roadmaps for authenticated user
- frontend renders cards, active count, and average progress

### Profile Stats Calculation

GET /profile aggregates roadmap data to compute:

- totalRoadmaps
- completedRoadmaps
- totalTasks
- completedTasks
- progress
- avgProgress

## Environment Variables

Create backend/.env:

```bash
copy .env.example .env
```

Required keys:

 PORT
- MONGODB_URL
- JWT_SECRET
- CLIENT_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- GMAIL_USER
- GMAIL_PASSWORD
- GEMINI_API_KEY
- GROQ_API_KEY
- YOUTUBE_API_KEY

## Run and Verify

```bash
npm install
npm run dev
```

Quick checks:

- GET /api/health
- GET /api/test

## Integration Contract with Frontend

- All protected endpoints require Authorization: Bearer <token>
- Toggle task response returns updated progress state for immediate UI sync
- Profile endpoint returns both user fields and computed stats

## Production Notes

- Restrict CORS to frontend domain
- Add rate limiting for auth and AI endpoints
- Keep secrets in environment manager
- Add centralized logging and monitoring
