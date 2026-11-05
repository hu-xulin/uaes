# Uter Web Frontend Module Boundary Proposal

> Status: **DRAFT / NOT ENFORCED**
> Source repository: `hu-xulin/uter`
> Pinned source commit: `337485b4b19824f9bee59b6f8226802b455ab0ec`
> Evidence run: https://github.com/hu-xulin/uaes/actions/runs/41960573825
> Owner approval: pending

## 1. Purpose and non-goals

This proposal turns the measured TypeScript/JavaScript import graph into a reviewable dependency policy. It does not move files, alter runtime behavior, or reject the existing graph yet. No boundary MUST rule may be enforced until the affected imports are classified, ownership is agreed, and migration PRs have regression evidence.

The current scanner resolves local alias and relative imports, separates production and test-only edges, excludes generated route-tree files, and fails closed on unresolved local imports. It is an inventory tool, not a full TypeScript AST or semantic dependency analyzer. It classifies static runtime, explicit/type-modifier-only, and dynamic imports per edge using syntax-aware Ruby patterns, but it does not resolve TypeScript symbols, infer type erasure for every syntax form, parse package/workspace boundaries comprehensively, or infer dependency inversion.

## 2. Measured baseline

The refreshed scan against Uter `337485b4b19824f9bee59b6f8226802b455ab0ec` contains 1,500 source files: 1,217 production, 282 test, and 1 generated source. Two imports targeting generated route-tree files are excluded. All scanned local imports resolved.

| Production edge | Count | Initial interpretation |
|---|---:|---|
| `components → features` | 17 | Mixed: shared UI coupling and application-shell composition |
| `hooks → features` | 1 | Likely shared contract leak |
| `lib → features` | 2 | Shared infrastructure depends on auth feature |
| `stores → features` | 1 | Store contract depends on secure-verification feature |
| `routes → features` | 100 | Expected route composition; not a violation by itself |
| `features → components` | 1,743 | Feature slices reuse shared UI; inspect generic vs feature-aware components |
| `features → features` | 2,309 | Domain coupling; requires public-entrypoint and cross-feature contract review |

The 21 lower-level-to-feature imports are listed in section 3. Counts are import edges, not necessarily unique source files or unique target modules.

The per-edge classifier passed its positive/negative fixture suite on the pinned source. It classified the 21 reverse-direction imports as **18 runtime imports and 3 type-only imports**:
- `components → features`: 17 runtime
- `hooks → features`: 1 type-only
- `lib → features`: 1 runtime and 1 type-only
- `stores → features`: 1 type-only

Global production import-kind totals in the same run: 5,444 runtime, 518 type-only, and 16 dynamic. Test-only totals: 698 runtime, 104 type-only, and 33 dynamic. These totals are diagnostic counts, not policy acceptance.

## 3. Reverse-edge classification register

