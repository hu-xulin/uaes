# UAES-07-006 — Native Android & iOS Integration

**Standard ID:** UAES-07-006  
**Standard Name:** Native Android & iOS Integration  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 原生模块、系统 API、平台集成  
**Classification:** Enterprise Engineering Standard

---

## 1. Android

- **NAT-001**：遵守 Android 应用生命周期和进程回收机制。
- **NAT-002**：不得把 Activity 或 View 作为长期业务状态的唯一存储。
- **NAT-003**：权限申请必须遵守 Android 运行时权限模型。
- **NAT-004**：支持配置变化、窗口变化和多窗口场景。
- **NAT-005**：后台任务必须使用系统允许的执行机制。
- **NAT-006**：签名、包名、Manifest 和构建变体必须受控。

## 2. iOS

- **NAT-007**：遵守 iOS App / Scene 生命周期。
- **NAT-008**：权限申请必须说明真实用途并处理拒绝状态。
- **NAT-009**：后台执行必须遵守系统授权和调度约束。
- **NAT-010**：Keychain 等安全存储必须通过安全抽象访问。
- **NAT-011**：URL Scheme、Universal Links 和回调处理必须验证来源。
- **NAT-012**：Bundle ID、Entitlements、签名证书和 Provisioning Profile 必须受控。

## 3. Native Integration

- **NAT-013**：跨端调用原生能力 MUST 使用明确桥接接口。
- **NAT-014**：桥接接口 MUST 校验参数、调用权限和返回结果。
- **NAT-015**：桥接错误 MUST 映射为统一错误模型。
- **NAT-016**：不得向不可信 Web 内容开放任意原生方法。
