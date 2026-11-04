# UAES-08-009 — Execution Workspace Isolation

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-009 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

为 Agent 提供可隔离、可恢复、可审计的代码和资源执行环境。

## 2. Scope

本地工作区、Git Worktree、分支、容器、临时目录、测试数据库和构建资源。

## 3. Definitions

- Workspace：Agent 执行任务的工作空间。
- Worktree：独立 Git 工作树。
- File Ownership：文件修改责任归属。
- Workspace Snapshot：工作区状态快照。
- Workspace Conflict：工作区并发修改冲突。

## 4. Core Principles

用户数据优先保护、任务隔离、写入范围明确、变更可追踪、清理可控。

## 5. Mandatory Requirements

- UAES-08-009-001 MUST 在执行前识别当前工作区状态。
- UAES-08-009-002 MUST 保护用户未提交的本地修改。
- UAES-08-009-003 MUST 为并行写入任务提供独立工作区或等效隔离。
- UAES-08-009-004 MUST 记录任务与 Workspace 的关联。
- UAES-08-009-005 MUST 定义允许修改的文件和资源范围。
- UAES-08-009-006 MUST 防止多个 Agent 无协调修改同一文件。
- UAES-08-009-007 MUST 在执行前识别 Git 状态和分支。
- UAES-08-009-008 MUST 为关键修改保留可恢复的变更记录。
- UAES-08-009-009 MUST 在清理 Workspace 前确认没有待保留成果。
- UAES-08-009-010 MUST 对测试数据库、缓存和临时资源实施隔离。
- UAES-08-009-011 MUST 禁止测试任务连接未经授权的生产资源。
- UAES-08-009-012 MUST 记录 Workspace 销毁或归档结果。

## 6. Implementation Rules

推荐 Workspace 生命周期：

```
ALLOCATED → INSPECTED → ACTIVE → VERIFYING → PRESERVED → RELEASED
```

异常路径：

```
ACTIVE → BLOCKED → RECOVERING → ACTIVE
```

Uter 工程默认策略：

- 修改现有项目时，先检查 Git Status 和未提交修改。
- 不覆盖用户未提交文件。
- 并行 Agent 优先使用独立 Git Worktree。
- 共享只读资料可以通过受控引用访问。
- 独立修复分支完成验证后，遵循用户授权的 Commit、Push 和 PR 流程。
- 创建 PR 不意味着获准 Merge 或 Deploy。
- 不得将生产数据库、真实支付配置作为普通测试资源。

## 7. Prohibited Practices

- MUST NOT 未检查工作区就执行清理或重置命令。
- MUST NOT 使用 `git reset --hard`、强制覆盖或等效操作破坏用户修改。
- MUST NOT 让并行 Agent 直接共享无协调写入目录。
- MUST NOT 将测试资源指向生产环境。
- MUST NOT 在任务未完成时删除唯一成果副本。

## 8. AI Execution Rules

AI 必须先检查 Git 状态、当前分支和工作区归属；发现用户未提交修改时应保留并隔离，不能擅自覆盖。

## 9. Verification

Workspace Isolation Tests、File Ownership Tests、Git Safety Tests、Resource Isolation Tests 和 Recovery Tests。

## 10. Acceptance Criteria

工作区隔离有效，用户修改受到保护，执行成果可追踪和恢复。

## 11. Exceptions

单 Agent、只读任务可使用当前工作区，但仍必须遵守只读范围和文件保护要求。

## 12. References

UAES-01、UAES-06、UAES-09、UAES-10、UAES-11。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
