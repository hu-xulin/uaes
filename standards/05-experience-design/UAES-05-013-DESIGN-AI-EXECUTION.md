# UAES-05-013 — Design AI Execution

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-013 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

约束 AI 在设计分析、UI 生成、组件开发、视觉调整和设计系统维护中的行为。

## 2. Scope

所有可访问 Uter 项目代码、设计资产、Token、组件和视觉基准的 AI Agent。

## 3. Definitions

- Design Context：完成设计任务所需的规范和项目上下文。
- Design Deviation：与正式设计规范不一致的实现。
- Design Evidence：证明设计实现符合要求的证据。
- Visual Approval：对视觉基准或高影响视觉变更的正式批准。

## 4. Core Principles

先读取规范、先复用后新增、先确认后推断、先验证后报告。

## 5. Mandatory Requirements

- UAES-05-013-001 MUST 在开始任务前加载相关 Token、组件和页面规范。
- UAES-05-013-002 MUST 查询组件注册表，避免重复实现。
- UAES-05-013-003 MUST 使用正式语义 Token。
- UAES-05-013-004 MUST 遵守组件契约。
- UAES-05-013-005 MUST 将未确认设计决策标记为假设或提案。
- UAES-05-013-006 MUST 在修改公共组件时分析受影响页面。
- UAES-05-013-007 MUST 执行相关类型、组件、无障碍和视觉测试。
- UAES-05-013-008 MUST 报告未执行的检查和剩余风险。
- UAES-05-013-009 MUST 保留用户未提交的本地修改。
- UAES-05-013-010 MUST 遵守 UAES-01 的 Agent 权限和审批规则。

## 6. Implementation Rules

AI UI 工作流：

```
LOAD DESIGN CONTEXT
  → IDENTIFY COMPONENTS
  → MAP TOKENS
  → PLAN LAYOUT AND INTERACTION
  → IMPLEMENT
  → RUN DESIGN CHECKS
  → RUN ACCESSIBILITY CHECKS
  → RUN VISUAL REGRESSION
  → REVIEW DIFF
  → REPORT EVIDENCE
```

执行报告必须记录：

- Task ID。
- 使用的设计系统版本。
- 修改文件。
- Token 和组件引用。
- 响应式验证范围。
- 无障碍验证结果。
- 视觉回归结果。
- 未解决问题。

## 7. Prohibited Practices

- MUST NOT 自行改变品牌规范。
- MUST NOT 为追求截图相似而删除功能或可访问性。
- MUST NOT 通过禁用测试掩盖设计问题。
- MUST NOT 将未运行的测试报告为 PASS。
- MUST NOT 虚构设计审批或基准批准。

## 8. AI Execution Rules

当需求与设计规范冲突时，AI 必须指出冲突并请求决策；不得擅自选择更方便实现的一方。低风险、已有规则明确的局部实现可以直接执行。

## 9. Verification

通过典型任务评估 AI 是否能正确读取规范、复用组件、使用 Token、处理无障碍和提交验证证据。

## 10. Acceptance Criteria

AI 不绕过设计系统即可完成代表性 UI 任务，且不存在未披露的设计偏离。

## 11. Exceptions

按 UAES-00-005 处理。

## 12. References

UAES-01、UAES-03、UAES-05、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
