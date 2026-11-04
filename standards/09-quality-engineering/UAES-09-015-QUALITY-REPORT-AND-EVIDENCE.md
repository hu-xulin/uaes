# UAES-09-015 — Quality Report and Evidence

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-015 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-00, UAES-01, UAES-03, UAES-08 |

## 1. Purpose

定义统一质量报告、测试证据、Review 证据和 Gate 结果格式，确保质量结论可复核、可追溯和可审计。

## 2. Report Requirements

质量报告 MUST 包含：

- Report ID。
- Task ID。
- Repository。
- Base Commit SHA。
- Head Commit SHA。
- Branch。
- 变更范围。
- 需求引用。
- 架构引用。
- 适用标准版本。
- 风险等级。
- Review 结果。
- Test Plan。
- Test Results。
- Coverage。
- Finding 汇总。
- Defect 汇总。
- Security Test Summary。
- Regression Summary。
- Quality Gate Result。
- 未执行检查。
- 阻塞事项。
- 残余风险。
- 结论。
- 证据索引。

## 3. Evidence Types

- SOURCE_DIFF
- TEST_LOG
- TEST_RESULT
- COVERAGE_REPORT
- REVIEW_REPORT
- FINDING_RECORD
- SCREENSHOT
- VIDEO
- TRACE
- PERFORMANCE_REPORT
- SECURITY_SCAN
- ACCESSIBILITY_REPORT
- CI_RUN
- MANUAL_VERIFICATION
- APPROVAL_RECORD

## 4. Evidence Integrity

- **QE-EVD-001 MUST**：证据必须关联 Task ID 和 Head Commit SHA。
- **QE-EVD-002 MUST**：证据必须有来源和生成时间。
- **QE-EVD-003 MUST**：日志和截图不得泄露密钥、密码、用户敏感数据。
- **QE-EVD-004 MUST**：报告不得引用不存在的文件、CI Run、Commit 或 PR。
- **QE-EVD-005 MUST**：证据缺失时明确标记 NOT_VERIFIED。
- **QE-EVD-006 SHOULD**：重要报告保留工具版本、执行命令和环境 Manifest。

## 5. Quality Gate Summary

报告必须汇总：

- Required Checks。
- Passed Checks。
- Failed Checks。
- Blocked Checks。
- Not Run Checks。
- Not Applicable Checks。
- Not Verified Checks。

不能只展示一个绿色状态而隐藏失败或未执行项。

## 6. Report Conclusion

结论只能使用：

- PASS。
- FAIL。
- BLOCKED。
- NOT_RUN。
- NOT_VERIFIED。

允许补充说明和风险摘要，但不能改变结果语义。

## 7. AI Execution Rules

AI MUST：

- 只报告实际执行的命令。
- 保留失败输出和重试记录。
- 区分工具报告与 AI 分析。
- 不得编造 CI 状态、覆盖率或审批。
- 报告证据不足和不确定性。

## 8. Acceptance Criteria

- 质量报告符合 Schema。
- 证据可追溯。
- 结果绑定 Head SHA。
- 未执行和失败项完整披露。
- 报告能够支持独立复核。

## 9. References

UAES-00、UAES-01、UAES-03、UAES-08、UAES-09。

## 10. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Quality Report and Evidence Standard |
