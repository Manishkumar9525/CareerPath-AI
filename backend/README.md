# CareerPath AI - Backend Documentation

Complete technical documentation for the CareerPath AI backend server.

---

## 📖 Table of Contents

1. [Backend Overview](#backend-overview)
2. [Architecture](#architecture)
3. [Folder Structure](#folder-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Request/Response Examples](#requestresponse-examples)
7. [Middleware](#middleware)
8. [Error Handling](#error-handling)
9. [Internal Working Flow](#internal-working-flow)
10. [Configuration](#configuration)

---

## 🎯 Backend Overview

CareerPath AI backend is a **RESTful API** built with Node.js & Express.js that:

- ✅ Manages user authentication (signup, OTP verification, login)
- ✅ Generates AI-powered career roadmaps using Groq API
- ✅ Aggregates learning resources (YouTube, courses, docs)
- ✅ Provides AI chat assistance using Groq LLM
- ✅ Tracks user progress and statistics
- ✅ Secures endpoints with JWT middleware

**Base URL**: `http://localhost:5000/api`

---

## 🏗️ Architecture

### Layers

```
┌─────────────────────────────────────────┐
│          HTTP Request (Client)           │
└──────────────────┬──────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Express Middleware  │
        │ (CORS, JSON Parser)  │
        └──────────────┬───────┘
                       │
                       ▼
        ┌──────────────────────┐
        │   Route Matching     │
        │  (authRoutes, etc)   │
        └──────────────┬───────┘
                       │
                       ▼
        ┌──────────────────────┐
        │  Auth Middleware     │
        │  (JWT Verification)  │
        └──────────────┬───────┘
                       │
                       ▼
        ┌──────────────────────┐
        │   Controller Logic   │
        │ (Business Logic)     │
        └──────────────┬───────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   ┌─────────────┐           ┌─────────────────┐
   │  MongoDB    │           │  External APIs  │
   │  (Mongoose) │           │ (Groq, YouTube) │
   └─────────────┘           └─────────────────┘
        │                             │
        └──────────────┬──────────────┘
                       │
                       ▼
        ┌──────────────────────┐
        │  JSON Response       │
        └──────────────┬───────┘
                       │
                       ▼
┌─────────────────────────────────────────┐
│        HTTP Response (Client)            │
└─────────────────────────────────────────┘
```

### Component Flow

```
1. Client sends request
   ↓
2. Express receives & parses JSON
   ↓
3. Router matches endpoint
   ↓
4. Middleware checks authorization (if protected)
   ↓
5. Controller executes business logic
   ↓
6. Database/API operations execute
   ↓
7. Response formatted & sent back
```

---

## 📁 Folder Structure

```
backend/
│
├── config/
│   └── db.js                    # MongoDB connection configuration
│       └─ connectDB()           # Mongoose connection setup
│
├── controllers/
│   ├── authController.js        # Authentication logic
│   │   ├─ signup()              # Create user & send OTP
│   │   ├─ verifyOTP()           # Verify email with OTP
│   │   ├─ login()               # User login (JWT)
│   │   └─ resendOTP()           # Resend OTP
│   │
│   ├── roadmapController.js     # Career roadmap operations
│   │   ├─ generateRoadmap()     # Generate via Groq API
│   │   ├─ getUserRoadmaps()     # Get all user roadmaps
│   │   ├─ getRoadmap()          # Get single roadmap
│   │   ├─ deleteRoadmap()       # Delete roadmap
│   │   └─ toggleTask()          # Mark task as complete
│   │
│   ├── chatController.js        # AI chat operations
│   │   └─ chatWithAI()          # Send message to Groq
│   │
│   ├── youtubeController.js     # YouTube search integration
│   │   └─ getYouTubeVideos()    # Search & rank videos
│   │
│   ├── profileController.js     # User profile & stats
│   │   └─ getProfileStats()     # Get user progress stats
│   │
│   └── testController.js        # Testing endpoints
│       └─ testGroq()            # Test Groq API
│
├── middleware/
│   └── authMiddleware.js        # JWT verification
│       └─ protect              # Protect routes (require JWT)
│
├── models/
│   ├── User.js                  # User schema
│   │   ├─ Mongoose schema def
│   │   ├─ Pre-hook password hash
│   │   └─ Method matchPassword()
│   │
│   └── Roadmap.js               # Roadmap schema (nested)
│       ├─ Main roadmap schema
│       ├─ Step schema (month)
│       ├─ Week schema
│       ├─ Task schema
│       └─ Resource schema
│
├── routes/
│   ├── authRoutes.js            # POST /api/auth/*
│   ├── roadmapRoutes.js         # POST /api/roadmap/*
│   ├── chatRoutes.js            # POST /api/chat/*
│   ├── youtubeRoutes.js         # GET /api/youtube
│   ├── profileRoutes.js         # GET /api/profile
│   └── testRoutes.js            # GET /api/test-groq
│
├── utils/
│   ├── resourceService.js       # YouTube/Courses/Docs fetching
│   │   └─ getAllResources()     # Main aggregation function
│   │
│   ├── mailSender.js            # Gmail OTP sender
│   │   └─ mailSender()          # Send HTML email
│   │
│   └── geminiHelper.js          # Gemini API helper (optional)
│       ├─ cleanJsonResponse()   # JSON parsing utility
│       └─ generateRoadmapWithGemini()
│
├── package.json                 # Dependencies & scripts
├── server.js                    # Express app entry point
├── .env.example                 # Environment template
└── .env                         # Environment config (NOT in git)
```

### File Purposes

| File | Purpose |
|------|---------|
| `server.js` | Initialize Express, mount routes, start server |
| `config/db.js` | Connect to MongoDB using Mongoose |
| `models/*.js` | Define data schemas (User, Roadmap) |
| `controllers/*.js` | Business logic for each feature |
| `routes/*.js` | HTTP endpoint definitions |
| `middleware/*.js` | Authentication & authorization |
| `utils/*.js` | Helper functions & API integrations |

---

## 💾 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, valid format),
  password: String (hashed, required, min 6 chars),
  
  // OTP Verification System
  isVerified: Boolean (default: false),
  otp: String (6 digits),
  otpExpiry: Date (valid 5 minutes),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `email` (unique)
- `createdAt` (for sorting users)

**Methods**:
- `matchPassword(password)` - Compare entered password with hash

**Pre-hooks**:
- `pre("save")` - Auto-hash password before saving

---

### Roadmap Model

**Structure**: Nested hierarchy `Roadmap → Steps (months) → Weeks → Tasks`

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required, indexed),
  goal: String (e.g., "Full Stack Developer", 3-200 chars),
  skills: String (e.g., "JavaScript, React, Node.js"),
  duration: String (e.g., "3 months", "6 months"),
  career: String (derived from AI response),
  
  steps: [{
    title: String (e.g., "Month 1"),
    description: String (month overview),
    skills: [String] (e.g., ["HTML", "CSS"]),
    tools: [String] (e.g., ["VS Code", "Chrome DevTools"]),
    
    // Resources: Only YouTube videos at month level
    resources: [{
      title: String,
      url: String,
      thumbnail: String,
      platform: String
    }],
    
    projectIdeas: [String],
    
    weeks: [{
      week: String (e.g., "Week 1"),
      focus: String (week topic),
      completed: Boolean,
      
      tasks: [{
        title: String (e.g., "Learn HTML Basics"),
        completed: Boolean,
        
        // Resources: Multiple types (YouTube, Courses, Docs)
        resources: {
          youtube: [{
            title: String,
            url: String,
            thumbnail: String,
            platform: String
          }],
          courses: [{
            title: String,
            url: String,
            platform: String
          }],
          docs: [{
            title: String,
            url: String
          }]
        }
      }]
    }]
  }],
  
  isCompleted: Boolean (default: false),
  progress: Number (0-100, default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ userId: 1, createdAt: -1 }` - For efficient roadmap queries

**Validation**:
- `steps` array must have at least 1 step

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

#### 1. Signup (Send OTP)
```
POST /api/auth/signup
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "OTP sent to email. Please verify"
}
```

**Errors:**
- 400: Missing fields, password mismatch
- 500: Email send failed

---

#### 2. Verify OTP
```
POST /api/auth/verify-otp
```
**Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Account verified successfully"
}
```

---

#### 3. Login
```
POST /api/auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdjZTMyZjEyMyIsImlhdCI6MTcwMzc1OTIwMCwiZXhwIjoxNzA2MzUxMjAwfQ.abcd1234...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Token**: Valid for 7 days

---

#### 4. Resend OTP
```
POST /api/auth/resend-otp
```
**Body:**
```json
{
  "email": "john@example.com"
}
```

---

#### 5. Protected Route (Test Auth)
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "This is a protected route",
  "userId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

---

### Roadmap (`/api/roadmap`) - *Protected*

#### 1. Generate Roadmap
```
POST /api/roadmap/generate
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "goal": "Full Stack Developer",
  "skills": "HTML, CSS, JavaScript basics",
  "duration": "6 months"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "roadmap": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "goal": "Full Stack Developer",
    "skills": "HTML, CSS, JavaScript basics",
    "duration": "6 months",
    "career": "Full Stack Web Developer",
    "steps": [
      {
        "title": "Month 1: Web Fundamentals",
        "description": "Master HTML, CSS, and JavaScript basics...",
        "skills": ["HTML5", "CSS3", "JavaScript"],
        "tools": ["VS Code"],
        "resources": [{
          "title": "HTML Tutorial",
          "url": "https://www.youtube.com/watch?v=...",
          "thumbnail": "https://..."
        }],
        "weeks": [
          {
            "week": "Week 1",
            "focus": "HTML Basics",
            "tasks": [
              {
                "title": "Learn HTML Elements",
                "completed": false,
                "resources": {
                  "youtube": [{...}],
                  "courses": [{...}],
                  "docs": [{...}]
                }
              }
            ]
          }
        ]
      }
    ],
    "isCompleted": false,
    "progress": 0
  }
}
```

---

#### 2. Get All User Roadmaps
```
GET /api/roadmap
Headers: Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "roadmaps": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "goal": "Full Stack Developer",
      "duration": "6 months",
      "progress": 25,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

#### 3. Get Single Roadmap
```
GET /api/roadmap/:id
Headers: Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "roadmap": { /* Full roadmap object */ }
}
```

---

#### 4. Delete Roadmap
```
DELETE /api/roadmap/:id
Headers: Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Roadmap deleted successfully"
}
```

---

#### 5. Toggle Task Completion
```
PATCH /api/roadmap/:id/task
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "stepIndex": 0,
  "weekIndex": 0,
  "taskIndex": 0,
  "completed": true
}
```

---

### Chat (`/api/chat`) - *Protected*

#### Send Message to AI
```
POST /api/chat
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "message": "How do I learn React?"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "reply": "React is a JavaScript library for building user interfaces with reusable components. Here's a learning path: 1. Learn JavaScript fundamentals 2. Understand JSX syntax 3. Learn components and hooks 4. Practice with projects..."
}
```

---

### YouTube Search (`/api/youtube`) - *Protected*

#### Search Videos
```
GET /api/youtube?query=Web Development Tutorial
Headers: Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "videos": [
    {
      "title": "Web Development Full Course 2024",
      "channel": "Tech Channel",
      "url": "https://www.youtube.com/watch?v=...",
      "thumbnail": "https://i.ytimg.com/...",
      "views": 1500000,
      "likes": 45000
    }
  ]
}
```

**Sorting**: Videos ranked by views (highest first)

---

### Profile (`/api/profile`) - *Protected*

#### Get User Stats
```
GET /api/profile
Headers: Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "totalRoadmaps": 3,
  "totalTasks": 120,
  "completedTasks": 45,
  "progress": 38
}
```

---

### Health Check & Test (`/api`)

#### Server Health
```
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "Server is running",
  "port": "5000"
}
```

---

#### API Test
```
GET /api/test
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "API working",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📨 Request/Response Examples

### Example 1: Complete Signup → Verify → Login Flow

**Step 1: Signup**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "SecurePass123",
    "passwordConfirm": "SecurePass123"
  }'
```

Response: OTP sent to email ✅

**Step 2: Verify OTP** (Check email for OTP, e.g., "123456")
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "otp": "123456"
  }'
```

Response: Account verified ✅

**Step 3: Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "SecurePass123"
  }'
```

Response: Token received ✅

---

### Example 2: Generate Roadmap & Track Progress

**Generate Roadmap**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:5000/api/roadmap/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "goal": "Machine Learning Engineer",
    "skills": "Python basics, Math fundamentals",
    "duration": "6 months"
  }'
```

Response: Detailed roadmap with months, weeks, tasks ✅

**Get Roadmap**
```bash
ROADMAP_ID="65a1b2c3d4e5f6g7h8i9j0k1"

curl -X GET "http://localhost:5000/api/roadmap/$ROADMAP_ID" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Example 3: AI Chat Interaction

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "message": "What are the best resources to learn TypeScript?"
  }'
