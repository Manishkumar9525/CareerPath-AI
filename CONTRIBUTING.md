# Contributing to CareerPath AI

Thanks for contributing.

## Current Priority Issue
Gemini API requests return model/version errors in some environments (404 for `generateContent`).

We welcome PRs to fix:
- Stable Gemini model selection and version compatibility
- Better model discovery strategy
- Resilient retry and fallback logic
- Better error telemetry in API responses

## How to Contribute
1. Fork this repository.
2. Create a branch: `feature/fix-gemini-api`
3. Run backend locally and test `POST /api/roadmap/generate`.
4. Submit a PR with:
   - Root cause analysis
   - Fix details
   - Postman response samples (success + failure)

## Security Rules
- Never commit real `.env` files.
- Use `.env.example` with dummy values.
- Do not leak API keys in logs, screenshots, or PRs.
