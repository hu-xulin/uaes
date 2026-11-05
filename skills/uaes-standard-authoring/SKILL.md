---
name: uaes-standard-authoring
description: Create or revise UAES standards, registry entries, schemas, gates, and acceptance criteria while preserving traceability and lifecycle governance.
---

# UAES Standard Authoring

## Purpose

Author maintainable, testable, non-duplicative UAES normative documents and keep the registry and related machine-readable assets consistent.

## Required inputs

- Change request and rationale.
- Existing standard ID, if revising.
- Applicable dependencies and conflicts.
- Owner, scope, lifecycle state, and intended version.
- Verification and acceptance approach.

## Required standards

Read UAES-00, UAES-01, and all standards listed as dependencies by the target standard.

## Procedure

1. Locate the canonical registry entry and existing document before editing.
2. Determine whether the requirement belongs in a global standard, a domain standard, a project overlay, a schema, a gate, or a skill.
3. Reuse an existing stable ID where revising; never silently recycle or duplicate an ID.
4. Write normative language with explicit MUST/MUST_NOT/SHOULD/SHOULD_NOT/MAY semantics.
5. Give every MUST/MUST_NOT rule a scope, rationale, implementation guidance, verification method, acceptance criterion, owner, and exception path.
6. Update dependencies, cross-references, schemas, gates, and acceptance baselines affected by the change.
7. Record provenance and lifecycle state accurately. Do not mark a standard APPROVED, IMPLEMENTED, or VERIFIED without the required independent evidence and approval.
8. Run registry/schema/reference validators and relevant negative tests.
9. Review for duplication, contradictions, ambiguous terms, unbounded permissions, and unverifiable requirements.
10. Produce a change report with changed paths, evidence, unresolved decisions, and version impact.

## Prohibitions

- Do not create a second source of truth for an existing standard.
- Do not weaken requirements merely to make a gate pass.
- Do not invent test evidence, approval, implementation status, or compliance claims.
- Do not change product code from this skill.

## Acceptance

Registry, document metadata, dependencies, schemas, gates, and acceptance criteria are consistent; all required validators actually ran or are explicitly BLOCKED/NOT_RUN.