```

Response: AI-generated response ✅

---

## 🔐 Middleware

### Auth Middleware (`protect`)

**Location**: `middleware/authMiddleware.js`

**Purpose**: Verify JWT token and protect routes

**Flow**:
```
1. Extract "Authorization: Bearer <token>" header
2. Validate token format (Bearer prefix required)
3. Verify JWT signature using JWT_SECRET
4. Extract user ID from decoded token
5. Attach user info to req.user
6. Call next() to proceed
```

**Error Handling**:
- **401**: No token provided
- **401**: Invalid or expired token
- **401**: Malformed Bearer header

**Usage**:
```javascript
// Protect a route
router.get('/protected-route', protect, controllerFunction);
```

---

## ⚠️ Error Handling

### Global Error Handler

**Location**: `server.js` (last middleware)

**Error Response Format**:
```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| **200** | OK | Successful GET/POST/PATCH |
| **201** | Created | Resource created (signup, roadmap) |
| **400** | Bad Request | Missing fields, validation error |
| **401** | Unauthorized | Invalid token, no auth |
| **404** | Not Found | Route doesn't exist, resource missing |
| **500** | Server Error | Database error, API failure |

### Common Error Scenarios

**Missing JWT Token**:
```json
{
  "success": false,
  "message": "Access denied. No token provided"
}
```

