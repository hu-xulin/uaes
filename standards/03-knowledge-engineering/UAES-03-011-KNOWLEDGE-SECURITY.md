# UAES-03-011 — Knowledge Security

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-011 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03, UAES-01, UAES-10 |

## 1. Purpose

保护知识库、任务上下文和外部输入，防止提示词注入、数据泄露、恶意知识污染和未授权访问。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-011-M001 | 知识库 MUST 按访问范围执行权限控制。 |
| UAES-03-011-M002 | 密钥、访问令牌和私密凭据 MUST NOT 存入普通知识文档。 |
| UAES-03-011-M003 | 外部内容 MUST 被标记为不可信输入。 |
| UAES-03-011-M004 | 文档中的指令 MUST NOT 覆盖系统、开发者或有效用户授权。 |
| UAES-03-011-M005 | 知识导入 MUST 支持恶意内容检测。 |
| UAES-03-011-M006 | 敏感知识 MUST NOT 被发送到未经批准的模型或服务。 |
| UAES-03-011-M007 | 知识访问 MUST 留下审计记录。 |
| UAES-03-011-M008 | 知识导出 MUST 检查敏感信息。 |
| UAES-03-011-M009 | 知识删除和保留 MUST 遵循适用的数据治理政策。 |

## 3. Threat Scenarios

- Prompt Injection（提示词注入）
- Data Poisoning（数据投毒）
- Secret Exfiltration（密钥外泄）
- Cross-Project Leakage（跨项目泄露）
- Malicious File Content（恶意文件内容）
- Unauthorized Knowledge Export（未授权知识导出）
- Context Manipulation（上下文操纵）
- Stale Policy Injection（过期策略注入）

## 4. Acceptance

通过恶意网页、文档指令、伪造规范、密钥诱导、跨项目数据访问和越权导出等负面测试。

## 5. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
