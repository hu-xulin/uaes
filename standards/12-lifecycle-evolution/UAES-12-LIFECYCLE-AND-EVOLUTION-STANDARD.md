# UAES-12 — Lifecycle & Evolution Engineering Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-12 |
| Standard Name | Lifecycle & Evolution Engineering Standard |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | P12 — Lifecycle & Evolution |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-00, UAES-01, UAES-03, UAES-04, UAES-06, UAES-08, UAES-09, UAES-10, UAES-11 |
| Applies To | Uter products, services, repositories, modules, architecture, dependencies, engineering standards, AI agents and operational systems |

## 1. Purpose

建立贯穿产品、软件、架构、数据、依赖、工程规范和 AI 执行体系的全生命周期治理机制，确保系统能够在持续变化中保持安全、稳定、可维护、可追溯和可持续演进。

P12 不是再增加一套开发流程，而是让 P00–P11 的规范、实现、验证和交付形成持续反馈与演进机制。

## 2. Scope

覆盖：

- 产品和系统生命周期。
- 技术债务登记与治理。
- 重构与迁移。
- 依赖升级和技术栈演进。
- 架构、API、数据和 Schema 演进。
- 功能渐进发布和退役。
- 可观测性反馈。
- 事故复盘和组织学习。
- 文档、知识和实现漂移。
- UAES 标准版本与变更控制。
- 持续改进、度量和技术战略。
- AI 辅助生命周期活动。

## 3. Core Principles

### 3.1 Lifecycle Traceability

任何重要资产 MUST 有明确的 Owner、生命周期状态、版本、来源和变更历史。

### 3.2 Evidence-Based Evolution

架构调整、依赖升级、重构、弃用和退役 MUST 有明确的问题证据、影响分析、实施计划和验证结果。

### 3.3 Compatibility Before Replacement

涉及接口、数据、用户行为和外部集成的变更 SHOULD 优先采用兼容性演进，而不是直接替换。

### 3.4 Reversible Change

重要变更 MUST 设计回滚、前向修复、数据恢复或补偿方案。不可逆变更必须明确披露不可逆性及其风险。

### 3.5 Continuous Feedback

线上指标、用户反馈、缺陷、事故、安全发现和测试结果 MUST 能够进入持续改进流程。

### 3.6 No Silent Degradation

不得通过降低测试覆盖、删除监控、关闭告警、跳过扫描、忽略技术债务或修改规范状态来掩盖系统质量下降。

### 3.7 Explicit Ownership

所有持续维护的关键资产 MUST 有责任人或责任团队。无人负责的关键资产必须列为治理风险。

## 4. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-M001 | 关键资产 MUST 有 Owner（Lifecycle Ownership）。 |
| UAES-12-M002 | 关键资产 MUST 具有明确生命周期状态（Lifecycle State）。 |
| UAES-12-M003 | 已识别技术债务 MUST 登记并评估（Technical Debt Registry）。 |
| UAES-12-M004 | 中高风险重构 MUST 进行影响分析和验证（Refactoring Governance）。 |
| UAES-12-M005 | 关键依赖 MUST 记录版本、来源、Owner 和升级策略（Dependency Lifecycle）。 |
| UAES-12-M006 | 重要架构变更 MUST 关联 ADR 或等效决策记录（Architecture Evolution）。 |
| UAES-12-M007 | 对外契约弃用 MUST 有通知、迁移和终止计划（Contract Deprecation）。 |
| UAES-12-M008 | 数据结构变更 MUST 评估兼容性、迁移和恢复风险（Data Evolution）。 |
| UAES-12-M009 | 重要功能 MUST 有启用、观察、维护和退役策略（Feature Lifecycle）。 |
| UAES-12-M010 | 生产反馈 MUST 能关联工程改进任务（Feedback Loop）。 |
| UAES-12-M011 | 重大事故 MUST 完成复盘和行动项追踪（Incident Learning）。 |
| UAES-12-M012 | 关键知识 MUST 有验证时间和复核策略（Knowledge Freshness）。 |
| UAES-12-M013 | UAES 标准变更 MUST 经版本化和审查（Standard Change Control）。 |
| UAES-12-M014 | 改进任务 MUST 有结果验证（Continuous Improvement）。 |
| UAES-12-M015 | 退役 MUST 经过依赖、数据、安全和业务影响评估（Decommission Safety）。 |
| UAES-12-M016 | AI MUST 在授权范围内执行生命周期变更，不得自行批准高风险决策（AI Lifecycle Governance）。 |

## 5. Lifecycle State Models

### 5.1 Generic Asset Lifecycle

