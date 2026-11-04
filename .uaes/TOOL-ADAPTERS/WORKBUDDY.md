# WorkBuddy Adapter

1. Load the repository-root `AGENTS.md` before planning or editing.
2. Read `README.md`, `.uaes/SYSTEM-MANIFEST.md`, `.uaes/STANDARD-REGISTRY.yaml`, and `.uaes/PROJECT-STATUS.md`.
3. Resolve the task to the relevant P00–P12 standards and declared dependencies.
4. Read the canonical skill contract from `skills/<skill-name>/SKILL.md`; do not treat this adapter as the skill itself.
5. Use `agents/registry.yaml` and the selected role manifest to identify role, permission, and evaluation requirements.
6. Follow the registered workflow when the task matches one.
7. Run actual validators and gates; report exact commands, results, blocked items, and evidence.
8. Never infer approval, runtime discovery, or compliance from file existence alone.

WorkBuddy-specific behavior must not override UAES governance or explicit user authorization.
