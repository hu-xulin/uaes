# UAES-00 — Foundation Standard

**Standard ID:** UAES-00  
**Standard Name:** Foundation Standard  
**System:** UTER AI Engineering Standard  
**Version:** 1.0.0  
**Status:** DRAFT  
**Normative Level:** P0  
**Owner:** Uter Engineering Governance  
**Applies To:** All UAES domains, agents, engineers, tools and workflows  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

UAES（UTER AI Engineering Standard）是 Uter 项目的统一 AI 软件工程标准体系。

UAES 的目标不是简单规范 AI 如何编写代码，而是建立覆盖软件产品全生命周期的工程治理体系，使 AI Agent、开发人员、自动化工具和 CI/CD 流程能够在统一规则下完成：

1. 需求理解和产品分析。
2. 项目知识获取和上下文管理。
3. 系统架构设计和技术决策。
4. 设计系统和用户体验实现。
5. 前后端软件开发。
6. 多平台工程实施。
7. Agent 与自动化工作流协作。
8. 代码审查、测试和自动修复。
9. 安全、可靠性和供应链管理。
10. 构建、交付、发布和回滚。
11. 运行监控、问题响应和持续演进。

UAES 必须同时具备：

- 人类可阅读的规范文件。
- AI 可理解的执行约束。
- 工具可读取的机器可读配置。
- CI 可执行的质量门禁。
- 可复现的验证流程。
- 可审计的执行证据。

任何仅存在于 Markdown 中、没有验证方式的强制规则，都不得被视为已经完成工程化实施。

## 2. Scope

UAES 适用于 Uter 的：

- Go 后端及其 Go Modules。
- React / TypeScript Web 前端。
- Electron 桌面端。
- 后续 Android、iOS、H5、HarmonyOS 等平台。
- API、数据库、缓存、消息和第三方服务。
- 支付、充值、余额、Token、用户认证等业务域。
- AI Agent、Skills、工具调用及自动化任务。
- 本地开发、测试、CI、构建和交付环境。

UAES 不要求一次性重写现有工程。现有代码、脚本、CI、设计资产和工具必须经过审计，确定符合性后才能复用。

## 3. System Architecture

UAES 采用五层治理与执行架构。

### L1 — Governance Layer

负责：

- 标准体系和优先级。
- Agent 身份、角色和权限。
- 高风险操作审批。
- 责任归属和异常升级。
- 规则冲突裁决。

### L2 — Knowledge Layer

负责：

- 项目事实。
- 产品需求。
- 架构和技术决策。
- 设计系统。
- 工程标准。
- 项目状态与执行记录。
- 知识来源、时效性和可信度。

### L3 — Agent Execution Layer

负责：

- 任务分析和拆分。
- Agent 角色分配。
- Skills 和工具使用。
- 代码和配置变更。
- 多 Agent 协作与交接。
- 执行过程和变更记录。

### L4 — Verification Layer

负责：

- 代码审查。
- 自动化测试。
- 静态分析。
- 安全扫描。
- 架构和依赖检查。
- Design Quality Gate。
- 自动修复后的回归验证。

### L5 — Delivery & Evolution Layer

负责：

- Git 分支和提交。
- Pull Request。
- CI/CD。
- 构建和发布。
- 回滚和故障恢复。
- 监控、反馈和规范演进。

## 4. Standard Domains

UAES 包含以下 13 个一级领域：

| Domain ID | Domain | Directory |
|---|---|---|
| UAES-00 | Foundation | standards/00-foundation |
| UAES-01 | AI Governance | standards/01-ai-governance |
| UAES-02 | Product Engineering | standards/02-product-engineering |
| UAES-03 | Knowledge Engineering | standards/03-knowledge-engineering |
| UAES-04 | System Architecture | standards/04-system-architecture |
| UAES-05 | Experience & Design | standards/05-experience-design |
| UAES-06 | Software Engineering | standards/06-software-engineering |
| UAES-07 | Cross-Platform Engineering | standards/07-cross-platform |
| UAES-08 | Agent Engineering | standards/08-agent-engineering |
| UAES-09 | Quality Engineering | standards/09-quality-engineering |
| UAES-10 | Security & Reliability | standards/10-security-reliability |
| UAES-11 | DevOps & Delivery | standards/11-devops-delivery |
| UAES-12 | Lifecycle & Evolution | standards/12-lifecycle-evolution |

