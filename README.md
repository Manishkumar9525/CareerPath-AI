# CareerPath AI

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## 🎯 Problem Statement

Career planning is overwhelming for learners. Traditional resources are fragmented across platforms, lack personalization, and don't provide structured guidance. Learners struggle to find relevant learning materials, understand career progression, and stay motivated.

**CareerPath AI** solves this by generating AI-powered, personalized career learning roadmaps with curated resources tailored to each user's goals, current skills, and available time.

---

## ✨ Features

### 🤖 AI-Powered Roadmap Generation
- Generate detailed career roadmaps using Groq API (Llama 3.3 model)
- Personalized based on user's goal, skills, and duration
- Structured progression: months → weeks → tasks

### 📚 Resource Aggregation
- Auto-curated YouTube videos for each task
- Course recommendations
- Official documentation links
- Resources ranked by views and relevance

### 🔐 Secure Authentication
- Email-based OTP verification system
- JWT-based token authentication
- Password hashing with bcryptjs

### 💬 AI Chat Assistant
- Real-time Q&A support using Groq API
- Context-aware learning assistance

### 📊 Progress Tracking
- Track completed tasks and overall progress
- View roadmap completion statistics
- Monitor learning journey

### 🎬 Video Integration
- YouTube search with view/like sorting
- Auto-generated thumbnails and metadata
- Hindi language support (for Indian market)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js v14+ |
| **Framework** | Express.js 4.18+ |
| **Database** | MongoDB 9.4+ |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Security** | bcryptjs 3.0+ |
| **Email Service** | Nodemailer 8.0+ |
| **External APIs** | Groq, YouTube Data API v3, Gmail SMTP |
| **HTTP Client** | Axios |
| **Development** | Nodemon |

---

## 📁 Project Structure

```
CareerPath-AI/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (signup, login, OTP)
│   │   ├── roadmapController.js  # Roadmap CRUD operations
│   │   ├── chatController.js     # AI chat endpoint
│   │   ├── youtubeController.js  # YouTube search
│   │   ├── profileController.js  # User progress stats
│   │   └── testController.js     # API testing endpoint
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema with OTP
│   │   └── Roadmap.js            # Roadmap schema (months→weeks→tasks)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   ├── roadmapRoutes.js      # /api/roadmap endpoints
│   │   ├── chatRoutes.js         # /api/chat endpoints
│   │   ├── youtubeRoutes.js      # /api/youtube endpoints
│   │   ├── profileRoutes.js      # /api/profile endpoints
│   │   └── testRoutes.js         # /api/test endpoints
│   ├── utils/
│   │   ├── resourceService.js    # YouTube/courses/docs fetching
│   │   ├── mailSender.js         # Gmail OTP sender
│   │   └── geminiHelper.js       # Gemini API integration
│   ├── package.json
│   ├── server.js                 # Express app entry point
│   └── .env.example              # Environment template
├── SETUP_GUIDE.md                # Installation & configuration
├── TESTING_GUIDE_DETAILED.md     # API testing with Postman
├── CONTRIBUTING.md               # Contribution guidelines
├── CareerPath_AI_Postman_Collection.json # API collection
└── README.md                     # This file

```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/CareerPath-AI.git
cd CareerPath-AI
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

### 3. Configure Environment Variables
Edit `.env` file:
```env
# Database
MONGODB_URL=mongodb://localhost:27017/careerpath-ai
# or MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/careerpath-ai

# Server
PORT=5000
NODE_ENV=development

# JWT Security
JWT_SECRET=your_super_secret_key_change_in_production

# Email (Gmail OTP)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# AI API (Groq)
GROQ_API_KEY=your_groq_api_key

# YouTube
YOUTUBE_API_KEY=your_youtube_api_key

# Gemini (optional)
GEMINI_API_KEY=your_gemini_api_key
USE_MOCK_FALLBACK=true
```

### 4. Start Backend Server
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

### 5. Test API
Import [CareerPath_AI_Postman_Collection.json](CareerPath_AI_Postman_Collection.json) in Postman and start testing endpoints.

---

