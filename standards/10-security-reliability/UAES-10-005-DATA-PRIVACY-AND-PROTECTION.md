# UAES-10-005 — Data Privacy and Protection

| Field | Value |
| --- | --- |
| ID | UAES-10-005 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Data Classification

数据至少分为：

- PUBLIC
- INTERNAL
- CONFIDENTIAL
- RESTRICTED

每类数据必须定义访问、传输、存储、日志、导出、备份、保留和删除规则。

## 2. Data Minimization

- 只收集实现业务目的所需的数据。
- 不得为了调试而长期保存不必要的用户输入、模型内容、认证信息或支付数据。
- 日志使用脱敏、截断、哈希或不可逆标识替代敏感原文。
- 测试优先使用合成数据。

## 3. Data at Rest and in Transit

- 外部通信必须使用受支持的 TLS 配置。
- 敏感静态数据必须采用适当的加密保护。
- 加密密钥与被加密数据必须分离管理。
- 数据库备份、对象存储和导出文件必须有访问控制。

## 4. Data Lifecycle

必须定义：

- Collection；
- Processing；
- Storage；
- Sharing；
- Retention；
- Export；
- Deletion；
- Backup Expiry。

数据删除策略必须考虑备份保留和法律/业务约束，不能虚假承诺即时从所有备份中物理消失。

## 5. Privacy by Design

涉及个人信息的处理 MUST 明确目的、最小范围、访问主体、保存期限和删除机制。跨境、第三方共享和敏感信息处理应根据适用法律法规进行专项评估。

## 6. Acceptance

数据资产均有分类和生命周期策略；生产数据访问可审计；测试环境不存在未经批准的生产数据副本。
