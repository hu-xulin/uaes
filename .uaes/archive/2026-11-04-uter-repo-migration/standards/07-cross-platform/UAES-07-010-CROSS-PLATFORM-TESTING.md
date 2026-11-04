# UAES-07-010 — Cross-Platform Testing

**Standard ID:** UAES-07-010  
**Standard Name:** Cross-Platform Testing  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 契约、设备、端到端和回归测试  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **TEST-001**：共享业务逻辑 MUST 执行单元测试。
- **TEST-002**：API Contract MUST 执行契约测试。
- **TEST-003**：平台适配层 MUST 执行平台测试。
- **TEST-004**：关键用户旅程 MUST 执行端到端测试。
- **TEST-005**：关键页面 MUST 执行视觉回归。
- **TEST-006**：生命周期和权限异常 MUST 有测试场景。
- **TEST-007**：网络断开、超时和恢复 MUST 有测试场景。
- **TEST-008**：不同屏幕尺寸和设备形态 MUST 有测试场景。
- **TEST-009**：发布构建 MUST 在 CI 中验证。
- **TEST-010**：测试结果 MUST 标注平台、设备、OS、版本和证据。
- **TEST-011**：未实际执行的测试 MUST 标记 NOT_RUN。
- **TEST-012**：模拟器测试不得冒充真实设备测试。
