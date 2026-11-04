# UAES-03-007 — Knowledge Conflict Resolution

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-007 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

检测和解决不同来源之间的事实、规范、版本和约束冲突。

## 2. Conflict Types

- FACT_CONFLICT
- VERSION_CONFLICT
- REQUIREMENT_CONFLICT
- POLICY_CONFLICT
- ARCHITECTURE_CONFLICT
- DESIGN_CONFLICT
- SOURCE_CONFLICT
- TEMPORAL_CONFLICT
- SCOPE_CONFLICT

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-007-M001 | 冲突 MUST 生成唯一 Conflict ID。 |
| UAES-03-007-M002 | 冲突 MUST 记录双方或多方来源。 |
| UAES-03-007-M003 | 冲突 MUST 记录影响范围和风险。 |
| UAES-03-007-M004 | AI MUST NOT 静默覆盖其中一个来源。 |
| UAES-03-007-M005 | 治理和权限冲突按 P00/P01 处理。 |
| UAES-03-007-M006 | 产品业务规则冲突交由 P02 责任方确认。 |
| UAES-03-007-M007 | 架构决策冲突交由 P04 ADR 流程处理。 |
| UAES-03-007-M008 | 设计规范冲突交由 P05 处理。 |
| UAES-03-007-M009 | 冲突解决 MUST 保留决定者、依据和时间。 |
| UAES-03-007-M010 | 未解决的关键冲突 MUST 阻断依赖该知识的高风险任务。 |

## 4. Resolution Process

```
DETECTED → CLASSIFIED → IMPACT_ASSESSED → OWNER_ASSIGNED → RESOLUTION_PROPOSED → APPROVED → RESOLVED → VERIFIED
```

也可标记为 `DEFERRED`，但必须记录风险和临时处理限制。

## 5. Acceptance

使用用户指令与仓库事实冲突、旧规范与新规范冲突、不同版本 API 文档冲突等案例测试冲突检测和升级流程。

## 6. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