**Invalid Password**:
```json
{
  "success": false,
  "message": "Invalid password"
}
```

**MongoDB Connection Error**:
```json
{
  "success": false,
  "message": "Database connection failed"
}
```

**Groq API Error**:
```json
{
  "success": false,
  "message": "AI returned invalid JSON"
}
```

---

## 🔄 Internal Working Flow

### 1. User Registration Flow

```
User fills signup form
          ↓
Client POST /api/auth/signup
          ↓
Controller: authController.signup()
          ↓
Validation: Check fields & password match
          ↓
Check if email exists
   ├─ Exists & verified → Error: "User already exists"
   ├─ Exists & unverified → Regenerate OTP → Send email
   └─ New user → Create with unverified status
          ↓
Generate 6-digit OTP
          ↓
Set OTP expiry (5 minutes from now)
          ↓
Send email via nodemailer (Gmail SMTP)
          ↓
Save user to MongoDB
          ↓
Response: "OTP sent to email"
```

### 2. Roadmap Generation Flow

```
User clicks "Generate Roadmap"
          ↓
Client POST /api/roadmap/generate
          ↓
Auth Middleware: Verify JWT → Extract user ID
          ↓
Controller: roadmapController.generateRoadmap()
          ↓
Validation: Check goal & duration
          ↓
Construct Groq API prompt with user details
          ↓
Call Groq API (llama-3.3-70b-versatile)
          ↓
Parse AI response JSON
          ↓
For each step (month):
   ├─ Get YouTube resources for month
   └─ For each task:
       ├─ Clean task title
       ├─ Get YouTube videos
       ├─ Get course recommendations
       └─ Get documentation links
          ↓
Save roadmap to MongoDB
          ↓
Response: Complete roadmap with resources
```

