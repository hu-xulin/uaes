# UAES-03 — KNOWLEDGE ENGINEERING STANDARD

**Document ID:** UAES-03-001  
**Standard:** UTER AI Engineering Standard  
**Domain:** Knowledge Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Classification:** Enterprise Engineering Standard

---

# 1. 目的

本标准定义 Uter 项目的知识工程体系。

AI 工程系统的质量不仅取决于模型能力，还取决于它能否准确获得、识别、组织、检索和验证项目知识。

知识工程必须解决：

1. AI 不理解项目实际结构。
2. AI 使用过时的架构信息。
3. AI 将历史实现误认为当前规则。
4. AI 无法识别权威信息来源。
5. AI 在长任务中丢失上下文。
6. 多个 Agent 使用不同的项目事实。
7. 文档与代码长期不一致。
8. AI 重复询问已经明确的信息。
9. AI 根据猜测补充不存在的业务规则。
10. 工程决策无法追溯。

UAES 将项目知识视为需要治理的工程资产。

# 2. 知识分类模型

## 2.1 六类知识

| 类型 | 英文 | 内容 |
|---|---|---|
| 项目事实 | Project Facts | 当前真实存在的工程信息 |
| 产品知识 | Product Knowledge | 业务目标、用户需求、业务规则 |
| 架构知识 | Architecture Knowledge | 系统结构、模块、依赖、数据 |
| 设计知识 | Design Knowledge | 设计系统、组件、交互规范 |
| 工程规范 | Engineering Standards | 强制规则、执行要求、质量门禁 |
| 决策知识 | Decision Records | 方案选择、原因、影响、历史决策 |

这六类知识必须具有明确的来源和状态。

## 2.2 知识状态

每条知识只能处于以下状态之一：

- DRAFT：草稿。
- PROPOSED：待批准。
- APPROVED：已批准。
- ACTIVE：当前有效。
- DEPRECATED：已废弃但保留历史。
- SUPERSEDED：已被新知识替代。
- UNKNOWN：无法确认。
- INVALID：已经确认错误。

AI 不得将 DRAFT、PROPOSED 或 UNKNOWN 当作已批准的项目事实。

## 2.3 知识来源等级

| 等级 | 来源 | 用途 |
|---|---|---|
| S0 | 用户当前明确确认 | 当前任务权威依据 |
| S1 | 已批准规范、正式决策记录 | 工程规则和决策依据 |
| S2 | 当前代码、配置、数据库 Schema | 当前实现事实 |
| S3 | 当前 CI、测试、运行证据 | 工程执行事实 |
| S4 | 历史文档、历史报告 | 历史参考 |
| S5 | 外部资料、推断、AI 生成内容 | 参考或待验证信息 |

注意：

不同知识类型的权威来源可能不同。

例如，代码可以证明某个 API 当前存在，但不能自动证明它符合用户批准的业务规则。

用户对业务目标的最新明确确认，不能被旧代码中的错误实现覆盖。

---

# 3. 知识来源与权威性

## 3.1 Source of Truth

每个关键知识领域必须指定权威来源。

| 知识领域 | 权威来源 |
|---|---|
| 项目名称 | 用户批准的项目定义 |
| 产品需求 | 已批准需求文档 |
| 业务规则 | 已批准业务规则文档 |
| 技术架构 | 当前架构文档及代码验证 |
| API 契约 | 已批准 API Schema / OpenAPI |
| 数据模型 | 数据库 Schema 与迁移记录 |
| 设计规范 | 已批准设计系统 |
| 工程规范 | 当前 ACTIVE UAES 规则 |
| CI 状态 | 对应 Commit 的 CI 运行记录 |
| 生产运行状态 | 经授权的监控和运行数据 |
| 技术决策 | 已批准 ADR |

## 3.2 当前事实与历史事实

必须区分：

- Current：当前事实。
- Historical：历史事实。
- Planned：计划状态。
- Proposed：提议状态。
- Inferred：推断状态。
- Unknown：未知状态。

禁止将 Planned 描述为 Current。

禁止将 Historical 描述为 Current。

禁止将 Inferred 描述为 Verified。

## 3.3 事实验证

关键工程事实必须记录：

- Fact ID。
- 内容。
- 来源。
- 证据。
- 发现时间。
- 验证时间。
- 适用 Commit。
- 状态。
- 置信度。
- 责任领域。

例如：

```yaml
fact_id: FACT-ARCH-001
subject: backend-language
value: Go
source:
  type: repository
  path: go.mod
evidence:
  commit: "<verified-commit-sha>"
status: VERIFIED
scope: repository
last_verified_at: "<timestamp>"
```

示例中的 Commit 和时间必须由实际读取结果填写，不允许 AI 编造。

---

