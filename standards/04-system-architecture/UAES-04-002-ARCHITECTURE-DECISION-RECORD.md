# UAES-04-002 — Architecture Decision Record Standard

**Standard ID:** UAES-04-002  
**Standard Name:** Architecture Decision Record Standard  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-04 System Architecture  
**Priority:** MUST

---

## 1. Purpose

建立 Uter 统一的架构决策管理机制（Architecture Decision Record，ADR）。

ADR 用于记录对系统架构产生重要影响的技术决策，确保 AI、开发人员和架构负责人能够理解：

1. 为什么需要作出这项决策；
2. 当时有哪些实际约束；
3. 比较过哪些技术方案；
4. 最终为什么选择当前方案；
5. 决策带来了哪些收益和代价；
6. 决策实施后如何验证；
7. 未来什么情况下需要重新评估。

ADR 是 Uter 架构知识的正式组成部分，也是 AI 修改系统架构时必须参考的决策依据。

ADR 不等同于架构设计文档、技术实施方案或代码注释。

**核心原则：记录架构决策的原因，而不只是记录最终采用的技术。**

## 2. Scope

以下类型的决策必须评估是否建立 ADR：

### 2.1 System structure

- 单体架构与微服务架构；
- 模块拆分与合并；
- 服务边界；
- 模块依赖方向；
- 核心业务模块所有权；
- 前后端职责边界；
- Electron 进程边界。

### 2.2 Technology selection

- 编程语言；
- 核心框架；
- 数据库；
- 缓存；
- 消息系统；
- ORM；
- 前端状态管理；
- 构建系统；
- 第三方关键依赖。

### 2.3 Data architecture

- 数据库选型；
- 数据所有权；
- 数据模型设计；
- 多数据库兼容策略；
- 数据迁移策略；
- 缓存一致性；
- 数据同步机制。

### 2.4 Security and reliability

- 身份认证架构；
- 权限模型；
- 密钥管理；
- 支付安全机制；
- 多实例一致性；
- 高可用架构；
- 故障隔离；
- 灾难恢复。

### 2.5 API and integration

- API 版本策略；
- 内部服务接口；
- 第三方集成模式；
- 支付渠道适配；
- AI 上游适配；
- 事件驱动架构；
- 异步任务架构。

### 2.6 Cross-platform evolution

- PC Web 与 H5 的架构边界；
- Electron 桌面端能力；
- Android、iOS 和 HarmonyOS 的平台适配策略；
- 共享业务逻辑；
- 跨平台 API 契约。

注意：日常局部实现细节不需要强制创建 ADR。只有当决策会显著影响架构、关键质量属性、跨模块协作或未来迁移成本时，才需要建立正式 ADR。

## 3. Decision classification

每项架构决策必须确定影响等级。

| Level | Classification      | Description         |
| ----- | ------------------- | ------------------- |
| A0    | Enterprise Critical | 影响整个系统、资金安全或核心安全边界  |
| A1    | System Critical     | 影响核心架构、数据一致性或关键业务链路 |
| A2    | Domain Level        | 影响一个业务域或多个模块        |
| A3    | Module Level        | 影响单个模块的内部架构         |
| A4    | Local Technical     | 局部技术选择，通常不要求独立 ADR  |

### 3.1 Mandatory ADR levels

- A0：MUST 创建 ADR，并经过正式架构审批。
- A1：MUST 创建 ADR，并经过相关技术负责人审查。
- A2：重要决策 MUST 创建 ADR。
- A3：当决策难以逆转或明显影响模块边界时 MUST 创建 ADR。
- A4：MAY 创建 ADR，不要求强制审批。

以下事项不得仅因为属于 A3 或 A4 就免除记录：如果涉及敏感数据、资金完整性、权限边界或生产安全，必须按照实际风险提高决策等级。

## 4. ADR identification and naming

每份 ADR 必须具有唯一编号。

格式：

`ADR-NNNN-short-description.md`

