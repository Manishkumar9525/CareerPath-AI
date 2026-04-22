# CareerPath AI - Complete Setup Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Email Configuration (Gmail OTP)](#email-configuration)
4. [Groq API Setup](#groq-api-setup)
5. [YouTube API Setup](#youtube-api-setup)
6. [Backend Configuration](#backend-configuration)
7. [Verifying Your Setup](#verifying-your-setup)
8. [Troubleshooting](#troubleshooting)


---

## ✅ Prerequisites

Install the following before starting:

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | v14 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v6+ (comes with Node.js) | Bundled with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **Code Editor** | Any | VS Code recommended |

### Verify Installation

Open terminal/PowerShell and run:

```bash
node --version      # Should be v14+
npm --version       # Should be v6+
git --version       # Should show installed version
```

Example output:
```
v18.19.0
9.8.1
git version 2.40.0
```

---

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB (Development)

#### Windows Installation

1. **Download MongoDB Community**
   - Visit [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Download Windows installer (`.msi`)
   - Run installer with default settings

2. **Start MongoDB Service**
   ```bash
   mongod
   ```
   - If using default installation, this starts the MongoDB server
   - You should see: `"Listening on 127.0.0.1:27017"`

3. **Connection String**
   ```
   mongodb://localhost:27017/careerpath-ai
   ```

#### Mac Installation

```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify running
brew services list
```

#### Linux Installation

Visit [MongoDB Documentation](https://docs.mongodb.com/manual/installation/) for your Linux distribution.

---

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

#### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up with Email**
3. Enter email, password, and complete registration
4. Verify email address

#### Step 2: Create a Project

1. Click **Create a Project**
2. Enter project name: `CareerPath AI`
3. Click **Create Project**
4. Skip inviting team members

#### Step 3: Create a Cluster

1. Click **Create a Deployment**
2. Choose **M0 Free** tier (always free)
3. Select your preferred region (closest to you)
4. Click **Create Deployment**
5. Wait 2-3 minutes for cluster to be ready

#### Step 4: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Set:
   - Username: `careerpath_user`
   - Password: `Your_Strong_Password_123`
   - Role: `Atlas Admin`
4. Click **Add User**

#### Step 5: Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (for development)
   - This adds `0.0.0.0/0` to whitelist
4. Confirm

#### Step 6: Get Connection String

1. Go to **Clusters** page
2. Click **Connect** button
3. Choose **Connect your application**
4. Select:
   - Driver: **Node.js**
   - Version: **5.9 or later**
5. Copy connection string:
   ```
   mongodb+srv://careerpath_user:<password>@cluster.mongodb.net/careerpath-ai?retryWrites=true&w=majority
   ```

#### Step 7: Update Connection String

Replace `<password>` with your actual password:
```
mongodb+srv://careerpath_user:Your_Strong_Password_123@cluster.mongodb.net/careerpath-ai?retryWrites=true&w=majority
```

---

## 📧 Email Configuration (Gmail OTP)

CareerPath AI sends OTP verification emails via Gmail. Here's how to set it up:

### Step 1: Enable 2-Factor Authentication

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Find **2-Step Verification**
4. Click **Enable 2-Step Verification**
5. Complete the setup (select phone number, receive code)

### Step 2: Create App Password

1. Go back to **Security** page
2. Scroll down to **App passwords** (only visible if 2FA enabled)
3. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your OS)
4. Click **Generate**
5. Google shows a 16-character password:
   ```
   xxxx xxxx xxxx xxxx
   ```
6. **Copy this password** (you'll need it in .env)

### Step 3: Update .env File

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Example**:
```env
GMAIL_USER=john.doe@gmail.com
GMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Important Notes

⚠️ **Do NOT use your regular Gmail password**
- Only app passwords work
- These are unique 16-character tokens
- Each app gets its own password

✅ **Security**:
- Never commit `.env` file to Git
- Use `.env.example` for template
- Change password if exposed

---

## 🤖 Groq API Setup

Groq provides fast, open-source LLM models for roadmap generation.

### Step 1: Create Groq Account

1. Visit [console.groq.com](https://console.groq.com)
2. Click **Sign Up**
3. Complete registration with email
4. Verify email

### Step 2: Create API Key

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Click **Create API Key**
3. Copy the generated key:
   ```
   gsk_xxxxxxxxxxxxxxxxxxxxx
   ```

### Step 3: Update .env File

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
```

### Step 4: Verify API Key

Test the API key by checking the /test-groq endpoint after starting the server.

**Models Available**:
- `llama-3.3-70b-versatile` (used for roadmaps)
- `mixtral-8x7b-32768`
- More available on Groq console

---

## 🎬 YouTube API Setup

YouTube API provides video search and metadata for learning resources.

### Step 1: Create Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a Project** (top left)
3. Click **NEW PROJECT**
4. Project name: `CareerPath AI`
5. Click **Create** (takes a few seconds)

### Step 2: Enable YouTube Data API v3

1. Go to **APIs & Services** → **Library**
2. Search for `YouTube Data API v3`
3. Click the result
4. Click **Enable** (blue button)

### Step 3: Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** (top)
3. Select **API Key**
4. Copy the generated key:
   ```
   AIza_xxxxxxxxxxxxxxxxxxxxx
   ```

### Step 4: Restrict API Key (Important for Security)

1. Click on the API key
2. Go to **Application restrictions**
3. Select **HTTP referrers** (websites)
4. Add:
   ```
   http://localhost:3000
   http://localhost:5000
   ```
5. Click **Save**

### Step 5: Update .env File

```env
YOUTUBE_API_KEY=AIza_xxxxxxxxxxxxxxxxxxxxx
```

### Notes

⚠️ **Quota Limits**:
- Free tier: 10,000 units/day
- Each search query: ~100 units
- Each videos.list call: ~4 units
- Sufficient for testing

✅ **Rate Limiting**:
- API will return 403 if quota exceeded
- Quota resets at midnight PT
- Upgrade to paid tier for higher limits

---

## 🚀 Backend Configuration

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/CareerPath-AI.git
cd CareerPath-AI
```

### Step 2: Navigate to Backend

```bash
cd backend
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs all packages from `package.json`:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- nodemailer
- axios
- cors
- dotenv

### Step 4: Create .env File

```bash
cp .env.example .env
```

Or create manually:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Step 5: Update .env with Your Credentials

Edit `backend/.env`:

```env
# ===== DATABASE =====
MONGODB_URL=mongodb://localhost:27017/careerpath-ai
# Or MongoDB Atlas:
# MONGODB_URL=mongodb+srv://careerpath_user:Your_Password@cluster.mongodb.net/careerpath-ai?retryWrites=true&w=majority

# ===== SERVER =====
PORT=5000
NODE_ENV=development

# ===== JWT =====
JWT_SECRET=your_super_secret_key_change_in_production_12345

# ===== EMAIL (Gmail) =====
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# ===== AI API (Groq) =====
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx

# ===== YOUTUBE =====
YOUTUBE_API_KEY=AIza_xxxxxxxxxxxxxxxxxxxxxxxx

# ===== GEMINI (Optional) =====
GEMINI_API_KEY=AIza_xxxxxxxxxxxxxxxxxxxxxxxx
USE_MOCK_FALLBACK=true
```

**Security Tips**:
- ✅ Use strong `JWT_SECRET` (use uuidgen or online generator)
- ✅ Use app password for Gmail (not real password)
- ✅ Never commit `.env` to Git
- ✅ Use different keys for dev/production

### Step 6: Start Backend Server

```bash
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

✅ **Server is running!**

---

## ✔️ Verifying Your Setup

### Test 1: Server Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "port": "5000"
}
```

### Test 2: API Status

```bash
curl http://localhost:5000/api/test
```

Expected response:
```json
{
  "success": true,
  "message": "API working",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test 3: Database Connection

Check terminal output for:
```
MongoDB Connected: localhost
```

If you don't see this, check:
- MongoDB is running
- `MONGODB_URL` is correct in `.env`
- No other app using port 27017 (MongoDB default)

### Test 4: Email Configuration

1. Make a signup request via Postman
2. Check email inbox for OTP
3. If no email:
   - Verify Gmail credentials
   - Check "Less secure app access" is enabled
   - Use app password, not regular password

### Test 5: API Integration

1. Use Postman collection: `CareerPath_AI_Postman_Collection.json`
2. Test signup → verify OTP → login flow
3. Test roadmap generation (requires valid Groq API key)

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoDB connection failed`

**Solutions**:
```bash
# Check if MongoDB is running
# Windows: mongod command should be running
# Mac: brew services list
# Linux: systemctl status mongod

# Verify connection string in .env
# Local: mongodb://localhost:27017/careerpath-ai
# Atlas: mongodb+srv://user:password@cluster.mongodb.net/db

# Check firewall (if using Atlas)
# Allow access from your IP
```

---

### Email Not Sending

**Error**: `MAIL ERROR: Invalid login`

**Solutions**:
```bash
# 1. Verify Gmail 2-Factor Authentication is enabled
# 2. Verify using APP PASSWORD (not regular password)
# 3. App password is 16 characters: xxxx xxxx xxxx xxxx
# 4. Check correct email in GMAIL_USER
# 5. Enable "Less secure app access" on Gmail account
```

---

### API Key Issues

**Error**: `Groq API Error: 401 Unauthorized`

**Solutions**:
```bash
# 1. Copy full Groq API key (check for spaces)
# 2. Verify key hasn't expired
# 3. Check quota limits on Groq console
# 4. Regenerate key if needed
```

**Error**: `YouTube API: 403 Forbidden`

**Solutions**:
```bash
# 1. Verify YouTube API is ENABLED in Google Cloud
# 2. Check API key restriction matches your domain
# 3. Verify quota hasn't exceeded (10,000/day)
# 4. Check quota usage on Google Cloud console
```

---

### Port Already in Use

**Error**: `listen EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>

# Or change PORT in .env to 5001, 5002, etc.
```

---

### Node Modules Issues

**Error**: `Cannot find module express`

**Solutions**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm cache clean
npm cache clean --force
npm install
```

---

### Permission Denied

**Error**: `Permission denied` when running npm commands

**Solutions**:
```bash
# Use sudo (Mac/Linux)
sudo npm install

# Or fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## 📚 Next Steps

1. ✅ Setup complete? Start testing with [TESTING_GUIDE_DETAILED.md](TESTING_GUIDE_DETAILED.md)
2. 📖 Read [backend/README.md](../backend/README.md) for API documentation
3. 🤝 Ready to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🆘 Still Having Issues?

1. **Check logs**: Look at terminal output for error messages
2. **Review credentials**: Verify all API keys are correct
3. **Test endpoints**: Use Postman to test individual endpoints
4. **Check documentation**: See backend/README.md for detailed API info
5. **Create GitHub issue**: Report bugs with detailed error messages

---

**Setup Guide maintained with ❤️ for CareerPath AI**
