# UAES-04-010 — Async Task & Event Architecture Standard

**Standard ID:** UAES-04-010  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

规范 Uter 的异步任务、后台处理、事件通知和任务生命周期，避免重复执行、任务丢失、状态不一致和后台资源泄漏。

## 2. Task model

适用任务类型包括但不限于：

- AI Relay 请求处理；
- 模型或价格同步；
- 支付状态主动查询；
- 账务对账；
- 数据同步；
- 通知投递；
- 长时间后台任务。

这些是架构适用场景，不代表每一种任务都已经存在独立队列或消息中间件。

## 3. Task lifecycle

每类任务必须定义：

- 唯一任务 ID；
- 任务类型；
- 输入参数；
- 创建来源；
- 当前状态；
- 创建时间；
- 开始时间；
- 完成时间；
- 重试次数；
- 错误信息；
- 超时策略；
- 幂等策略；
- 取消策略。

推荐状态：

```
PENDING
   |
   v
QUEUED
   |
   v
RUNNING
   |
   +------> SUCCEEDED
   |
   +------> FAILED
   |
   +------> RETRY_WAIT
   |
   +------> CANCELLED
   |
   +------> TIMED_OUT
```

具体状态必须由实际业务定义。不能机械地为所有任务使用同一状态机。

## 4. Task execution

- UAES-ASYNC-001：任务必须有明确的执行入口。
- UAES-ASYNC-002：任务必须有明确的生命周期。
- UAES-ASYNC-003：任务执行必须有超时和取消机制。
- UAES-ASYNC-004：任务重试必须限制次数或总时长。
- UAES-ASYNC-005：重试必须区分可重试和不可重试错误。
- UAES-ASYNC-006：任务执行必须有可观察结果。
- UAES-ASYNC-007：关键任务必须能识别重复执行。
- UAES-ASYNC-008：后台 goroutine 必须有退出机制。

## 5. Event model

事件必须定义：

- Event ID；
- Event type；
- Event version；
- Aggregate ID；
- Occurred at；
- Producer；
- Payload；
- Correlation ID；
- Trace ID。

事件必须表达已经发生的事实，不得将未完成的意图伪装成成功事件。

## 6. Transactional event delivery

当数据库提交与事件投递必须保持一致时，应评估 Transactional Outbox。

基本流程：

1. 在同一个数据库事务中写入业务数据和 Outbox 记录；
2. 提交事务；
3. 后台投递 Outbox；
4. 记录投递结果；
5. 失败后按策略重试；
6. 消费者进行幂等处理。

不能先提交业务数据，再假设后续事件一定能够成功发送。

## 7. Consumer rules

- UAES-ASYNC-009：消费者必须能处理重复事件。
- UAES-ASYNC-010：消费者必须校验事件版本。
- UAES-ASYNC-011：消费者必须记录处理结果。
- UAES-ASYNC-012：失败事件必须有恢复或人工处理路径。
- UAES-ASYNC-013：事件顺序有要求时必须明确排序机制。
- UAES-ASYNC-014：禁止依赖不可靠的全局执行顺序。

## 8. Retry and dead-letter

重试策略必须定义：

- 最大次数；
- 初始延迟；
- 最大延迟；
- 退避策略；
- 可重试错误；
- 不可重试错误；
- 死信处理；
- 人工重放权限。

资金操作不得因盲目重试导致重复入账或重复扣费。

## 9. Acceptance criteria

- 任务状态机明确；
- 任务执行可追踪；
- 重试可控；
- 重复任务可识别；
- 事件契约稳定；
- 重要事件具备可靠投递策略；
- 失败任务有恢复机制；
- 任务和事件具有关联追踪标识。
