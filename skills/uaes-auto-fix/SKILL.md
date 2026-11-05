---
name: uaes-auto-fix
description: Repair confirmed defects in an isolated branch, preserve user changes, and prove fixes with focused regression and full required quality gates.
---

# UAES Auto-Fix

## Purpose
Apply minimal, evidence-backed repairs to confirmed findings while preserving user work and all governing constraints.

## Inputs
Confirmed finding, repository and baseline SHA, authorized scope, repair branch/worktree, acceptance criteria, and test plan.

## Required standards
UAES-00, UAES-01, UAES-06, UAES-08, UAES-09, UAES-10, UAES-11.

## Procedure
1. Confirm explicit repair authorization and prohibited actions.
2. Record baseline SHA and inspect working-tree state; never overwrite uncommitted user changes.
3. Create or use an isolated repair branch/worktree.
4. Reproduce the defect and preserve failing evidence.
5. Implement the smallest safe fix; avoid unrelated refactoring.
6. Add or update regression tests that fail before the fix and pass after it.
7. Run focused tests, impacted module tests, security checks, and required quality gates.
8. Review the full diff and verify no secrets, generated noise, or unrelated files are included.
9. Report changed paths, root cause, test evidence, residual risk, and next action.

## Permissions
REVERSIBLE_WRITE only within the authorized repository and isolated branch. Commit, push, or create a PR only when the user has authorized those actions for the task/project. Never merge, deploy, change production databases, modify real payment settings, or overwrite user changes.

## Acceptance
The defect is reproduced, the regression test proves the repair, all required gates pass, and the final report distinguishes verified from blocked/not-run items.
