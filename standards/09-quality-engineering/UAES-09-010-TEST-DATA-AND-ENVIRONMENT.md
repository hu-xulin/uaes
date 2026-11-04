# UAES-09-010 — Test Data and Environment

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-010 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-01, UAES-10 |

## 1. Purpose

确保测试数据和测试环境安全、可重复、可隔离、可清理，避免测试相互污染或影响真实业务。

## 2. Environment Classification

- **LOCAL**：开发者本地环境。
- **CI**：自动化持续集成环境。
- **TEST**：共享测试环境。
- **STAGING**：预发布环境。
- **PRODUCTION**：生产环境。

环境之间必须明确隔离。PRODUCTION 不得作为普通自动化测试环境。

## 3. Test Data Classification

测试数据分为：

- **SYNTHETIC**：人工生成数据。
- **FIXTURE**：固定测试样本。
- **MASKED**：经过合规脱敏的数据。
- **ANONYMIZED**：经过匿名化处理的数据。
- **RESTRICTED**：受限数据，不得默认用于测试。

优先使用 SYNTHETIC 和 FIXTURE。

## 4. Mandatory Requirements

- **QE-DATA-001 MUST**：测试数据必须有来源和分类。
- **QE-DATA-002 MUST**：不得将真实用户密码、Token、API Key、支付凭证或密钥写入测试 Fixture。
- **QE-DATA-003 MUST**：测试账号必须与真实用户账号隔离。
- **QE-DATA-004 MUST**：测试结束后必须执行清理或说明保留原因。
- **QE-DATA-005 MUST**：测试数据必须支持重复执行或可重新生成。
- **QE-DATA-006 MUST**：测试环境不得复用生产支付密钥和真实商户配置。
- **QE-DATA-007 MUST**：涉及个人数据时必须遵守 P10 数据保护要求。
- **QE-DATA-008 SHOULD**：对关键测试建立版本化 Fixture。

## 5. Environment Manifest

每次测试必须记录：

- Environment ID。
- Environment Type。
- Application Version。
- Commit SHA。
- Runtime Version。
- Database Type / Version。
- Redis Version（适用时）。
- Configuration Profile ID。
- Test Data Set ID。
- External Dependencies。
- Network Conditions（适用时）。
- Cleanup Status。

不得将秘密值直接写入 Manifest，只能引用受控 Secret ID 或环境变量名称。

## 6. Environment Drift

测试环境发生变化时必须记录：

- 变更内容。
- 变更时间。
- Owner。
- 影响的测试。
- 是否需要重新执行基线测试。

## 7. AI Execution Rules

AI MUST：

- 先确认目标环境。
- 不得将测试数据写入生产系统。
- 不得将真实密钥复制到测试配置。
- 不得擅自修改共享环境配置。
- 清理失败时报告残留资源。

## 8. Acceptance Criteria

- 环境可识别。
- 测试数据可追踪。
- 敏感数据不进入普通测试样本。
- 测试环境与生产环境隔离。
- 测试结束有清理证据。

## 9. References

UAES-01 AI Data Governance、UAES-03 Knowledge Security、UAES-10 Security & Reliability。

## 10. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Test Data and Environment Standard |
