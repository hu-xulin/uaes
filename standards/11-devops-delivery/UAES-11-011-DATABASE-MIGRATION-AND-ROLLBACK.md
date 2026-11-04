# UAES-11-011 — Database Migration and Rollback

**Standard ID:** UAES-11-011
**Standard Name:** Database Migration and Rollback
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

控制数据库结构与数据变更风险。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-011-M001 | 迁移 MUST 有唯一 ID 和版本。 |
| UAES-11-011-M002 | 迁移 MUST 进行兼容性和锁风险评估。 |
| UAES-11-011-M003 | 生产迁移 MUST 有独立审批。 |
| UAES-11-011-M004 | 高风险迁移 MUST 有备份或等效恢复策略。 |
| UAES-11-011-M005 | 迁移 MUST 可识别重复执行。 |
| UAES-11-011-M006 | 迁移 MUST 有执行后验证。 |
| UAES-11-011-M007 | 不可逆操作 MUST 有前向修复或恢复策略。 |
| UAES-11-011-M008 | 应用版本与数据库 Schema 兼容性 MUST 被验证。 |
| UAES-11-011-M009 | 迁移失败 MUST 保留可审计现场。 |

## 3. Verification

Migration Replay、Failure Injection、Recovery Drill、Schema Compatibility Test。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
