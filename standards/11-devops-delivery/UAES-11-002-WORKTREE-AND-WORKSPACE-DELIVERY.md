# UAES-11-002 — Worktree and Workspace Delivery

**Standard ID:** UAES-11-002
**Standard Name:** Worktree and Workspace Delivery
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

确保人工与 AI 并行开发时工作区隔离。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-002-M001 | 并行 Agent 写入任务 SHOULD 使用独立 Worktree。 |
| UAES-11-002-M002 | 创建工作区前 MUST 记录初始 Git 状态。 |
| UAES-11-002-M003 | MUST 保护用户未提交的修改。 |
| UAES-11-002-M004 | 不得对共享工作区执行破坏性清理。 |
| UAES-11-002-M005 | 工作区 MUST 关联 Task ID、Agent ID 和 Base SHA。 |
| UAES-11-002-M006 | 冲突文件 MUST 有明确写入 Owner。 |
| UAES-11-002-M007 | 任务结束后 MUST 检查残留文件和未提交变更。 |
| UAES-11-002-M008 | Worktree 清理 MUST 在确认内容已保存或无需保留后执行。 |

## 3. Verification

对未提交文件、未跟踪文件、并行写入冲突和任务中断执行负面测试。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