每个领域必须具备：

1. Domain Standard。
2. 独立子标准。
3. 规则 ID。
4. 机器可读配置（适用时）。
5. Quality Gate。
6. Acceptance Baseline。
7. 依赖关系。
8. 变更历史。

## 5. Normative Language

UAES 使用以下规范术语：

| Keyword | Meaning |
|---|---|
| MUST | 强制要求，必须执行 |
| MUST NOT | 绝对禁止 |
| SHOULD | 强烈建议，偏离必须说明理由 |
| SHOULD NOT | 通常禁止，例外必须说明理由 |
| MAY | 可选要求 |

AI 不得将 MUST 降级为 SHOULD，也不得将 MUST NOT 解释为可自由选择。

## 6. Rule Classification

每条规则必须具有唯一 ID 和以下元数据：

- Rule ID。
- Rule Title。
- Requirement Level。
- Scope。
- Rationale。
- Implementation Guidance。
- Verification Method。
- Acceptance Criteria。
- Owner。
- Related Rules。
- Exception Policy（如适用）。

规则 ID 不得重复，不得在不同文件中指向不同含义。

## 7. Priority and Risk

### 7.1 Priority

| Priority | Meaning |
|---|---|
| P0 | 系统级关键规则；不满足时阻断相关流程 |
| P1 | 重要规则；不满足时原则上阻断交付 |
| P2 | 一般工程规则；允许在受控条件下延期 |
| P3 | 优化建议；不构成默认阻断条件 |

优先级表示规则的重要程度，不代表规则可以被忽略。

### 7.2 Risk

| Risk | Meaning |
|---|---|
| R0 | 无实质风险 |
| R1 | 低风险 |
| R2 | 中风险 |
| R3 | 高风险 |
| R4 | 极高风险或关键业务风险 |

风险等级必须根据影响范围、可逆性、数据敏感性、资金影响、安全影响和业务连续性评估。

## 8. Standard Status

标准状态：

- DRAFT：草案。
- IN_REVIEW：审查中。
- APPROVED：已批准。
- ACTIVE：正式生效。
- DEPRECATED：不建议继续使用。
- RETIRED：已退役。
- SUPERSEDED：已被新版本替代。

只有 ACTIVE 标准可以作为当前正式执行基线。DRAFT 标准可以用于试运行，但必须明确标识。

## 9. Mandatory Engineering Principles

### UAES-00-001 — Single Source of Truth

**MUST**：每个正式规则必须具有唯一权威定义位置。

**MUST NOT**：不得在多个文件中维护相互独立、可能产生冲突的同一规则副本。

其他文件可以引用规则 ID，但不得自行修改其含义。

### UAES-00-002 — Machine Verifiability

**MUST**：每条 MUST / MUST NOT 规则必须定义验证方式。

**MUST**：可以自动化的规则 SHOULD 由工具或 CI 执行验证。

**MUST NOT**：仅凭 AI 声称「已遵守规范」判定规则通过。

### UAES-00-003 — Evidence-Based Acceptance

**MUST**：所有验收结论必须具有证据。

证据可以包括：

- 命令执行记录。
- 测试报告。
- 静态分析报告。
- 安全扫描结果。
- CI Run。
- 代码审查记录。
- Schema 校验结果。
- 可复现的人工验收记录。

### UAES-00-004 — Least Privilege

**MUST**：Agent 仅获得当前任务所需的最小权限。

