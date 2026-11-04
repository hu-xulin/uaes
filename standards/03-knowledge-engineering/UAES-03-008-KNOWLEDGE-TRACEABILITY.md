# UAES-03-008 — Knowledge Traceability

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-008 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

建立知识对象之间的双向关系，使项目能够回答某项需求、设计、实现或测试结论依据了哪些知识，以及某条知识影响了哪些工程资产。

## 2. Relationship Types

- DERIVED_FROM
- REFERENCES
- IMPLEMENTS
- VALIDATES
- SUPERSEDES
- CONFLICTS_WITH
- DEPENDS_ON
- GENERATED_FROM
- VERIFIED_BY
- AFFECTS

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-008-M001 | 重要知识关系 MUST 具有唯一关系记录。 |
| UAES-03-008-M002 | 关系 MUST 指向可识别的源对象和目标对象。 |
| UAES-03-008-M003 | 关键业务规则 MUST 能追踪到需求和验收条件。 |
| UAES-03-008-M004 | 架构决策 MUST 能追踪到背景、证据和相关模块。 |
| UAES-03-008-M005 | 测试结论 MUST 能追踪到需求或风险。 |
| UAES-03-008-M006 | 知识被替代时 MUST 更新 SUPERSEDES 关系。 |
| UAES-03-008-M007 | 删除知识时 MUST 检查引用方。 |

## 4. Acceptance

必须能够生成需求—业务规则—架构决策—实现—测试—证据的追踪视图，并发现断裂关系。

## 5. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
