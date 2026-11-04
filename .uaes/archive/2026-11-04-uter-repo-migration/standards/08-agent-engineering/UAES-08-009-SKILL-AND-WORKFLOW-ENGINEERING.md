# UAES-08-009 — Skill and Workflow Engineering

**Standard ID:** UAES-08-009  
**Standard Name:** Skill and Workflow Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

将重复的 Agent 专业能力和工程流程标准化为可发现、可复用、可测试和可版本管理的 Skills 与 Workflows。

## 2. Definitions

- **Skill**：解决某一类明确问题的可复用能力包。
- **Workflow**：由多个任务和步骤组成的可执行流程。
- **Agent Role**：Agent 的职责和身份。
- **Tool**：执行实际操作的能力接口。
- **Policy**：约束 Agent 行为和权限的治理规则。

Skill 不等于 Tool，也不等于 Agent。

## 3. Mandatory Requirements

- **SKILL-001**：每个 Skill MUST 有唯一 ID。
- **SKILL-002**：每个 Skill MUST 声明目的和适用范围。
- **SKILL-003**：Skill MUST 声明输入和输出。
- **SKILL-004**：Skill MUST 声明依赖的工具和权限。
- **SKILL-005**：Skill MUST 声明前置条件。
- **SKILL-006**：Skill MUST 声明失败处理。
- **SKILL-007**：Skill MUST 声明验收条件。
- **SKILL-008**：Skill MUST 具有版本号。
- **SKILL-009**：Skill 变更 MUST 进行兼容性评估。
- **SKILL-010**：Skill MUST 有可重复的测试案例。
- **SKILL-011**：Skill 不得自行扩大 Agent 权限。
- **SKILL-012**：Skill 中的外部内容 MUST 被视为不可信数据。
- **SKILL-013**：Workflow MUST 声明步骤、依赖、分支和终止条件。
- **SKILL-014**：Workflow MUST 记录每个步骤的责任 Agent。
- **SKILL-015**：Workflow MUST 支持失败恢复和人工审批节点。

## 4. Skill Structure

推荐：

```text
skills/
└── <skill-name>/
    ├── SKILL.md
    ├── manifest.yaml
    ├── schemas/
    ├── references/
    ├── examples/
    ├── tests/
    └── CHANGELOG.md
```

## 5. Workflow Structure

每个 Workflow 必须声明：

- Workflow ID
- Version
- Trigger
- Inputs
- Preconditions
- Steps
- Dependencies
- Agent Assignments
- Tools
- Approval Nodes
- Failure Branches
- Retry Policy
- Completion Criteria
- Outputs

## 6. Skill Reuse

- 相同能力 SHOULD 优先复用已验证 Skill。
- 不得为了单次任务创建重复 Skill。
- 不得引用已删除或不可用的工具。
- Skill 依赖变更必须触发测试。
- Skill 与平台工具绑定时必须声明适用环境。

## 7. Acceptance

Skill 可以独立发现、校验、执行、测试、升级和停用；Workflow 可以追踪所有步骤和执行结果。
