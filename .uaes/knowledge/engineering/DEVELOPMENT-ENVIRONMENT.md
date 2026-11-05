# Uter Development Environment

**Knowledge status:** PARTIAL — repository entrypoints identified; exact supported versions NOT_VERIFIED.  
**Last checked:** 2026-11-05.

## Known tooling

- Go toolchain for backend modules.
- Bun for the web workspace.
- Node.js for JavaScript tooling and build scripts.
- Git and GitHub Actions for source control and CI.
- Docker/Compose assets exist in the repository.

## Required before execution

1. Read `.tool-versions`, toolchain declarations, lockfiles, Dockerfiles, and CI setup versions if present.
2. Confirm OS-specific prerequisites and environment variables from safe example files.
3. Never read, print, upload, or commit real `.env` files or credentials.
4. Use isolated local/test databases and non-production provider credentials.
5. Record actual tool versions in test evidence.
