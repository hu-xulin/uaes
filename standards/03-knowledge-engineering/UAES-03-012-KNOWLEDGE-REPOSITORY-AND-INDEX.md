# UAES-03-012 — Knowledge Repository and Index

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-012 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

统一知识文件的目录、命名、元数据、索引、版本和引用机制。

## 2. Repository Requirements

知识目录建议：

- `knowledge/project/`：项目事实和上下文。
- `knowledge/product/`：产品知识。
- `knowledge/business/`：业务规则。
- `knowledge/architecture/`：架构知识索引。
- `knowledge/design/`：设计知识索引。
- `knowledge/engineering/`：工程知识。
- `knowledge/operations/`：运维知识。
- `knowledge/external/`：外部知识。
- `knowledge/reports/`：分析和验证报告。
- `knowledge/index/`：机器可读索引。

具体文件归属必须服从对应领域标准。P03 只管理知识元数据和索引，不应把 P04 的 ADR、P05 的设计 Token 或 P09 的测试报告重复复制到另一处作为第二事实源。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-012-M001 | 每个知识文件 MUST 有唯一 ID 或稳定路径标识。 |
| UAES-03-012-M002 | 机器可读知识 MUST 有 Schema。 |
| UAES-03-012-M003 | 索引 MUST 能定位原始文件。 |
| UAES-03-012-M004 | 文件重命名 MUST 更新索引和引用。 |
| UAES-03-012-M005 | 知识版本 MUST 可追踪。 |
| UAES-03-012-M006 | 重复内容 MUST 优先使用引用而非复制。 |
| UAES-03-012-M007 | 索引生成 MUST 可重复执行。 |
| UAES-03-012-M008 | 索引失效 MUST 被质量门禁发现。 |

## 4. Acceptance

通过文件移动、重命名、删除、版本更新和引用断裂测试，确保索引能够保持一致。

## 5. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