## 📖 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/careerpath-ai` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `JWT_SECRET` | JWT signing key (change in production!) | `super_secret_key_123` |
| `GMAIL_USER` | Gmail address for OTP | `your-email@gmail.com` |
| `GMAIL_PASSWORD` | Gmail app password (16 chars) | `xxxx xxxx xxxx xxxx` |
| `GROQ_API_KEY` | Groq API key for AI | `gsk_xxxxx` |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | `AIza_xxxxx` |
| `GEMINI_API_KEY` | Google Gemini API key (optional) | `AIza_xxxxx` |
| `USE_MOCK_FALLBACK` | Enable mock roadmap fallback | `true` |

---

## 🔄 Request Lifecycle

1. **Client Request** → Express server receives HTTP request
2. **Routing** → Route handler matches endpoint
3. **Authentication** → `protect` middleware verifies JWT (if protected route)
4. **Controller Logic** → Business logic executes
5. **Database/API Calls** → MongoDB queries, external API calls
6. **Response** → JSON response sent back to client

---

## 📚 API Documentation

For detailed API documentation, see [backend/README.md](backend/README.md)

Quick reference:
- **Auth**: POST `/api/auth/signup`, `/api/auth/login`, `/api/auth/verify-otp`
- **Roadmap**: POST `/api/roadmap/generate`, GET `/api/roadmap/:id`
- **Chat**: POST `/api/chat/` (AI assistant)
- **YouTube**: GET `/api/youtube?query=topic`
- **Profile**: GET `/api/profile` (user stats)

---

## 🧪 Testing

See [TESTING_GUIDE_DETAILED.md](TESTING_GUIDE_DETAILED.md) for comprehensive API testing instructions using Postman.

Quick test:
```bash
# Server health check
curl http://localhost:5000/api/health

# API status
curl http://localhost:5000/api/test
```

---

## ⚙️ Configuration Guide

For detailed setup instructions (MongoDB, Gmail, APIs), see [SETUP_GUIDE.md](SETUP_GUIDE.md)

Key setup items:
- MongoDB Atlas cluster creation
- Gmail app password generation
- Groq API key setup
- YouTube API key configuration
- JWT secret generation

---

## 🐛 Troubleshooting

### Server won't start
- Ensure MongoDB is running
- Check `.env` file has correct `MONGODB_URL`
- Verify port 5000 is available

### API requests failing
- Verify JWT token is valid
- Check API keys in `.env`
- Ensure MongoDB connection is active

### Roadmap generation errors
- Verify `GROQ_API_KEY` is valid
- Check rate limits on Groq API
- Enable mock fallback: `USE_MOCK_FALLBACK=true`

### YouTube search not working
- Verify `YOUTUBE_API_KEY` is enabled
- Check YouTube API quota limits
- Ensure `type: "video"` filter is applied

---

## 🔐 Security Best Practices

✅ **Implemented:**
- JWT token expiration (7 days)
- Password hashing with bcryptjs
- MongoDB index on email (unique)
- Environment variables for secrets
- OTP verification for email confirmation
- CORS enabled for controlled access

⚠️ **To Do:**
- Rate limiting on login/signup
- HTTPS in production
- Input validation & sanitization
- SQL/NoSQL injection prevention
- OWASP security headers

---

## 📈 Future Improvements

- [ ] Frontend React/Next.js application
- [ ] User profile customization
- [ ] Roadmap templates library
- [ ] Social sharing & community features
- [ ] Advanced progress analytics
- [ ] Mobile app integration
- [ ] Blockchain certificates
- [ ] Mentor marketplace
- [ ] Live mentoring sessions
- [ ] AI-powered code review

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Priority issues:
- Gemini API version stability
- Groq API error handling
- YouTube API fallback logic
- Email delivery reliability

---

## 📄 License

ISC License - See LICENSE file for details

---

## 👥 Contact & Support

- **Issues**: Create GitHub issue for bugs/features
- **Email**: support@careerpathAI.com
- **Docs**: See [backend/README.md](backend/README.md) for API details

---

**Happy Learning! 🚀**
