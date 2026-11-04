# UAES-04-011 — Concurrency, Consistency & Idempotency Standard

**Standard ID:** UAES-04-011  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

确保 Uter 在多请求、多 goroutine、多实例、重复回调和任务重试情况下保持正确的数据状态。

## 2. Concurrency requirements

- UAES-CON-001：共享可变状态必须有明确同步机制。
- UAES-CON-002：并发写入必须考虑冲突。
- UAES-CON-003：关键状态转换必须具有原子性。
- UAES-CON-004：不得仅依赖前端按钮禁用防止重复操作。
- UAES-CON-005：不得仅依赖单实例内存锁保证多实例正确性。
- UAES-CON-006：数据库唯一约束应作为重要重复写入防线。
- UAES-CON-007：并发失败必须有明确错误或重试处理。

## 3. Idempotency model

幂等操作必须定义：

| Field               | Meaning                         |
| ------------------- | ------------------------------- |
| Idempotency Key     | 唯一请求标识                          |
| Scope               | 用户、订单、业务类型或接口范围                 |
| Request Fingerprint | 请求内容一致性识别                       |
| Result              | 首次执行结果                          |
| Status              | PROCESSING / COMPLETED / FAILED |
| Expiry              | 幂等记录保留期限                        |

规则：

- UAES-CON-008：相同幂等键和相同请求必须返回一致结果或明确的处理中状态。
- UAES-CON-009：相同幂等键但不同请求内容必须拒绝。
- UAES-CON-010：并发请求必须只有一个有效执行者。
- UAES-CON-011：幂等记录和业务变更必须具有合理的原子性。
- UAES-CON-012：幂等记录过期不得导致业务记录重复执行。

## 4. Financial operation safety

涉及充值、支付、退款和余额时：

1. 订单状态必须合法转换；
2. 金额必须与原订单和渠道记录一致；
3. 通知必须验签；
4. 重复通知必须幂等；
5. 并发回调不得重复入账；
6. 余额变更必须与账务流水保持一致；
7. 外部支付结果不确定时必须主动查询或对账；
8. 超时不得直接认定支付失败；
9. 补偿操作必须记录来源；
10. 人工修复必须留下审计记录。

## 5. Optimistic and pessimistic locking

根据业务场景选择：

- 乐观锁；
- 悲观锁；
- 唯一约束；
- 条件更新；
- 原子 SQL；
- 事务隔离；
- 分布式协调。

不得在没有竞争场景分析的情况下随意引入分布式锁。

## 6. Deadlock prevention

必须考虑：

- 锁顺序一致；
- 事务尽可能短；
- 合理设置超时；
- 避免事务内外部网络调用；
- 识别死锁错误；
- 仅对安全场景进行有限重试。

## 7. Acceptance criteria

- 并发关键路径已识别；
- 关键状态转换具备原子性；
- 幂等键和作用域明确；
- 重复请求测试通过；
- 多实例场景有验证；
- 资金操作不会重复入账；
- 死锁和超时具备恢复策略。
