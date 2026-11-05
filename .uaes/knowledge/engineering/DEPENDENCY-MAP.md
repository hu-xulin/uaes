# Uter Dependency Map

**Knowledge status:** NOT_VERIFIED.  
**Last checked:** 2026-11-05.

A complete dependency graph was not generated in this audit.

## Required inventory

- Go module dependency graph for all four `go.mod` locations.
- Direct/transitive dependency inventory and vulnerability state.
- Web production and development dependencies from lockfiles.
- Electron runtime dependencies and packaged/native modules.
- Cross-module import boundaries and cycles.
- External API/provider SDKs and data processors.
- License, provenance, maintenance, and upgrade risk.

Use lockfiles and native package-manager tooling as the source of truth. Do not infer versions from README text or package ranges alone.
