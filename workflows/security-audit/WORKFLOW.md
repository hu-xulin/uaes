# Security Audit Workflow

| Field | Value |
|---|---|
| Workflow ID | UAES-WF-SECURITY-AUDIT |
| Version | 1.0.0 |
| Status | DRAFT |
| Owner | UAES Engineering Governance |
| Trigger | Scheduled or change-triggered security and supply-chain assessment. |
| Required Standards | UAES-00, UAES-01, UAES-08, UAES-09, UAES-10, UAES-11 |

## Inputs

- Task/incident/release identifier and request source.
- Target repository, branch, and immutable baseline commit SHA.
- Scope, constraints, and acceptance criteria.
- Applicable risk assessment and permission profile.
- Relevant project context, logs, test data, and dependencies.

## Procedure

1. Bootstrap repository instructions, project context, registry, and required standards.
2. Capture repository state and immutable baseline.
3. Classify the task, impact, risk, and required human approvals.
4. Define scope, non-goals, work plan, and verification matrix.
5. Confirm the active permission profile before any write or external side effect.
6. Execute in an isolated branch/workspace and preserve pre-existing user changes.
7. Review the complete diff and record findings.
8. Execute all mandatory tests and quality/security gates for the risk and change scope.
9. Re-run focused regression tests after each repair and repeat review.
10. Produce a delivery report with exact commands, results, artifacts, and unresolved risks.

## Outputs

- Task plan and risk/authorization record.
- Changed-file list and commit/PR references where authorized.
- Test, review, security, and quality-gate evidence.
- Findings and residual-risk register.
- Final status: PASS, FAIL, BLOCKED, NOT_RUN, or NOT_APPLICABLE.

## Stop conditions

Stop and request human adjudication when authorization is missing, a P0 issue is found, production or irreversible action is requested without explicit authorization, a required dependency is unavailable, or standards conflict cannot be resolved.

## Prohibited behavior

- Do not fabricate evidence or claim unexecuted checks passed.
- Do not weaken tests or gates to obtain a green result.
- Do not modify production state or real payment credentials as part of validation.
- Do not merge or deploy without explicit authorization.
- Do not overwrite uncommitted user changes.

## Acceptance

The workflow is complete only when all mandatory outputs exist, required gates have actual evidence, and every blocked or unresolved item is disclosed.
