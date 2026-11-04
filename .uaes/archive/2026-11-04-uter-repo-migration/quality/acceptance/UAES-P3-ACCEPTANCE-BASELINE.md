# UAES P3 — System Architecture Acceptance Baseline

**Phase:** P3  
**Version:** 1.0.0  
**Status:** DRAFT  
**Gate:** UAES-04-GATE-001

---

## 1. Acceptance objective

确认 UAES 系统架构标准不仅文档完整，而且能够指导 AI 正确理解、分析、修改和验证 Uter 的实际工程架构。

## 2. Documentation acceptance

| ID         | Acceptance item           | Required |
| ---------- | ------------------------- | -------- |
| P3-DOC-001 | 系统架构总标准                   | MUST     |
| P3-DOC-002 | 架构原则和 ADR                 | MUST     |
| P3-DOC-003 | 模块边界规范                    | MUST     |
| P3-DOC-004 | Go 后端架构规范                 | MUST     |
| P3-DOC-005 | React 前端架构规范              | MUST     |
| P3-DOC-006 | Electron 架构规范             | MUST     |
| P3-DOC-007 | API 契约规范                  | MUST     |
| P3-DOC-008 | 数据库规范                     | MUST     |
| P3-DOC-009 | 缓存一致性规范                   | MUST     |
| P3-DOC-010 | 异步与事件规范                   | MUST     |
| P3-DOC-011 | 并发与幂等规范                   | MUST     |
| P3-DOC-012 | 第三方集成规范                   | MUST     |
| P3-DOC-013 | 可观测性规范                    | MUST     |
| P3-DOC-014 | 机器可读 Schema               | MUST     |
| P3-DOC-015 | Architecture Quality Gate | MUST     |

## 3. Architecture inventory acceptance

必须基于固定 Commit SHA 实际扫描 Uter 仓库，形成：

- 实际 Go modules 清单；
- 实际 Go package 依赖图；
- 前端业务模块清单；
- Electron 进程和 IPC 清单；
- 数据库表和核心实体清单；
- API 路由和契约清单；
- Redis 使用清单；
- 后台任务和事件清单；
- 第三方服务依赖清单。

每项必须区分：

- VERIFIED：已从代码或运行证据确认；
- INFERRED：根据代码推断；
- PROPOSED：建议目标；
- UNKNOWN：尚未查明。

不得用目标架构图代替现状扫描结果。

## 4. Automated verification acceptance

| Check                        | Expected evidence              |
| ---------------------------- | ------------------------------ |
| Schema validation            | 所有 Schema 可被 Validator 解析和验证   |
| Go module inventory          | 全部 Go module 纳入                |
| Go dependency analysis       | 依赖图和循环依赖结果                     |
| Frontend dependency analysis | 模块导入边界报告                       |
| Electron security scan       | Main / Preload / Renderer 权限检查 |
| API contract validation      | 契约与实现差异报告                      |
| Migration validation         | 迁移结构和回滚检查                      |
| Concurrency tests            | 关键并发路径测试                       |
| Race detection               | 适用 Go 模块的 race 结果              |
| Architecture Gate            | 结构化门禁报告                        |

## 5. AI practical acceptance

必须至少执行以下模拟任务：

### Test A — Module boundary change

向 AI 提供跨模块调用需求。

合格条件：

- 正确识别模块所有者；
- 检查依赖方向；
- 不直接访问内部实现；
- 必要时提出接口方案；
- 输出影响分析。

### Test B — Database schema change

向 AI 提供新增核心业务字段需求。

合格条件：

- 分析现有数据模型；
- 识别数据库兼容性；
- 提供迁移方案；
- 考虑旧版本兼容；
- 提供回滚方案；
- 设计测试。

### Test C — Payment callback change

向 AI 提供支付回调逻辑变更需求。

合格条件：

- 识别签名验证；
- 识别订单与金额校验；
- 识别重复通知；
- 识别并发入账；
- 识别主动查询和对账；
- 不将浏览器跳转视为到账依据。

### Test D — Electron IPC change

向 AI 提供新增桌面端系统能力的需求。

合格条件：

- 正确识别 Main / Preload / Renderer 边界；
- 最小化暴露能力；
- 验证 IPC 参数；
- 检查调用方权限；
- 不向 Renderer 暴露任意 Node.js 能力。

### Test E — Third-party failure

向 AI 提供上游 AI 服务超时或异常场景。

合格条件：

- 识别超时；
- 区分可重试和不可重试错误；
- 防止重复计费；
- 保留关联追踪；
- 提供恢复方案。

## 6. Acceptance status

每项验收必须使用：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
- NOT_VERIFIED

不得将未执行测试当作通过。

## 7. Final acceptance requirements

P3 只有同时满足以下条件才可宣布 ACCEPTED：

1. 文档完整；
2. Schema 验证通过；
3. 实际架构清单已建立；
4. 关键架构规则具有机器检查方式；
5. Architecture Gate 能够运行；
6. AI 实战任务达到验收要求；
7. 未解决的高风险问题有明确处置；
8. P3 与 P2 的需求和验收追踪关系明确。

## 8. Acceptance report

最终报告至少包含：

- Baseline Commit SHA；
- UAES Version；
- Architecture Inventory；
- Documentation Results；
- Schema Validation Results；
- Automated Check Results；
- AI Practical Test Results；
- Findings；
- Exceptions；
- Unverified Risks；
- Final Decision；
- Approver。

**P3 阶段最终状态：只有经过真实工程验证并获得批准后，才能从 DRAFT 变为 ACCEPTED。**
