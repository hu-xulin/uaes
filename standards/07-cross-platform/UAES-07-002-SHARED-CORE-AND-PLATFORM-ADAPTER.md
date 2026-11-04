# UAES-07-002 — Shared Core and Platform Adapter

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-002 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规定共享业务核心与平台适配层之间的职责和依赖关系。

## 2. Scope

领域逻辑、应用服务、API Client、存储、文件、通知、系统权限和设备能力。

## 3. Definitions

- Shared Core：跨平台共享的业务和应用能力。
- Adapter：平台专属能力实现。
- Port：核心模块定义的能力接口。
- Capability Provider：平台能力提供者。

## 4. Core Principles

依赖抽象而非平台实现；共享业务语义，不强制共享 UI；平台能力通过契约暴露。

## 5. Mandatory Requirements

- UAES-07-002-001 MUST 明确 Shared Core 的职责。
- UAES-07-002-002 MUST 明确每项平台能力的接口。
- UAES-07-002-003 MUST 由平台 Adapter 实现平台接口。
- UAES-07-002-004 MUST 防止 Shared Core 直接依赖平台 SDK。
- UAES-07-002-005 MUST 为 Adapter 定义错误和能力缺失语义。
- UAES-07-002-006 MUST 对关键业务规则保持单一权威来源。
- UAES-07-002-007 MUST 允许不同平台独立实现 UI。
- UAES-07-002-008 MUST 为共享模块定义平台兼容性范围。

## 6. Implementation Rules

建议依赖方向：

```
Platform UI
    ↓
Application Use Cases
    ↓
Domain Core
    ↑
Platform Adapter implements Core Ports
```

平台接口应围绕业务所需能力设计，例如：

- SecureStorage
- FilePicker
- NotificationProvider
- BrowserLauncher
- DeviceCapabilityProvider
- NetworkStatusProvider
- ClipboardProvider

不得为了抽象而创建无实际消费者的接口。

## 7. Prohibited Practices

- MUST NOT 在领域模型中直接调用 window、Node.js、Android 或 iOS API。
- MUST NOT 通过大量 `if (platform === ...)` 分散处理平台差异。
- MUST NOT 让 Adapter 重新实现核心业务规则。
- MUST NOT 为追求复用而引入复杂的跨平台通用框架。

## 8. AI Execution Rules

AI 必须先识别能力归属；若能力属于平台，应实现或调用 Adapter，不得将平台代码直接塞入 Shared Core。

## 9. Verification

依赖边界检查、平台模拟测试和 Adapter Contract 测试。

## 10. Acceptance Criteria

依赖方向清晰，核心模块不依赖平台 SDK，Adapter 实现完整。

## 11. Exceptions

特殊平台能力可以提供独立扩展接口，但必须记录平台范围。

## 12. References

UAES-04、UAES-06、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
