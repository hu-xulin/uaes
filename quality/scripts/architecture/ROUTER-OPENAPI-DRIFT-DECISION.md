# Uter OpenAPI / Runtime Route Drift — Contract Decision Record

> Status: **OPTION B APPROVED — OpenAPI cleanup implemented; final parity CI pending**
> Uter source commit: `008ec53adc9652ee454090b4fb1152536dd45bf3`
> UAES Architecture Source Checks: https://github.com/hu-xulin/uaes/actions/runs/41967181380
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


## 1A. Revalidated against the current integration baseline

The previous record was pinned to an older Uter commit. The architecture workflow is now explicitly pinned to `008ec53adc9652ee454090b4fb1152536dd45bf3` and verifies the checked-out SHA before running the inventory. The live run `41967181380` reproduced the same two unmatched operations after capturing 450 static Gin routes and 34 active built-in plugin routes. Therefore, this is confirmed drift on the current integration baseline, not merely a stale-baseline artifact.

Source-level evidence at that exact Uter commit:

- `router/api-router.go`: WeChat website-app login uses `POST /oauth/wechat-web/state`, `GET /oauth/wechat-web/origin`, and `GET /oauth/wechat-web`. The generic OAuth flow also exposes `POST /oauth/state` and `GET /oauth/:provider`; `controller/oauth.go` handles bind intent inside the state/callback flow. This is not proof that the old direct `POST /oauth/wechat/bind` request/response contract is preserved.
- `controller/wechat_web.go`: the website-app state handler currently accepts only `login` intent. It must not be treated as an implementation of a WeChat account-bind endpoint.
- `router/api-router.go`: secure verification exposes `GET /verify/methods`, `POST /verify`, and `POST /verify/email_code`; no `GET /verify/status` route is registered.
- `controller/secure_verification.go`: `GetVerificationMethods` returns operation-scoped verification requirements. This is not necessarily equivalent to a historical status resource.

The route inventory and source review do not establish whether external clients still consume either legacy operation. No implementation or OpenAPI mutation is authorized by this evidence alone.

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
- [x] Option B — revise OpenAPI to the actual runtime contract (OWNER APPROVED 2026-11-05)
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


## 1B. Final CI evidence — run 41967574900

The corrected-baseline Architecture Source Checks run completed with **FAIL** on 2026-11-05. The workflow checked out and verified Uter source `008ec53adc9652ee454090b4fb1152536dd45bf3` before executing the checks.

Completed steps before the final parity gate:
- module manifests, RelayKit boundary and positive/negative controls: PASS;
- Go dependency allowlist and positive/negative controls: PASS;
- OpenAPI contract/compatibility validation and positive/negative controls: PASS;
- database migration inventory integrity check (not rollback acceptance): PASS;
- frontend import inventory and positive/negative controls: PASS;
- router/OpenAPI drift checker positive/negative controls: PASS.

The final live inventory captured **450 static Gin routes and 34 dynamic plugin routes**. It failed with exactly these two unmatched documented operations:
- `POST /api/oauth/wechat/bind`
- `GET /api/verify/status`

Run: https://github.com/hu-xulin/uaes/actions/runs/41967574900

This is a confirmed blocking contract discrepancy at the pinned integration baseline. It is not a checker-fixture failure. The gate remains blocking; no runtime handler or OpenAPI declaration has been changed. The API contract owner must select Option A, B, or C in §2/§4 before remediation.


## 1C. Latest CI revalidation — run 41968779803

The latest Architecture Source Checks run on 2026-11-05 again checked out and verified Uter source `008ec53adc9652ee454090b4fb1152536dd45bf3`. All architecture inventory and checker fixture steps passed, including:
- database migration inventory integrity;
- database source-pin positive/negative controls;
- frontend import inventory and positive/negative controls;
- router/OpenAPI drift checker positive/negative controls.

The final live Gin/OpenAPI parity step remains **FAIL** with exactly the same two discrepancies:
- `POST /api/oauth/wechat/bind`
- `GET /api/verify/status`

The runtime inventory again captured 450 static Gin routes and 34 dynamic plugin routes. The failure is reproducible on the pinned source baseline and is not caused by the route checker fixtures.

Run: https://github.com/hu-xulin/uaes/actions/runs/41968779803

