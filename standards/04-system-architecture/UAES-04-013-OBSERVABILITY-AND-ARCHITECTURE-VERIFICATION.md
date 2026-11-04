# UAES-04-013 — Observability & Architecture Verification Standard

**Standard ID:** UAES-04-013  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

确保 Uter 的架构行为能够被观测、分析、验证和审计。

## 2. Observability pillars

必须根据系统实际能力逐步建立：

1. Logs；
2. Metrics；
3. Traces；
4. Health checks；
5. Audit events。

## 3. Logging

- UAES-OBS-001：关键业务操作必须有结构化日志。
- UAES-OBS-002：日志必须有时间和适当的关联标识。
- UAES-OBS-003：日志必须区分业务错误、系统错误和外部依赖错误。
- UAES-OBS-004：不得记录密码、完整令牌、私钥和支付敏感信息。
- UAES-OBS-005：不得把日志输出当作业务数据存储。
- UAES-OBS-006：高频路径必须控制日志量。

## 4. Metrics

适用指标包括：

- HTTP 请求量；
- 请求延迟；
- 错误率；
- 数据库连接池；
- 数据库查询延迟；
- Redis 命中率和错误率；
- 异步任务积压；
- 任务失败率；
- AI 上游延迟和错误率；
- Token 处理量；
- 支付回调处理结果。

指标名称、标签和采集工具应由项目实际选型决定。禁止使用用户 ID、订单 ID 等高基数值作为无限增长的指标标签。

## 5. Distributed tracing

跨模块和跨服务请求应保留必要的关联 ID。

涉及异步任务时，应将原始请求的关联信息传递到任务上下文。

不得把 Trace ID 当作身份认证凭据。

## 6. Health checks

区分：

- Liveness：进程是否存活；
- Readiness：是否能够接受业务请求；
- Dependency health：依赖服务状态。

依赖故障不一定意味着进程已经死亡。健康检查必须避免错误触发大规模重启。

## 7. Architecture verification

架构验证应覆盖：

- 模块依赖；
- 循环依赖；
- API 契约；
- 数据迁移；
- 数据所有权；
- 并发和幂等；
- 配置边界；
- Electron 安全；
- 外部服务超时；
- 资源生命周期。

验证报告必须记录：

- 固定 Commit SHA；
- 执行环境；
- 检查工具和版本；
- 检查范围；
- 结果；
- 失败证据；
- 未执行项目；
- 未验证风险。

## 8. Acceptance criteria

- 核心流程可追踪；
- 关键错误可分类；
- 关键依赖可观测；
- 任务执行有状态记录；
- 架构规则有验证入口；
- 验证结果可追溯到固定代码版本。
