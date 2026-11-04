# UAES-11-005 — CI Pipeline Architecture

**Standard ID:** UAES-11-005
**Standard Name:** CI Pipeline Architecture
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立可复用、可维护、可审计的流水线。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-005-M001 | CI MUST 使用版本化 Workflow。 |
| UAES-11-005-M002 | Job MUST 声明最小权限。 |
| UAES-11-005-M003 | 第三方 Action MUST 优先固定完整 Commit SHA。 |
| UAES-11-005-M004 | 不可信 PR 代码不得获得生产 Secret。 |
| UAES-11-005-M005 | Job 之间 MUST 明确依赖和产物传递。 |
| UAES-11-005-M006 | 关键失败 MUST 阻断后续发布阶段。 |
| UAES-11-005-M007 | CI 结果 MUST 关联 Source SHA。 |
| UAES-11-005-M008 | 必须防止并发工作流覆盖错误制品。 |
| UAES-11-005-M009 | CI 失败不得通过删除检查项来获得绿色结果。 |
| UAES-11-005-M010 | 流水线配置变更 MUST 经过审查。 |

## 3. Verification

Workflow Lint、权限检查、负面 PR 测试、Job Dependency 检查。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