API contract owner selected **Option B** on 2026-11-05. The two paths were removed from the Uter OpenAPI after the repository-local consumer audit. See §1D for the decision and evidence. Keep the route-parity gate blocking until a fresh run against the updated Uter source passes.


## 1D. Owner decision — Option B approved and implemented

On 2026-11-05, the API contract owner explicitly selected **Option B**: both legacy operations are obsolete; complete the consumer survey and remove the stale OpenAPI declarations. This supersedes the earlier “decision required” status in §§1–1C.

The Uter PR #15 branch contains the owner-approved audit at `.uaes/API-LEGACY-ENDPOINT-DEPRECATION-AUDIT-2026-11-05.md`. The survey found:
- no current Gin route for either path;
- no current frontend API call to either path;
- current verification client uses `GET /api/verify/methods`, `POST /api/verify`, and `POST /api/verify/email_code`;
- current generic OAuth uses `POST /api/oauth/state` and callback flows; the dedicated WeChat website-app flow is login-only and is **not** claimed to replace WeChat account binding;
- seven locale API-reference copies contained stale references, including a WeChat HTTP-method disagreement (OpenAPI POST versus docs GET);
- production external-client usage telemetry is not present in the inspected repository, so the audit does not assert that no external caller ever existed. The owner's explicit obsolescence decision is the authority for removal.

Implemented on Uter PR #15:
- `docs-dev/openapi/api.json`: removed exactly `/api/oauth/wechat/bind` and `/api/verify/status`; operation count reduced from 161 to 159 and path count from 136 to 134.
- Removed both obsolete API-reference sections from the seven locale copies.
- Added a filter to `docs-web/scripts/sync-upstream-docs.py` so future documentation synchronization cannot reintroduce these paths.
- No runtime handler, auth semantics, database, payment configuration, production environment, or deployment was changed.

The final Uter source for the fresh parity run is `422caafffb7a64370700ddd4859a057911f5f9e0`. The UAES Architecture Source Checks workflow and database migration inventory are being repinned to this exact source commit. Acceptance remains pending until the new live parity run passes.


## 1E. Compatibility gate behavior and approved removal ledger

The first Architecture Source Checks run after removing the two operations correctly failed earlier at `check-api-contracts`, before live route parity, because the pinned compatibility baseline still contained both operations. This was an expected protection, not a regression in the checker.

A narrow, auditable approval mechanism has now been added:
- `.uaes/registry/api-breaking-change-approvals.json` records exactly the two owner-approved removals, each with a unique approval ID, exact document + HTTP operation, owner decision, reason, consumer-audit path, baseline source commit, and implementation source commit.
- `check-api-contracts` accepts a removed operation only when an exact matching `OPTION_B_APPROVED` entry exists. Unapproved removals still fail.
- The checker rejects duplicate approvals, approvals for unknown baseline documents, baseline-source mismatches, approvals for operations absent from the pinned baseline, and stale approvals when an operation is still present.
- `test-api-contracts.rb` now has positive and negative controls for approved removal and stale approval rejection; the existing unapproved-removal negative control remains.
- Architecture workflow path filters now include both the API compatibility baseline and approval registry.

This is not a blanket compatibility bypass and does not weaken checks for other operations, request/response changes, schemas, or required fields. Final acceptance awaits the exact-current-head Architecture Source Checks run, including live Gin/OpenAPI parity.


## 1F. First successful post-removal architecture run

Architecture Source Checks run [41970798603](https://github.com/hu-xulin/uaes/actions/runs/41970798603) completed **PASS** on 2026-11-05 against the exact pinned Uter source `422caafffb7a64370700ddd4859a057911f5f9e0`.

Verified results:
- API compatibility checker accepted only the two exact owner-approved removals recorded in the approval registry; all other compatibility checks passed.
- API contract fixture suite passed, including unapproved-removal rejection, approved-removal acceptance, and stale-approval rejection.
- Router/OpenAPI positive and negative fixtures passed.
- Live route parity passed: **197 documented operations covered by 484 static Gin and built-in plugin routes** (450 static Gin + 34 dynamic plugin routes).
- No unmatched documented operation remains.

This resolves the two-route parity blocker for the pinned Uter source. It does not prove that every runtime route is documented, nor does it certify third-party external-client usage or promote the broader UAES/Uter migration to VERIFIED.