# 4. 项目知识库结构

## 4.1 统一知识目录

建议使用以下结构：

```text
.uaes/
├── knowledge/
│   ├── project/
│   │   ├── PROJECT-OVERVIEW.md
│   │   ├── PROJECT-CONTEXT.md
│   │   ├── PROJECT-STATUS.md
│   │   ├── PRODUCT-SCOPE.md
│   │   └── GLOSSARY.md
│   │
│   ├── product/
│   │   ├── requirements/
│   │   ├── business-rules/
│   │   ├── user-flows/
│   │   └── acceptance/
│   │
│   ├── architecture/
│   │   ├── SYSTEM-OVERVIEW.md
│   │   ├── MODULE-MAP.md
│   │   ├── DATA-FLOW.md
│   │   ├── API-MAP.md
│   │   └── ADR/
│   │
│   ├── design/
│   │   ├── DESIGN-SYSTEM.md
│   │   ├── DESIGN-TOKENS.md
│   │   ├── COMPONENT-MAP.md
│   │   └── PLATFORM-DESIGN.md
│   │
│   ├── engineering/
│   │   ├── TECH-STACK.md
│   │   ├── DEVELOPMENT-ENVIRONMENT.md
│   │   ├── BUILD-AND-TEST.md
│   │   └── DEPENDENCY-MAP.md
│   │
│   ├── operations/
│   │   ├── ENVIRONMENT-MAP.md
│   │   ├── DEPLOYMENT-MAP.md
│   │   └── INCIDENT-HISTORY.md
│   │
│   ├── facts/
│   │   ├── FACT-REGISTRY.yaml
│   │   └── FACT-HISTORY/
│   │
│   └── decisions/
│       └── ADR-INDEX.md
│
└── schemas/
    ├── fact.schema.json
    ├── decision.schema.json
    ├── knowledge.schema.json
    └── project-status.schema.json
```

该目录是 UAES 的目标知识结构，不意味着所有知识都必须重复存储。

已有权威文档可以通过引用和索引接入。

## 4.2 禁止知识重复失控

同一项关键事实不得在多个文件中无约束地维护不同版本。

例如：

- 技术栈不能在多个文档中分别手动维护。
- 业务状态定义不能存在多个互相冲突的版本。
- 设计 Token 不能同时存在多个权威来源。
- API 契约不能由多个 Agent 各自定义。

必须指定唯一权威来源，其他文档通过引用、生成或同步方式使用。

---

# 5. 项目上下文管理

## 5.1 Project Context

每个 AI 工程任务必须能够加载必要的项目上下文。

项目上下文至少包括：

1. 项目名称。
2. 项目目标。
3. 当前平台。
4. 技术栈。
5. 主要模块。
6. 模块职责。
7. 关键依赖。
8. 关键业务规则。
9. 设计系统。
10. 工程规范。
11. 测试方法。
12. 当前限制。
13. 已知风险。
14. 当前工程状态。

## 5.2 上下文分层

UAES 采用四层上下文：

| 层级 | 内容 | 加载方式 |
|---|---|---|
| C0 | 全局工程规则 | 每个任务必需 |
| C1 | 项目核心上下文 | 每个项目任务必需 |
| C2 | 当前领域知识 | 按任务加载 |
| C3 | 当前任务证据 | 按需加载 |

例如，修改支付模块时，应加载：

- C0：AI 权限和安全规则。
- C1：Uter 项目上下文。
- C2：支付架构、订单状态、支付渠道规则。
- C3：当前 Commit、相关代码、测试和错误日志。

不应无差别加载整个仓库所有文档。

## 5.3 上下文完整性

在执行任务前，AI 必须判断上下文是否足够。

需要检查：

- 需求是否明确。
- 业务规则是否存在。
- 关键架构是否明确。
- 设计要求是否明确。
- 修改范围是否明确。
- 验收条件是否明确。
- 风险是否明确。

缺失的信息必须标记。

对于不影响正确性的一般细节，可以采用明确的合理默认值。

对于会影响资金、权限、用户数据、安全或不可逆业务行为的信息，不允许猜测。

## 5.4 上下文冲突

如果多个知识源冲突，AI 必须：

1. 找出冲突字段。
2. 列出各自来源。
3. 比较时间和适用范围。
4. 判断是否存在已批准的替代关系。
5. 选择有明确权威依据的知识。
6. 无法确定时标记 UNKNOWN。
7. 对关键冲突进行人工确认。

不得通过选择最方便实现的方案来解决业务冲突。

---

# 6. 技术决策记录（ADR）

## 6.1 适用范围

以下事项必须建立 ADR：

