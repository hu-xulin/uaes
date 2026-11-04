# UAES-11-001 — Git and Branching Strategy

**Standard ID:** UAES-11-001
**Standard Name:** Git and Branching Strategy
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

规范代码版本控制和分支保护。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-001-M001 | 所有受管理代码 MUST 位于版本控制系统。 |
| UAES-11-001-M002 | 默认分支 MUST 开启保护规则。 |
| UAES-11-001-M003 | 关键分支 MUST 禁止未经审查的直接 Push。 |
| UAES-11-001-M004 | 分支命名 MUST 可关联任务或变更目的。 |
| UAES-11-001-M005 | 发布 Tag MUST 指向确定的 Commit。 |
| UAES-11-001-M006 | 禁止未经审批的 Force Push 和历史重写。 |
| UAES-11-001-M007 | 分支删除 MUST 符合保留策略。 |
| UAES-11-001-M008 | Branch Protection 配置 MUST 定期审计。 |

## 3. Verification

检查 Branch Rules、Required Reviews、Required Status Checks、Tag 保护及绕过权限。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
