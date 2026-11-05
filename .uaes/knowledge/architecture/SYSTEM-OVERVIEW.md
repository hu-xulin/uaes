# Uter System Overview

**Knowledge status:** PARTIAL — source-backed summary; detailed architecture NOT_VERIFIED.  
**Last checked:** 2026-11-05  
**Primary source:** Uter repository root instructions, README files, and repository tree.

## Verified high-level shape

Uter is an AI API gateway/relay product. The repository contains a Go backend, a React/TypeScript web application, an Electron desktop application, documentation applications, and multiple Go modules.

## Current repository areas

- Go backend: root module and root-level packages such as controller, service, model, router, middleware, relay, and related shared packages.
- Go libraries/modules: `relaykit`, `tokenkit`, and nested `tokenkit/tokenkit`.
- Web frontend: `web/`.
- Desktop application: `electron/`.
- Documentation application: `docs-web/`.
- Deployment and operations assets: `deploy/`, Dockerfiles, and compose files.

## Not yet verified

- Runtime topology and service boundaries.
- Production deployment topology.
- Complete request and data-flow maps.
- Exact module dependency graph.
- All external provider and payment integrations.

Do not infer production architecture from folder names. Update this document only with source paths, commit SHA, and verification evidence.
