# CareerPath AI

CareerPath AI is a full-stack learning platform that helps users plan and track career growth using AI-generated roadmaps.

## Project Overview

The repository contains:

- React frontend for user experience and dashboard workflows
- Node.js + Express backend for APIs and business logic
- MongoDB for persistent user, roadmap, task, profile, and chat data

Primary user flow:

1. Auth (signup, OTP verify, login)
2. Roadmap generation or reuse
3. Dashboard insights
4. Task execution and progress updates
5. Profile and statistics
6. AI chat support

## Key Features

- OTP-based signup and email verification
- JWT-protected authenticated routes
- AI roadmap generation by goal, skills, and duration
- Duplicate roadmap prevention with case-insensitive DB matching
- Task toggle with automatic week/roadmap progress recalculation
- Dashboard with recent roadmaps and progress metrics
- Profile editing with avatar upload and computed stats
- AI chat history per user
- localStorage roadmap continuity for refresh-safe navigation

## Architecture Summary

### Frontend

- React + Vite + Tailwind CSS
- Protected routes and auth context
- Service layer for API communication
- Pages: Dashboard, Create Roadmap, Roadmap, Tasks, Profile, AI Chat

### Backend

- Express route-controller architecture
- JWT middleware for protected APIs
- MongoDB models: User, Roadmap, Chat
- Integrations: Groq, YouTube Data API, Cloudinary, Nodemailer

## End-to-End Integration Flow

1. User signs up -> OTP email sent
2. User verifies OTP -> account activated
3. User logs in -> JWT token issued
4. Frontend sends roadmap request with goal/skills/duration
5. Backend reuses existing roadmap if duplicate match found
6. If no match, backend generates roadmap via AI and stores it
7. Dashboard requests roadmaps and renders recent cards + stats
8. Tasks page toggles task completion; backend returns updated progress
9. Profile endpoint aggregates roadmap/task stats and returns summary

## Folder Structure

```text
CareerPath-AI/
├─ backend/
│  ├─ config/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  └─ services/
│  └─ package.json
├─ README.md
├─ backend/README.md
├─ frontend/README.md
├─ SETUP_GUIDE.md
├─ TESTING_GUIDE_DETAILED.md
├─ CONTRIBUTING.md
└─ DOCUMENTATION_SUMMARY.md
```

## API Overview (High-Level)

Base URL: http://localhost:5000/api

- Auth: signup, verify-otp, login, resend-otp
- Roadmap: generate, list, single, toggle task, delete
- Profile: get, update, upload image, delete image
- Chat: create message, list chats, get single chat, delete chat

Detailed API notes are in backend/README.md.

## Environment Setup

Create backend/.env from backend/.env.example.

Required variables:

- PORT
- NODE_ENV
- MONGODB_URL
- JWT_SECRET
- GROQ_API_KEY
- YOUTUBE_API_KEY
- GMAIL_USER
- GMAIL_PASSWORD
- CLOUD_NAME
- CLOUD_API_KEY
- CLOUD_API_SECRET

## Run the Project

Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Start frontend + backend together:

```bash
npm run dev
```

Or run separately:

```bash
npm run server
npm run client
```

Default local URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Documentation Index

- Setup guide: SETUP_GUIDE.md
- API testing: TESTING_GUIDE_DETAILED.md
- Contribution process: CONTRIBUTING.md
- Backend technical details: backend/README.md
- Frontend technical details: frontend/README.md

## License

ISC
