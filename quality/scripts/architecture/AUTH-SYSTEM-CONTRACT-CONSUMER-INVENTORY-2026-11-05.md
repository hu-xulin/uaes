# Auth and System Contract Consumer Inventory — 2026-11-05

## Status

- **Inventory execution:** PASS
- **Uter source pin:** `422caafffb7a64370700ddd4859a057911f5f9e0`
- **Scanned scope:** all 1,575 source files under `uter/web/` with extensions `.ts`, `.tsx`, `.js`, `.jsx`, `.mts`, `.cts`, `.mjs`, `.cjs`.
- **Workflow:** Architecture Source Checks, run [41972822472](https://github.com/hu-xulin/uaes/actions/runs/41972822472), job `source-checks` (ID `127064746261`), step 17.
- **Method:** exhaustive lexical identifier occurrence scan for the listed symbols. This is not semantic TypeScript symbol resolution. Comments, declarations, tests, and fixtures are included and require classification.

## Occurrence totals

| Symbol | Occurrences |
|---|---:|
| `AuthBundle` | 41 |
| `AuthUser` | 20 |
| `LoginSession` | 18 |
| `AuthBootstrapState` | 7 |
| `PendingLoginVerification` | 3 |
| `LoginChallenge` | 12 |
| `SystemStatus` | 25 |
| `CustomOAuthProviderInfo` | 8 |
| **Total** | **134** |

## Consumer classification

### AuthBundle

Production consumers span:
- Auth feature: `features/auth/hooks/use-auth-redirect.ts`, `features/auth/secure-verification/api.ts`, `features/auth/secure-verification/hooks/use-secure-verification.ts`, `features/auth/secure-verification/types.ts`, `features/auth/types.ts`.
- Shared session orchestration: `lib/auth-session.ts`.
- Store declaration and state actions: `stores/auth-store.ts`.

Test consumers include auth API, OTP login verification, passkey domain verification, secure-verification API/flow, server-error notifications, saved-language, and auth-session tests.

**Ownership implication:** AuthBundle is not store-internal state. It is a cross-feature/shared session contract and is a candidate for a neutral shared type module. Store state/actions remain store-owned.

### AuthUser

Production consumers include:
- `components/layout/components/mobile-drawer.tsx`
- `features/auth/lib/auth-redirect.ts`
- `hooks/use-user-display.ts`
- `lib/admin-permissions.ts`
- `lib/auth-session.ts`
- `stores/auth-store.ts`

The symbol is used outside the auth feature and should not be owned by the Zustand store module. Candidate neutral ownership: `web/src/types/auth.ts`.

### LoginSession

Production consumers include:
- `features/profile/api.ts`
- `features/security/components/login-session-dialogs.tsx`
- `features/security/components/login-session-item.tsx`
- `features/security/components/login-sessions-card.tsx`
- `lib/auth-session.ts`
- `stores/auth-store.ts`

Security/profile features consume this as an API/session data contract. Candidate neutral ownership: `web/src/types/auth.ts`.

### AuthBootstrapState and PendingLoginVerification

Occurrences are limited to `stores/auth-store.ts` and `lib/auth-session.ts`.
- `AuthBootstrapState` describes cross-module auth bootstrap lifecycle and is suitable for a neutral auth contract.
- `PendingLoginVerification` is store state shape and should be reviewed separately before moving; do not assume all store state belongs in a neutral public type module.

### LoginChallenge

Occurrences are limited to:
- `features/auth/secure-verification/types.ts`
- `features/auth/secure-verification/api.ts`
- `features/auth/secure-verification/hooks/use-secure-verification.ts`
- `stores/auth-store.ts`

The store imports the feature-owned `LoginChallenge`, while the feature types import `AuthBundle` from the store. This creates the previously identified type-only ownership cycle.

**Recommended resolution:** keep `LoginChallenge` owned by secure-verification, and move only the minimal serializable challenge shape needed by the store into a neutral auth contract if the exact fields and runtime validation contract are proven identical. Do not move verification orchestration types or broaden the neutral contract.

The earlier proposal noted a type mismatch risk: a broad `LoginChallenge.methods` union includes `password`, `email_code`, `oauth`, and `session`, while runtime validation accepts only `2fa` and `passkey`. The migration must resolve this with source-level proof and regression fixtures, not by silently narrowing or widening runtime behavior.

### SystemStatus

Production consumers outside the auth feature:
- `features/chat/hooks/use-chat-presets.ts`
- `hooks/use-status.ts`
- `lib/oauth.ts`

Auth feature consumers:
- `features/auth/components/legal-consent.tsx`
- `features/auth/components/oauth-providers.tsx`
- `features/auth/hooks/use-oauth-login.ts`
- `features/auth/lib/oauth.ts`
- `features/auth/secure-verification/api.ts`

Tests include `features/auth/components/__tests__/oauth-providers.test.tsx`.

**Ownership implication:** SystemStatus is a system/bootstrap API contract consumed beyond authentication. Candidate neutral ownership: `web/src/types/system.ts`.

### CustomOAuthProviderInfo

Production consumers:
- `features/auth/hooks/use-oauth-login.ts`
- `features/security/components/account-bindings.tsx`

It is nested in system/auth status payloads and also used by account-binding UI. Candidate neutral ownership: `web/src/types/system.ts`, provided the full declaration and any related OAuth provider contracts are reviewed together.

## Proposed neutral ownership (not yet implemented)

- `web/src/types/auth.ts`: AuthBundle, AuthUser, LoginSession, AuthBootstrapState, and only the minimal store-facing challenge contract after field-level validation.
- `web/src/types/system.ts`: SystemStatus and CustomOAuthProviderInfo.
- Keep Zustand store actions/state implementation in `stores/auth-store.ts`.
- Keep secure-verification orchestration, operation types, request options, proof state, and UI contracts within `features/auth/secure-verification/`.

## Required migration regression set

Run and preserve results for:
- `web/src/features/auth/api.test.ts`
- `web/src/features/auth/otp/__tests__/login-verification.test.tsx`
- `web/src/features/auth/secure-verification/__tests__/verification-api.test.ts`
- `web/src/features/auth/secure-verification/__tests__/verification-flow.test.tsx`
- `web/src/lib/auth-session.test.ts`
- `web/src/lib/auth-saved-language.test.ts`
- `web/src/features/security/components/__tests__/login-session-utils.test.ts`
- `web/src/features/security/components/__tests__/login-session-item.test.tsx`

Also run frontend typecheck, lint, unit tests, build, and the module import graph inventory after any migration.

## Limitations and decisions still open

1. The scanner is lexical, not a TypeScript compiler symbol graph. Every occurrence is visible, but aliases, re-exports, inferred structural use, and generated build-time resolution need semantic review.
2. The scan scope is `web/`; it does not claim to cover Electron source outside `web/`, external consumers, runtime-loaded plugins, or third-party packages.
3. No runtime or API payload shape was changed.
4. No module-boundary rule is enabled by this report.
5. No auth type migration is performed or authorized by this report.
6. The frontend module-boundary proposal remains **DRAFT / NOT ENFORCED** pending owner acceptance.

## Conclusion

The full lexical inventory over the pinned web source tree completed successfully and exposes 134 occurrences across eight contracts. The evidence supports moving genuinely shared data contracts out of the store and auth feature ownership, but it does **not** justify moving verification orchestration types or changing runtime validation. The next implementation step requires an explicit owner decision on the neutral module ownership and the minimal store-facing `LoginChallenge` shape.
