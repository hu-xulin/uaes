# UAES System Manifest

| Field | Value |
|---|---|
| System | UTER AI Engineering Standard |
| System ID | UAES-GLOBAL-REGISTRY |
| Registry | `.uaes/STANDARD-REGISTRY.yaml` |
| Registry version | 1.8.0 |
| Registry lifecycle | DRAFT |
| Domain range | P00–P12 |
| Standard source | `standards/` |
| Schema source | `.uaes/schemas/` |
| Agent registry | `agents/registry.yaml` |
| Skill registry | `skills/registry.yaml` |
| Workflow registry | `workflows/registry.yaml` |
| Quality gates | `quality/gates/` |
| Acceptance baselines | `quality/acceptance/` |
| Tool adapters | `.uaes/TOOL-ADAPTERS/` |

## System boundaries

UAES is the governance and standards repository. It does not contain or replace Uter product source code. Project-specific facts, implementation details, business invariants, and runnable project gates remain in the target project repository and are connected through an explicit integration contract.

## Governance architecture

1. **Registry** — stable identifiers, lifecycle states, paths, dependencies, and provenance.
2. **Standards** — normative human-readable rules.
3. **Schemas and registries** — machine-readable contracts for standards, agents, skills, tools, tasks, and evidence.
4. **Agents and skills** — role and capability definitions with explicit permission boundaries.
5. **Workflows** — repeatable task lifecycle procedures.
6. **Quality gates** — executable checks with deterministic pass/fail/blocked semantics.
7. **Acceptance and reports** — evidence that implementation and verification actually occurred.

## Lifecycle semantics

Registration, approval, implementation, and verification are separate states. A standard marked DRAFT must not be treated as approved policy. A completed document does not prove that a runtime loads it; a declared gate does not prove that CI executes it.

## Required consistency

Every registered path must exist and be non-empty unless explicitly declared as a directory placeholder. Every normative rule must have a verification method and acceptance criterion. Every agent and skill must have a valid manifest and permission profile. Every workflow must have an owner, trigger, inputs, outputs, failure behavior, and required evidence.

## Change control

The global registry is the canonical index. Changes to IDs, lifecycle states, dependencies, or paths require a reviewed registry update and corresponding validation. Historical and reconstructed content must retain provenance.
