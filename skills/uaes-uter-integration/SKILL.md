---
name: uaes-uter-integration
description: Integrate the central UAES governance system into the Uter product repository using a pinned registry source, project overlays, agent entrypoints, skills, and enforceable CI checks.
---

# UAES–Uter Integration

## Purpose

Make UAES discoverable and enforceable in Uter without copying generic standards or deleting Uter-specific business and implementation constraints prematurely.

## Required inputs

- Uter repository and baseline commit.
- UAES repository, immutable commit SHA, registry blob SHA, and lifecycle state.
- Uter architecture, technology stack, project context, and existing local standards.
- Agent runtime(s) used by the project.

## Required standards

Read UAES-00, UAES-01, UAES-06, UAES-08, UAES-09, UAES-10, UAES-11, plus all standards relevant to the task.

## Procedure

1. Inventory Uter's existing AGENTS.md/CLAUDE.md files, nested agent rules, skills, scripts, CI workflows, project standards, and local overlays.
2. Create an explicit integration manifest recording UAES source repository, immutable commit, registry blob SHA, registry version, lifecycle state, and integration status.
3. Keep the root agent instructions short and deterministic: bootstrap, authority order, task routing, project-specific constraints, gates, and evidence requirements.
4. Keep Uter-specific rules for billing, payment, authentication, database compatibility, architecture facts, design system, and technology configuration as project overlays unless formally generalized and approved in UAES.
5. Map every applicable UAES MUST/MUST_NOT rule to a Uter implementation, local check, CI job, permission control, or documented manual review.
6. Reuse existing Uter quality scripts and CI jobs. Do not create a parallel quality engine.
7. Add a failing integration check for missing/empty entrypoints, stale lock metadata, broken standard references, or gates that are declared but not invoked.
8. Prove the target AI runtime discovers the entrypoint and skills in an actual task simulation.
9. Run Uter's existing review, test, security, coverage, and regression commands in an isolated workspace; record real results.
10. Remove duplicate local generic documents only after semantic parity, approved UAES lifecycle, project mapping, runtime discovery, and CI enforcement are all verified.

## Prohibitions

- Never delete Uter-local standards based only on filename similarity.
- Never treat a DRAFT UAES standard as an approved replacement for an existing project rule.
- Never silently change payment, billing, authentication, production, or database behavior as part of standards integration.
- Never merge, deploy, or alter production configuration as part of this skill.
- Do not claim the integration is complete based solely on adding agent instruction files.

## Acceptance

Uter integration is VERIFIED only when:
- UAES source and registry are immutably pinned.
- Agent entrypoints are non-empty, consistent, and loaded by the target runtime.
- Skills are discoverable and their contracts validate.
- All applicable requirements are mapped to enforcement.
- Gates execute in local and CI paths and propagate failures.
- Existing Uter overlays remain intact and conflicts are resolved.
- Required Uter tests and CI pass with evidence.
- An independent integration audit confirms the result.
