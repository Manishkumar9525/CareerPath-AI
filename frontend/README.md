# CareerPath AI - Frontend Documentation

This document explains frontend structure, integration with backend APIs, and user flow behavior.

## Frontend Overview

CareerPath AI frontend is built with:

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios service layer
- React Toastify

Main pages:

- Auth: Login, Signup, OTP verification
- Dashboard
- Create Roadmap
- Roadmap and Roadmap Preview
- Tasks
- Profile
- AI Chat

## Key Features

- Route protection using auth context and protected routes
- Dashboard driven by live roadmap data
- Roadmap continuity via localStorage current roadmap ID
- Task completion updates synced with backend progress
- Profile editing and avatar image management
- Chat history and AI assistant interactions

## Folder Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── layout/
│   │   └── Roadmap/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── CreateRoadmap.jsx
│   │   ├── Roadmap.jsx
│   │   ├── Tasks.jsx
│   │   ├── Profile.jsx
│   │   └── AIChat.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── roadmapService.js
│   │   ├── profileService.js
│   │   └── chatService.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Backend Integration Flow

1. User logs in, token is stored in localStorage
2. Axios service sends token on protected calls
3. Roadmap generation endpoint returns new or reused roadmap
4. Dashboard fetches roadmaps and renders summaries
5. Task toggle API updates progress and returns updated roadmap state
6. Profile endpoint returns both user info and computed stats
7. Chat endpoints manage conversation history and responses

## API Usage (High-Level)

Base backend URL:

- http://localhost:5000/api

Service responsibilities:

- authService: signup, verify OTP, login, resend OTP
- roadmapService: generate, list, get by ID, toggle task, delete
- profileService: get/update profile, upload/delete image
- chatService: send message, get chats, get chat by ID, delete chat

## Flow Details Required by Product

### Roadmap Generation and Reuse

Frontend submits goal/skills/duration. Backend may return cached roadmap if duplicate criteria match.

### Task and Progress

Task completion updates are sent through roadmap task toggle endpoint; frontend refreshes task/progress state from API response.

### Dashboard

Dashboard cards and roadmap lists are built from GET /roadmap response.

### Profile Stats

Profile page reads computed stats (roadmaps/tasks/progress) from GET /profile.

## Setup and Run

### Prerequisites

- Node.js 18+
- npm 9+
- Backend running on port 5000

### Install

```bash
cd frontend
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

Default frontend URL:

- http://localhost:5173

## Environment Notes

Frontend depends on backend environment configuration (database, JWT, Groq, YouTube, Gmail, Cloudinary).

Refer to:

- backend/.env.example
- backend/README.md
- SETUP_GUIDE.md

## Developer Notes

- Keep API logic in services, not UI components
- Keep page components orchestration-focused
- Keep protected routes centralized
- Preserve localStorage roadmap continuity behavior
