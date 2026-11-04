# UAES-07-003 — Shared Code & Boundaries

**Standard ID:** UAES-07-003  
**Standard Name:** Shared Code & Boundaries  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 共享代码、领域逻辑和适配层  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **SHARED-001**：Domain Model MUST 不依赖具体 UI 框架。
- **SHARED-002**：业务状态机 MUST 由统一规则定义。
- **SHARED-003**：API DTO MUST 以统一契约为依据。
- **SHARED-004**：平台系统 API MUST 经 Adapter 封装。
- **SHARED-005**：平台 UI 不得直接访问其他平台的运行时 API。
- **SHARED-006**：共享模块不得引入平台专属依赖。
- **SHARED-007**：共享模块必须声明稳定的输入、输出和错误模型。
- **SHARED-008**：跨平台共享逻辑必须进行契约测试。

## 2. Sharing Strategy

### 2.1 优先共享

1. API Contract
2. Domain Model
3. Business Rules
4. Validation Rules
5. State Machine
6. Error Mapping
7. Localization Resources
8. Design Tokens
9. Test Fixtures

### 2.2 按需共享

1. UI Components
2. Navigation
3. Device Services
4. Persistence
5. Notifications
6. File Handling

### 2.3 通常独立实现

1. Native System UI
2. Platform Permission Dialog
3. Platform Lifecycle Integration
4. Platform-specific Background Tasks
5. Platform-specific Payment SDK Integration
