# CareerPath AI - Complete Setup Guide

This guide helps you configure and run CareerPath AI locally.

## Table of Contents

1. Prerequisites
2. Clone and Install
3. MongoDB Setup
4. API and Service Credentials
5. Backend Environment Configuration
6. Run the Application
7. Verify Setup
8. Troubleshooting

## Prerequisites

Install these tools:

- Node.js 18+
- npm 9+
- Git
- MongoDB (local or Atlas)

Verify installation:

```bash
node --version
npm --version
git --version
```

## Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/CareerPath-AI.git
cd CareerPath-AI
npm install
npm install --prefix backend
npm install --prefix frontend
```

## MongoDB Setup

Use one option below.

### Option A: Local MongoDB

Connection string example:

```text
mongodb://localhost:27017/careerpath_ai
```

### Option B: MongoDB Atlas

1. Create cluster in MongoDB Atlas
2. Create database user
3. Allow network access for your machine
4. Copy connection string and replace password

Connection example:

```text
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/careerpath_ai?retryWrites=true&w=majority
```

## API and Service Credentials

CareerPath AI backend integrates with these services:

- Groq API (AI roadmap and chat)
- YouTube Data API v3 (learning resources)
- Gmail SMTP app password (OTP emails)
- Cloudinary (profile image upload)

Collect credentials before editing backend/.env.

## Backend Environment Configuration

Create environment file:

```bash
copy backend\.env.example backend\.env
```

Configure backend/.env:

```env
PORT=5000
NODE_ENV=development
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret

GROQ_API_KEY=your_groq_key
YOUTUBE_API_KEY=your_youtube_key

GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_gmail_app_password

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Security notes:

- Do not commit backend/.env
- Use app password for Gmail, not account password
- Rotate exposed keys immediately

## Run the Application

### Run frontend and backend together

```bash
npm run dev
```

### Run separately

```bash
npm run server
npm run client
```

Default URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Verify Setup

1. Backend health check:

```bash
curl http://localhost:5000/api/health
```

2. Backend test route:

```bash
curl http://localhost:5000/api/test
```

3. Frontend load:

- Open http://localhost:5173 in browser

4. Auth flow sanity check:

- Signup -> OTP verify -> Login should complete successfully

## Troubleshooting

### MongoDB connection error

- Confirm MONGODB_URL is correct
- Ensure local MongoDB service is running or Atlas IP is allowed

### OTP email not sending

- Verify GMAIL_USER and GMAIL_PASSWORD
- Confirm Gmail app password is used
- Check whether 2FA is enabled for Gmail account

### AI roadmap generation fails

- Verify GROQ_API_KEY
- Check Groq quota and key status

### YouTube resources missing

- Verify YOUTUBE_API_KEY
- Confirm YouTube Data API is enabled in Google Cloud

### Profile image upload fails

- Verify Cloudinary credentials
- Check file size limits and valid image format

### 401 unauthorized on protected routes

- Ensure valid JWT token is sent in Authorization header
- Login again if token expired

## Recommended Next Steps

- Read README.md for project-level overview
- Read backend/README.md for API and logic details
- Read TESTING_GUIDE_DETAILED.md for endpoint verification