示例：

```
ADR-0001-system-architecture-direction.md
ADR-0002-database-compatibility-strategy.md
ADR-0003-module-boundary-governance.md
ADR-0004-electron-security-boundary.md
ADR-0005-payment-idempotency-strategy.md
```

要求：

- 编号必须唯一；
- 编号必须单调递增；
- 已使用编号不得重新分配；
- 文件名必须体现决策主题；
- 一份 ADR 原则上只记录一项主要决策；
- 相关决策通过引用关联，不得将多个独立决策塞入同一文档。

## 5. ADR lifecycle

ADR 必须有明确生命周期。

```
DRAFT
  |
  v
PROPOSED
  |
  v
UNDER_REVIEW
  |
  +------> NEEDS_REVISION
  |             |
  |             +------> UNDER_REVIEW
  |
  +------> ACCEPTED
  |
  +------> REJECTED

ACCEPTED
  |
  +------> SUPERSEDED
  |
  +------> DEPRECATED
```

### 5.1 Status definitions

| Status         | Meaning           |
| -------------- | ----------------- |
| DRAFT          | 草稿，尚未提交审查         |
| PROPOSED       | 已正式提出，等待评估        |
| UNDER_REVIEW   | 正在审查              |
| NEEDS_REVISION | 需要补充或修改           |
| ACCEPTED       | 已批准，成为有效架构决策      |
| REJECTED       | 已否决               |
| SUPERSEDED     | 已被新决策取代           |
| DEPRECATED     | 不再适用，但不一定存在直接替代方案 |

状态必须反映真实审批结果。

AI 不得自行将 PROPOSED、UNDER_REVIEW 或 NEEDS_REVISION 改为 ACCEPTED。

### 5.2 Accepted ADR immutability

一份 ADR 被 ACCEPTED 后，其已批准的决策内容必须保持不可变。

如果后续需要改变：

1. 创建新的 ADR；
2. 引用原 ADR；
3. 说明原决策的问题或新环境变化；
4. 比较新的备选方案；
5. 重新审批；
6. 新 ADR 获批后，将旧 ADR 标记为 SUPERSEDED。

不得直接修改已批准 ADR 的决策结论，以掩盖历史决策变化。

允许对明显的拼写错误、链接错误和非实质性元数据进行修正，但必须保留变更记录。

## 6. Mandatory ADR structure

每份 ADR 必须包含以下内容。

### 6.1 Metadata

- ADR ID；
- Title；
- Status；
- Decision Class；
- Created Date；
- Last Updated；
- Owner；
- Author；
- Deciders；
- Related Requirements；
- Related Standards；
- Related Modules；
- Related ADRs；
- Supersedes；
- Superseded By。

### 6.2 Context

说明：

- 当前系统背景；
- 需要解决的问题；
- 触发决策的需求；
- 现有架构限制；
- 技术限制；
- 业务限制；
- 性能要求；
- 安全要求；
- 维护成本；
- 未来演进要求。

背景必须基于事实，不能把 AI 的推测写成已经确认的项目事实。

### 6.3 Problem statement

明确需要解决的核心问题。

问题描述必须能够回答：

- 当前遇到了什么问题？
- 不作出决策会产生什么影响？
- 为什么现有方案不足以解决问题？
- 哪些约束不能违反？

### 6.4 Options considered

必须列出真正具有可行性的候选方案。

每个方案至少包含：

- 方案名称；
- 技术实现方式；
- 优点；
- 缺点；
- 安全影响；
- 性能影响；
- 维护成本；
- 迁移成本；
- 可扩展性；
- 与现有工程的兼容性。

不得只列一个方案，然后将其伪装成经过比较的最终选择。

### 6.5 Decision

必须清晰表达最终决定。

推荐使用：

> We will adopt [方案] because [原因], while accepting [代价或风险].

必须区分：

- 已批准的决策；
- 建议中的决策；
- 尚未确认的假设；
- 后续待验证事项。

