# UAES Skills

This directory contains canonical, tool-independent skill contracts. A skill describes a repeatable capability; it does not grant permissions and cannot override `AGENTS.md`, UAES governance, or the user's explicit authorization.

## Skill contract

Each registered skill MUST provide:

1. YAML frontmatter with a stable `name` and concise `description`.
2. Purpose and trigger conditions.
3. Required inputs and context.
4. Outputs and evidence artifacts.
5. Required standards and dependencies.
6. Permission boundaries and prohibited actions.
7. Ordered execution procedure.
8. Verification and acceptance criteria.
9. Failure, blocked, and escalation behavior.
10. Change history or version metadata.

## Registered skills

The single source of truth is [registry.yaml](registry.yaml). Each entry points to a canonical `<skill-name>/SKILL.md` and a machine-readable `manifest.json`.

Current registered skill contracts (8 total):

- `uaes-compliance-audit` — read-only compliance and enforcement audit.
- `uaes-standard-authoring` — author and revise standards under governance controls.
- `uaes-uter-integration` — integrate UAES into Uter without deleting project overlays.
- `uaes-code-review` — evidence-based, read-only code review.
- `uaes-test-engineering` — design and execute deterministic tests, including race, security, visual, and regression testing.
- `uaes-auto-fix` — authorized, isolated, reversible defect repair.

Security audit and design-system audit are future candidates, not registered skills, until their contracts and manifests are added to the registry.

## Runtime adapters

Canonical contracts are tool-independent. Claude Code and Agents Runtime adapters live under `.claude/skills/` and `.agents/skills/`. Adapters MUST point to the canonical contract rather than fork its normative content.

Runtime availability must be tested in the target agent; merely storing a Markdown file does not prove that an agent automatically discovers or executes it. The default permission effect is deny. A skill cannot grant tool access or side effects beyond the governing authorization policy.
