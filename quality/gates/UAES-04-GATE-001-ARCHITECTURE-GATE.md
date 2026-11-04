# UAES-04-GATE-001 — Architecture Quality Gate

| Field | Value |
|---|---|
| Gate ID | UAES-04-GATE-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Type | Blocking Gate |
| Domain | UAES-04 System Architecture |

## 1. Purpose

确保架构决策可追溯、模块边界清晰、接口和数据契约完整、关键质量属性得到验证，并且架构演进符合已批准决策。

## 2. Gate Checks

| ID | 检查项 | 通过条件 |
|---|---|---|
| A-G01 | Architecture Context | 系统范围、上下文和关键约束明确 |
| A-G02 | Requirement Traceability | 架构决策关联有效需求 |
| A-G03 | Knowledge Traceability | 决策依据关联有效知识和来源 |
| A-G04 | ADR Completeness | ADR 必需字段完整 |
| A-G05 | ADR Approval | 决策等级与审批要求一致 |
| A-G06 | ADR Lifecycle | 状态合法，已接受决策不可静默覆盖 |
| A-G07 | Module Boundary | 模块职责、接口、数据所有权明确 |
| A-G08 | Dependency Graph | 依赖合法，不存在未经批准的循环依赖 |
| A-G09 | API Contract | 请求、响应、错误、认证和版本契约完整 |
| A-G10 | Data Architecture | 数据模型、事务、约束和迁移方案完整 |
| A-G11 | Cache Consistency | 缓存来源、失效、更新和回退策略明确 |
| A-G12 | Async Reliability | 重试、超时、幂等和失败处理明确 |
| A-G13 | Concurrency Safety | 关键并发路径具有安全设计和验证证据 |
| A-G14 | Third-party Integration | 认证、签名、超时、错误映射和恢复完整 |
| A-G15 | Observability | 关键链路能够追踪和诊断 |
| A-G16 | Security Architecture | 认证、授权、数据保护和信任边界经过评估 |
| A-G17 | Platform Architecture | 已实现平台与计划平台明确区分 |
| A-G18 | Migration Safety | 迁移有执行顺序、失败处理和恢复方案 |
| A-G19 | Architecture Drift | 实际实现与已接受 ADR 的偏差已识别 |
| A-G20 | Verification Evidence | 架构验证有可检查证据 |

## 3. Blocking Conditions

以下情况必须阻断：

1. 关键架构决策没有有效需求或背景依据。
2. A0/A1 决策没有满足规定的审批要求。
3. 已接受 ADR 被直接修改且没有治理记录。
4. 关键模块没有明确责任边界。
5. 关键接口没有契约定义。
6. 高风险数据迁移缺少恢复策略。
7. 资金或关键状态流转缺少幂等与并发安全设计。
8. 关键异步操作没有失败处理或结果确认机制。
9. 架构依赖形成未经批准的循环。
10. 实际实现违反已接受 ADR，且没有批准的例外或新决策。
11. 把未来平台支持描述为已实现能力。
12. 缺少验证证据却标记架构 Gate 通过。

## 4. Required Evidence

- Architecture Context
- Architecture Decision Records
- Module Dependency Graph
- Module Manifest
- API Contract
- Data Model and Migration Plan
- Cache Consistency Rules
- Async / Event Contract
- Concurrency Verification
- Third-party Integration Contract
- Security Architecture Review
- Architecture Drift Report
- Verification Report

## 5. Gate Result

- PASS：全部适用阻断检查通过。
- FAIL：发现违反架构强制规则。
- BLOCKED：缺少审批、权限、环境或关键输入。
- NOT_RUN：尚未运行。
- NOT_VERIFIED：证据不足。
- NOT_APPLICABLE：不适用并提供理由。

## 6. AI Execution Rules

AI MUST：

- 在修改架构前读取相关 Accepted ADR。
- 检查需求、业务规则和知识来源。
- 对架构影响进行分析。
- 发现架构冲突时创建待处理记录。
- 对关键决策提出 ADR 草案。
- 不得伪造审批。
- 不得把建议方案标记为 Accepted。
- 不得以通过编译或单元测试代替架构验证。
- 不得未经授权修改生产架构或生产数据。

## 7. Acceptance

只有在 Schema、语义校验、依赖分析、ADR 生命周期、契约兼容性、数据迁移和架构漂移检查均有可执行实现，并通过正向和负向测试后，才可申请正式启用。
