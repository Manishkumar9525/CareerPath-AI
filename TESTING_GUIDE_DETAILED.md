# 🚀 Complete API Testing Guide - CareerPath AI

## ⚙️ PART 1: SETUP (Do This First)

### Step 1.1: Install Postman
1. Go to https://www.postman.com/downloads/
2. Download for Windows
3. Install and open Postman
4. You'll see this screen:
   ```
   ┌─────────────────────────────────────┐
   │         POSTMAN MAIN WINDOW         │
   │  ┌──────────────────────────────┐  │
   │  │ File  Edit  View  Help       │  │
   │  ├──────────────────────────────┤  │
   │  │  Collections  History  etc   │  │
   │  └──────────────────────────────┘  │
   └─────────────────────────────────────┘
   ```

### Step 1.2: Start Backend Server
1. Open **PowerShell** or **Terminal**
2. Navigate to backend folder:
   ```bash
   cd d:\PROJECT\CAREER_AI\backend
   ```
3. Start server:
   ```bash
   npm run dev
   ```
4. You should see:
   ```
   ╔════════════════════════════════════════╗
   ║   CareerPath AI Backend Server         ║
   ║   Server running on port 5000          ║
   ║   Environment: development             ║
   ╚════════════════════════════════════════╝
   ```
   ✅ **Server is now running!**

### Step 1.3: Add Gemini API Key to .env
1. Open file: `d:\PROJECT\CAREER_AI\backend\.env`
2. Find this line:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Replace with your actual key:
   ```
   GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Save file
5. **Restart the server** (Stop and run `npm run dev` again)
   - Stop: Press `Ctrl + C` in terminal
   - Start: Run `npm run dev` again

✅ **Now you're ready to test!**

---

## 📥 PART 2: IMPORT POSTMAN COLLECTION

### Step 2.1: Import Collection File
1. In Postman, click **File** (top left)
2. Click **Import**
3. A popup will appear:
   ```
   ┌──────────────────────────────────────┐
   │         IMPORT                       │
   ├──────────────────────────────────────┤
   │ ⚫ File              ← Click this      │
   │ ⚪ Folder                            │
   │ ⚪ Link                              │
   │ ⚪ Raw text                          │
   └──────────────────────────────────────┘
   ```

### Step 2.2: Select Collection File
1. Click **File** tab (if not already selected)
2. Click **Upload Files** button
3. Navigate to: `d:\PROJECT\CAREER_AI\`
4. Find and select: `CareerPath_AI_Postman_Collection.json`
5. Click **Import**

### Step 2.3: Collection Loaded Successfully
You should see in left sidebar:
```
📁 CareerPath AI API
   ├─ 🏥 Health & Test
   │  ├─ Health Check
   │  └─ Test Route
   ├─ 🔐 Authentication
   │  ├─ Signup
   │  ├─ Login
   │  └─ Protected Route - Get Me
   └─ 🤖 Roadmap (AI Generated)
      ├─ Generate Roadmap
      ├─ Get All User Roadmaps
      ├─ Get Single Roadmap
      └─ Delete Roadmap
```

✅ **Collection imported!**

---

## 🧪 PART 3: TEST ALL ENDPOINTS

### TEST 1️⃣: HEALTH CHECK (No Auth Needed)

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

