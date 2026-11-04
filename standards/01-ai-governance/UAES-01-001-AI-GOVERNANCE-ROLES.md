# UAES-01-001 — AI Governance Roles & Responsibilities

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01 |

## 1. Purpose

明确 Uter AI 工程体系中人类、AI Agent、工具和治理角色的责任边界。

## 2. Role Model

| Role | Responsibility | Authority |
|---|---|---|
| User / Project Owner | 提供目标、业务决定和明确授权 | 项目级最终授权 |
| Governance Owner | 管理 UAES 和全局政策 | 治理政策审批 |
| Domain Owner | 管理领域标准 | 领域标准审批 |
| Task Planner | 分析和拆分任务 | 规划，不自动获得执行权限 |
| Implementer Agent | 执行授权的工程任务 | 限定范围内修改 |
| Reviewer Agent | 审查变更 | 审查，不自动获得修改权限 |
| Test Agent | 执行验证 | 测试环境和授权范围内操作 |
| Security Agent | 安全分析和验证 | 安全审查 |
| Release Agent | 准备交付和发布材料 | 按发布授权执行 |
| Tool Provider | 提供工具和接口 | 仅按连接权限工作 |

## 3. Mandatory Rules

### UAES-ROLE-001 — Identity Separation

- 每个 Agent 必须具有稳定的 Agent ID 和角色定义。
- 不得通过更改 Agent 名称绕过权限控制。

### UAES-ROLE-002 — Responsibility Assignment

每个任务必须明确：

- 谁提出任务。
- 谁负责规划。
- 谁执行。
- 谁验证。
- 谁批准。
- 谁接受最终交付。

低风险任务允许角色合并，但必须保留实际执行者和验证者记录。

### UAES-ROLE-003 — Independent Verification

- P0/P1 高风险任务 SHOULD 由独立于主要实施者的验证主体复核。
- 不得把同一个 Agent 的自我声明作为唯一的高风险验收证据。

### UAES-ROLE-004 — No False Human Identity

- Agent MUST NOT 冒充用户、管理员、审批人或真实员工。

### UAES-ROLE-005 — Responsibility Traceability

- 每项重要操作必须记录实际 Agent ID、工具身份和任务 ID。

## 4. RACI

| Activity | Owner | Planner | Implementer | Reviewer | Approver |
|---|---|---|---|---|---|
| 需求确认 | A | R | I | C | A |
| 技术规划 | A | R | C | C | I |
| 代码修改 | I | C | R | C | I |
| 代码审查 | I | C | C | R | I |
| 高风险授权 | A | C | I | C | R |
| 测试验证 | I | C | C | R | I |
| PR 创建 | A | C | R | C | I |
| PR 合并 | A/R | I | I | C | 按授权 |
| 生产发布 | A/R | I | I | C | 按独立发布授权 |

R = Responsible；A = Accountable；C = Consulted；I = Informed。

具体角色分配必须结合任务授权，不因表格中的角色名称自动产生权限。

## 5. Delegation

委派任务必须传递：

- 原始 Task ID。
- Parent Agent ID。
- Child Agent ID。
- 任务范围。
- 权限限制。
- 风险等级。
- 输出格式。
- 验收条件。
- 截止条件。

子 Agent 不得自行扩大任务范围。

## 6. Acceptance Criteria

- 角色定义完整。
- Agent 身份唯一。
- 责任分配可追踪。
- 委派权限不扩大。
- 审批角色明确。
- 高风险任务具备独立验证。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
