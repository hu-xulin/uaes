# Uter Build and Test Entry Points

**Knowledge status:** PARTIAL — command entrypoints identified; latest full local execution NOT_VERIFIED.  
**Last checked:** 2026-11-05.

## Repository-level entrypoints

- `bash scripts/verify-all.sh`
- `bash scripts/quality/uter-quality.sh`

Read each script before running it; inspect its selected stages, prerequisites, side effects, and supported flags.

## Web application

Working directory: `web/`. Confirm scripts from `web/package.json` before use. Known package scripts include:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run build`
- `bun run lint:design:strict` (when present in the current manifest)

## Go modules

Discover every module using `find . -name go.mod -not -path '*/vendor/*'`. Run vet, build, unit tests, race tests, and vulnerability checks in each applicable module. Do not assume root-module commands cover nested modules.

## Evidence rule

A command listed here is not evidence that it ran. Record commit SHA, tool versions, exact command, exit code, and test report for every execution.