| Importer | Target | Preliminary classification | Proposed action |
|---|---|---|---|
| `components/ErrorBoundary.tsx` | `features/errors/general-error` | Feature-specific fallback rendered by global boundary | Move the boundary composition to app-shell or inject a fallback component; keep generic error primitives shared |
| `components/language-switcher.tsx` | `features/profile/lib/format` | Shared formatting helper owned by profile feature | Move locale/language formatting primitive to shared i18n utility if semantics are not profile-specific |
| `components/layout/components/app-header.tsx` | `features/system-update/system-update-action` | Application-shell composition | Move feature composition into app-shell/layout composition layer or expose a narrow feature entrypoint |
| `components/layout/components/public-header.tsx` | `features/system-update/system-update-action` | Application-shell composition | Same as app header |
| `components/layout/components/chat-presets-item.tsx` | `features/chat/components/chat-key-dialog` | Feature UI composed into global navigation | Move the composition to app-shell or expose a documented chat feature entrypoint |
| `components/layout/components/chat-presets-item.tsx` | `features/chat/hooks/use-active-chat-key` | Feature behavior used by app-shell | Move composition to app-shell or expose a narrow chat entrypoint |
| `components/layout/components/chat-presets-item.tsx` | `features/chat/hooks/use-chat-presets` | Feature behavior used by app-shell | Same as above |
| `components/layout/components/chat-presets-item.tsx` | `features/chat/lib/chat-links` | Feature domain utility used by app-shell | Expose a feature entrypoint or move genuinely shared URL primitives to shared lib |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/auth/section-registry` | Admin navigation composition | Move registry aggregation to system-settings feature/app-shell composition |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/billing/section-registry` | Admin navigation composition | Same as above |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/content/section-registry` | Admin navigation composition | Same as above |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/models/section-registry` | Admin navigation composition | Same as above |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/operations/section-registry` | Admin navigation composition | Same as above |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/request-policies/section-registry` | Admin navigation composition | Same as above |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/security/section-registry` | Admin navigation composition | Same as above |
| `components/layout/config/system-settings.config.ts` | `features/system-settings/site/section-registry` | Admin navigation composition | Same as above |
| `components/sign-out-dialog.tsx` | `features/auth/api` | Auth feature behavior embedded in generic components | Move dialog/action into auth feature or inject a logout command into a shared confirmation primitive |
| `hooks/use-status.ts` | `features/auth/types` | Shared system-status contract owned by auth feature | Extract `SystemStatus` into shared system contract types |
| `lib/auth-session.ts` | `features/auth/lib/auth-redirect` | Shared auth-session infrastructure depends on feature helper | Move pure redirect/language helpers to shared auth utility after dependency review |
| `lib/oauth.ts` | `features/auth/types` | Shared OAuth URL utility depends on feature-owned system status type | Extract `SystemStatus` to shared system contract types |
| `stores/auth-store.ts` | `features/auth/secure-verification/types` | Store state contract depends on feature-owned verification contract | Extract minimal auth verification state contracts to shared auth contract types |

### 3.1 Auth contract cycle

The source inspection was revalidated against Uter PR branch `ai/uaes-uter-integration-2026-11-05`, commit `008ec53adc9652ee454090b4fb1152536dd45bf3`. The exact file blob SHAs at that commit were:

- `web/src/features/auth/types.ts`: `c737d1e87df713723755c0e6050951f6bcb361d7`
- `web/src/features/auth/secure-verification/types.ts`: `3b116537fabdeea554667fefab220a70800df7a3`
- `web/src/stores/auth-store.ts`: `5ef322afc2286584cc239e2df3c3bc2d745a33ea`

The imports form a type-level dependency cycle:

- `features/auth/types.ts` imports `AuthBundle` from `stores/auth-store.ts`.
- `features/auth/secure-verification/types.ts` imports `AuthBundle` from `stores/auth-store.ts`.
- `stores/auth-store.ts` imports `LoginChallenge` from `features/auth/secure-verification/types.ts`.

All three are written as TypeScript `import type` declarations. This is therefore a compile-time ownership/dependency-direction cycle, not evidence of a JavaScript runtime initialization cycle. The import graph scanner must retain type-only edges for architecture policy; do not describe this finding as a runtime cycle.

The imports are type-only, but the direction still couples store contracts to feature-owned types and makes the ownership boundary unclear. Proposed remediation is to establish a neutral `web/src/types/auth.ts` (or equivalent shared contracts location) for `AuthUser`, `LoginSession`, `AuthBundle`, `AuthBootstrapState`, and the minimal persisted pending-verification shape. Verification UI/request orchestration remains inside `features/auth`. Preserve exact runtime and serialized shapes; do not widen types to `any` or weaken discriminated unions.

`SystemStatus` is also currently declared in `features/auth/types.ts` while consumed by `hooks/use-status.ts` and `lib/oauth.ts`. Extract it to a neutral system contract module and re-export from the legacy feature module during migration if import compatibility is needed.

### 3.2 Auth contract migration map (implementation plan; not yet applied)

The Uter source at `008ec53adc9652ee454090b4fb1152536dd45bf3` was additionally checked for the relevant package scripts and auth regression suites.

**Current ownership and proposed neutral ownership**

| Contract | Current owner | Proposed neutral owner | Compatibility requirement |
|---|---|---|---|
| `AuthUser` | `stores/auth-store.ts` | `web/src/types/auth.ts` | Preserve all optional fields and index/permission shapes exactly |
| `LoginSession` | `stores/auth-store.ts` | `web/src/types/auth.ts` | Preserve exact serialized session fields |
| `AuthBundle` | `stores/auth-store.ts` | `web/src/types/auth.ts` | Preserve access token, token type, expiry, user, and session shape |
| `AuthBootstrapState` | `stores/auth-store.ts` | `web/src/types/auth.ts` | Preserve the `idle | checking | complete` union |
| `PendingLoginVerification` | `stores/auth-store.ts` | `web/src/types/auth.ts` | Preserve persisted challenge and optional redirect shape |
| `LoginChallenge` | `features/auth/secure-verification/types.ts` | `web/src/types/auth.ts` (minimal wire/persisted contract only) | Preserve `require_verification`, `flow_token`, `expires_at`, and allowed method literals |
| `SystemStatus` | `features/auth/types.ts` | `web/src/types/system.ts` | Preserve nested and direct optional properties and index signature |

Do **not** move `VerificationOperation`, `RequestVerificationOptions`, `SecureVerificationState`, security-proof orchestration, or feature UI contracts into the shared store contract module. Those remain feature-owned. The neutral login challenge contract should contain only the serializable server challenge shape needed by the auth store; feature-specific adapters may refine it without introducing a reverse dependency.

**Required compatibility bridge**

- During migration, the existing feature type modules may re-export neutral contracts so existing imports do not need to change in one large patch.
- The store must import neutral auth contracts only; it must not import from `features/**`.
- Feature API/type modules may import neutral auth/system contracts.
- Avoid duplicate independently maintained declarations. There must be one canonical definition for each moved shape.
- Do not change Zustand state keys, storage keys, JSON serialization, login response parsing, or API payloads in this refactor.

**Regression suites present at the pinned source commit**

- `web/src/features/auth/api.test.ts`
- `web/src/features/auth/otp/__tests__/login-verification.test.tsx`
- `web/src/features/auth/secure-verification/__tests__/verification-api.test.ts`
- `web/src/features/auth/secure-verification/__tests__/verification-flow.test.tsx`
- `web/src/lib/auth-session.test.ts`
- `web/src/lib/auth-saved-language.test.ts`
- `web/src/features/security/components/__tests__/login-session-utils.test.ts`
- `web/src/features/security/components/__tests__/login-session-item.test.tsx`

**Required verification on the Uter PR branch**

1. `cd web && pnpm typecheck`
2. Run the listed Vitest suites explicitly with `pnpm exec vitest run <paths...>`.
3. Run the full `pnpm test` suite.
4. Run `pnpm lint` and `pnpm build:check`.
5. Add focused store tests before moving types: pending challenge set/clear, user identity change invalidation, reset/bootstrap transitions, and serialization/hydration if persistence is enabled for this store.
6. Compare generated declarations/typecheck output and run the frontend import-graph scanner; the `stores → features` reverse edge must become zero without creating a new shared-to-feature edge.
7. Record exact source SHA, changed files, test commands/results, and a before/after import graph.

No implementation is authorized by this plan alone. It remains DRAFT until the full consumer inventory, ownership review, regression evidence, and architecture-owner approval are complete.

## 4. Proposed target layers (not yet approved)

1. **shared primitives** — design-system, generic components, i18n utilities, platform-neutral pure utilities and neutral API/domain contracts.
2. **infrastructure** — auth-session lifecycle, query/cache adapters, storage adapters, transport clients and state stores. Infrastructure may depend on shared contracts, not feature UI or feature orchestration.
3. **features** — domain-specific UI, hooks, API adapters and use cases. A feature may depend on shared primitives/contracts and explicitly published contracts from another feature; it must not import another feature's private implementation paths.
4. **app-shell / composition** — route/layout/navigation composition that wires features together. It may depend on published feature entrypoints, but generic shared UI and infrastructure must not depend on app-shell or feature implementation.
5. **routes** — route definitions and thin route composition; routes may depend on published feature entrypoints and app-shell composition APIs. Generated route tree is excluded from source policy.

The actual directory structure may not match these logical layers one-to-one. A migration may introduce `app-shell/` or a dedicated composition folder, but do not move files solely to satisfy a naming rule.

## 5. Proposed enforcement rules (DRAFT)

- Shared primitives and infrastructure MUST NOT import feature implementation modules.
- Stores MUST depend on neutral serializable contracts, not feature UI/request orchestration.
- Feature-to-feature dependencies MUST use an explicit public entrypoint or approved contract; private deep imports are prohibited after migration.
- Routes and app-shell composition MAY import published feature entrypoints.
- Tests MAY cross module boundaries for integration purposes but must be counted separately from production imports.
- Generated route trees and generated clients MUST be identified explicitly and excluded or validated by their own generator contract.
- Type-only imports remain dependencies for ownership and compile-time architecture purposes; they may be classified separately but are not silently ignored.

## 6. Migration and acceptance sequence

1. Continue hardening the per-edge import-kind classifier with fixtures for mixed imports, namespace imports, re-exports, import assertions, and parser edge cases; current syntax-aware runtime/type-only/dynamic classification is implemented and fixture-tested.
2. Add fixture coverage for type-only imports, re-exports, dynamic imports, workspace-relative imports, generated imports and unresolved imports.
3. Create neutral auth/system contract modules and migrate the three-way auth type cycle with targeted tests.
4. Move app-shell composition out of generic `components/` where appropriate; retain generic visual primitives in shared components.
5. Replace deep feature imports with explicit public entrypoints; document intentional composition dependencies.
6. Produce a fresh full graph and compare it to this pinned baseline.
7. Obtain architecture-owner approval for allowed directions and explicit exceptions.
8. Only then enable a CI boundary gate with positive and negative fixtures.

## 7. Acceptance criteria

- Every production import resolves and is classified.
- No unapproved infrastructure/store/shared-to-feature dependency remains.
- Every cross-feature dependency is through an approved public contract.
- Route-to-feature composition is explicitly allowed and tested.
- Exceptions have owner, rationale, expiry/review date and test evidence.
- Negative fixtures prove prohibited edges fail; positive fixtures prove approved composition passes.
- The checker is tested independently of live repository findings.
- No API, payment, auth/session, persisted state, or UI behavior changes without targeted regression tests.
- The source commit and checker version are pinned in the report.
- This proposal remains DRAFT until all criteria and owner approvals are satisfied.
