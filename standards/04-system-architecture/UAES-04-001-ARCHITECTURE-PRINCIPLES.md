# UAES-04-001 — Architecture Principles & Decision Records

**Standard ID:** UAES-04-001  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

规定 Uter 架构设计的基本原则、决策流程和决策记录机制，避免架构由 AI 临时生成、反复推翻或因缺少依据而持续膨胀。

## 2. Architecture principles

### AP-001 — Business-first

架构必须服务于已确认的产品需求和业务规则。

不得为了引入某种技术而反向创造业务需求。

### AP-002 — Simplicity before complexity

优先采用简单、可维护、可验证的方案。

引入新的基础设施必须说明：
- 当前方案无法解决的问题；
- 新方案带来的收益；
- 运维成本；
- 资源成本；
- 故障模式；
- 迁移和退出成本。

### AP-003 — Explicit module ownership

每个核心业务模块必须明确：
- 业务职责；
- 数据所有权；
- 对外接口；
- 依赖模块；
- 禁止依赖；
- 维护责任。

### AP-004 — Stable contracts

模块之间通过明确的接口、DTO、事件或协议交互。

禁止依赖其他模块的内部实现细节。

### AP-005 — Data integrity first

涉及用户身份、支付、充值、余额、退款、Token 计费和任务状态的数据变更，必须优先保证正确性和可恢复性。

不得为了性能而静默降低资金或计费数据的一致性要求。

### AP-006 — Failure isolation

外部依赖必须有明确的超时、错误分类、重试和降级策略。

一个外部服务故障不应无边界地扩散到整个系统。

### AP-007 — Compatibility by design

接口和数据结构演进必须考虑旧版本客户端、正在运行的任务和并行部署实例。

### AP-008 — Observable by default

关键业务流程必须具备可追踪的日志、指标和必要的链路信息。

### AP-009 — Security boundaries

不同信任域必须有明确边界。特别是：
- Browser 与 Backend；
- Renderer 与 Electron Main；
- 用户输入与系统命令；
- 外部 API 与内部服务；
- 普通业务操作与资金操作。

### AP-010 — Evolutionary architecture

架构必须允许增量演进。没有充分理由时，不得一次性重写整个模块或替换整个技术栈。

## 3. Architecture decision classification

| Class | Decision | ADR requirement |
|---|---|---|
| A0 | 局部实现细节 | 不要求 |
| A1 | 单模块内部结构 | 视复杂度决定 |
| A2 | 跨模块依赖或接口 | MUST |
| A3 | 数据模型、核心状态机、关键基础设施 | MUST |
| A4 | 身份、资金、安全边界、系统级技术栈 | MUST + 显式审批 |

以下事项至少属于 A3：

- 数据库类型或主数据存储方式变更；
- Redis 使用方式改变；
- 引入消息中间件；
- 核心业务模块拆分；
- API 认证协议变化；
- 支付订单和余额账本结构变化；
- Token 计费和扣费策略变化；
- 异步任务执行模型变化。

## 4. ADR lifecycle

PROPOSED → UNDER_REVIEW → ACCEPTED / REJECTED

后续演进：

ACCEPTED → SUPERSEDED / DEPRECATED

规则：

1. ADR 创建后必须有唯一 ID。
2. 未接受的 ADR 不得被描述为当前架构事实。
3. 已接受的 ADR 必须能够追踪到实现。
4. 被替代的 ADR 必须关联替代它的新 ADR。
5. 重要实现与 ADR 不一致时，必须创建差异记录。
6. 不得删除不利于当前方案的历史 ADR。

## 5. ADR template

每个 ADR 使用以下模板：

```markdown
# ADR-NNNN: Decision Title

- Status: PROPOSED
- Date: YYYY-MM-DD
- Decision Owner:
- Related Requirements:
- Related Modules:
- Supersedes:
- Superseded By:

## 1. Context
## 2. Problem
## 3. Constraints
## 4. Options Considered

### Option A
### Option B
### Option C

## 5. Decision
## 6. Reasons
## 7. Consequences

### Positive
### Negative
### Risks

## 8. Security Impact
## 9. Data Impact
## 10. Performance Impact
## 11. Migration Plan
## 12. Rollback Plan
## 13. Verification Plan
## 14. Implementation References
## 15. Open Questions
```

## 6. AI decision rules

AI MUST：
- 先识别决策等级；
- 对 A2 及以上决策创建 ADR；
- 对 A3、A4 决策说明替代方案；
- 对 A4 决策等待明确批准后实施；
- 不得将自己的建议标记为 ACCEPTED；
- 不得把代码中偶然存在的实现认定为合理架构；
- 不得因短期实现方便而破坏长期模块边界。

## 7. Acceptance criteria

- 关键架构决策均可追踪；
- ADR 状态准确；
- 决策与代码实现一致；
- 高风险决策有批准记录；
- 迁移和回滚方案可执行；
- 被替代的决策仍可查询。