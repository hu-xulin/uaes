# UAES-11-006 — Build and Artifact Reproducibility

**Standard ID:** UAES-11-006
**Standard Name:** Build and Artifact Reproducibility
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

保证构建输入确定、输出可追溯、制品完整。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-006-M001 | 正式构建 MUST 记录源 Commit。 |
| UAES-11-006-M002 | 依赖 MUST 使用锁文件或等效固定机制。 |
| UAES-11-006-M003 | 工具链版本 MUST 受控。 |
| UAES-11-006-M004 | 制品 MUST 计算密码学 Digest。 |
| UAES-11-006-M005 | 制品下载后 MUST 校验 Digest。 |
| UAES-11-006-M006 | 构建参数和环境 MUST 可追溯。 |
| UAES-11-006-M007 | 构建缓存不得成为未受控输入。 |
| UAES-11-006-M008 | 正式制品 SHOULD 提供 Provenance。 |
| UAES-11-006-M009 | 不得覆盖已发布的不可变制品。 |
| UAES-11-006-M010 | 构建可复现性不足时 MUST 明确标记限制。 |

## 3. Verification

Clean Build、Digest Comparison、Dependency Lockfile Check、Provenance Verification。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
