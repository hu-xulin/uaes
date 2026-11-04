# UAES Skills

This directory contains canonical, tool-independent skill contracts. A skill describes a repeatable capability; it does not grant permissions and cannot override `AGENTS.md`, UAES governance, or the user's explicit authorization.

## Skill contract

Each skill MUST provide:

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

See [REGISTRY.yaml](REGISTRY.yaml). Each registered skill is stored at `<skill-name>/SKILL.md`.

## Runtime adapters

The canonical contracts are tool-independent. Claude Code, Codex, WorkBuddy, and other agents may expose adapter files in their native skill directories, but adapters MUST reference the canonical contract rather than fork its normative content. Runtime availability must be tested in the target agent; merely storing a Markdown file does not prove that an agent automatically discovers or executes it.