```
PROPOSED → ACTIVE → MAINTENANCE → DEPRECATED → SUNSETTING → RETIRED → ARCHIVED
```

允许根据资产类型使用适用状态，但必须明确状态转换条件。

### 5.2 Technical Debt Lifecycle

```
IDENTIFIED → TRIAGED → ACCEPTED → PLANNED → IN_PROGRESS → RESOLVED → VERIFIED → CLOSED
```

补充状态：`REJECTED`、`DEFERRED`、`REOPENED`、`BLOCKED`。

### 5.3 Deprecation Lifecycle

```
ACTIVE → DEPRECATION_PROPOSED → DEPRECATED → MIGRATION_PERIOD → SUNSET_READY → REMOVED
```

不得把标记为 Deprecated 等同于已经安全移除。

### 5.4 Standard Lifecycle

```
DRAFT → IN_REVIEW → APPROVED → ACTIVE → SUPERSEDED / DEPRECATED → ARCHIVED
```

正式批准权限遵循 P00 和 P01 的治理要求；标准作者和 AI 不得自行授予批准状态。

## 6. Implementation Rules

### 6.1 Lifecycle Registry

关键资产应进入相应 Registry，至少记录：Asset ID、Asset Type、Name、Owner、Version、Lifecycle Status、Created At、Last Reviewed At、Dependencies、Risk、Evidence References、Planned Review Date。

### 6.2 Technical Debt

每项技术债务必须记录：Debt ID、Description、Origin、Affected Components、Business Impact、Engineering Impact、Security / Reliability Impact、Probability、Remediation Cost、Priority、Owner、Target Date、Acceptance / Deferral Rationale、Verification Evidence。

技术债务不得只用代码注释或 Issue 标题代替正式记录。

### 6.3 Refactoring

重构前必须：

1. 确定问题和目标。
2. 确认行为兼容性要求。
3. 记录影响范围。
4. 识别数据和接口风险。
5. 建立基线测试。
6. 设计分阶段实施计划。
7. 定义回滚或前向修复方案。

重构后必须验证功能行为、性能、可靠性和相关回归测试。不得将功能变化伪装成纯重构。

### 6.4 Dependency Lifecycle

依赖升级必须检查：当前版本和目标版本、官方支持状态、安全公告和已知漏洞、License、兼容性和 Breaking Changes、Transitive Dependencies、Lockfile 变化、构建与测试结果、回退方案。

安全漏洞升级和普通版本升级可以采用不同优先级，但均必须保留审计证据。

### 6.5 Architecture Evolution

重要架构演进必须：关联现有 ADR、说明旧架构限制、比较候选方案、说明模块边界变化、分析迁移和兼容性、更新架构图及相关知识、验证关键非功能要求。

A0/A1 决策等级的审批遵循 P04 与 P01，不得由实施 Agent 自行批准。

### 6.6 API and Contract Deprecation

对外 API 或契约弃用必须定义：受影响的消费者、替代接口、兼容期限、通知方式、迁移指南、使用情况监测、停止服务条件、最终移除审批。

不得在消费者仍有实际使用且没有迁移安排时直接删除关键接口，除非存在经批准的紧急安全处置。

### 6.7 Data and Schema Evolution

数据库演进优先采用兼容性分阶段迁移：

```
Expand → Migrate → Verify → Contract
```

必须考虑旧版本应用与新 Schema 并存的窗口期。对账本、支付订单、用户余额和其他关键业务数据，迁移前后必须执行完整性和一致性验证。

### 6.8 Feature Lifecycle

重要功能 SHOULD 支持：Feature Flag、Gradual Rollout、Kill Switch、Cohort / Tenant Scope、Metrics、Rollback / Disable Strategy。

Feature Flag 不得作为永久遗留控制逻辑；过期 Flag 必须登记清理任务。

### 6.9 Feedback and Observability

生产反馈应转换为可追踪工作项，并标明：Source、Time Window、Affected Version、Impact、Severity、Evidence、Owner、Remediation、Verification。

不得只凭单一指标或孤立反馈得出未经验证的根因结论。

### 6.10 Incident Learning

事故复盘应采用无责备、证据驱动的方式，关注系统性原因和控制缺口。

复盘至少包含：Timeline、Impact、Detection、Response、Root Cause / Contributing Factors、What Worked、What Failed、Corrective Actions、Owners、Due Dates、Verification。

行动项必须进入可追踪任务系统，不能止于复盘文档。

### 6.11 Documentation and Knowledge Drift

文档必须能关联对应代码、API、Schema、ADR、设计资产或运行配置。发现内容过期时，应标记 STALE 或 REVIEW_REQUIRED，不得默认为当前有效事实。

