# UAES-08-005 — Permission and Authorization

**Standard ID:** UAES-08-005  
**Standard Name:** Permission and Authorization  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

确保 Agent 的操作权限来自明确授权，并在工具调用和资源访问时得到实际强制执行。

## 2. Permission Dimensions

权限必须至少从以下维度控制：

1. Actor：哪个 Agent。
2. Action：执行什么动作。
3. Resource：作用于什么资源。
4. Environment：作用于哪个环境。
5. Scope：允许操作的范围。
6. Time：权限有效期。
7. Approval：是否需要人类批准。

## 3. Permission Levels

- P0 — READ_ONLY
- P1 — WORKSPACE_WRITE
- P2 — TEST_AND_BUILD
- P3 — GIT_COMMIT
- P4 — REMOTE_BRANCH_PUSH
- P5 — PULL_REQUEST_CREATE
- P6 — MERGE
- P7 — DEPLOY
- P8 — PRODUCTION_ADMIN
- P9 — FINANCIAL_OPERATION

等级仅表示风险和影响分类，不构成自动继承关系。获得较低级别权限不代表获得较高级别权限。

## 4. Mandatory Requirements

- **AUTH-001**：默认拒绝未声明的权限。
- **AUTH-002**：权限 MUST 按 Agent、动作和资源授权。
- **AUTH-003**：权限 MUST 遵循最小权限原则。
- **AUTH-004**：权限 MUST 有有效期或任务生命周期。
- **AUTH-005**：权限 MUST 可以撤销。
- **AUTH-006**：工具执行层 MUST 实际执行权限检查。
- **AUTH-007**：Agent 不得修改自己的权限策略。
- **AUTH-008**：Agent 间委派不得扩大原任务权限。
- **AUTH-009**：跨环境操作 MUST 重新检查授权。
- **AUTH-010**：外部写操作 MUST 记录审计。
- **AUTH-011**：高风险和不可逆操作 MUST 有人工审批。
- **AUTH-012**：权限不足时 MUST 停止，不得通过其他工具绕过。

## 5. Mandatory Human Approval

以下操作 MUST 经过明确授权：

- Merge Pull Request
- Production Deployment
- Production Database Mutation
- Production Configuration Change
- Real Payment Configuration Change
- Financial Transaction
- Credential Rotation
- Irreversible Data Deletion
- Permission Escalation
- Public External Communication with Legal or Financial Impact

## 6. Uter Project Permission Baseline

Uter 当前已明确的自动修复授权：

**Allowed After Required Verification**

- 在独立修复分支修改授权范围内的代码。
- 完成规定的测试和验证。
- 创建 Commit。
- Push 到独立修复分支。
- 创建 Pull Request。
- 在 PR 中提供改动说明和测试证据。

**Not Authorized**

- Merge PR。
- Deploy。
- 修改生产环境。
- 修改生产数据库。
- 修改真实支付配置。
- 覆盖用户未提交的本地修改。
- 擅自扩大任务范围和权限。

以上授权必须在实际 Agent Runtime 和工具层配置，不能只写在 Prompt 中。

## 7. Credential Management

- 凭据 MUST 按任务和环境隔离。
- 生产凭据不得默认进入 Agent Workspace。
- 工具应优先使用短期、可撤销凭据。
- 日志和 Handoff 不得包含明文密钥。
- 凭据访问必须有审计记录。
- 不得把高权限个人 Token 作为所有 Agent 的共享身份。

## 8. Acceptance

必须证明未授权动作被拒绝、已授权动作可执行、审批拒绝能阻断操作、委派不扩大权限、凭据不泄露。
