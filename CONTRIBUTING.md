# Contributing to CareerPath AI

Thank you for your interest in contributing. This guide describes contribution standards and workflow for this repository.

## Table of Contents

1. Code of Conduct
2. Getting Started
3. Development Workflow
4. Coding Standards
5. Commit Guidelines
6. Pull Request Process
7. Reporting Issues

## Code of Conduct

- Be respectful and constructive
- Keep communication professional and inclusive
- Focus on code quality, reproducibility, and clear feedback

## Getting Started

### 1) Fork and clone

```bash
git clone https://github.com/YOUR_USERNAME/CareerPath-AI.git
cd CareerPath-AI
```

### 2) Add upstream remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/CareerPath-AI.git
```

### 3) Create a branch

```bash
git checkout -b feature/short-description
```

Branch naming examples:

- feature/<description>
- bugfix/<description>
- docs/<description>
- refactor/<description>

### 4) Install dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 5) Configure backend environment

```bash
copy backend\.env.example backend\.env
```

## Development Workflow

1. Sync your branch with upstream main
2. Make focused changes with clear scope
3. Test affected flows locally
4. Update relevant documentation
5. Open a pull request

Before committing:

```bash
npm run dev
npm run lint --prefix frontend
```

## Coding Standards

### General

- Keep functions and components focused
- Prefer clear names over short names
- Keep API contracts consistent
- Avoid breaking existing behavior without documentation

### JavaScript conventions

- Use camelCase for variables/functions
- Use PascalCase for React components
- Use const/let (avoid var)
- Handle errors with clear messages and status codes

### API response consistency

Preferred response shape:

```json
{
  "success": true,
  "message": "optional",
  "data": {}
}
```

## Commit Guidelines

Commit format:

```text
type(scope): short summary
```

Types:

- feat
- fix
- docs
- refactor
- test
- chore

Examples:

```bash
git commit -m "feat(roadmap): improve duplicate detection"
git commit -m "fix(profile): handle missing avatar state"
git commit -m "docs(readme): clarify setup flow"
```

## Pull Request Process

### Before opening PR

- Rebase on latest upstream/main
- Ensure changed flows are tested
- Update docs for API or behavior changes

### PR checklist

- [ ] Scope is clear and focused
- [ ] Code follows repository style
- [ ] No unrelated file churn
- [ ] Docs updated when needed
- [ ] Screenshots included for UI changes (if applicable)

### PR description template

```markdown
## Summary
What changed and why

## Type
feature | bugfix | docs | refactor

## Testing
How to verify

## Notes
Any migration or compatibility impact
```

## Reporting Issues

When creating an issue, include:

- Clear title
- Expected behavior
- Actual behavior
- Steps to reproduce
- Environment details (OS, Node version, branch/commit)
- Logs or screenshots when possible

Issue title format recommendation:

```text
[Component] Short description
```

## Documentation Contributions

Documentation improvements are welcome and should:

- Preserve existing file structure
- Keep content concise and technically accurate
- Explain flow, setup, and integration clearly
- Avoid duplicate sections across files
