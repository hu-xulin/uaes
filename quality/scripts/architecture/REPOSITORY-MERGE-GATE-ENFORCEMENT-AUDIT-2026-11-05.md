# Repository Merge-Gate Enforcement Audit — 2026-11-05

> Status: **PARTIALLY VERIFIED / MERGE ENFORCEMENT NOT PROVEN**
> Repositories: `hu-xulin/uaes`, `hu-xulin/uter`
> Audit branch: `ai/uaes-agent-skills-governance-2026-11-05`
> No repository settings were changed.

## 1. Executive result

The repositories contain CI workflows and the UAES pull request currently runs governance, architecture-source and database-migration checks. However, the available GitHub connection could not read classic branch protection for either `main` branch, and the repository rulesets API returned an empty list for both repositories.

Therefore this audit **cannot establish that required checks are enforced before merge**. A passing workflow is not equivalent to a protected merge gate. Do not claim that UAES is fully enforced or that Uter is protected by UAES until an administrator verifies the settings with sufficient repository administration permission.

## 2. Evidence collected

### 2.1 Rulesets

Read-only requests to:

- `GET /repos/hu-xulin/uaes/rulesets`
- `GET /repos/hu-xulin/uter/rulesets`

Both returned an empty JSON array (`[]`) through the connected GitHub integration.

This proves no repository rulesets were visible through these endpoints at audit time. It does not establish the absence of organization-level policies or classic branch protection.

### 2.2 Classic branch protection

Read-only requests to:

- `GET /repos/hu-xulin/uaes/branches/main/protection`
- `GET /repos/hu-xulin/uter/branches/main/protection`

Both returned HTTP 403, `Resource not accessible by integration`.

**Result: NOT VERIFIED.** Do not interpret this permission error as “branch protection disabled” or “branch protection enabled”. An administrator or a GitHub App installation with the required administration permission must inspect both repositories.

### 2.3 Workflow trigger and job inventory

UAES workflow files were read from branch `ai/uaes-agent-skills-governance-2026-11-05`.

| Workflow | Trigger observed | Job name | Scope |
|---|---|---|---|
| `uaes-validation.yml` | push to `main` and `ai/**`; pull request targeting `main`; manual dispatch | `governance` (display name: Registry, manifests, and references) | Registries, manifests, runtime adapters, JSON Schemas |
| `architecture-source-checks.yml` | pull request with paths under `quality/scripts/architecture/**`, module registry, or its workflow; manual dispatch | `source-checks` | Uter pinned-source architecture, API/OpenAPI, frontend import inventory and route parity |
| `database-migration-matrix.yml` | pull request with paths under architecture scripts, DB migration inventory, or its workflow; manual dispatch | `migration-dialect-matrix` | Selected migration tests on SQLite, MySQL and PostgreSQL |

The architecture and database workflows are path-filtered and do not have a `push` trigger. This is not inherently wrong, but changes to their inputs must continue to match the path filters, and the checks must be configured as required before merge if they are intended to block merging.

The architecture workflow currently pins Uter source to `008ec53adc9652ee454090b4fb1152536dd45bf3`. Its live router/OpenAPI parity check previously failed on two documented operations without matching runtime routes:
- `POST /api/oauth/wechat/bind`
- `GET /api/verify/status`

The database matrix explicitly limits its claims: Options primary-key rebuild regression is SQLite-only; it is not full production-schema replay, rollback certification, or ClickHouse coverage.

### 2.4 Current workflow results for the latest UAES audit commit

Commit: `3cee9a3468f6c7ed96a07fae23c15e01db9bda31`.

| Workflow | Run | Observed result |
|---|---:|---|
| UAES Governance Validation | 41968156913 | PASS |
| Architecture Source Checks | 41968156915 | IN PROGRESS at last poll |
| Database Migration Dialect Matrix | 41968156942 | IN PROGRESS at last poll |

These are workflow results, not evidence of branch-protection enforcement.

Uter PR #15 CI run `41964304811` passed 8/8 jobs at source SHA `008ec53adc9652ee454090b4fb1152536dd45bf3`. That result also does not prove the Uter default branch has a required-check merge gate.

## 3. Required administrator verification

Before treating either repository as merge-protected, an administrator must inspect repository Settings → Branches / Rulesets for the default branch and confirm:

1. Pull requests are required; direct pushes to the protected default branch are restricted to the intended maintainers/automation.
2. Required status checks are configured for the exact check names produced by the current workflows.
3. The UAES governance check is required for every PR into `main`.
4. Architecture and DB migration checks are required whenever their protected input paths change. If path-filtered workflows can be skipped, use an always-present aggregator/check that reports a deliberate pass only when the relevant workflow ran or was legitimately not applicable.
5. Stale approvals are dismissed or code-owner approval is required where policy calls for it.
6. Force pushes and branch deletion are restricted.
7. Bypass actors are explicit, minimal, reviewed, and audited.
8. The same protection is independently verified for Uter; UAES workflow success alone does not protect Uter's repository.

Suggested minimum required checks, subject to confirming their exact GitHub check-run display names:

- UAES: `Registry, manifests, and references`
- UAES: `source-checks` (when architecture inputs change)
- UAES: `migration-dialect-matrix` (when migration inputs change)
- Uter: all required jobs in the Uter CI workflow, not merely a single optional summary.

Do not configure a required check by guessing its name. Confirm the exact check-run names on a representative PR first.

## 4. Scope and authorization

This is a read-only audit. The current GitHub integration lacks permission to read classic branch-protection settings, and the rulesets query returned no repository rulesets. No settings, bypass permissions, required checks, or branch protections were changed.

This report does not authorize changing repository administration settings. Once an administrator confirms the intended policy and grants the necessary access, the merge-gate configuration can be implemented and verified separately.

## 5. Acceptance status

- Workflow definitions inspected: **PASS**
- Latest UAES governance workflow: **PASS**
- Latest UAES architecture workflow: **PENDING at last poll**
- Latest UAES database matrix: **PENDING at last poll**
- Ruleset visibility: **EMPTY**
- Classic branch protection: **NOT VERIFIED (403)**
- Required-check enforcement: **NOT PROVEN**
- Overall merge-gate acceptance: **BLOCKED / NOT VERIFIED**
