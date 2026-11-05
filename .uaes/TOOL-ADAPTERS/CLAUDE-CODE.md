# Claude Code Adapter

1. Read the root `CLAUDE.md`, then read the complete `AGENTS.md`.
2. Load the applicable standards and dependencies from `.uaes/STANDARD-REGISTRY.yaml`.
3. Claude Code native skills are exposed under `.claude/skills/<name>/SKILL.md`; each adapter must direct the runtime to the canonical `skills/<name>/SKILL.md` contract.
4. Do not assume a linked or imported instruction file was expanded. Explicitly read required files.
5. Use the declared permission profiles and stop on unresolved approval boundaries.
6. Report execution evidence and never convert NOT_RUN/BLOCKED to PASS.
