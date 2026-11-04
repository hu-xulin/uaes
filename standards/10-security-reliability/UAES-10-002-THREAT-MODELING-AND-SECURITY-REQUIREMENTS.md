# UAES-10-002 — Threat Modeling and Security Requirements

| Field | Value |
| --- | --- |
| ID | UAES-10-002 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

以系统化威胁建模识别攻击面、信任边界、滥用路径和安全需求。

## 2. Threat Model Requirements

每个 Threat Model MUST 包含：

1. 基本信息：Model ID、系统、版本、Owner、日期。
2. 系统范围：组件、服务、接口、数据存储和第三方。
3. 资产：数据、凭据、业务权益、可用性和完整性。
4. 参与者：匿名用户、认证用户、管理员、内部服务、第三方和攻击者。
5. 数据流：来源、目的地、协议、数据类型和信任级别。
6. 信任边界：网络、进程、租户、权限、环境和供应链边界。
7. 威胁：攻击前提、攻击路径、影响和可利用条件。
8. 控制：预防、检测、响应和恢复措施。
9. 验证：测试用例、证据和残余风险。
10. 审批：评审人、状态和复审触发条件。

## 3. Threat Identification

采用 STRIDE 作为威胁识别辅助模型：

- **S**poofing：身份伪造。
- **T**ampering：数据篡改。
- **R**epudiation：抵赖。
- **I**nformation Disclosure：信息泄漏。
- **D**enial of Service：拒绝服务。
- **E**levation of Privilege：权限提升。

STRIDE 是识别方法，不是完整风险评分。

## 4. Mandatory Threat Scenarios

必须评估：

- 跨用户读取或修改数据；
- 越权访问管理接口；
- Session/Token 被盗或重放；
- API Key 泄漏；
- SQL/命令/模板/路径注入；
- SSRF 和内部网络探测；
- Webhook 伪造、重放、乱序；
- 依赖投毒、构建产物篡改；
- Electron IPC 越权；
- Redis/数据库暴露；
- 恶意文件和反序列化输入；
- 资源耗尽和级联故障；
- 支付回调伪造、重复到账、金额篡改；
- Agent Prompt Injection、工具越权和敏感数据外泄。

## 5. Risk Evaluation

每个威胁 MUST 记录：

- Likelihood：可能性；
- Impact：影响；
- Exploitability：可利用性；
- Exposure：暴露面；
- Existing Controls：现有控制；
- Residual Risk：残余风险；
- Risk Owner：责任人。

不得将 CVSS 分数直接等同于业务风险。业务风险必须考虑资产价值、暴露范围、攻击条件和业务影响。

## 6. Change Triggers

系统边界、认证方式、数据流、第三方依赖、部署拓扑、权限模型和关键业务状态机发生变化时 MUST 更新 Threat Model。

## 7. Acceptance

所有 S3/S4 威胁必须有已验证的处理措施，或经过有权限人员批准的有效例外。关键威胁未分析、未分配 Owner 或没有处理计划时，Gate 必须 BLOCK。
