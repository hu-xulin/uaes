# VS Code Agent Adapter

1. Load root `AGENTS.md` and applicable workspace instructions.
2. Resolve relevant standards from `.uaes/STANDARD-REGISTRY.yaml`.
3. Read the canonical skill contract and the selected agent manifest before invoking tools.
4. Tool availability does not imply authorization. Follow the permission profile and stop for approval when required.
5. Verify changes with actual commands and CI evidence; report BLOCKED and NOT_RUN items explicitly.
