# CareerPath AI - API Testing Guide

Complete guide to test all CareerPath AI backend endpoints using Postman.

## 📋 Table of Contents

1. [Prerequisites & Setup](#prerequisites--setup)
2. [Import Postman Collection](#import-postman-collection)
3. [Test Endpoints](#test-endpoints)
4. [Common Issues](#common-issues)

---

## ✅ Prerequisites & Setup

# CareerPath AI - API Testing Guide

Complete guide to test all CareerPath AI backend endpoints using Postman.

## 📋 Table of Contents

1. [Prerequisites & Setup](#prerequisites--setup)
2. [Import Postman Collection](#import-postman-collection)
3. [Test Endpoints](#test-endpoints)
4. [Common Issues](#common-issues)

---

## ✅ Prerequisites & Setup

### 1. Install Postman

1. Download from [postman.com/downloads](https://www.postman.com/downloads/)
2. Install for your operating system
3. Create free account (optional but recommended)
4. Open Postman

### 2. Start Backend Server

```bash
cd backend
npm install
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

✅ **Server is running on http://localhost:5000**

### 3. Verify Backend is Ready

Test in terminal:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "Server is running",
  "port": "5000"
}
```

---

## 📥 Import Postman Collection

### Step 1: Open Import Dialog

1. In Postman, click **File** (top left)
2. Click **Import**

### Step 2: Select Collection File

1. Click **File** tab
2. Click **Upload Files**
3. Navigate to `CareerPath_AI_Postman_Collection.json`
4. Click **Import**

### Step 3: Verify Collection

Left sidebar should show:
```
📁 CareerPath AI API
   ├─ 🏥 Health & Test
   │  ├─ Health Check
   │  └─ Test Route
   ├─ 🔐 Authentication
   │  ├─ Signup
   │  ├─ Verify OTP
   │  ├─ Login
   │  └─ Protected Route - Get Me
   ├─ 🤖 Roadmap
   │  ├─ Generate Roadmap
   │  ├─ Get All Roadmaps
   │  ├─ Get Single Roadmap
   │  └─ Delete Roadmap
   ├─ 💬 Chat
   │  └─ Send Message
   ├─ 🎬 YouTube
   │  └─ Search Videos
   └─ 📊 Profile
      └─ Get Stats
```

---

## 🧪 Test Endpoints

### Test 1: Health Check

**Endpoint**: `GET /api/health`

**Purpose**: Verify server is running

**Steps**:
1. Click **Health Check** in sidebar
2. Click **Send**

**Expected Response** (200 OK):
```json
{
  "status": "Server is running",
  "port": "5000"
}
```

---

### Test 2: API Test

**Endpoint**: `GET /api/test`

**Purpose**: Verify API is responding

**Steps**:
1. Click **Test Route** in sidebar
2. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "API working",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Test 3: Signup (Create User & Send OTP)

**Endpoint**: `POST /api/auth/signup`

**Purpose**: Register new user and send OTP via email

**Steps**:

1. Click **Signup** in sidebar
2. Click **Body** tab
3. Update JSON with unique email:
   ```json
   {
     "name": "Your Name",
     "email": "unique-email@gmail.com",
     "password": "password123",
     "passwordConfirm": "password123"
   }
   ```
4. Click **Send**

**Expected Response** (201 Created):
```json
{
  "success": true,
  "message": "OTP sent to email. Please verify"
}
```

⚠️ **Important**: Use a **unique email** each time (Gmail will block duplicates)

**What Happens**: 
- OTP email sent to your inbox
- Email valid for 5 minutes
- Look for "CareerPath AI" sender

---

### Test 4: Verify OTP

**Endpoint**: `POST /api/auth/verify-otp`

**Purpose**: Verify email with OTP code

**Steps**:

1. Check your email inbox for OTP (6 digits)
2. Click **Verify OTP** in sidebar
3. Click **Body** tab
4. Update JSON:
   ```json
   {
     "email": "your-email@gmail.com",
     "otp": "123456"
   }
   ```
5. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Account verified successfully"
}
```

---

### Test 5: Login (Get JWT Token)

**Endpoint**: `POST /api/auth/login`

**Purpose**: Login with email/password and get JWT token

**Steps**:

1. Click **Login** in sidebar
2. Click **Body** tab
3. Update JSON:
   ```json
   {
     "email": "your-email@gmail.com",
     "password": "password123"
   }
   ```
4. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdjZTMyZjEyMyIsImlhdCI6MTcwMzc1OTIwMCwiZXhwIjoxNzA2MzUxMjAwfQ.abcd1234...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Your Name",
    "email": "your-email@gmail.com"
  }
}
```

⭐ **SAVE YOUR TOKEN!** You'll need it for protected routes.

---

### Test 6: Protected Route (Verify Auth)

**Endpoint**: `GET /api/auth/me`

**Purpose**: Test JWT authentication middleware

**Steps**:

1. Click **Protected Route - Get Me** in sidebar
2. Click **Headers** tab
3. Find `Authorization` header
4. Replace `YOUR_TOKEN_HERE` with your actual token from Test 5
5. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "This is a protected route",
  "userId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

**If you get 401 Unauthorized**:
- Token might be incorrect
- Token might be expired (after 7 days)
- Regenerate token by logging in again

---

### Test 7: Generate Roadmap (AI Powered)

**Endpoint**: `POST /api/roadmap/generate`

**Purpose**: Generate career roadmap using Groq AI

**Steps**:

1. Click **Generate Roadmap** in sidebar
2. Click **Headers** tab
3. Update Authorization token (same as Test 6)
4. Click **Body** tab
5. Update JSON:
   ```json
   {
     "goal": "Full Stack Developer",
     "skills": "HTML, CSS, JavaScript basics",
     "duration": "6 months"
   }
   ```
6. Click **Send**
7. **Wait 10-15 seconds** ⏳ (AI is generating)

**Expected Response** (201 Created):
```json
{
  "success": true,
  "roadmap": {
    "_id": "65a2b3c4d5e6f7g8h9i0j1k2",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "goal": "Full Stack Developer",
    "career": "Full Stack Web Developer",
    "duration": "6 months",
    "steps": [
      {
        "title": "Month 1: Web Fundamentals",
        "description": "Learn HTML, CSS, and JavaScript basics...",
        "skills": ["HTML5", "CSS3", "JavaScript"],
        "tools": ["VS Code", "Chrome DevTools"],
        "resources": [{...}],
        "projectIdeas": ["Calculator App", "Todo List"],
        "weeks": [{...}]
      },
      {
        "title": "Month 2: JavaScript Deep Dive",
        "description": "Master advanced JavaScript concepts...",
        "skills": ["ES6+", "Async/Await", "Promises"],
        "tools": ["Node.js"],
        "resources": [{...}],
        "projectIdeas": ["Weather App", "News App"],
        "weeks": [{...}]
      }
    ]
  }
}
```

⭐ **SAVE ROADMAP ID!** You'll need it for next tests.

Look for roadmap `_id` in response.

---

### Test 8: Get All User Roadmaps

**Endpoint**: `GET /api/roadmap`

**Purpose**: Retrieve all roadmaps created by user

**Steps**:

1. Click **Get All Roadmaps** in sidebar
2. Click **Headers** tab
3. Verify Authorization token is set
4. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "roadmaps": [
    {
      "_id": "65a2b3c4d5e6f7g8h9i0j1k2",
      "goal": "Full Stack Developer",
      "duration": "6 months",
      "career": "Full Stack Web Developer",
      "progress": 0,
      "isCompleted": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "65a3b4c5d6e7f8g9h0i1j2k3",
      "goal": "Data Scientist",
      "duration": "12 months",
      "career": "Data Scientist",
      "progress": 25,
      "isCompleted": false,
      "createdAt": "2024-01-14T15:20:00Z",
      "updatedAt": "2024-01-15T09:15:00Z"
    }
  ]
}
```

---

### Test 9: Get Single Roadmap

**Endpoint**: `GET /api/roadmap/:id`

**Purpose**: Retrieve detailed roadmap with all steps, weeks, tasks

**Steps**:

1. Click **Get Single Roadmap** in sidebar
2. Click **Params** tab
3. In `id` field, paste your roadmap ID from Test 7
4. Click **Headers** tab
5. Verify Authorization token
6. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "roadmap": {
    "_id": "65a2b3c4d5e6f7g8h9i0j1k2",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "goal": "Full Stack Developer",
    "duration": "6 months",
    "career": "Full Stack Web Developer",
    "steps": [
      {
        "title": "Month 1: Web Fundamentals",
        "description": "Learn HTML, CSS, and JavaScript...",
        "weeks": [
          {
            "week": "Week 1",
            "focus": "HTML Basics",
            "completed": false,
            "tasks": [
              {
                "title": "Learn HTML Elements",
                "completed": false,
                "resources": {
                  "youtube": [{
                    "title": "HTML Full Course",
                    "url": "https://youtube.com/watch?v=...",
                    "thumbnail": "https://i.ytimg.com/..."
                  }],
                  "courses": [{...}],
                  "docs": [{...}]
                }
              }
            ]
          }
        ]
      }
    ],
    "progress": 0,
    "isCompleted": false
  }
}
```

---

### Test 10: Delete Roadmap

**Endpoint**: `DELETE /api/roadmap/:id`

**Purpose**: Delete a roadmap

**Steps**:

1. Click **Delete Roadmap** in sidebar
2. Click **Params** tab
3. In `id` field, paste a roadmap ID
4. Click **Headers** tab
5. Verify Authorization token
6. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Roadmap deleted successfully"
}
```

---

### Test 11: Chat with AI

**Endpoint**: `POST /api/chat`

**Purpose**: Get AI responses to questions

**Steps**:

1. Click **Send Message** in sidebar
2. Click **Headers** tab
3. Verify Authorization token
4. Click **Body** tab
5. Update JSON:
   ```json
   {
     "message": "How do I learn React?"
   }
   ```
6. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "reply": "React is a JavaScript library for building user interfaces. Here's a learning path: 1) Learn JavaScript fundamentals 2) Understand JSX syntax 3) Learn components and hooks 4) Practice with projects..."
}
```

---

### Test 12: Search YouTube Videos

**Endpoint**: `GET /api/youtube?query=topic`

**Purpose**: Search for learning videos on YouTube

**Steps**:

1. Click **Search Videos** in sidebar
2. Click **Params** tab
3. Set `query` parameter: `"Web Development Tutorial"`
4. Click **Headers** tab
5. Verify Authorization token
6. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "videos": [
    {
      "title": "Web Development Full Course 2024",
      "channel": "Tech Academy",
      "url": "https://www.youtube.com/watch?v=...",
      "thumbnail": "https://i.ytimg.com/...",
      "views": 1500000,
      "likes": 45000
    },
    {
      "title": "HTML & CSS Crash Course",
      "channel": "Code Masters",
      "url": "https://www.youtube.com/watch?v=...",
      "thumbnail": "https://i.ytimg.com/...",
      "views": 800000,
      "likes": 25000
    }
  ]
}
```

---

### Test 13: Get User Profile Stats

**Endpoint**: `GET /api/profile`

**Purpose**: Get user's learning progress statistics

**Steps**:

1. Click **Get Stats** in sidebar
2. Click **Headers** tab
3. Verify Authorization token
4. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "totalRoadmaps": 3,
  "totalTasks": 120,
  "completedTasks": 30,
  "progress": 25
}
```

---

## ⚠️ Common Issues

### 1. 401 Unauthorized

**Cause**: Missing or invalid JWT token

**Solution**:
- Verify Authorization header is set
- Check token hasn't expired (7 days)
- Get new token by logging in

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 2. MongoDB Connection Failed

**Cause**: MongoDB not running or wrong connection string

**Solution**:
- Start MongoDB: `mongod` (Windows) or `brew services start mongodb-community` (Mac)
- Check `.env` has correct `MONGODB_URL`
- Verify database is accessible

### 3. Email Not Sending

**Cause**: Gmail credentials incorrect or 2FA not enabled

**Solution**:
- Verify Gmail 2-Factor Authentication is enabled
- Use App Password (16 characters), not regular password
- Check `GMAIL_USER` and `GMAIL_PASSWORD` in `.env`
- Check spam folder

### 4. Groq API Error

**Error**: `401 Unauthorized` or API returns error

**Solution**:
- Verify `GROQ_API_KEY` is correct in `.env`
- Check for spaces in key
- Regenerate key from Groq console
- Verify API quota limits

### 5. YouTube API Error

**Error**: `403 Forbidden` or quota exceeded

**Solution**:
- Verify `YOUTUBE_API_KEY` is enabled
- Check YouTube API v3 is enabled in Google Cloud
- Verify API key restrictions match domain
- Check daily quota (10,000 units/day)

### 6. Port Already in Use

**Error**: `listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows: Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### 7. CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
- CORS is enabled in server.js
- Verify frontend URL is correct
- Check Network tab in browser

---

## 🎯 Testing Checklist

- [ ] Health Check passes
- [ ] API Test passes
- [ ] Signup creates user (check email for OTP)
- [ ] OTP verification works
- [ ] Login returns token
- [ ] Protected route accepts token
- [ ] Generate Roadmap works (takes 10-15 seconds)
- [ ] Get All Roadmaps returns list
- [ ] Get Single Roadmap returns full details
- [ ] Delete Roadmap works
- [ ] Chat responds with AI message
- [ ] YouTube search returns videos
- [ ] Profile stats calculate correctly

---

## 📚 API Documentation

For detailed API documentation, see [backend/README.md](backend/README.md)

---

**Testing Guide maintained with ❤️ for CareerPath AI**

**Purpose:** Check if server is running

**Steps:**
1. In left sidebar, click **🏥 Health & Test**
2. Click **Health Check**
3. You'll see in main area:
   ```
   ┌──────────────────────────────────────┐
   │ GET http://localhost:5000/api/health │
   ├──────────────────────────────────────┤
   │ Params  Authorization  Headers  Body │
   ├──────────────────────────────────────┤
   │ No additional fields needed          │
   ├──────────────────────────────────────┤
   │            [SEND] button              │
   └──────────────────────────────────────┘
   ```
4. **Click SEND button**

**Expected Response:**
```json
{
  "status": "Server is running",
  "port": "5000"
}
```

**Status:** `200 OK` (green)

✅ **Server is working!**

---

### TEST 2️⃣: TEST ROUTE (No Auth Needed)

**Purpose:** Check if API endpoints are working

**Steps:**
1. Click **🏥 Health & Test**
2. Click **Test Route**
3. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "message": "API working",
  "timestamp": "2026-04-09T10:30:00.000Z"
}
```

**Status:** `200 OK` (green)

✅ **API is responding!**

---

### TEST 3️⃣: SIGNUP (Create New User)

⭐ **IMPORTANT: This test MUST be done before others!**

**Purpose:** Create a new user account

**Steps:**

1. Click **🔐 Authentication**
2. Click **Signup**
3. You'll see this:
   ```
   ┌────────────────────────────────────────┐
   │ POST http://localhost:5000/api/auth/signup
   ├────────────────────────────────────────┤
   │ Params  Authorization  Headers  Body   │
   │                          ↓             │
   │                       [Body tab]      │
   ├────────────────────────────────────────┤
   │ Current JSON:                          │
   │ {                                      │
   │   "name": "John Doe",                 │
   │   "email": "john@email.com",          │
   │   "password": "password123",          │
   │   "passwordConfirm": "password123"    │
   │ }                                      │
   └────────────────────────────────────────┘
   ```

4. **IMPORTANT:** Change the email to something UNIQUE
   - Change `john@email.com` to something like:
     - `user1@email.com`
     - `test123@email.com`
     - `myname@email.com`
   - (Can't use `john@email.com` twice!)

5. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdjZTMyZjEyMyIsImlhdCI6MTcwMzc1OTIwMCwiZXhwIjoxNzA2MzUxMjAwfQ.abcd1234...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "user1@email.com"
  }
}
```

**Status:** `201 Created` (green)

### ⭐ SAVE THE TOKEN!
**Copy the long `token` value** - you'll need it for all protected routes!

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdjZTMyZjEyMyIsImlhdCI6MTcwMzc1OTIwMCwiZXhwIjoxNzA2MzUxMjAwfQ.abcd1234...
                            ↑ Copy from here to end
```

---

### TEST 4️⃣: LOGIN (Alternative - Get Token Again)

**Purpose:** Login with email/password and get new token

**Steps:**

1. Click **🔐 Authentication**
2. Click **Login**
3. You'll see:
   ```json
   {
     "email": "john@email.com",
     "password": "password123"
   }
   ```

4. **Change email** to same one from Signup (e.g., `user1@email.com`)

5. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "user1@email.com"
  }
}
```

**Status:** `200 OK` (green)

✅ **You got the token!**

---

### TEST 5️⃣: PROTECTED ROUTE - GET ME

**Purpose:** Test if authorization middleware works

⭐ **This test REQUIRES token from Test 3 or 4!**

**Steps:**

1. Click **🔐 Authentication**
2. Click **Protected Route - Get Me**
3. You'll see:
   ```
   ┌────────────────────────────────────────┐
   │ GET http://localhost:5000/api/auth/me  │
   ├────────────────────────────────────────┤
   │ Params  Authorization  Headers  Body   │
   │           ↓                             │
   │  [Authorization tab]                   │
   ├────────────────────────────────────────┤
   │ Authorization header shows:             │
   │ Authorization: Bearer YOUR_TOKEN_HERE   │
   └────────────────────────────────────────┘
   ```

4. **Replace YOUR_TOKEN_HERE with actual token**
   - Click **Authorization** tab
   - Find the header that says:
     ```
     Authorization: Bearer YOUR_TOKEN_HERE
     ```
   - Replace `YOUR_TOKEN_HERE` with your actual token from Test 3

   **Before:**
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

   **After:**
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdjZTMyZjEyMyIsImlhdCI6MTcwMzc1OTIwMCwiZXhwIjoxNzA2MzUxMjAwfQ.abcd1234...
   ```

5. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "message": "This is a protected route",
  "userId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

**Status:** `200 OK` (green)

✅ **JWT Authentication is working!**

---

### TEST 6️⃣: GENERATE ROADMAP ⭐ MOST IMPORTANT

**Purpose:** Generate AI-powered career roadmap using Gemini

⭐ **Requires:**
- Token from Test 3/4
- Gemini API key in .env (restart server!)

**Steps:**

1. Click **🤖 Roadmap (AI Generated)**
2. Click **Generate Roadmap**
3. You'll see:
   ```
   ┌──────────────────────────────────────────────┐
   │ POST http://localhost:5000/api/roadmap/generate
   ├──────────────────────────────────────────────┤
   │ Params  Authorization  Headers  Body          │
   │           ↓              ↓                     │
   │         [Auth tab]    [Body tab]              │
   ├──────────────────────────────────────────────┤
   │ Authorization header:                         │
   │ Bearer YOUR_TOKEN_HERE                        │
   │                                               │
   │ Body JSON:                                    │
   │ {                                             │
   │   "goal": "Become a Full Stack Developer",   │
   │   "skills": "HTML, CSS, JavaScript basics",  │
   │   "duration": "6 months"                      │
   │ }                                             │
   └──────────────────────────────────────────────┘
   ```

4. **Update Authorization header** with your token (same as Test 5)

5. **Optional:** Change the goal/skills/duration if you want:
   ```json
   {
     "goal": "Become a Data Scientist",
     "skills": "Python, Statistics, Excel",
     "duration": "12 months"
   }
   ```

6. Click **SEND**

7. **Wait 10-15 seconds** ⏳ (Gemini AI is thinking!)

**Expected Response:** (Beautiful structured roadmap!)
```json
{
  "success": true,
  "message": "Roadmap generated successfully",
  "roadmap": {
    "id": "65a2b3c4d5e6f7g8h9i0j1k2",
    "career": "Full Stack Developer",
    "duration": "6 months",
    "steps": [
      {
        "title": "Master JavaScript Fundamentals",
        "description": "Learn core JavaScript concepts including variables, functions, loops, objects, and the basics of async programming",
        "skills": [
          "Variables and Data Types",
          "Functions and Scope",
          "Async/Await Promises",
          "ES6+ Features"
        ],
        "tools": [
          "VS Code",
          "Node.js",
          "Chrome DevTools"
        ],
        "resources": [
          "MDN Web Docs",
          "JavaScript.info",
          "Codecademy"
        ],
        "projectIdeas": [
          "Calculator Application",
          "Todo List App",
          "Weather Application"
        ]
      },
      {
        "title": "Learn React Framework",
        "description": "Master React for building interactive user interfaces with components, state management, and hooks",
        "skills": [
          "React Components",
          "Hooks (useState, useEffect)",
          "Props and State",
          "React Router"
        ],
        "tools": [
          "React",
          "Create React App",
          "Redux DevTools"
        ],
        "resources": [
          "React Official Documentation",
          "Udemy React Course",
          "React Patterns"
        ],
        "projectIdeas": [
          "Social Media Dashboard",
          "E-commerce Product Page",
          "Blog Platform"
        ]
      },
      {
        "title": "Backend Development with Node.js",
        "description": "Learn server-side development using Node.js and Express to create REST APIs",
        "skills": [
          "Express.js",
          "RESTful APIs",
          "Middleware",
          "Authentication"
        ],
        "tools": [
          "Node.js",
          "Express.js",
          "Postman"
        ],
        "resources": [
          "Express Official Docs",
          "REST API Best Practices",
          "Backend Patterns"
        ],
        "projectIdeas": [
          "Blog API",
          "User Authentication System",
          "E-commerce API"
        ]
      },
      {
        "title": "Database Management with MongoDB",
        "description": "Learn MongoDB for storing and managing application data with proper schema design",
        "skills": [
          "MongoDB Basics",
          "CRUD Operations",
          "Mongoose ODM",
          "Database Design"
        ],
        "tools": [
          "MongoDB",
          "MongoDB Atlas",
          "Mongoose"
        ],
        "resources": [
          "MongoDB Documentation",
          "Mongoose Documentation",
          "Database Design Principles"
        ],
        "projectIdeas": [
          "Student Management System",
          "Inventory Database",
          "User Profiles Database"
        ]
      },
      {
        "title": "MERN Stack Integration",
        "description": "Combine MongoDB, Express, React, and Node.js to build complete full-stack applications",
        "skills": [
          "Full Stack Architecture",
          "API Integration",
          "Deployment",
          "Testing"
        ],
        "tools": [
          "Git",
          "GitHub",
          "Heroku/Vercel"
        ],
        "resources": [
          "MERN Stack Tutorials",
          "Full Stack Best Practices",
          "DevOps Basics"
        ],
        "projectIdeas": [
          "Social Network App",
          "Project Management Tool",
          "Learning Platform"
        ]
      },
      {
        "title": "Advanced Topics and Deployment",
        "description": "Learn advanced concepts like caching, security, performance optimization, and cloud deployment",
        "skills": [
          "Security Practices",
          "Performance Optimization",
          "Caching Strategies",
          "Cloud Deployment"
        ],
        "tools": [
          "Docker",
          "AWS/Google Cloud",
          "CI/CD Pipeline"
        ],
        "resources": [
          "Web Security Academy",
          "Performance Optimization Guide",
          "Cloud Platforms Documentation"
        ],
        "projectIdeas": [
          "High-traffic Web Application",
          "Microservices Architecture",
          "Real-time Collaboration Tool"
        ]
      }
    ]
  }
}
```

**Status:** `201 Created` (green)

### ⭐ IMPORTANT: Save the Roadmap ID!

Copy the roadmap `id` value:
```
"id": "65a2b3c4d5e6f7g8h9i0j1k2"
```

You'll need it for Tests 7 & 8!

✅ **Gemini AI is working! 🎉**

---

### TEST 7️⃣: GET ALL USER ROADMAPS

**Purpose:** Fetch all roadmaps created by loggedin user

**Steps:**

1. Click **🤖 Roadmap (AI Generated)**
2. Click **Get All User Roadmaps**
3. Update **Authorization** header with your token
4. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "roadmaps": [
    {
      "_id": "65a2b3c4d5e6f7g8h9i0j1k2",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
      "goal": "Become a Full Stack Developer",
      "skills": "HTML, CSS, JavaScript basics",
      "duration": "6 months",
      "career": "Full Stack Developer",
      "steps": [ ... ],
      "isCompleted": false,
      "progress": 0,
      "createdAt": "2026-04-09T10:35:00.000Z",
      "updatedAt": "2026-04-09T10:35:00.000Z"
    }
  ]
}
```

**Status:** `200 OK` (green)

✅ **Database is saving roadmaps!**

---

### TEST 8️⃣: GET SINGLE ROADMAP

**Purpose:** Fetch details of one specific roadmap

⭐ **Requires:**
- Roadmap ID from Test 6 or 7

**Steps:**

1. Click **🤖 Roadmap (AI Generated)**
2. Click **Get Single Roadmap**
3. You'll see URL:
   ```
   http://localhost:5000/api/roadmap/ROADMAP_ID_HERE
   ```

4. **Replace ROADMAP_ID_HERE with actual ID**
   - From Test 6, copy: `65a2b3c4d5e6f7g8h9i0j1k2`
   - Replace in URL:
     ```
     http://localhost:5000/api/roadmap/65a2b3c4d5e6f7g8h9i0j1k2
     ```

5. Update **Authorization** header with token

6. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "roadmap": {
    "_id": "65a2b3c4d5e6f7g8h9i0j1k2",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "goal": "Become a Full Stack Developer",
    "career": "Full Stack Developer",
    "duration": "6 months",
    "skills": "HTML, CSS, JavaScript basics",
    "steps": [ ... all steps ... ],
    "isCompleted": false,
    "progress": 0,
    "createdAt": "2026-04-09T10:35:00.000Z",
    "updatedAt": "2026-04-09T10:35:00.000Z"
  }
}
```

**Status:** `200 OK` (green)

✅ **Can fetch single roadmap!**

---

### TEST 9️⃣: DELETE ROADMAP (Optional)

**Purpose:** Delete a roadmap

⭐ **Requires:**
- Roadmap ID

**Steps:**

1. Click **🤖 Roadmap (AI Generated)**
2. Click **Delete Roadmap**
3. Replace `ROADMAP_ID_HERE` with actual ID (same as Test 8)
4. Update **Authorization** header with token
5. Click **SEND**

**Expected Response:**
```json
{
  "success": true,
  "message": "Roadmap deleted successfully"
}
```

**Status:** `200 OK` (green)

✅ **Roadmap deleted!**

---

## 📊 SUMMARY: What Each Test Validates

| Test | Purpose | Auth? | Result |
|------|---------|-------|--------|
| 1. Health Check | Server running | ❌ | ✅ Server up |
| 2. Test Route | API responding | ❌ | ✅ API works |
| 3. Signup | User registration | ❌ | ✅ User + Token |
| 4. Login | Authentication | ❌ | ✅ Token |
| 5. Get Me | JWT validation | ✅ | ✅ Auth works |
| 6. Generate Roadmap | AI integration | ✅ | ✅ Gemini works |
| 7. Get All Roadmaps | Database fetch | ✅ | ✅ DB works |
| 8. Get Single Roadmap | Fetch by ID | ✅ | ✅ Privacy works |
| 9. Delete Roadmap | Ownership check | ✅ | ✅ Delete works |

---

## ✅ SUCCESS CHECKLIST

After all tests, check:

- [ ] All responses show `"success": true` or `200/201 status`
- [ ] Tokens are valid (Test 5 passes)
- [ ] Gemini AI generates roadmap (Test 6 works)
- [ ] Database saves data (Test 7 shows your roadmap)
- [ ] Can fetch specific roadmap (Test 8 works)
- [ ] Error handling works (try with wrong token)

---

## ❌ COMMON ISSUES & FIXES

### Issue: "Cannot GET /api/health"
**Fix:** Server not running
- Open terminal and run: `npm run dev` in backend folder

### Issue: "401 Unauthorized"
**Fix:** Wrong/missing token
- Run Test 3 or 4 again to get token
- Copy exact token value
- Paste in Authorization header

### Issue: "Invalid AI response"
**Fix:** Gemini API key not set
- Open `.env` file
- Add: `GEMINI_API_KEY=your_actual_key`
- Restart server (`Ctrl+C`, then `npm run dev`)

### Issue: "Email already in use"
**Fix:** Use different email in signup
- Use: `user2@email.com`, `test456@email.com`, etc.

### Issue: "Invalid coordinates"
**Fix:** Your token expired (after 30 days)
- Run Test 3 or 4 to get new token

---

## 🎓 What You've Just Tested

✅ **Full Stack Functionality:**
- Frontend will connect to these APIs
- User signup/login (authentication)
- JWT token protection
- AI roadmap generation
- Database operations
- Error handling

**You're ready to build the Frontend!** 🚀