**MUST NOT**：Agent 不得将代码修改授权解释为生产部署、生产数据库修改或真实支付配置修改授权。

### UAES-00-005 — Change Isolation

**MUST**：涉及代码变更的任务必须明确工作区、分支、基线 Commit 和变更范围。

**MUST NOT**：不得覆盖用户未提交的本地修改。

### UAES-00-006 — Fail Closed

**MUST**：关键安全、权限、资金和数据完整性验证缺失或失败时，相关操作必须停止或进入 BLOCKED。

不得通过忽略错误、跳过检查或伪造结果取得 PASS。

### UAES-00-007 — Traceability

**MUST**：重要需求、架构决策、代码变更、测试和验收结果之间必须建立可追踪关系。

## 10. Conflict Resolution

规则冲突按以下顺序处理：

1. 法律、监管和外部强制义务。
2. 明确授权边界和安全约束。
3. UAES Foundation。
4. 对应领域的 ACTIVE Domain Standard。
5. 对应子标准。
6. 项目级已批准 ADR 和专项政策。
7. 任务级要求。
8. AI 建议和默认行为。

同级冲突时：

- 先检查规则的适用范围。
- 再检查规则版本和生效时间。
- 再检查是否存在更具体的专项规则。
- 无法消除冲突时标记为 BLOCKED，提交治理责任人裁决。

AI 不得通过选择更宽松的规则自行消除冲突。

## 11. Standard Document Structure

所有正式标准原则上使用以下结构：

1. Purpose
2. Scope
3. Definitions
4. Core Principles
5. Mandatory Requirements
6. Implementation Rules
7. Prohibited Practices
8. AI Execution Rules
9. Verification
10. Acceptance Criteria
11. Exceptions
12. Dependencies and References
13. Change History

不适用的章节必须标记 N/A 并说明理由，不得静默删除关键章节。

## 12. Repository Structure

UAES 目标目录：

```text
uter/
├── AGENTS.md
├── CLAUDE.md
├── .uaes/
│   ├── SYSTEM-MANIFEST.md
│   ├── VERSION
│   ├── PROJECT-CONTEXT.md
│   ├── PROJECT-STATUS.md
│   ├── STANDARD-REGISTRY.yaml
│   ├── TOOL-ADAPTERS/
│   └── schemas/
├── standards/
│   ├── 00-foundation/
│   ├── 01-ai-governance/
│   ├── 02-product-engineering/
│   ├── 03-knowledge-engineering/
│   ├── 04-system-architecture/
│   ├── 05-experience-design/
│   ├── 06-software-engineering/
│   ├── 07-cross-platform/
│   ├── 08-agent-engineering/
│   ├── 09-quality-engineering/
│   ├── 10-security-reliability/
│   ├── 11-devops-delivery/
│   └── 12-lifecycle-evolution/
├── architecture/
│   └── decisions/
├── agents/
├── skills/
├── workflows/
├── quality/
│   ├── gates/
│   ├── acceptance/
│   └── policies/
└── reports/
    └── uaes/
```

此目录是目标结构，不代表当前仓库已经存在全部目录。

## 13. Definition of Done

UAES 体系只有同时满足以下条件，才可宣布完成：

- 13 个领域标准完整。
- 标准注册表完整且无重复 ID。
- 规范依赖关系无循环。
- Schema 可执行校验。
- 所有 P0/P1 强制规则有验证方式。
- 关键 Quality Gate 已接入实际工程流程。
- AI Agent 实战任务通过。
- 失败场景和权限边界测试通过。
- 文档与工具版本一致。
- 总验收报告具有可复现证据。

## 14. References

- NIST SP 800-218 Secure Software Development Framework。
- NIST SP 800-218A。
- OWASP Software Assurance Maturity Model。
- OWASP Application Security Verification Standard。

以上为参考资料，不代表 UAES 自动取得相关标准认证或合规资格。

## 15. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial UAES Foundation |
