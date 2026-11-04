# UAES-09-011 — Flaky Test and Test Maintenance

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-011 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-11 |

## 1. Purpose

识别、管理和消除 Flaky Tests，防止测试系统本身成为错误质量信号的来源。

## 2. Definition

Flaky Test 指在相同代码、输入和等效环境下，结果不稳定且无法由产品代码的确定性变化解释的测试。

## 3. Detection

必须监测：

- 相同 Commit 的重复执行差异。
- 重试后成功但首次失败。
- 并行与串行结果差异。
- 时间、时区和随机数依赖。
- 网络和外部服务依赖。
- 资源竞争。
- 测试数据污染。
- 环境状态差异。

## 4. Lifecycle

```
DETECTED → TRIAGED → ROOT_CAUSE_ANALYSIS → FIX_IN_PROGRESS → VERIFYING → STABLE
```

补充状态：

- **QUARANTINED**：临时隔离。
- **WONT_FIX**：有批准的风险接受。
- **REOPENED**：再次出现不稳定。

## 5. Quarantine Policy

- **QE-FLAKY-001 MUST**：隔离测试必须有 Owner、原因、影响范围和修复期限。
- **QE-FLAKY-002 MUST**：隔离不得从测试报告中隐藏。
- **QE-FLAKY-003 MUST**：关键业务测试不得仅因不稳定而永久跳过。
- **QE-FLAKY-004 MUST**：隔离测试不得计入 PASS。
- **QE-FLAKY-005 MUST**：修复后必须执行重复验证。

## 6. Retry Policy

重试只能用于诊断或受控的恢复机制，不得通过重试掩盖不稳定。

测试报告必须记录：

- 首次结果。
- 重试次数。
- 每次结果。
- 最终结果。
- 重试原因。

首次失败且重试成功时，结果不得直接记为 PASS，应标记 FLAKY 或相应的质量状态，并触发处理流程。

## 7. Maintenance

定期检查：

- 长期跳过的测试。
- 无断言测试。
- 重复测试。
- 过时 Fixture。
- 过期视觉基线。
- 无 Owner 的测试。
- 执行时间异常增长。
- 测试依赖版本漂移。

## 8. AI Execution Rules

AI MUST：

- 保留首次失败证据。
- 不得擅自删除或永久隔离测试。
- 优先修复根因。
- 修改测试后验证其断言仍然有效。
- 不得通过扩大超时掩盖资源泄漏或死锁。

## 9. Acceptance Criteria

- Flaky Test 有独立生命周期。
- 隔离记录可追踪。
- 首次失败不会被重试掩盖。
- 关键测试不能无期限跳过。
- 测试维护结果可审计。

## 10. References

Google Testing Blog、ISTQB CTFL v4.0.1、UAES-11 CI/CD。

## 11. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Flaky Test and Test Maintenance Standard |
