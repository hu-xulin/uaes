# UAES-04 — System Architecture Standard

**Standard ID:** UAES-04  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** System Architecture  
**Applies to:** Uter  
**Owner:** Uter Engineering Governance  
**Normative language:** MUST / MUST NOT / SHOULD / SHOULD NOT / MAY

---

## 1. Purpose

本标准建立 Uter 的系统架构治理机制，确保系统在持续开发、AI 辅助编程、多 Agent 协作、功能扩展和平台演进过程中保持：

- 架构边界清晰；
- 模块职责明确；
- 依赖方向可控；
- 接口契约稳定；
- 数据模型一致；
- 并发与事务行为可验证；
- 系统故障可隔离、可恢复；
- 架构变更可追踪、可审查、可回滚。

本标准不仅约束人工开发者，也约束所有参与 Uter 工程活动的 AI Agent、Coding Agent、自动化脚本和外部开发工具。

## 2. Scope

本标准覆盖：

1. 系统整体架构；
2. 架构原则与架构决策；
3. 模块边界与依赖关系；
4. Go 后端架构；
5. React / TypeScript 前端架构；
6. Electron 桌面端架构；
7. API 契约与版本管理；
8. 数据库与数据模型；
9. 缓存与数据一致性；
10. 异步任务与事件驱动；
11. 并发、事务与幂等；
12. 第三方服务集成；
13. 可观测性与架构验证。

本标准不直接定义：

- 产品需求与业务验收规则（由 P2 管理）；
- 设计 Token 和视觉规范（由 P5 管理）；
- 代码格式和具体语言风格（由 P6 管理）；
- 安全工程完整控制措施（由 P10 管理）；
- CI/CD 与发布操作流程（由 P11 管理）。

上述领域与本标准存在依赖关系。涉及交叉领域时，必须同时遵守对应标准。

## 3. Architecture governance principles

### 3.1 Architecture must be explicit

- UAES-ARCH-001：系统关键架构必须有明确的结构、职责和边界定义。
- UAES-ARCH-002：关键架构决策 MUST 通过 ADR 记录。
- UAES-ARCH-003：不得仅依赖 AI 对代码的临时理解作为架构事实。
- UAES-ARCH-004：架构文档必须与实际代码结构保持可验证的一致性。

### 3.2 Prefer the simplest sufficient architecture

- UAES-ARCH-005：优先采用满足当前业务要求的最简单架构。
- UAES-ARCH-006：不得为了技术时髦而无必要地引入微服务、消息中间件、复杂分层或额外基础设施。
- UAES-ARCH-007：引入新架构组件必须说明解决的问题、成本、风险和替代方案。
- UAES-ARCH-008：架构复杂度必须与业务规模、团队能力和运维能力相匹配。

### 3.3 Explicit ownership and boundaries

- UAES-ARCH-009：每个模块必须有唯一、明确的职责范围。
- UAES-ARCH-010：每个核心业务实体必须有明确的数据所有权。
- UAES-ARCH-011：跨模块访问必须通过允许的接口或契约。
- UAES-ARCH-012：禁止通过共享内部实现绕过模块边界。

### 3.4 Design for change

- UAES-ARCH-013：架构必须允许业务规则在不破坏无关模块的情况下演进。
- UAES-ARCH-014：对外接口、数据库结构和关键状态机变更必须分析兼容性。
- UAES-ARCH-015：不可逆变更必须有明确的迁移、恢复和风险说明。
- UAES-ARCH-016：未来平台扩展不得以牺牲现有平台稳定性为代价。

### 3.5 Verifiable architecture

- UAES-ARCH-017：关键架构规则 SHOULD 尽可能转化为自动检查。
- UAES-ARCH-018：架构验收必须同时包含文档证据和代码证据。
- UAES-ARCH-019：架构检查失败不得通过修改检查结果、隐藏错误或删除测试来规避。
- UAES-ARCH-020：所有例外必须记录责任人、理由、影响范围和到期时间。

## 4. Architecture baseline

Uter 的架构设计必须以实际仓库和已确认的工程事实为依据。

当前已知技术方向：

| Layer | Technology |
|---|---|
| Backend | Go |
| Backend HTTP | Gin |
| ORM | GORM |
| Database | SQLite / MySQL / PostgreSQL |
| Cache | Redis |
| Frontend | React 19 |
| Language | TypeScript |
| Build | Rsbuild 2 / Bun |
| Routing | TanStack Router |
| Server state | TanStack Query |
| Client state | Zustand |
| UI | Base UI / Tailwind CSS 4 |
| Validation | Zod |
| Desktop | Electron |

以上是已知技术基线，不意味着每个模块都已经按照本标准实现。

AI MUST 在实际任务开始前检查仓库，确认具体目录、模块、依赖和运行方式。若实际代码与本表不一致，应记录差异，不能为了符合文档而虚构代码现状。

## 5. Architecture layers

Uter 可以根据实际代码采用模块化单体、分层架构或经过 ADR 批准的其他结构。

建议采用以下逻辑职责层：

