# UAES-07-006 — Device and Platform API

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-006 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范浏览器、桌面和原生设备能力的访问与适配。

## 2. Scope

文件、剪贴板、通知、相机、麦克风、生物识别、网络状态、系统分享、应用链接和设备权限。

## 3. Definitions

- Device API：平台提供的设备或系统接口。
- Capability Detection：能力检测。
- Permission State：权限状态。
- Adapter Contract：平台适配接口。

## 4. Core Principles

最小权限、显式授权、运行时能力检测、失败可降级。

## 5. Mandatory Requirements

- UAES-07-006-001 MUST 为设备能力定义 Adapter Contract。
- UAES-07-006-002 MUST 在使用前检测能力。
- UAES-07-006-003 MUST 明确权限请求的触发时机。
- UAES-07-006-004 MUST 处理拒绝、撤销和受限状态。
- UAES-07-006-005 MUST 为不支持能力定义降级行为。
- UAES-07-006-006 MUST 对系统 API 错误进行统一映射。
- UAES-07-006-007 MUST 仅请求当前任务必需的权限。
- UAES-07-006-008 MUST 对系统能力访问记录必要审计信息。
- UAES-07-006-009 MUST 将敏感设备权限治理交由 P10 协同管理。

## 6. Implementation Rules

建议能力状态：

- AVAILABLE
- UNAVAILABLE
- PERMISSION_REQUIRED
- PERMISSION_DENIED
- RESTRICTED
- TEMPORARILY_UNAVAILABLE
- UNKNOWN

平台 API 应通过统一接口暴露，但各平台可以有不同实现。

浏览器能力必须考虑安全上下文、浏览器版本和用户授权。

Electron 系统能力必须通过 Main / Preload 的受控接口提供。

原生端必须使用对应平台官方权限机制。

## 7. Prohibited Practices

- MUST NOT 在应用启动时无差别请求所有权限。
- MUST NOT 以 UA 字符串推断权限已授予。
- MUST NOT 绕过系统权限提示。
- MUST NOT 在权限拒绝后无限重复请求。
- MUST NOT 将不支持能力伪装为成功。

## 8. AI Execution Rules

AI 增加设备能力时必须说明权限、平台支持范围、失败行为和替代路径。

## 9. Verification

能力检测、权限拒绝、权限撤销和降级测试。

## 10. Acceptance Criteria

接口明确、权限最小化、失败行为可预测。

## 11. Exceptions

平台限制可通过替代业务流程处理。

## 12. References

MDN Web APIs、Electron API、Android Developers、Apple Developer、HarmonyOS Developer。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
