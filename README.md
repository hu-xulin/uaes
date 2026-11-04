# UTER AI Engineering Standard (UAES)

UAES is the centralized AI engineering governance and standards repository for Uter and other adopting projects. It contains normative standards, schemas, registries, agent and skill contracts, workflows, quality gates, acceptance criteria, and audit evidence. It is **not** the Uter product source-code repository.

## Governance status

| Field | Current value |
|---|---|
| Registry | `.uaes/STANDARD-REGISTRY.yaml` |
| Registry version | `1.7.0` |
| Lifecycle | **DRAFT** |
| Domain coverage | P00–P12 |
| Skill registry | `skills/registry.yaml` |
| Validation workflow | `.github/workflows/uaes-validation.yml` |

DRAFT means the standards are not yet an approved release. Presence in this repository does not automatically make a rule active in Uter or prove that an agent runtime discovers it. Project integration, semantic parity, enforcement, and runtime evidence are separate acceptance requirements.

## Repository structure

| Path | Purpose |
|---|---|
| `standards/` | Normative standards for P00–P12 |
| `.uaes/schemas/` | Machine-readable JSON Schema contracts |
| `.uaes/STANDARD-REGISTRY.yaml` | Global standards registry and lifecycle metadata |
| `quality/gates/` | Quality gate definitions and status |
| `quality/acceptance/` | Phase acceptance criteria |
| `quality/scripts/` | Governance and architecture validation tools |
| `agents/` | Agent role manifests, registry, and runtime adapters |
| `skills/` | Canonical, tool-independent skill contracts and registry |
| `workflows/` | Repeatable engineering workflow definitions |
| `.claude/skills/` | Claude Code skill adapters |
| `.agents/skills/` | Agents Runtime skill adapters |
| `design-system/` | Design token source, generated artifacts, and component contracts |
| `.uaes/knowledge/` | Project facts, decisions, and knowledge provenance |

## Start here

1. Read [AGENTS.md](AGENTS.md) for repository-wide governance and execution rules.
2. Read [CLAUDE.md](CLAUDE.md) when using Claude Code.
3. Read [the global standard registry](.uaes/STANDARD-REGISTRY.yaml) and [project status](.uaes/PROJECT-STATUS.md).
4. Read the applicable standard and its dependencies before executing a task.
5. For registered skills, read the canonical `skills/<skill-name>/SKILL.md` and its manifest. Runtime adapters must not fork the canonical contract.
6. For Uter adoption, read the integration contract and P00–P12 traceability matrix in the Uter repository's `.uaes/` directory.

## Validate

Run the governance integrity validator:

```bash
ruby quality/scripts/validate-governance.rb
```

Validate canonical skill runtime adapters (static discovery-contract integrity only):

```bash
ruby quality/scripts/agents/test-skill-runtime-adapters.rb
ruby quality/scripts/agents/check-skill-runtime-adapters.rb
```

Validate active JSON Schemas (Python 3.12+):

```bash
python -m pip install jsonschema==4.25.1
python quality/scripts/validate-json-schemas.py
```

The GitHub Actions workflow runs both checks on pushes to the main/AI branches and pull requests. These checks validate registry/reference integrity and JSON Schema meta-schema validity. They do not prove runtime skill discovery, instance-level conformance for every schema, or project compliance.

Design-system import checks and tests are documented under `quality/scripts/design-system/` and `design-system/`.

## Adoption and authority

- User authorization and safety boundaries always take precedence.
- UAES owns generic governance only after an adopting project approves and pins a released version.
- The adopting project retains project-specific requirements, product invariants, architecture facts, technology overlays, and executable gates.
- During migration, unresolved conflicts are BLOCKED; do not silently choose the more permissive rule.
- A local rule may be deprecated only after semantic parity, project overlay preservation, runtime discovery, CI enforcement, and independent approval are evidenced.

## Related repository

The Uter product repository is maintained separately: https://github.com/hu-xulin/uter

The Uter repository owns its own integration contract and traceability matrix. Changes to UAES do not by themselves modify Uter or prove that Uter is compliant.
