# UAES-03-002 — Knowledge Source and Provenance

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-002 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

建立知识来源和证据链管理规则，确保重要结论可以回溯到原始材料及其处理过程。

## 2. Source Types

- **USER**：用户明确指令或确认。
- **REPOSITORY**：仓库文件、Commit、Tag、代码和配置。
- **STANDARD**：正式标准和规范。
- **OFFICIAL**：官方产品或技术文档。
- **EXTERNAL**：第三方文章、讨论和其他网页。
- **TOOL**：工具执行结果。
- **TEST**：测试、扫描和 CI 证据。
- **GENERATED**：AI 生成的摘要、分析和派生知识。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-002-M001 | 重要知识 MUST 关联至少一个来源。 |
| UAES-03-002-M002 | 仓库来源 MUST 记录仓库和 Commit SHA。 |
| UAES-03-002-M003 | 外部网页 MUST 记录 URL 和访问时间。 |
| UAES-03-002-M004 | 工具结果 MUST 记录工具名称、执行时间和结果标识。 |
| UAES-03-002-M005 | 测试结论 MUST 关联测试命令、环境和结果。 |
| UAES-03-002-M006 | 派生知识 MUST 保留上游来源。 |
| UAES-03-002-M007 | 引用失效时 MUST 标记来源不可访问。 |
| UAES-03-002-M008 | 来源本身不自动代表可信，必须进行可信度评估。 |

## 4. Provenance Model

知识来源链应支持：

```
Source → Collection Activity → Transformation → Knowledge Item → Verification
```

每个节点应可关联唯一 ID、责任主体、时间和版本。

## 5. Prohibited Practices

- 不得伪造引用。
- 不得把未执行的测试写成测试证据。
- 不得把 AI 摘要伪装成原始官方资料。
- 不得仅凭文件名推断文件内容。
- 不得仅凭旧 Commit 推断当前代码状态。

## 6. Acceptance

抽样知识必须能够从结论追溯到来源、处理过程和验证证据。

## 7. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
