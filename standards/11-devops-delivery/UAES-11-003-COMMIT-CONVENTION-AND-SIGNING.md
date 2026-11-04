# UAES-11-003 — Commit Convention and Signing

**Standard ID:** UAES-11-003
**Standard Name:** Commit Convention and Signing
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

确保 Commit 可理解、可审计、可验证。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-003-M001 | Commit MUST 有明确且单一的变更目的。 |
| UAES-11-003-M002 | Commit Message SHOULD 使用 Conventional Commits。 |
| UAES-11-003-M003 | 关键发布 Commit / Tag SHOULD 使用签名。 |
| UAES-11-003-M004 | 签名验证 MUST 绑定可信身份。 |
| UAES-11-003-M005 | 不得伪造 Commit Author、Committer 或签名身份。 |
| UAES-11-003-M006 | Commit MUST 可追溯至任务或 PR。 |
| UAES-11-003-M007 | 不得在 Commit 中包含 Secret。 |
| UAES-11-003-M008 | 不得通过 amend / rebase 隐藏已经需要审计的已发布变更。 |

## 3. Verification

Commit Message Lint、Signature Verification、Secret Scan、Author Attribution。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
