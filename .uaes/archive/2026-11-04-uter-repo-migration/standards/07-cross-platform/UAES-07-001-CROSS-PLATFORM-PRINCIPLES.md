# UAES-07-001 — Cross-Platform Principles

**Standard ID:** UAES-07-001  
**Standard Name:** Cross-Platform Principles  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 跨平台原则、架构分层、平台边界  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **CP-001**：所有跨平台项目 MUST 声明目标平台和支持范围。
- **CP-002**：业务逻辑与平台表现 MUST 分离。
- **CP-003**：平台差异 MUST 通过明确适配边界处理。
- **CP-004**：共享代码 MUST 有独立测试。
- **CP-005**：平台专属实现 MUST 有对应平台验证。
- **CP-006**：代码复用率不得成为牺牲平台体验的理由。
- **CP-007**：不得将未经验证的平台列入正式支持范围。
