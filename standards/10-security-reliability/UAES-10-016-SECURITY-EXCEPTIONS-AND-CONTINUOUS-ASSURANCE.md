# UAES-10-016 — Security Exceptions and Continuous Assurance

| Field | Value |
| --- | --- |
| ID | UAES-10-016 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范安全例外、持续安全验证、控制漂移和定期复核。

## 2. Exception Requirements

每个例外必须记录：

- Exception ID；
- Control ID；
- Reason；
- Affected Assets；
- Risk Level；
- Compensating Controls；
- Owner；
- Approver；
- Created At；
- Expiry；
- Review Date；
- Revocation Condition。

例外必须有到期时间，不得永久豁免关键安全控制。

## 3. Continuous Assurance

- 依赖漏洞持续监控；
- Secret 泄漏持续监控；
- 关键配置漂移检查；
- 权限和账户定期复核；
- SBOM 更新和漏洞关联；
- 关键安全日志告警；
- 关键备份和恢复演练；
- Threat Model 随架构变化更新。

## 4. Drift Management

实际配置偏离批准的安全基线时必须：

1. 识别偏差；
2. 评估风险；
3. 记录证据；
4. 修复或申请例外；
5. 重新验证；
6. 关闭漂移记录。

## 5. Acceptance

例外均可追踪且未过期；关键控制定期复核；配置漂移有检测和处理证据。