### 6.6 Rationale

说明选择该方案的主要依据。

可以包括：

- 业务需求；
- 现有工程约束；
- 安全要求；
- 技术成熟度；
- 性能要求；
- 团队维护能力；
- 迁移复杂度；
- 生命周期成本。

### 6.7 Consequences

必须同时记录正面和负面影响。

| Category    | Required content |
| ----------- | ---------------- |
| Positive    | 带来的收益            |
| Negative    | 引入的限制            |
| Risks       | 新增风险             |
| Operational | 运维影响             |
| Security    | 安全影响             |
| Migration   | 迁移成本             |
| Maintenance | 长期维护影响           |

不得只写收益，不写代价。

### 6.8 Implementation plan

说明：

- 需要修改哪些模块；
- 是否涉及数据迁移；
- 是否涉及 API 变更；
- 是否需要兼容旧版本；
- 实施顺序；
- 依赖条件；
- 验证方式；
- 负责人。

架构决策被批准，不等于实现已经完成。

### 6.9 Rollback and exit strategy

说明：

- 是否能够回退；
- 回退前置条件；
- 数据是否可恢复；
- 需要保留哪些旧接口；
- 是否需要双写或双读；
- 回退失败如何处理；
- 什么情况下必须终止该方案。

不可逆的决策必须明确说明不可逆原因及风险接受方式。

### 6.10 Verification

必须定义可以证明决策正确实施的验证条件。

例如：

- 模块依赖扫描；
- API 契约测试；
- 数据库迁移测试；
- 并发测试；
- 性能测试；
- 安全测试；
- 实际部署验证。

### 6.11 Confidence and reconsideration triggers

必须记录决策置信度：

- HIGH；
- MEDIUM；
- LOW。

并定义需要重新评估的触发条件，例如：

- 业务规模发生显著变化；
- 性能指标持续不达标；
- 关键依赖停止维护；
- 安全模型发生变化；
- 平台范围扩大；
- 关键假设被事实推翻；
- 迁移成本超过原始预期。

## 7. ADR approval governance

### 7.1 Approval authority

| Decision level | Required review      |
| -------------- | -------------------- |
| A0             | 项目负责人及相关安全、架构负责人正式批准 |
| A1             | 架构负责人及受影响领域负责人       |
| A2             | 领域负责人及相关模块负责人        |
| A3             | 模块负责人或指定技术负责人        |
| A4             | 根据实际风险确定             |

审批人员必须具有对应职责和权限。

AI 可以准备 ADR、提出建议、比较方案、执行验证，但不能虚构人工批准。

### 7.2 Approval evidence

接受的 ADR 必须有：

- 审批人或审批角色；
- 审批时间；
- 审批结果；
- 审批依据；
- 关联 PR 或评审记录（适用时）。

### 7.3 Approval and implementation are separate

必须区分：

1. Decision Approved；
2. Implementation Planned；
3. Implementation In Progress；
4. Implementation Verified；
5. Implementation Completed。

不得因为 ADR 已批准就宣称系统已经实现该架构。

## 8. AI execution requirements

AI 在执行架构相关任务时 MUST：

1. 检查相关 ADR；
2. 检查 ADR 当前状态；
3. 检查相关 ADR 是否已被替代；
4. 检查决策适用范围；
5. 判断本次变更是否影响现有决策；
6. 判断是否需要创建新 ADR；
7. 在实施前明确决策状态；
8. 在实施后补充验证证据；
9. 保持决策历史可追溯。

AI MUST NOT：

- 将推测写成已批准决策；
- 自行批准 A0 或 A1 决策；
- 直接覆盖已批准 ADR 的核心决定；
- 未经批准改变核心技术架构；
- 仅为了方便实现而绕过架构决策；
- 删除已经被替代的 ADR 历史；
- 将未完成的实施标记为完成。

## 9. ADR storage and organization

建议目录：

