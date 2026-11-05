# Uter OpenAPI / Runtime Route Drift — Contract Decision Record

> Status: **BLOCKED — API contract owner decision required**
> Uter source commit: `337485b4b19824f9bee59b6f8226802b455ab0ec`
> UAES Architecture Source Checks: https://github.com/hu-xulin/uaes/actions/runs/41960573825
> No runtime API or OpenAPI behavior was changed by this record.

## 1. Verified discrepancies

The source-based route inventory found two documented operations with no matching Gin or built-in plugin route:

| OpenAPI operation | Current runtime routes / flow | Finding |
|---|---|---|
| `POST /api/oauth/wechat/bind` | WeChat web OAuth routes include `POST /api/oauth/wechat-web/state`, `GET /api/oauth/wechat-web/origin`, `GET /api/oauth/wechat-web`; generic OAuth flow includes `POST /api/oauth/state` and `GET /api/oauth/:provider`. | No equivalent direct bind operation was found. A redirect/state OAuth flow is not automatically semantically equivalent to a direct code-to-bind API. |
| `GET /api/verify/status` | `GET /api/verify/methods` and `POST /api/verify`; service code exposes OAuth verification flow operations. | No status GET operation was found. Available methods and performing a verification are not necessarily the same contract as retrieving verification status. |

OpenAPI declarations currently describe:
- WeChat bind: Access Token required; JSON request body with required `code`.
- Verify status: authenticated User permission.

The architecture checker reports these as missing runtime operations. Its route matcher was additionally hardened so a static route cannot falsely satisfy a parameterized OpenAPI path. The checker fixture suite passed (4 runs, 12 assertions, 0 failures, 0 errors, 0 skips) in the failed live architecture run; the live failure is the two documented operations above.

## 2. Contract decision options

### Option A — Preserve OpenAPI contract and implement runtime operations

Choose this only if these exact operations are intended public API contracts and compatibility requires them.

Required before implementation:
- Define WeChat binding semantics: provider identity, state/nonce/CSRF, account ownership, duplicate binding, already-bound identity, unlink/rebind behavior, error codes, idempotency, rate limits, audit events.
- Define verification status semantics: which statuses are returned, data ownership, freshness, pending/expired/failed states, provider binding lifecycle, response schema, caching and authorization.
- Add controller/service tests, authorization tests, replay/CSRF tests, concurrency tests, OpenAPI examples, and route parity checks.
- Do not implement a shallow alias to a different flow.

### Option B — Treat current runtime as authoritative and revise OpenAPI

Choose this only if the two old operations are obsolete or were documented incorrectly.

Required before removal/replacement:
- Confirm no supported clients or external integrations consume these operations.
- Check historical API usage/telemetry and release notes where available.
- Identify the intended replacement operations and document their actual semantics.
- Mark deprecated operations with a migration window if compatibility requires it; remove only after owner approval and consumer impact review.
- Add contract tests for the replacement flows.

### Option C — Keep both contracts during a compatibility migration

Choose this if consumers may rely on old paths but the newer flow is preferred.

Required:
- Implement fully specified compatibility handlers, not blind redirects or method aliases.
- Define sunset/deprecation timeline, telemetry, and compatibility tests.
- Ensure security properties are equivalent or stronger.

## 3. Recommendation

Do not infer equivalence from similar names or neighboring routes. The current implementation is flow-oriented while the two documented operations are direct operations with distinct HTTP methods and semantics. The safest default is **keep the gate blocking until the API contract owner confirms consumer compatibility and intended semantics**. If no consumer relies on the old paths and the OpenAPI declarations are stale, Option B is likely the lower-risk maintenance path; otherwise Option A or C requires explicit behavior specifications first.

## 4. Required owner decision

Record one choice:
- [ ] Option A — preserve and implement both operations
- [ ] Option B — revise OpenAPI to the actual runtime contract
- [ ] Option C — temporary compatibility migration

Also confirm:
- WeChat bind consumer(s) and expected account-binding behavior.
- Verification status consumer(s) and exact response fields/state model.
- Deprecation window, if any.

Until approved:
- Do not add guessed API handlers.
- Do not delete or rewrite OpenAPI operations.
- Keep router/OpenAPI parity gate blocking.
- Keep Uter migration status pending.
