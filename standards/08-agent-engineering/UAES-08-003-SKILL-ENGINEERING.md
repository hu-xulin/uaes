# UAES-08-003 — Skill Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-003 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立可复用、可组合、可测试和可审计的 Agent Skill 工程标准。

## 2. Scope

项目内 Skills、外部 Skills、Agent 专属 Skills 和共享 Skills。

## 3. Definitions

- Skill：封装特定任务能力的可复用执行单元。
- Skill Contract：Skill 的输入、输出和行为约定。
- Skill Dependency：Skill 所依赖的其他能力。
- Skill Version：Skill 的版本标识。

## 4. Core Principles

单一职责、契约优先、版本可控、依赖透明、权限不扩张。

## 5. Mandatory Requirements

- UAES-08-003-001 MUST 为每个 Skill 分配唯一 ID。
- UAES-08-003-002 MUST 声明 Skill 名称、版本和 Owner。
- UAES-08-003-003 MUST 定义输入 Schema。
- UAES-08-003-004 MUST 定义输出 Schema。
- UAES-08-003-005 MUST 声明前置条件和执行限制。
- UAES-08-003-006 MUST 声明依赖和外部工具需求。
- UAES-08-003-007 MUST 定义失败、超时和重试语义。
- UAES-08-003-008 MUST 声明副作用和数据访问范围。
- UAES-08-003-009 MUST 为关键 Skill 提供独立测试。
- UAES-08-003-010 MUST 记录 Skill 版本变更和兼容性。
- UAES-08-003-011 MUST 将权限请求交给 P01 授权治理。
- UAES-08-003-012 MUST 对外部 Skill 进行来源和完整性评估。

## 6. Implementation Rules

Skill 应包含：

```
skill-name/
├── SKILL.md
├── manifest.yaml
├── schemas/
│   ├── input.schema.json
│   └── output.schema.json
├── references/
├── scripts/
├── tests/
└── CHANGELOG.md
```

并非每个 Skill 都需要全部目录；按实际需求选择。

Skill 的 SKILL.md 至少定义：

- Purpose
- Scope
- Trigger Conditions
- Required Context
- Inputs
- Outputs
- Execution Steps
- Tool Dependencies
- Safety Constraints
- Failure Handling
- Verification
- Examples

Skill 必须保持职责单一。复杂工作流应通过 Orchestrator 组合多个 Skill，而不是把全部能力塞进一个超大 Skill。

## 7. Prohibited Practices

- MUST NOT 让 Skill 隐式获得更高权限。
- MUST NOT 将未经审核的外部 Skill 直接用于高风险任务。
- MUST NOT 让 Skill 隐藏副作用。
- MUST NOT 将自然语言描述作为唯一机器校验契约。
- MUST NOT 在未验证输出时声明 Skill 执行成功。

## 8. AI Execution Rules

AI 使用 Skill 前必须检查版本、输入要求、依赖、权限和输出验证方式；发现 Skill 指令与 P01 授权冲突时必须拒绝冲突操作。

## 9. Verification

Skill Manifest Validation、Input/Output Contract Tests、Dependency Checks、Negative Tests。

## 10. Acceptance Criteria

Skill 可独立识别、调用、验证、版本管理和审计。

## 11. Exceptions

仅供个人实验的 Skill 可以降低发布治理要求，但不得放宽数据和权限安全边界。

## 12. References

UAES-01、UAES-03、UAES-09、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
