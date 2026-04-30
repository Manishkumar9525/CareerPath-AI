# CareerPath AI - Documentation Summary

This file summarizes the purpose of each existing documentation file in the repository.

## Documentation Map

### Root Documentation

- README.md
  - High-level project overview
  - Feature summary
  - Architecture snapshot
  - Run instructions and documentation index

- SETUP_GUIDE.md
  - End-to-end environment setup
  - Credentials and env variable configuration
  - Startup and troubleshooting steps

- TESTING_GUIDE_DETAILED.md
  - Postman-based API validation flow
  - Endpoint coverage checklist
  - Common issue resolution guidance

- CONTRIBUTING.md
  - Contribution workflow and standards
  - Commit and PR expectations
  - Issue reporting guidelines

### Service-Specific Documentation

- backend/README.md
  - Backend architecture, API overview, and business logic
  - Roadmap generation/reuse behavior
  - Task/progress and profile stats computation notes

- frontend/README.md
  - Frontend structure and integration behavior
  - Auth and protected route flow
  - Dashboard/tasks/profile/chat interaction summary

## Core Flow Coverage Across Docs

The current documentation set covers the full application flow:

1. Auth
2. Roadmap generation and duplicate reuse
3. Dashboard rendering from roadmap data
4. Task toggling and progress recalculation
5. Profile stats aggregation
6. AI chat lifecycle

## Intended Audience

- Recruiters and reviewers: README.md
- Developers onboarding locally: SETUP_GUIDE.md
- QA and API testers: TESTING_GUIDE_DETAILED.md
- Contributors and maintainers: CONTRIBUTING.md
- Backend developers: backend/README.md
- Frontend developers: frontend/README.md

## Maintenance Notes

When product logic changes, update these files in this order:

1. backend/README.md and frontend/README.md
2. README.md
3. SETUP_GUIDE.md
4. TESTING_GUIDE_DETAILED.md
5. CONTRIBUTING.md (if process changed)
6. DOCUMENTATION_SUMMARY.md

Keep wording consistent and avoid duplicate detailed sections across multiple files.
