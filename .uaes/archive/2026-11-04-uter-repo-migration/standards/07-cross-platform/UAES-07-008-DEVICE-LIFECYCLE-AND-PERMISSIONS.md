# UAES-07-008 — Device Lifecycle & Permissions

**Standard ID:** UAES-07-008  
**Standard Name:** Device Lifecycle & Permissions  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 生命周期、权限、存储、网络  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **LIFE-001**：关键业务状态 MUST 具备可恢复机制。
- **LIFE-002**：页面状态和持久业务状态 MUST 区分。
- **LIFE-003**：进程终止后 MUST 能恢复关键业务上下文。
- **LIFE-004**：网络切换 MUST 不导致重复提交或状态错乱。
- **LIFE-005**：权限 MUST 按需申请。
- **LIFE-006**：权限拒绝 MUST 有替代路径或明确阻断提示。
- **LIFE-007**：权限撤销 MUST 能被识别。
- **LIFE-008**：后台执行 MUST 遵守系统约束。
- **LIFE-009**：敏感数据 MUST 加密或使用平台安全存储。
- **LIFE-010**：登出 MUST 清理本地认证状态和敏感缓存。
- **LIFE-011**：本地缓存不得作为服务端权威状态。
- **LIFE-012**：重复事件、恢复事件和回调 MUST 具备幂等保护。