- 技术栈变更。
- 系统架构变更。
- 模块边界调整。
- 数据库重大设计。
- API 契约变化。
- 身份认证与授权模型变化。
- 支付系统架构变化。
- 跨平台技术路线选择。
- 重大第三方依赖引入。
- 重大安全策略变化。
- 关键性能方案变化。

普通实现细节不需要滥用 ADR。

## 6.2 ADR 状态

- PROPOSED
- ACCEPTED
- REJECTED
- DEPRECATED
- SUPERSEDED

## 6.3 ADR 模板

```markdown
# ADR-XXXX: Decision Title

## Metadata
- ID:
- Status:
- Date:
- Owner:
- Related Tasks:
- Related Standards:

## 1. Context
为什么需要决策？

## 2. Problem
需要解决的问题是什么？

## 3. Constraints
有哪些业务、技术和安全约束？

## 4. Options
有哪些可选方案？

## 5. Decision
最终采用什么方案？

## 6. Reasons
为什么选择该方案？

## 7. Consequences
正面影响、负面影响和技术债务。

## 8. Security Impact
安全和隐私影响。

## 9. Migration
迁移与回滚方式。

## 10. Verification
如何验证决策实施正确？

## 11. References
相关代码、文档和证据。
```

## 6.4 决策有效性

新决策取代旧决策时：

- 不删除旧 ADR。
- 将旧 ADR 标记为 SUPERSEDED。
- 指向新 ADR。
- 记录变更原因。
- 记录迁移影响。

---

# 7. 需求与知识追踪

## 7.1 追踪关系

重要业务需求必须建立可追踪关系：

```text
Requirement
    |
    v
Business Rule
    |
    v
Architecture Decision
    |
    v
Module / API / Data Model
    |
    v
Implementation
    |
    v
Test Case
    |
    v
Verification Evidence
```

## 7.2 追踪 ID

建议使用：

- REQ：需求。
- BR：业务规则。
- ADR：架构决策。
- API：API 契约。
- DATA：数据模型。
- DES：设计规范。
- TASK：工程任务。
- TEST：测试用例。
- EVD：验证证据。

各类 ID 必须唯一。

## 7.3 追踪要求

关键业务需求必须能够追溯到：

- 实现模块。
- 相关接口。
- 相关数据。
- 测试用例。
- 验收证据。

关键实现必须能够反向追溯到需求、缺陷或经过批准的技术决策。

无法建立追踪关系时，应记录原因和风险。

---

# 8. 项目状态管理

## 8.1 项目状态与项目计划分离

PROJECT-STATUS 只能描述经过验证的当前事实。

PROJECT-PLAN 用于描述未来目标。

不得将计划中的功能描述为已经完成。

## 8.2 状态字段

建议至少包含：

```yaml
project:
  name: Uter
  status: ACTIVE

baseline:
  repository: "<repository>"
  commit_sha: "<verified-sha>"
  branch: "<verified-branch>"

platforms:
  pc_web:
    status: ACTIVE
  h5:
    status: UNKNOWN
  android:
    status: PLANNED
  ios:
    status: PLANNED
  harmonyos:
    status: PLANNED

engineering:
  frontend:
    status: VERIFIED
  backend:
    status: VERIFIED
  automated_testing:
    status: VERIFIED
  security:
    status: UNKNOWN
```

注意：

- 示例状态不是对当前仓库的实时审计结论。
- 所有状态必须根据实际代码和证据更新。
- 未验证不得填写 VERIFIED。
- 计划平台不得被标记为 ACTIVE。

## 8.3 状态更新

每次重要工程任务完成后，应更新受影响的项目状态。

禁止每次任务结束时无差别重写全部项目知识。

只更新发生变化的部分。

---

# 9. 知识更新与失效管理

## 9.1 更新触发条件

以下事件必须触发知识审查：

- 新增模块。
- 删除模块。
- 技术栈变化。
- API 契约变化。
- 数据模型变化。
- 业务规则变化。
- 设计系统变化。
- 平台扩展。
- 安全策略变化。
- CI 工作流变化。
- 关键技术决策变化。

## 9.2 知识有效期

知识必须能够判断是否仍然有效。

关键知识至少需要：

- created_at。
- updated_at。
- verified_at。
- source_revision。
- owner。
- status。

## 9.3 失效检测

出现以下情况时必须重新验证：

1. 引用文件已经删除。
2. 引用代码已经变化。
3. 相关 API 已经变更。
4. ADR 已经被替代。
5. 规范版本已升级。
6. 技术依赖已发生重大变化。
7. 项目状态已改变。

## 9.4 禁止无证据更新

AI 不得仅凭推断修改权威项目事实。

对于无法验证的更新，应创建 PROPOSED 记录，而不是直接覆盖 ACTIVE 知识。

---

# 10. 知识检索与上下文压缩

