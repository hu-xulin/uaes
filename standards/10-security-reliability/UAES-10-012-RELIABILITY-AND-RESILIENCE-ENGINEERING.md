# UAES-10-012 — Reliability and Resilience Engineering

| Field | Value |
| --- | --- |
| ID | UAES-10-012 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立服务可用性、故障隔离、降级、恢复和容量管理基线。

## 2. Reliability Objectives

关键服务 MUST 定义：

- SLI：服务质量指标；
- SLO：目标；
- Error Budget：错误预算或等效风险容忍机制；
- Dependency Map：依赖关系；
- Failure Mode：故障模式；
- Recovery Strategy：恢复策略。

SLO 必须由业务重要性、用户影响和实际能力确定，不得随意承诺 99.99% 等数字。

## 3. Resilience Controls

- 外部 HTTP/RPC 调用 MUST 设置连接和整体超时。
- 重试必须有上限、退避和抖动策略。
- 非幂等操作不得盲目重试。
- 关键依赖必须有隔离策略，防止故障扩散。
- 高负载路径必须限制并发、队列长度和资源消耗。
- 关键后台任务必须支持失败重试、死信或人工恢复。
- 进程关闭必须支持优雅终止和任务收敛。

## 4. Consistency and Idempotency

关键业务操作 MUST 具备：

- 唯一业务请求标识；
- 幂等键或唯一约束；
- 原子状态转换；
- 重复请求保护；
- 并发竞争处理；
- 超时后的状态查询；
- 异常恢复机制。

## 5. Degradation

降级必须明确：

- 可降级功能；
- 不可降级功能；
- 数据一致性影响；
- 用户提示；
- 恢复条件；
- 审计记录。

安全和资金一致性不能为了可用性而静默绕过。

## 6. Capacity and Resource Limits

必须为请求体、连接、队列、并发、文件、缓存、数据库连接和模型调用设置合理上限。

## 7. Acceptance

关键服务有可靠性指标、超时和重试策略；故障注入或等效测试验证隔离和恢复；关键状态转换具备幂等与并发测试。
