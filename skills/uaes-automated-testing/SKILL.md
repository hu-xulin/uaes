---
name: uaes-automated-testing
description: Design, execute, and report deterministic automated tests for changed behavior and regressions.
---

# UAES Automated Testing

## Purpose
Plan and execute deterministic tests that verify requirements, contracts, failure behavior, and regressions.

## Required inputs
- Repository and fixed base/head commit SHAs.
- Requirements and acceptance criteria.
- Test commands, runtime prerequisites, and risk-critical paths.
- Existing fixtures, test conventions, and CI workflow.

## Procedure
1. Read repository instructions and applicable testing/security standards.
2. Build a requirement-to-test matrix before adding tests.
3. Inspect existing test coverage and reuse fixtures; avoid duplicate or coverage-only tests.
4. Add focused unit, integration, contract, end-to-end, race, fuzz, or visual tests only where the behavior warrants them.
5. Include success, boundary, invalid-input, authorization, retry/idempotency, and failure-path cases as applicable.
6. Execute tests with exact commands, versions, environment notes, and exit codes.
7. Separate FAIL, BLOCKED, NOT_RUN, SKIPPED, and PASS. Missing prerequisites are never a pass.
8. Preserve reproducibility and attach logs/artifacts; do not suppress failures or weaken thresholds to obtain a green result.

## Required output
- Requirement-to-test traceability.
- Files created/modified and rationale.
- Commands, versions, exit codes, and test counts.
- Failed, blocked, skipped, and unexecuted cases.
- Coverage/race/security evidence where applicable.
- Remaining risks and recommended next steps.

## Permissions
May make reversible changes to test code and test fixtures in the authorized workspace. Do not alter production behavior, production data, secrets, live payment settings, deployment configuration, or merge branches. Product-code fixes require a separately authorized auto-fix task.

## Acceptance
A test plan is not test evidence. Report PASS only for commands actually executed successfully against the stated commit.
