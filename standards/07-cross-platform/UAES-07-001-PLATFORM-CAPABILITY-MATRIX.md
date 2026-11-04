# UAES-07-001 — Platform Capability Matrix

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-001 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立目标平台、支持范围和平台能力的统一登记机制。

## 2. Scope

PC Web、H5、Electron、Android、iOS、HarmonyOS。

## 3. Definitions

- Platform Manifest：平台身份和支持范围描述。
- Capability Matrix：平台能力支持矩阵。
- Support Status：平台支持状态。
- Minimum Version：最低支持版本。

## 4. Core Principles

平台事实必须可追踪，支持范围必须明确，能力检测必须优先于平台猜测。

## 5. Mandatory Requirements

- UAES-07-001-001 MUST 为每个平台分配唯一 Platform ID。
- UAES-07-001-002 MUST 记录平台类型和运行环境。
- UAES-07-001-003 MUST 记录支持状态。
- UAES-07-001-004 MUST 记录最低支持版本和验证版本。
- UAES-07-001-005 MUST 记录平台专属能力。
- UAES-07-001-006 MUST 区分已验证能力和理论可用能力。
- UAES-07-001-007 MUST 记录能力降级方案。
- UAES-07-001-008 MUST 在平台版本变化时重新评估兼容性。

## 6. Implementation Rules

平台状态：

- SUPPORTED：已实现并通过规定验收。
- PLANNED：已列入规划，尚未完成实现。
- EXPERIMENTAL：实验性支持，不承诺完整兼容。
- DEPRECATED：计划停止支持。
- UNSUPPORTED：明确不支持。

初始 Uter 平台基线：

| Platform | Status | 说明 |
|---|---|---|
| PC Web | SUPPORTED* | 现有工程目标，需 UAES 验收 |
| H5 | PLANNED | 需完成移动浏览器适配验收 |
| Electron | SUPPORTED* | 现有工程目标，需 UAES 验收 |
| Android | PLANNED | 当前未确认存在原生工程 |
| iOS | PLANNED | 当前未确认存在原生工程 |
| HarmonyOS | PLANNED | 当前未确认存在原生工程 |

注：SUPPORTED* 表示当前工程中存在对应平台实现，不表示已经通过 UAES 跨平台验收。正式 Manifest 应将其实际验收状态与工程存在状态分开记录。

## 7. Prohibited Practices

- MUST NOT 将 PLANNED 标记为 SUPPORTED。
- MUST NOT 将浏览器兼容性推断为全部移动设备兼容。
- MUST NOT 将单台设备测试结果推广到整个平台范围。

## 8. AI Execution Rules

AI 必须读取平台清单后才能声称某个平台已支持；未知能力标记 UNKNOWN，不得推断为支持。

## 9. Verification

平台清单 Schema、能力检测、设备和浏览器测试。

## 10. Acceptance Criteria

平台身份、状态、版本、能力和验证证据完整。

## 11. Exceptions

暂时无法验证的平台必须登记限制和计划。

## 12. References

UAES-04、UAES-07-008。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
