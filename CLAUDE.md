# CLAUDE.md — UAES Repository Instructions

Before any planning, editing, review, or repository-specific answer:

1. Read the complete root `AGENTS.md` using the Read tool.
2. Read `README.md` and `.uaes/STANDARD-REGISTRY.yaml`.
3. Load the applicable UAES standards and dependencies.
4. Load the relevant skill contract from `skills/<skill-name>/SKILL.md`.

Do not assume that an `@AGENTS.md` import has been expanded. Do not rely on memory, summaries, or a previous task's context.

Follow `AGENTS.md` as the repository-wide operating contract. This file only defines the Claude Code bootstrap and does not override UAES governance, approval boundaries, or lifecycle states.

UAES is a standards repository, not the Uter product source repository. Changes to UAES do not automatically modify or enforce standards in Uter; project integration and CI evidence must be verified in `hu-xulin/uter` independently.
