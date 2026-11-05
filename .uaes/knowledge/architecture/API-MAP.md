# Uter API Map

**Knowledge status:** NOT_VERIFIED.  
**Last checked:** 2026-11-05.

No complete API inventory was independently generated during the UAES integration audit. This file intentionally does not guess endpoint paths, methods, authentication requirements, or response contracts.

## Required inventory

| Field | Required evidence |
|---|---|
| API group | Router registration source |
| Method and path | Actual route declaration |
| Handler | Controller/handler source path |
| Authentication | Middleware and permission check |
| Request contract | DTO/schema |
| Response contract | DTO/schema and error mapping |
| Side effects | Database, cache, external provider, queue |
| Idempotency | Implementation and tests |
| Version/deprecation | Contract and compatibility tests |

## Acceptance

Generate this map from the actual route registration and middleware graph. Every entry must include source references and a verification date. Unknown values remain UNKNOWN, never inferred.