## 10.1 检索策略

AI 必须优先检索与当前任务直接相关的知识。

推荐顺序：

1. 当前任务描述。
2. 相关批准规范。
3. 相关业务规则。
4. 相关架构和 ADR。
5. 相关模块代码。
6. 相关测试。
7. 当前工程证据。
8. 历史资料。

不得将历史文档排在当前批准规范之前。

## 10.2 检索结果

重要知识检索必须保留：

- Source ID。
- 文件路径。
- 相关版本。
- 相关 Commit。
- 内容摘要。
- 原始引用位置。

## 10.3 上下文压缩

长任务需要压缩上下文时，必须保留：

- 原始任务目标。
- 用户明确要求。
- 已批准的业务规则。
- 已批准的架构决策。
- 当前 Git 基线。
- 已完成工作。
- 未完成工作。
- 失败记录。
- 当前权限。
- 下一步任务。
- 必须保留的风险。

不得仅保留摘要而丢失关键约束。

## 10.4 上下文恢复

新的 Agent 接手任务时，必须读取交接记录，并核对当前工程状态。

不得仅凭前一个 Agent 的自然语言总结认定修改已经成功。

必须重新验证关键状态。

---

# 11. 多 Agent 知识一致性

## 11.1 共享知识

所有 Agent 必须使用同一权威知识源。

Agent 可以创建局部分析笔记，但不得擅自建立互相冲突的权威规则。

## 11.2 知识写入权限

| 角色 | 允许操作 |
|---|---|
| Orchestrator | 读取、汇总、提交待批准知识变更 |
| Product Analyst | 创建需求和业务规则草案 |
| Architect | 创建架构方案和 ADR 草案 |
| Engineer | 更新实现事实和技术文档草案 |
| Reviewer | 提出知识冲突和缺失 |
| Human Approver | 批准权威知识变更 |

Agent 角色本身不自动获得实际文件系统或平台权限。

实际写入权限仍由治理层授权。

## 11.3 多 Agent 冲突

当 Agent 对项目事实或技术方案存在不同判断：

- 保留各自证据。
- 明确争议点。
- 比较权威来源。
- 由责任领域决定。
- 需要业务决策时升级给用户。

禁止通过多数 Agent 投票替代业务事实。

---

# 12. 知识质量指标

UAES 必须能够衡量知识质量。

| 指标 | 定义 |
|---|---|
| Source Coverage | 关键知识具有权威来源的比例 |
| Verification Coverage | 关键事实已验证的比例 |
| Freshness | 知识更新及时性 |
| Traceability | 需求到实现和测试的可追踪比例 |
| Conflict Rate | 未解决知识冲突比例 |
| Duplication Rate | 重复维护的权威知识比例 |
| Stale Reference Rate | 失效引用比例 |
| Unknown Rate | 关键事实未知比例 |

关键业务、架构和安全知识的冲突必须在实施前解决，不能通过降低指标要求绕过。

---

# 13. 强制规则索引

| Rule ID | 规则 | 级别 |
|---|---|---|
| UAES-03-001 | 知识分类 | MUST |
| UAES-03-002 | 知识状态管理 | MUST |
| UAES-03-003 | 权威来源管理 | MUST |
| UAES-03-004 | 当前事实与历史事实分离 | MUST |
| UAES-03-005 | 关键事实必须具有证据 | MUST |
| UAES-03-006 | 上下文分层 | MUST |
| UAES-03-007 | 上下文完整性检查 | MUST |
| UAES-03-008 | 知识冲突处理 | MUST |
| UAES-03-009 | 关键决策必须建立 ADR | MUST |
| UAES-03-010 | 需求与实现追踪 | MUST |
| UAES-03-011 | 项目状态与计划分离 | MUST |
| UAES-03-012 | 知识更新审查 | MUST |
| UAES-03-013 | 失效知识检测 | MUST |
| UAES-03-014 | 上下文压缩保护 | MUST |
| UAES-03-015 | 多 Agent 知识一致性 | MUST |
| UAES-03-016 | 未验证事实不得标记为已验证 | MUST |

---

# 14. 验收标准

本标准必须满足：

1. 项目知识具有明确分类。
2. 知识具有统一状态。
3. 关键知识具有权威来源。
4. 当前事实和历史事实可以区分。
5. 项目上下文可以分层加载。
6. 关键任务具有上下文完整性检查。
7. 关键决策可以通过 ADR 追踪。
8. 需求可以追踪到实现和测试。
9. 项目状态与未来计划分离。
10. 失效知识可以识别。
11. 多 Agent 可以共享权威知识。
12. 上下文压缩不会丢失任务约束。
13. 知识冲突有明确处理机制。
14. 关键知识更新可以审计。

**END OF UAES-03**