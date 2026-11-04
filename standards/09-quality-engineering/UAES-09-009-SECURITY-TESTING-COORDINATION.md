# UAES-09-009 — Security Testing Coordination

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-009 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-10, UAES-01, UAES-11 |

## 1. Purpose

定义 P09 与 P10 的安全测试协同关系，确保安全验证进入质量生命周期，同时避免重复建立安全治理规范。

## 2. Ownership Boundary

- **P10**：定义安全要求、威胁模型、安全控制、风险处置和安全验收基线。
- **P09**：定义安全测试如何计划、执行、记录、关联 Finding 和进入 Quality Gate。
- **P11**：负责在 CI/CD 中编排和运行适用安全检查。
- **P01**：负责 AI 执行安全测试所需的权限和审批。

## 3. Security Test Categories

按 P10 风险模型和适用范围执行：

- SAST。
- SCA。
- Secret Scanning。
- Container / Artifact Scanning（适用时）。
- DAST。
- API Security Testing。
- Authentication / Authorization Testing。
- Input Validation / Injection Testing。
- Electron Security Testing。
- Dependency and Supply Chain Verification。
- Manual Security Review。
- Penetration Testing（需明确授权）。

## 4. Security Finding Integration

安全 Finding 必须关联：

- Security Finding ID。
- P10 控制或风险 ID。
- Task ID。
- Commit SHA。
- 受影响组件。
- 漏洞类型。
- 严重度和可利用性证据。
- 修复计划。
- 修复版本。
- 回归验证结果。

## 5. Mandatory Rules

- **QE-SEC-001 MUST**：安全扫描必须记录工具、规则集、数据库或签名版本及执行时间。
- **QE-SEC-002 MUST**：扫描结果不得只报告总数，必须保留可定位的发现记录。
- **QE-SEC-003 MUST**：Critical / High 安全问题按 P10 的阻断规则处理。
- **QE-SEC-004 MUST**：安全扫描未执行时不得报告安全检查通过。
- **QE-SEC-005 MUST**：渗透测试、主动攻击模拟和故障注入必须先确认测试范围与授权。
- **QE-SEC-006 MUST NOT**：在未授权环境中执行破坏性安全测试。
- **QE-SEC-007 MUST**：误报必须保留证据和复核理由，不得直接删除扫描记录。

## 6. Security Test Gate

P09 只汇总 P10 安全 Gate 的结果，不得自行改变安全风险接受规则。

安全 Gate 未通过时，整体 Quality Gate 按 P10 和 P01 的约束阻断。

## 7. AI Execution Rules

AI MUST：

- 识别扫描和主动测试的区别。
- 不得将扫描无发现描述为系统不存在漏洞。
- 不得自行批准安全风险豁免。
- 对误报和不可复现问题保留记录。
- 不得泄露测试中发现的敏感凭证。

## 8. Acceptance Criteria

- 安全测试与 P10 控制项关联。
- 安全 Finding 可追踪。
- 安全扫描版本和证据可核验。
- 未执行检查不会成为 PASS。
- 主动测试具有授权记录。

## 9. References

- OWASP Web Security Testing Guide：稳定版 4.2；项目正在开发 5.0，采用时必须固定版本和测试场景 ID。
- NIST SSDF：<https://csrc.nist.gov/projects/ssdf>
- UAES-10 Security & Reliability。

## 10. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Security Testing Coordination Standard |