```
standards/
└── 04-system-architecture/
    ├── UAES-04-SYSTEM-ARCHITECTURE-STANDARD.md
    ├── UAES-04-001-ARCHITECTURE-PRINCIPLES.md
    ├── UAES-04-002-ARCHITECTURE-DECISION-RECORD.md
    └── ...

architecture/
└── decisions/
    ├── README.md
    ├── ADR-0001-system-architecture-direction.md
    ├── ADR-0002-database-compatibility-strategy.md
    ├── ADR-0003-module-boundary-governance.md
    └── ADR-0004-electron-security-boundary.md
```

重要区分：

- `standards/04-system-architecture/`：定义如何管理架构决策。
- `architecture/decisions/`：保存 Uter 实际作出的架构决策。

标准文档不能替代具体 ADR。

## 10. ADR index

`architecture/decisions/README.md` 必须维护决策索引。

至少包括：

| ADR ID   | Title                           | Class | Status   | Owner |
| -------- | ------------------------------- | ----- | -------- | ----- |
| ADR-0001 | System Architecture Direction   | A0    | PROPOSED | TBD   |
| ADR-0002 | Database Compatibility Strategy | A1    | PROPOSED | TBD   |
| ADR-0003 | Module Boundary Governance      | A1    | PROPOSED | TBD   |
| ADR-0004 | Electron Security Boundary      | A1    | PROPOSED | TBD   |

以上仅为目录初始化示例，不代表 Uter 已经批准这些决策。

索引必须与实际 ADR 文件保持一致。

## 11. ADR validation

每份 ADR 必须经过以下检查：

- 唯一编号；
- 标题有效；
- 元数据完整；
- 决策等级明确；
- 状态有效；
- 问题描述清楚；
- 候选方案具有可比性；
- 最终决定明确；
- 正反面影响完整；
- 实施计划合理；
- 回滚或退出策略明确；
- 验证条件可执行；
- 审批信息真实；
- 关联记录有效。

已 ACCEPTED 的 ADR 必须额外检查不可变性和替代关系。

## 12. Quality requirements

以下情况必须阻断 ADR 接受：

1. 缺少核心问题描述；
2. 没有比较真实可行的备选方案；
3. 最终决策不明确；
4. 未说明重大负面影响；
5. 关键安全影响没有评估；
6. 破坏性迁移没有回滚或风险接受说明；
7. 决策等级和审批权限不匹配；
8. 审批信息无法验证；
9. 决策与现有强制标准冲突且没有经过批准的例外；
10. 无法定义验证方式。

## 13. Acceptance criteria

UAES-04-002 必须满足：

- ADR 编号规则统一；
- ADR 生命周期完整；
- 决策等级明确；
- 标准模板完整；
- 审批权限明确；
- 已批准决策不可被随意覆盖；
- 新旧决策替代关系可追踪；
- AI 执行规则明确；
- ADR Schema 可验证；
- ADR 索引可维护；
- 架构门禁能够检查 ADR 引用和状态。

## 14. Related standards

| Standard         | Relationship                 |
| ---------------- | ---------------------------- |
| UAES-04          | System Architecture 总标准      |
| UAES-04-001      | Architecture Principles      |
| UAES-04-003      | Module Boundaries            |
| UAES-04-004      | Go Backend Architecture      |
| UAES-04-005      | React Frontend Architecture  |
| UAES-04-006      | Electron Architecture        |
| UAES-04-007      | API Contract                 |
| UAES-04-008      | Database & Data Modeling     |
| UAES-04-009      | Cache & Consistency          |
| UAES-04-010      | Async & Event Architecture   |
| UAES-04-011      | Concurrency & Idempotency    |
| UAES-04-012      | Third-party Integration      |
| UAES-04-013      | Observability & Verification |
| UAES-04-GATE-001 | Architecture Quality Gate    |

## 15. Change history

| Version | Status | Description                     |
| ------- | ------ | ------------------------------- |
| 1.0.0   | DRAFT  | Initial ADR governance standard |
