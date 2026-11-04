# UAES-11-008 — Secret and Credential Delivery

**Standard ID:** UAES-11-008
**Standard Name:** Secret and Credential Delivery
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

保护交付过程中的凭证。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-008-M001 | Secret MUST 存放在受控 Secret Manager。 |
| UAES-11-008-M002 | 凭证 MUST 按环境隔离。 |
| UAES-11-008-M003 | CI MUST 避免向不可信工作流暴露 Secret。 |
| UAES-11-008-M004 | 凭证 MUST 有 Owner、用途和权限范围。 |
| UAES-11-008-M005 | 长期凭证 SHOULD 使用短期凭证或 OIDC 替代。 |
| UAES-11-008-M006 | 日志和制品 MUST 屏蔽 Secret。 |
| UAES-11-008-M007 | 凭证泄漏 MUST 触发 P10 事件响应。 |
| UAES-11-008-M008 | 凭证轮换 MUST 有验证和回退方案。 |

## 3. Verification

Secret Scanning、Permission Audit、Leak Simulation、Rotation Drill。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
