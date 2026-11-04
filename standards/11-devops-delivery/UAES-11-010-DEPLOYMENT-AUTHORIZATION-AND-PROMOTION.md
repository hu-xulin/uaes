# UAES-11-010 — Deployment Authorization and Promotion

**Standard ID:** UAES-11-010
**Standard Name:** Deployment Authorization and Promotion
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

管理环境晋级和部署权限。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-010-M001 | 部署 MUST 绑定明确制品 Digest。 |
| UAES-11-010-M002 | 环境晋级 MUST 遵守授权策略。 |
| UAES-11-010-M003 | 生产部署 MUST 有独立审批。 |
| UAES-11-010-M004 | 审批 MUST 绑定具体版本、制品和目标环境。 |
| UAES-11-010-M005 | 审批后制品变更 MUST 重新审批。 |
| UAES-11-010-M006 | 部署身份 MUST 使用最小权限。 |
| UAES-11-010-M007 | 部署失败 MUST 记录状态和恢复方案。 |
| UAES-11-010-M008 | 不得将 AI 创建 PR 的授权解释为部署授权。 |
| UAES-11-010-M009 | 部署状态 MUST 与发布状态分开记录。 |

## 3. Verification

Unauthorized Deployment Test、Digest Binding、Approval Binding、Environment Policy Test。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
