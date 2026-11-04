# Agent Runtime Adapter Validation

Run the static adapter-integrity check:

```bash
ruby quality/scripts/agents/check-skill-runtime-adapters.rb
ruby quality/scripts/agents/test-skill-runtime-adapters.rb
```

The validator reads `skills/registry.yaml` and checks that every registered skill has:
- A non-empty canonical `SKILL.md` with matching frontmatter name.
- A non-empty JSON manifest whose `skillId` and `name` match the registry.
- Exactly one Claude Code adapter and one Agents Runtime adapter under the registry-declared roots.
- Adapter frontmatter with the registered skill name.
- An explicit reference to the canonical skill path.
- A statement that the adapter does not grant permissions or override `AGENTS.md`.

Positive and negative fixtures cover a complete adapter pair, a missing runtime adapter, and a broken canonical-skill reference. The governance workflow runs these fixtures and the live repository check.

**Scope limit:** this proves only static discovery-contract integrity. It does not prove Claude Code, Codex, WorkBuddy, or another agent runtime actually discovers or executes the skill. Runtime discovery requires evaluation in each real agent product and version.
