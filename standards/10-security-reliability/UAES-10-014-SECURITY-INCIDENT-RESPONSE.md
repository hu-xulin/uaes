# UAES-10-014 — Security Incident Response

| Field | Value |
| --- | --- |
| ID | UAES-10-014 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立安全事件检测、分级、遏制、调查、恢复和复盘流程。

## 2. Incident Classification

- **SEV-1**：重大数据泄露、生产密钥泄漏、资金安全事件、广泛系统失陷。
- **SEV-2**：关键系统受攻击、重要用户数据暴露、严重权限绕过。
- **SEV-3**：局部安全事件、受限影响的漏洞利用。
- **SEV-4**：可疑活动、低影响事件或待确认告警。

安全事件 SEV 与 P01 的 AI 事故风险等级独立映射，不得混为同一套分类。

## 3. Response Lifecycle

DETECT → TRIAGE → CLASSIFY → NOTIFY → CONTAIN → PRESERVE EVIDENCE → INVESTIGATE → ERADICATE → RECOVER → VERIFY → POSTMORTEM。

## 4. Mandatory Actions

- 保留原始日志、时间线、相关请求 ID 和证据摘要。
- 对泄漏凭据及时撤销、轮换。
- 隔离受影响服务或访问路径。
- 判断数据、用户、资金和第三方影响。
- 记录所有遏制和恢复操作。
- 依法依规完成必要通知和报告。
- 不得未经授权删除证据或对外发布未经确认的结论。

## 5. Communication

每个事件必须指定 Incident Commander 或等效负责人。对外沟通由授权人员负责；工程人员不得自行承诺赔偿、法律责任或监管结论。

## 6. Postmortem

复盘必须包括：

- 时间线；
- 根因；
- 促成因素；
- 影响；
- 检测缺口；
- 遏制效果；
- 修复项；
- 责任人和期限；
- 防止复发的验证。

## 7. Acceptance

事件响应流程有责任人、联系方式和操作手册；至少完成一次桌面演练；高风险事件处置记录可审计。