### 3. Task Completion Flow

```
User clicks "Mark as Complete" on task
          ↓
Client PATCH /api/roadmap/:id/task
          ↓
Auth Middleware: Verify JWT
          ↓
Controller: roadmapController.toggleTask()
          ↓
Find roadmap by ID & user ID
          ↓
Update task.completed = true
          ↓
Recalculate overall progress:
   progress = (completedTasks / totalTasks) * 100
          ↓
Save roadmap
          ↓
Response: Updated roadmap
```

### 4. YouTube Search Flow

```
Task requests YouTube videos
          ↓
Controller: youtubeController.getYouTubeVideos()
          ↓
Call YouTube Data API v3 (search endpoint)
   ├─ Query: "topic tutorial hindi coding"
   ├─ Max results: 10
   └─ Type: "video" only
          ↓
Extract video IDs
          ↓
Call YouTube API (videos endpoint)
   └─ Get statistics (views, likes)
          ↓
Format response:
   ├─ Title
   ├─ Channel
   ├─ URL
   ├─ Thumbnail
   ├─ Views
   └─ Likes
          ↓
Sort by views (highest first)
          ↓
Return top 6 videos
```

### 5. Chat Flow

```
User sends message to AI
          ↓
Client POST /api/chat with message
          ↓
Auth Middleware: Verify JWT
          ↓
Controller: chatController.chatWithAI()
          ↓
Call Groq API with user message
          ↓
AI returns response
          ↓
Send response to client
```

---

## ⚙️ Configuration

### Environment Variables

**Required**:
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `GROQ_API_KEY` - Groq API key

**Optional**:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `YOUTUBE_API_KEY` - YouTube API key
- `GMAIL_USER` - Gmail address
- `GMAIL_PASSWORD` - Gmail app password
- `USE_MOCK_FALLBACK` - Use mock data if API fails

### Database Configuration

**MongoDB Atlas**:
```
mongodb+srv://username:password@cluster.mongodb.net/careerpath-ai?retryWrites=true&w=majority
```

**Local MongoDB**:
```
mongodb://localhost:27017/careerpath-ai
```

### Groq API Configuration

- **Model**: `llama-3.3-70b-versatile`
- **Base URL**: `https://api.groq.com/openai/v1/chat/completions`
- **Rate Limits**: Check Groq dashboard

### YouTube API Configuration

- **API Version**: v3
- **Endpoints**:
  - Search: `https://www.googleapis.com/youtube/v3/search`
  - Videos: `https://www.googleapis.com/youtube/v3/videos`
- **Quota**: 10,000 units/day (free tier)

---

## 🚀 Starting the Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials

npm run dev
```

Expected output:
```
╔════════════════════════════════════════╗
║   CareerPath AI Backend Server         ║
║   Server running on port 5000          ║
║   Environment: development             ║
╚════════════════════════════════════════╝
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Groq API Docs](https://console.groq.com/docs)
- [YouTube API Docs](https://developers.google.com/youtube/v3)

---

**Backend maintained with ❤️ for CareerPath AI**
