# UAES-07-GATE-001 — Cross-Platform Engineering Quality Gate

**Gate ID:** UAES-07-GATE-001  
**Version:** 1.0.0  
**Status:** DRAFT  
**Owner:** UAES Quality Engineering  
**Scope:** All cross-platform changes  
**Phase:** P5  
**Related Baseline:** UAES-P5-ACCEPTANCE-BASELINE

---

## 1. Gate Objectives

确保跨平台实现具备：

- 明确的平台目标和支持声明
- 合理的共享代码与平台适配边界
- 一致的 API 和业务行为
- 完整的生命周期与权限处理
- 可靠的构建、测试和兼容性证据
- 可追溯的发布产物

## 2. Gate Severity

- **BLOCKER**：必须阻止交付。
- **CRITICAL**：必须修复或经正式风险审批。
- **MAJOR**：原则上必须修复；例外必须记录。
- **MINOR**：可进入后续计划，但必须登记。
- **INFO**：提示和改进建议。

## 3. Gate Checks

### G01 — Platform Declaration

- 检查目标平台是否声明。
- 检查平台状态是否真实。
- 检查最低系统版本和运行环境。
- 检查目标设备形态。

**失败条件**：平台声明缺失，或将未实现平台标记为 supported。

### G02 — Capability Declaration

- 检查所使用的设备能力是否登记。
- 检查 conditional 能力是否存在运行时检测。
- 检查 unsupported / unknown 是否有降级策略。

**失败条件**：关键流程依赖未确认能力。

### G03 — Architecture Boundary

- 检查 Domain 是否依赖平台 UI 或系统 API。
- 检查共享模块是否引入平台专属依赖。
- 检查平台差异是否通过 Adapter 隔离。
- 检查跨平台循环依赖。

**失败条件**：出现未经批准的跨层依赖或平台泄漏。

### G04 — API and Business Consistency

- 检查 API Contract。
- 检查错误码和状态映射。
- 检查关键业务规则是否一致。
- 检查重复提交、幂等和服务端状态确认。

**失败条件**：同一业务操作在不同平台产生不一致的业务结果。

### G05 — Lifecycle and Recovery

- 检查后台、前台、进程终止和恢复。
- 检查网络切换。
- 检查重复回调。
- 检查页面重建和窗口尺寸变化。
- 检查关键状态持久化。

**失败条件**：关键业务状态丢失、重复执行或错误恢复。

### G06 — Permission and Security

- 检查权限是否最小化。
- 检查拒绝、撤销和受限状态。
- 检查敏感信息存储。
- 检查原生桥接权限边界。
- 检查密钥是否泄露到客户端。

**失败条件**：存在越权、敏感密钥暴露或未经授权的系统能力访问。

### G07 — UI and Interaction

- 检查 UAES-05 合规性。
- 检查响应式和自适应布局。
- 检查触控、键盘和辅助技术。
- 检查安全区、软键盘和方向变化。
- 检查平台原生交互是否合理。

**失败条件**：关键操作不可完成、布局严重破坏或存在阻断级无障碍问题。

### G08 — Build and Dependency

- 检查目标平台构建。
- 检查平台专属依赖。
- 检查最低版本兼容性。
- 检查签名和环境配置。
- 检查构建产物来源。

**失败条件**：目标平台无法构建，或构建产物不可追溯。

### G09 — Test Evidence

- 检查单元测试、契约测试和集成测试。
- 检查目标平台关键旅程。
- 检查异常与恢复测试。
- 检查真实设备与模拟器测试类型。
- 检查视觉回归证据。

**失败条件**：P0/P1 关键流程缺少必要验证。

### G10 — Compatibility Matrix

- 检查兼容性矩阵是否更新。
- 检查测试版本是否与声明一致。
- 检查未测试平台是否标记 NOT_TESTED。
- 检查不支持平台是否明确。

**失败条件**：兼容性声明缺少证据或与实际结果冲突。

### G11 — Documentation and Traceability

- 检查变更是否关联需求。
- 检查平台影响分析。
- 检查变更记录和风险。
- 检查测试证据是否可追溯。

**失败条件**：无法确定改动影响的平台和业务范围。

## 4. Gate Decision

允许的结果：

- **PASS**：全部强制检查通过。
- **PASS_WITH_RISK**：不存在 BLOCKER，剩余风险有责任人、措施和批准记录。
- **FAIL**：存在未解决的阻断问题。
- **BLOCKED**：缺少执行条件或外部依赖。
- **NOT_APPLICABLE**：该变更经证明不涉及跨平台工程要求。

不得将 NOT_RUN 或 NOT_VERIFIED 自动视为 PASS。

## 5. Risk Acceptance

任何例外必须记录：

- Finding ID
- Severity
- Affected Platforms
- Business Impact
- Technical Impact
- Mitigation
- Owner
- Expiration Date
- Approval Evidence

安全、支付、认证、隐私和数据完整性相关 BLOCKER 不得通过普通风险豁免放行。

## 6. Required Evidence

每次 Gate 执行必须输出：

1. Commit SHA
2. Changed Files
3. Affected Platforms
4. Platform Manifest
5. Capability Matrix
6. Compatibility Matrix
7. Build Results
8. Test Results
9. Security Results
10. Visual Regression Results
11. Findings
12. Accepted Risks
13. Gate Decision

## 7. Automation Requirements

建议实现以下自动化检查：

- JSON Schema validation
- Platform manifest completeness
- Dependency boundary validation
- Platform-specific dependency validation
- API contract validation
- Build matrix
- Test matrix
- Secret scanning
- License and vulnerability scanning
- Visual regression
- Compatibility matrix validation

## 8. Enforcement

- P0/P1 BLOCKER：禁止合并。
- 安全、认证、支付和数据完整性 CRITICAL：禁止合并，除非完成规定的安全审批。
- MAJOR：必须修复或经授权风险接受。
- MINOR：登记后可按项目策略处理。
- INFO：不阻断。

## 9. Gate Ownership

Quality Gate 的检查逻辑由 Quality Engineering 管理；平台团队负责提供平台构建与测试证据；AI Agent 可以执行检查和修复，但不得伪造证据或自行批准高风险例外。