### 6.12 Standard Evolution

标准变更必须记录：Change Proposal、Reason、Impact、Compatibility、Affected Standard IDs、Schema Changes、Gate Changes、Migration Requirements、Approvals、Effective Date。

规范版本升级不得静默改变已有 MUST 要求。

### 6.13 Continuous Improvement

改进任务必须定义：Baseline、Target、Measurement Method、Owner、Time Window、Evidence、Result、Follow-up Decision。

未达到目标时必须记录结果，不得修改原始基线来制造成功。

### 6.14 System Decommission

退役前必须检查：Active Users、Traffic、Consumers、Dependencies、Data Retention、Legal / Compliance Obligations、Secrets / Credentials、DNS / Network、Monitoring / Alerting、Backups、Recovery、Cost、Final Owner Approval。

退役后必须验证资源清理、访问撤销、数据保留和审计证据。

### 6.15 AI Lifecycle Governance

AI 可以在授权范围内：识别技术债务、提议重构、分析依赖升级、生成迁移计划、检查知识漂移、提出标准变更、生成事故复盘草案、执行已批准的低风险改进。

AI 不得自行：批准 A0/A1 架构决策、批准生产数据删除、决定关键 API 终止日期、关闭重大安全事件、删除审计证据、将 DRAFT 标准标记为正式生效、执行未授权生产变更。

## 7. Prohibited Practices

1. 禁止无 Owner 的关键资产长期处于 ACTIVE。
2. 禁止不登记技术债务而反复延期。
3. 禁止未经评估直接升级关键依赖。
4. 禁止没有 ADR 或等效决策记录进行重大架构替换。
5. 禁止无消费者迁移计划直接删除重要 API。
6. 禁止未经数据验证执行不可逆迁移。
7. 禁止永久保留无 Owner 的 Feature Flag。
8. 禁止通过关闭监控隐藏系统退化。
9. 禁止事故复盘只写结论、不建立行动项。
10. 禁止将过期知识继续作为已验证事实。
11. 禁止未经审查修改正式标准。
12. 禁止未经批准删除系统、数据或审计记录。
13. 禁止 AI 自行批准其提出的高风险变更。
14. 禁止将未验证的改进报告为已完成。

## 8. AI Execution Rules

AI 必须：

- 加载 P01 授权和审批要求。
- 加载 P03 知识来源、可信度和新鲜度。
- 加载 P04 ADR 和架构约束。
- 加载 P08 Agent 任务及工作区约束。
- 加载 P09 验证要求。
- 加载 P10 安全及可靠性要求。
- 加载 P11 交付流程。
- 识别变更前后的资产状态。
- 保留原始证据和验证结果。
- 对不确定的 Owner、消费者、兼容性和数据影响标记 UNKNOWN。
- 不得虚构审批、迁移、测试或退役完成状态。

## 9. Verification

P12 验证范围：

- Lifecycle Registry Validation
- Technical Debt Aging and Ownership
- Dependency Support and Vulnerability Review
- Architecture / ADR Consistency
- API Deprecation Compliance
- Data Migration Compatibility
- Feature Flag Expiration
- Feedback Traceability
- Incident Action Closure
- Knowledge Freshness
- Standard Version Compatibility
- Improvement Outcome Verification
- Decommission Completeness
- AI Authorization Negative Tests

## 10. Acceptance Criteria

P12 正式批准前必须：

1. 生命周期模型和资产状态定义完成。
2. 关键资产 Owner 与 Registry 机制建立。
3. 技术债务登记和排序机制落地。
4. 重构与依赖升级门禁落地。
5. ADR 与架构演进关联有效。
6. API 弃用和迁移流程可验证。
7. 数据迁移与兼容性检查可验证。
8. Feature 生命周期和过期清理机制可用。
9. 线上反馈能够关联工程任务。
10. 重大事故复盘行动项可追踪。
11. 知识与文档漂移能够检测。
12. 标准变更与版本管理可执行。
13. 持续改进有基线和结果证据。
14. 系统退役流程有完整验证。
15. AI 生命周期负面测试通过。

## 11. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 12. References

- UAES-00 — Foundation
- UAES-01 — AI Governance
- UAES-02 — Product Engineering
- UAES-03 — Knowledge Engineering
- UAES-04 — System Architecture
- UAES-06 — Software Engineering
- UAES-08 — Agent Engineering
- UAES-09 — Quality Engineering
- UAES-10 — Security & Reliability
- UAES-11 — DevOps & Delivery

## 13. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial lifecycle and evolution standard |
