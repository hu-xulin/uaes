# UAES-07-013 — Cross-Platform AI Execution

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-013 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范 AI 在跨平台需求分析、代码修改、适配、测试和报告中的执行行为。

## 2. Scope

所有使用 AI Agent 完成的平台相关任务。

## 3. Definitions

- Target Platform：任务目标平台。
- Platform Scope：本次允许修改的平台范围。
- Adapter Change：平台适配层变更。
- Parity Gap：平台间功能或体验差异。

## 4. Core Principles

平台事实优先、修改范围明确、共享逻辑谨慎、平台验证独立。

## 5. Mandatory Requirements

- UAES-07-013-001 MUST 在任务开始前识别目标平台。
- UAES-07-013-002 MUST 读取平台支持矩阵。
- UAES-07-013-003 MUST 识别共享代码与平台专属代码。
- UAES-07-013-004 MUST 检查变更对其他平台的影响。
- UAES-07-013-005 MUST 使用对应平台的适配契约。
- UAES-07-013-006 MUST 对每个平台分别记录验证结果。
- UAES-07-013-007 MUST 将未测试平台标记 NOT_VERIFIED。
- UAES-07-013-008 MUST 报告平台能力缺失和降级行为。
- UAES-07-013-009 MUST 保护用户未提交修改。
- UAES-07-013-010 MUST 遵守 P01 Agent 权限治理和 P08 Agent 执行契约。

## 6. Implementation Rules

AI 执行前必须输出：

- 目标平台。
- 受影响平台。
- 共享代码范围。
- 平台 Adapter 范围。
- 依赖变化。
- 兼容性风险。
- 验证计划。

完成后必须输出：

- 修改文件。
- 平台影响。
- 契约变化。
- 构建结果。
- 设备和浏览器验证。
- 未解决差异。
- 未执行检查。

## 7. Prohibited Practices

- MUST NOT 将单平台通过报告为全平台通过。
- MUST NOT 在没有原生工程的情况下虚构原生测试结果。
- MUST NOT 擅自创建新的平台技术栈并大规模迁移。
- MUST NOT 将平台适配问题通过删除功能掩盖。

## 8. AI Execution Rules

AI 可以在授权范围内完成平台适配和代码修改，但新增平台、重大技术栈迁移和正式发布必须遵守相应审批要求。

## 9. Verification

由 P07 Gate 和 P09 测试体系联合验证。

## 10. Acceptance Criteria

目标平台、修改范围、适配结果和验证证据完整。

## 11. Exceptions

受限于缺少真实设备时，可使用模拟器和自动化测试，但必须明确证据等级。

## 12. References

UAES-01、UAES-08、UAES-09、UAES-10、UAES-11。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
