# CareerPath AI - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Email Configuration](#email-configuration)
4. [Gemini API Setup](#gemini-api-setup)
5. [YouTube API Setup](#youtube-api-setup)
6. [Backend Configuration](#backend-configuration)
7. [Frontend Configuration](#frontend-configuration)
8. [Testing the Application](#testing-the-application)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Install the following before starting:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

Verify installation:
```bash
node --version
npm --version
git --version
```

## MongoDB Setup

### Option 1: Local MongoDB (Development)

1. **Install MongoDB Community Edition**
   - Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Mac: `brew tap mongodb/brew && brew install mongodb-community`
   - Linux: Follow official MongoDB documentation

2. **Start MongoDB**
   ```bash
   # Windows
   mongod
   
   # Mac/Linux
   brew services start mongodb-community
   ```

3. **Connection String**
   ```
   MONGODB_URI=mongodb://localhost:27017/careerpath-ai
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Free Account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Choose "M0 Free" tier
   - Select region closest to you
   - Create cluster (takes 2-3 minutes)

3. **Create Database User**
   - Go to Database Access
   - Add New Database User
   - Create username and password
   - Add to Whitelist: 0.0.0.0/0 (allow any IP)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

5. **Update .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerpath-ai?retryWrites=true&w=majority
   ```

## Email Configuration

### Gmail Setup for OTP

1. **Enable 2-Factor Authentication**
   - Go to myaccount.google.com
   - Click Security in left menu
   - Enable 2-Step Verification

2. **Create App Password**
   - Go back to Security
   - Find "App passwords"
   - Select "Mail" and "Windows Computer"
   - Google generates 16-character password

3. **Update .env**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # 16-character password
   ```

### Other Email Providers

If not using Gmail, check your provider's SMTP settings and update `emailService.js`:

```javascript
const transporter = nodemailer.createTransport({
  service: 'your-provider',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Gemini API Setup

1. **Create Google AI Studio Access**
   - Visit [aistudio.google.com](https://aistudio.google.com)
   - Sign in with Google account
   - Open API keys page

2. **Generate API Key**
   - Click "Create API key"
   - Choose "Create API key in new project"
   - Copy the key (you won't see it again)
   - Save securely

3. **Add to .env**
   ```
   GEMINI_API_KEY=AIza...
   ```

4. **Keep Fallback Enabled During Development**
   - Use `USE_MOCK_FALLBACK=true` while API setup is unstable
   - Postman response will include both AI error and mock roadmap fallback

## YouTube API Setup

1. **Create Google Cloud Project**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Click "Select a Project"
   - Click "NEW PROJECT"
   - Enter name "CareerPath AI"
   - Create project

2. **Enable YouTube Data API v3**
   - Go to APIs & Services → Library
   - Search "YouTube Data API v3"
   - Click "Enable"

3. **Create API Key**
   - Go to APIs & Services → Credentials
   - Click "Create Credentials"
   - Choose "API Key"
   - Copy the key

4. **Restrict API Key** (Important for security)
   - Click the API key
   - Application restrictions → HTTP referrers
   - Add http://localhost:3000
   - Save

5. **Add to .env**
   ```
   YOUTUBE_API_KEY=AIza...
   ```

## Backend Configuration

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
```bash
cp .env.example .env
```

### Step 4: Update .env with Your Keys
```env
# Database
MONGODB_URI=mongodb://localhost:27017/careerpath-ai
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/careerpath-ai

# Server
PORT=5000

# JWT
JWT_SECRET=your_super_secret_key_change_in_production

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Gemini
GEMINI_API_KEY=AIza-your-key
USE_MOCK_FALLBACK=true

# YouTube
YOUTUBE_API_KEY=AIza-your-key

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 5: Start Backend Server
```bash
npm run dev
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
```

**Test the Backend:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running","timestamp":"..."}
```

## Frontend Configuration

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
```bash
cp .env.example .env
```

### Step 4: Update .env
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start Frontend
```bash
npm start
```

The app should automatically open at http://localhost:3000

## Testing the Application

### Test Authentication Flow

1. **Sign Up**
   - Go to http://localhost:3000
   - Click "Sign Up"
   - Fill in name, email, password
   - Click "Sign Up"
   - You should receive OTP email

2. **Verify OTP**
   - Check email for OTP
   - Enter OTP on verification page
   - Should redirect to dashboard

3. **Login**
   - Go to http://localhost:3000/login
   - Use your email and password
   - Should log in successfully

### Test Roadmap Generation

1. **Create Roadmap**
   - Click "Create New Roadmap"
   - Enter goal: "Python Developer"
   - Enter experience: "Background in Java programming"
   - Click "Generate Roadmap"
   - Wait for AI to generate roadmap (30-60 seconds)

2. **View Roadmap**
   - Roadmap should display with structured phases
   - Click "Learning Resources" tab
   - See YouTube videos

3. **Track Progress**
   - Click "Progress Tracker" tab
   - Click "Update Progress"
   - Enter percentage
   - Save progress

### Test Email Notifications

1. **Check Gmail/Email**
   - Verify OTP email arrives within 1-2 minutes
   - Try "Resend OTP" and verify new email

## Troubleshooting

### Backend Issues

**Error: "Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check connection string in .env
- For Atlas, allow your IP: 0.0.0.0/0

**Error: "Gemini API model not found (404)"**
- Verify key created in Google AI Studio (not Cloud Console)
- Check no spaces in `.env`
- Keep `USE_MOCK_FALLBACK=true` to continue development
- Open an issue in GitHub with full error response and request payload

**Error: "Email not sending"**
- Enable "Less secure app access" in Gmail
- Or use App Password (16 chars)
- Check firewall not blocking port 587

**Port 5000 already in use**
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

### Frontend Issues

**Error: "Cannot find module 'tailwindcss'"**
```bash
npm install tailwindcss postcss autoprefixer
```

**Error: "API calls failing with 401"**
- Ensure backend is running on port 5000
- Check .env has correct REACT_APP_API_URL
- Verify token is being saved in localStorage

## Community Help

If you can reproduce the Gemini API issue, please contribute a fix.

- Open an issue with request/response details.
- Submit a PR with compatibility fix for Gemini model/version.
- See `CONTRIBUTING.md` for contribution workflow.

**Tailwind styles not working**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### General Issues

**Clear cache and restart**
```bash
# Backend
pkill -f "node"

# Frontend
rm -rf node_modules
rm package-lock.json
npm install
npm start
```

**Check logs**
- Backend: Look at terminal where `npm run dev` is running
- Frontend: Check browser console (F12)

## Next Steps

1. Deploy backend to Heroku, Railway, or Render
2. Deploy frontend to Vercel or Netlify
3. Update FRONTEND_URL and REACT_APP_API_URL for production
4. Set up custom domain
5. Enable HTTPS

## Useful Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start dev server
npm start            # Start production

# Frontend
cd frontend
npm install          # Install dependencies
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests

# Database
mongo               # Open MongoDB shell
show dbs            # List databases
use careerpath-ai   # Switch to app database
db.users.find()     # View all users
db.roadmaps.find()  # View all roadmaps
```

---

**You're all set!** 🎉 The application should now be fully functional. Visit http://localhost:3000 to start using CareerPath AI!
