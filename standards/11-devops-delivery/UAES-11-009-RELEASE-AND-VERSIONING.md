# UAES-11-009 — Release and Versioning

**Standard ID:** UAES-11-009
**Standard Name:** Release and Versioning
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

规范版本标识与正式发布。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-009-M001 | 正式发布 MUST 有唯一版本。 |
| UAES-11-009-M002 | 默认版本规则 SHOULD 采用 SemVer 2.0.0。 |
| UAES-11-009-M003 | 版本变更 MUST 与兼容性影响一致。 |
| UAES-11-009-M004 | Release MUST 关联源 Commit 和制品 Digest。 |
| UAES-11-009-M005 | Release Notes MUST 描述重要变更和风险。 |
| UAES-11-009-M006 | 预发布版本 MUST 明确标记。 |
| UAES-11-009-M007 | 禁止复用已发布版本号指向不同制品。 |
| UAES-11-009-M008 | 发布撤回或废弃 MUST 留存记录。 |

## 3. Verification

Version Validation、Tag Validation、Release Manifest、Digest Check。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
