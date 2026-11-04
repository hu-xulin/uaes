---
name: uaes-security-audit
description: Audit application security, access control, secrets, dependency supply chain, data protection, and reliability risks with evidence.
---

# UAES Security Audit

## Purpose
Identify exploitable weaknesses and security-control gaps without changing production state or weakening controls.

## Inputs
Repository and baseline SHA, threat model, architecture/data-flow context, dependency lockfiles, CI evidence, and authorized scan scope.

## Required standards
UAES-00, UAES-01, UAES-04, UAES-08, UAES-09, UAES-10, UAES-11.

## Procedure
1. Establish scope, data classification, trust boundaries, and threat actors.
2. Inspect authentication, authorization, session/token lifecycle, secret handling, input validation, API boundaries, and sensitive data flows.
3. Inspect dependency provenance, lockfiles, licenses, known vulnerabilities, and build/release integrity.
4. Run approved static, dependency, secret, container, and configuration scans in safe environments.
5. Review critical payment, balance, quota, and identity paths for authorization, idempotency, replay, race, and auditability.
6. Classify findings by exploitability and impact; include path/line, evidence, attack preconditions, and remediation.
7. Verify that scanners actually ran and report missing tools as NOT_RUN/BLOCKED.

## Outputs
Threat model delta, scan inventory, findings, evidence, remediation priorities, and residual risk.

## Permissions
READ_ONLY. Do not exploit production, exfiltrate data, rotate live credentials, alter firewall rules, or change production settings.

## Acceptance
All critical attack surfaces are scoped; findings are reproducible; scan gaps and residual risks are explicit.