1. Presentation Layer：用户界面和交互入口；
2. Interface Layer：HTTP API、Electron IPC、外部接口适配；
3. Application Layer：用例编排、业务流程协调；
4. Domain Layer：业务规则、实体、值对象和领域行为；
5. Infrastructure Layer：数据库、缓存、外部服务和文件系统。

不要求所有模块机械地创建五层目录。是否拆层应由模块复杂度和实际需求决定。

强制要求：

- UAES-ARCH-021：表现层不得直接承担复杂业务规则。
- UAES-ARCH-022：业务规则不得依赖具体 UI 框架。
- UAES-ARCH-023：领域逻辑不得直接依赖 HTTP Request、Response 等传输对象。
- UAES-ARCH-024：基础设施实现不得反向控制业务规则。
- UAES-ARCH-025：跨层调用方向必须明确，不得形成循环依赖。

## 6. Architecture change management

以下变更必须进行架构影响分析：

- 新增核心业务模块；
- 删除或合并核心模块；
- 改变模块职责或依赖方向；
- 新增数据库类型、消息中间件或缓存组件；
- 改变核心 API 契约；
- 改变身份认证或权限模型；
- 改变支付、充值、余额、退款等资金相关数据流；
- 改变 AI Relay、Token 计费或模型路由架构；
- 改变任务执行和异步处理架构；
- 引入新的第三方服务；
- 引入新的运行平台或系统级权限。

架构变更必须记录：

1. 变更原因；
2. 当前架构；
3. 目标架构；
4. 受影响模块；
5. 数据影响；
6. 接口兼容性；
7. 安全影响；
8. 性能与可靠性影响；
9. 测试要求；
10. 迁移方案；
11. 回滚方案；
12. ADR 引用。

## 7. Architecture Decision Record

重要架构决策 MUST 建立 ADR。

至少记录：

- ADR ID；
- 标题；
- 状态；
- 日期；
- 背景；
- 需要解决的问题；
- 决策；
- 考虑过的替代方案；
- 决策理由；
- 影响；
- 风险；
- 迁移计划；
- 验证方式；
- 关联需求和代码变更。

ADR 状态：

- PROPOSED
- ACCEPTED
- REJECTED
- SUPERSEDED
- DEPRECATED

已接受的 ADR 不得被静默修改。新决策应创建新 ADR 并关联旧决策。

## 8. AI architecture execution requirements

AI Agent MUST：

1. 在修改架构前检查实际代码，而不是只根据文档猜测。
2. 识别当前模块、调用链、数据流和依赖方向。
3. 区分事实、推断、建议和未确认假设。
4. 对高影响架构变更先提交方案，取得相应授权后执行。
5. 不得擅自把单体系统改造成微服务。
6. 不得擅自更换核心技术栈。
7. 不得为了消除架构检查错误而删除原有业务能力。
8. 不得在没有迁移和兼容性分析的情况下破坏 API 或数据库结构。
9. 不得在没有数据安全分析的情况下改变支付、余额、用户身份或 Token 计费的数据模型。
10. 完成修改后必须运行对应架构检查和回归测试。

AI MUST 在报告中区分：

- Existing Architecture：现有架构事实；
- Target Architecture：目标架构；
- Proposed Change：本次建议；
- Implemented Change：实际完成的变更；
- Unverified Assumption：尚未验证的假设。

## 9. Architecture quality requirements

每项关键架构变更必须验证：

- 模块边界；
- 依赖方向；
- 接口契约；
- 数据结构；
- 数据迁移；
- 并发安全；
- 错误处理；
- 资源生命周期；
- 安全边界；
- 可观测性；
- 回归测试。

对于不适用的检查项，必须标记 NOT_APPLICABLE 并说明理由，不能直接跳过。

## 10. Exceptions

架构例外必须包含：

- Exception ID；
- 对应规则 ID；
- 例外原因；
- 影响模块；
- 风险评估；
- 补偿措施；
- 责任人；
- 批准记录；
- 到期日期；
- 重新评估条件。

临时例外不得自动变成永久架构规则。

## 11. Acceptance criteria

本标准只有满足以下条件才可通过验收：

1. 架构规范完整；
2. 关键模块职责明确；
3. 架构决策可追踪；
4. 模块依赖规则可检查；
5. API 和数据变更有契约；
6. 关键并发和幂等场景有验证方法；
7. Electron 安全边界明确；
8. 关键架构检查具备机器可执行方案；
9. AI Agent 能按规范完成架构分析；
10. 架构报告能反映实际代码，而不是仅复述文档。

## 12. Related standards

- UAES-01：AI Governance
- UAES-02：Product Engineering
- UAES-03：Knowledge Engineering
- UAES-05：Experience & Design
- UAES-06：Software Engineering
- UAES-08：AI Agent Engineering
- UAES-09：Quality Engineering
- UAES-10：Security & Reliability
- UAES-11：DevOps & Delivery
- UAES-12：Lifecycle & Evolution

## 13. Change history

| Version | Status | Description |
|---|---|---|
| 1.0.0 | DRAFT | Initial UAES System Architecture Standard |