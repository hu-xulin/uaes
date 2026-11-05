---
name: uaes-code-review
description: Perform evidence-based code review against applicable UAES standards and project invariants without modifying the reviewed code.
---

# UAES Code Review

## Purpose
Review a fixed commit range or immutable baseline for correctness, security, architecture, maintainability, and regression risk.

## Inputs
Repository, base/head commit SHAs, change scope, project context, applicable standard IDs, and required review depth.

## Required standards
UAES-00, UAES-01, UAES-04, UAES-06, UAES-09, UAES-10, plus task-specific dependencies.

## Procedure
1. Confirm repository, branch, base/head SHAs, and clean/dirty worktree state.
2. Read root and nested agent instructions and project-specific invariants.
3. Identify changed files and trace affected call paths, data models, trust boundaries, and external side effects.
4. Review correctness, error handling, concurrency, idempotency, authorization, data integrity, compatibility, performance, and observability.
5. Check tests and determine whether they actually cover changed behavior and failure modes.
6. Report each finding with severity, path/line, evidence, impact, reproduction, and a concrete remediation.
7. Re-check the diff for missing tests, unsafe scope expansion, secrets, and unrelated changes.

## Outputs
Review baseline, findings, evidence, risk classification, missing tests, residual risks, and review verdict.

## Permissions
READ_ONLY by default. Do not edit reviewed files, approve your own changes, merge, deploy, or alter production systems.

## Acceptance
No unsupported findings; all findings have source evidence; unreviewed areas and limitations are explicitly listed.
