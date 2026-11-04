# UAES-08-001 — Agent Role and Identity

**Standard ID:** UAES-08-001  
**Standard Name:** Agent Role and Identity  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

规范 Agent 的身份、角色、职责和能力边界，防止角色重叠、责任不清和权限混乱。

## 2. Mandatory Requirements

### 2.1 ID-001 Unique Identity

每个 Agent MUST 有唯一且稳定的 Agent ID。

命名格式：

```text
uter.agent.<domain>.<role>
```

示例：

- uter.agent.product.requirement
- uter.agent.architecture.review
- uter.agent.engineering.coding
- uter.agent.quality.testing
- uter.agent.security.audit

### 2.2 ID-002 Role Definition

每个 Agent MUST 定义：

- Role Name
- Agent ID
- Purpose
- Responsibilities
- Non-Responsibilities
- Input Contract
- Output Contract
- Allowed Tools
- Permission Profile
- Model Requirements
- Acceptance Criteria

### 2.3 ID-003 Role Separation

以下角色 SHOULD 分开：

- Planner
- Researcher
- Architect
- Coder
- Reviewer
- Tester
- Security Auditor
- Release Agent

不得让一个 Agent 在高风险任务中同时控制实现、独立验收和最终审批。

### 2.4 ID-004 Role Authority

Agent 角色不能产生额外授权。

例如：

- Reviewer 可以提出合并建议，但不能因此获得 Merge 权限。
- Release Agent 可以生成发布计划，但不能因此获得 Deploy 权限。
- Coding Agent 可以修改授权范围内代码，但不能因此修改生产配置。

### 2.5 ID-005 Agent Versioning

Agent 指令、模型、工具集合、Skill 和权限策略发生实质变化时 MUST 更新版本或配置版本。

### 2.6 ID-006 Responsibility

每项任务 MUST 有明确的最终责任 Agent 或人类负责人。

## 3. Recommended Agent Roles

| Agent | Responsibility |
|---|---|
| Orchestrator | 规划、分解和调度 |
| Product Agent | 需求和业务规则分析 |
| Research Agent | 技术调查和证据收集 |
| Architect Agent | 架构分析和决策建议 |
| Design Agent | 设计系统和 UI 实现指导 |
| Coding Agent | 代码实现和修复 |
| Review Agent | 独立代码审查 |
| Test Agent | 测试设计与执行 |
| Security Agent | 安全风险分析 |
| Documentation Agent | 文档与知识同步 |
| Delivery Agent | Commit、PR 和交付材料 |

## 4. Prohibited Practices

- 不得创建没有明确职责的万能 Agent。
- 不得仅通过修改 Agent 名称改变其权限。
- 不得让 Agent 自行授予自己新工具。
- 不得让 Agent 冒充其他 Agent 或人类审批者。

## 5. Verification

- Agent ID 唯一性。
- 角色职责完整性。
- 工具权限符合角色职责。
- 不存在未经批准的权限继承。
- 角色版本可追踪。

## 6. Acceptance

每个已注册 Agent 必须具备有效 Manifest、职责、工具清单、权限配置和验证记录。
