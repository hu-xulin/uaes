---
name: uaes-test-engineering
description: Design, execute, and report unit, integration, contract, race, security, visual, and regression tests for an engineering change.
---

# UAES Test Engineering

## Purpose
Prove changed behavior and critical invariants with deterministic, reproducible test evidence.

## Inputs
Repository and baseline SHA, change scope, acceptance criteria, test environment, affected modules, and risk profile.

## Required standards
UAES-00, UAES-04, UAES-06, UAES-09, UAES-10, UAES-11.

## Procedure
1. Map requirements and changed code to testable behaviors.
2. Select test levels: unit, integration, contract, end-to-end, race, security, visual/accessibility, and regression.
3. Verify test isolation, synthetic data, deterministic clocks/IDs, cleanup, and non-production credentials.
4. Run the narrowest relevant tests first, then required module-wide and repository-wide gates.
5. Capture exact commands, tool versions, exit codes, durations, and machine-readable reports.
6. Re-run focused regression tests after fixes and re-run impacted quality gates.
7. Classify results as PASS, FAIL, BLOCKED, NOT_RUN, NOT_APPLICABLE, or NOT_VERIFIED.

## Outputs
Test plan, test matrix, execution evidence, coverage delta, flaky-test notes, defects, and residual risks.

## Permissions
Tests may write only to isolated test resources and generated report directories. Never use production databases, real payment configuration, live customer data, or production credentials.

## Acceptance
Every acceptance criterion has a test or an explicit justified manual verification; no skipped or failed test is represented as PASS.
