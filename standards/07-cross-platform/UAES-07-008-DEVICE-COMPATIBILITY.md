# UAES-07-008 — Device Compatibility

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-008 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立浏览器、操作系统、设备和硬件兼容性管理体系。

## 2. Scope

PC 浏览器、移动浏览器、Electron 运行环境和未来原生设备。

## 3. Definitions

- Compatibility Target：兼容性目标。
- Device Profile：设备能力和特征描述。
- Browser Matrix：浏览器支持矩阵。
- Known Limitation：已知限制。

## 4. Core Principles

支持范围可声明、关键场景可验证、兼容降级可预测。

## 5. Mandatory Requirements

- UAES-07-008-001 MUST 声明浏览器和系统最低支持版本。
- UAES-07-008-002 MUST 记录目标浏览器引擎。
- UAES-07-008-003 MUST 识别关键 API 的兼容性差异。
- UAES-07-008-004 MUST 对不支持特性提供降级方案。
- UAES-07-008-005 MUST 为关键业务流程建立兼容性测试。
- UAES-07-008-006 MUST 记录已知设备限制。
- UAES-07-008-007 MUST 在重大版本升级时重新评估支持矩阵。
- UAES-07-008-008 MUST 区分模拟器验证和真实设备验证。

## 6. Implementation Rules

兼容性矩阵至少记录：

- Platform ID。
- OS / Browser Version。
- Device Class。
- Rendering Engine。
- Input Mode。
- Required Capabilities。
- Test Result。
- Evidence。
- Known Limitations。

不应在未验证的情况下提前承诺具体最低版本。

## 7. Prohibited Practices

- MUST NOT 将 Chromium 兼容性直接等同所有浏览器兼容性。
- MUST NOT 将模拟器测试等同真实设备测试。
- MUST NOT 隐藏已知的关键兼容问题。
- MUST NOT 无依据宣布支持全部设备。

## 8. AI Execution Rules

AI 必须报告实际测试的浏览器和设备版本；未测试的环境标记 NOT_VERIFIED。

## 9. Verification

浏览器矩阵、设备矩阵、核心场景和降级测试。

## 10. Acceptance Criteria

支持范围明确，关键设备覆盖，兼容问题可追踪。

## 11. Exceptions

低使用率设备可按风险制定有限支持策略。

## 12. References

MDN Browser Compatibility Data、各平台官方兼容性资料。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
