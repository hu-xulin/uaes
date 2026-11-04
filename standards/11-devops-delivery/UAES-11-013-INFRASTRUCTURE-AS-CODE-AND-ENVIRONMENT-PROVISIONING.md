# UAES-11-013 — Infrastructure as Code and Environment Provisioning

**Standard ID:** UAES-11-013
**Standard Name:** Infrastructure as Code and Environment Provisioning
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

规范基础设施配置和环境供应。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-013-M001 | 适用的基础设施配置 SHOULD 版本化。 |
| UAES-11-013-M002 | 生产变更 MUST 经过审查和审批。 |
| UAES-11-013-M003 | Plan / Diff MUST 在 Apply 前检查。 |
| UAES-11-013-M004 | State MUST 有访问控制和备份。 |
| UAES-11-013-M005 | 基础设施 Secret MUST 独立保护。 |
| UAES-11-013-M006 | 环境配置漂移 MUST 可检测。 |
| UAES-11-013-M007 | 销毁性操作 MUST 有额外确认。 |
| UAES-11-013-M008 | 基础设施变更 MUST 有恢复方案。 |

## 3. Verification

IaC Lint、Plan Review、Policy Check、Drift Detection、Recovery Test。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
