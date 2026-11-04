# UAES-06-012 — State and Async Programming

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-012 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-04 |

## 1. Purpose

规范状态管理、异步任务、并发、取消、超时和资源生命周期。

## 2. Scope

Go 并发、React 状态、网络请求、后台任务、队列和 Electron IPC。

## 3. Definitions

- **State Ownership**：状态归属。
- **Async Operation**：异步操作。
- **Cancellation**：取消正在执行的任务。
- **Idempotency**：重复执行不会产生非预期副作用。
- **Backpressure**：对生产速度和消费速度差异的控制。

## 4. Core Principles

状态归属明确、异步行为可追踪、取消可传播、并发有界、幂等受控。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-012-001 | MUST 为重要状态声明唯一 Owner。 |
| UAES-06-012-002 | MUST 区分持久化状态、服务端状态和 UI 临时状态。 |
| UAES-06-012-003 | MUST 为异步操作定义成功、失败、取消和超时语义。 |
| UAES-06-012-004 | MUST 对并发任务设置合理资源边界。 |
| UAES-06-012-005 | MUST 对重复请求和重复任务明确幂等策略。 |
| UAES-06-012-006 | MUST 避免竞态条件和过期数据覆盖。 |
| UAES-06-012-007 | MUST 对资源关闭和任务退出提供清晰责任。 |
| UAES-06-012-008 | MUST 对任务重试定义次数、间隔和终止条件。 |
| UAES-06-012-009 | MUST 对跨进程和跨网络操作明确失败语义。 |
| UAES-06-012-010 | MUST 防止状态更新发生在已失效的生命周期中。 |

## 6. Implementation Rules

Go：

- 使用 Context 传播取消和截止时间。
- 使用有界队列或 Worker Pool 控制并发。
- 对共享状态明确锁或消息传递策略。

React：

- 服务端状态由 Query 管理。
- 客户端共享状态由 Store 管理。
- 局部交互状态由组件管理。
- 异步请求必须处理 loading/error/success。
- 对过期请求和竞态更新建立保护。

## 7. Prohibited Practices

- MUST NOT 无限重试。
- MUST NOT 无限创建后台任务。
- MUST NOT 通过 UI 禁用按钮代替后端幂等保护。
- MUST NOT 用多个 Store 维护同一事实的不同副本。
- MUST NOT 忽略任务取消和资源关闭。

## 8. AI Execution Rules

AI 修改状态和异步逻辑时必须说明状态 Owner、生命周期、重试、取消、并发和失败恢复行为。

## 9. Verification

由 P09 执行并发、race、异步状态和异常场景验证。

## 10. Acceptance Criteria

状态来源明确，任务有边界，取消和失败可控，重复执行行为明确。

## 11. Exceptions

必须记录有意采用的最终一致性和异步补偿策略。

## 12. References

UAES-04-009、UAES-04-010、UAES-04-011、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
