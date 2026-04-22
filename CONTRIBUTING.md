# Contributing to CareerPath AI

We welcome contributions from developers of all skill levels! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Issues](#reporting-issues)
8. [Priority Areas](#priority-areas)

---

## 🤝 Code of Conduct

- Be respectful and inclusive
- Avoid harassment or discriminatory language
- Report unacceptable behavior to maintainers
- Focus on constructive feedback

---

## 🚀 Getting Started

### 1. Fork the Repository

Click "Fork" on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/CareerPath-AI.git
cd CareerPath-AI
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/CareerPath-AI.git
```

### 4. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming convention:
- `feature/description` - New feature
- `bugfix/description` - Bug fix
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### 5. Set Up Development Environment

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your test credentials
npm run dev
```

---

## 🔄 Development Workflow

### Making Changes

1. **Create feature branch** from `main`
2. **Make small, focused commits** (one feature per commit)
3. **Test your changes** thoroughly
4. **Write/update tests** if applicable
5. **Update documentation** if needed

### Before Committing

```bash
# Check code quality
npm run lint  # if available

# Run tests
npm test  # if available

# Verify API changes work
# Use Postman collection to test
```

---

## 📝 Coding Standards

### JavaScript Style

- Use **ES6+ syntax** (arrow functions, const/let, template literals)
- Follow **consistent naming**:
  - Variables: `camelCase`
  - Functions: `camelCase`
  - Classes: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`

### Comments

```javascript
// Good: Clear explanation
const generateOTP = () => {
  // OTP valid for 5 minutes
  const expiry = Date.now() + 5 * 60 * 1000;
  return expiry;
};

// Avoid: Obvious comments
const x = 5; // x is 5
```

### Error Handling

```javascript
// Good: Specific error messages
if (!email) {
  return res.status(400).json({
    success: false,
    message: "Email is required",
  });
}

// Avoid: Generic errors
if (!email) {
  throw new Error("error");
}
```

### MongoDB Models

- Use proper validation in schemas
- Add meaningful field descriptions
- Index frequently queried fields
- Use timestamps (`createdAt`, `updatedAt`)

### API Endpoints

- Use correct HTTP methods (GET, POST, PUT, DELETE)
- Use proper status codes (200, 201, 400, 401, 404, 500)
- Return consistent JSON format:
  ```json
  {
    "success": true/false,
    "message": "descriptive message",
    "data": { /* optional */ }
  }
  ```

---

## 💬 Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (not logic)
- `refactor`: Code restructuring
- `test`: Test additions/updates
- `chore`: Build, dependencies

### Examples

```bash
git commit -m "feat(auth): add email OTP verification"
git commit -m "fix(roadmap): handle missing YouTube results"
git commit -m "docs(backend): update API endpoint documentation"
git commit -m "refactor(controllers): simplify error handling"
```

---

## 📤 Pull Request Process

### 1. Before Submitting PR

- ✅ Rebase with latest `main`:
  ```bash
  git fetch upstream
  git rebase upstream/main
  ```
- ✅ Verify all tests pass
- ✅ Update related documentation
- ✅ Add comments for complex logic

### 2. Create Pull Request

**Title Format**: `[type] Brief description`

Examples:
- `[feature] Add AI chat endpoint`
- `[bugfix] Fix YouTube API 403 error`
- `[docs] Update setup guide`

**Description Template**:

```markdown
## Description
Brief explanation of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- How to test the changes
- Expected behavior

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complexity
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tests pass
```

### 3. Review Process

- Maintainers will review within 2-3 days
- Address feedback professionally
- Update PR when changes are requested
- Squash commits if requested

### 4. Merge

- Maintainers merge when approved
- Delete branch after merge

---

## 🐛 Reporting Issues

### Before Reporting

- Search existing issues
- Check latest `main` branch
- Try to reproduce with clean setup

### Issue Template

**Title**: `[Component] Brief description`

**Content**:
```markdown
## Description
What's the issue?

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Steps to Reproduce
1. Step 1
2. Step 2
3. ...

## Environment
- OS: (Windows/Mac/Linux)
- Node version: (node --version)
- Backend version: (commit hash or branch)

## Logs/Screenshots
[If applicable]

## Possible Solution
[If you have ideas]
```

---

## ⭐ Priority Areas for Contribution

### High Priority 🔴

1. **Groq API Stability**
   - Error handling for failed requests
   - Fallback to mock roadmap
   - Proper error messages

2. **YouTube API Reliability**
   - Handle quota exceeded errors
   - Improve video ranking algorithm
   - Cache results when possible

3. **Email Delivery**
   - Handle Gmail failures
   - Implement email retry logic
   - Support other email providers

### Medium Priority 🟡

4. **Input Validation**
   - Validate all request bodies
   - Sanitize user inputs
   - Prevent injection attacks

5. **Error Messages**
   - Make errors user-friendly
   - Consistent error format
   - Helpful debugging info

6. **Tests**
   - Unit tests for controllers
   - Integration tests for APIs
   - Test coverage reporting

### Nice to Have 🟢

7. **Performance**
   - Cache frequently accessed data
   - Optimize database queries
   - Implement pagination

8. **Documentation**
   - Update API docs
   - Add code examples
   - Improve comments

9. **Features**
   - Additional AI models
   - More resource types
   - User preferences

---

## 📚 Resources

- [Git Guide](https://git-scm.com/book/en/v2)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-checklist/)

---

## ❓ Questions?

- Open a GitHub discussion
- Ask in the issue comments
- Check existing documentation

---

## 🎉 Thank You!

Your contributions help make CareerPath AI better for everyone. We appreciate your effort!

**Happy Contributing!** 🚀

