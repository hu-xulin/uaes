# Uter Environment Map

**Knowledge status:** NOT_VERIFIED.  
**Last checked:** 2026-11-05.

No complete environment inventory was validated during this audit.

## Required fields

| Field | Description |
|---|---|
| Environment ID | Local, test, staging, production, or other approved environment |
| Purpose | Intended use |
| Owner | Responsible team/person |
| Data classification | Synthetic, masked, or production data |
| Service endpoints | Non-secret endpoint references only |
| Secret references | Secret-manager key names only; never values |
| Access policy | Authorized roles and approval |
| Deployment source | Workflow and artifact provenance |
| Recovery | Backup, restore, and rollback evidence |

Never use production credentials or production data for local or CI tests.
