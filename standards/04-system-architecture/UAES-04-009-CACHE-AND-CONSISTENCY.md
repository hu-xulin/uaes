# UAES-04-009 — Cache & Data Consistency Standard

**Standard ID:** UAES-04-009  
**Version:** 1.0.0  
**Status:** DRAFT  
**Technology baseline:** Redis

## 1. Purpose

规范 Uter 的缓存使用、缓存失效、数据同步、多实例一致性和缓存故障处理。

## 2. Cache principles

- UAES-CACHE-001：缓存不是权威数据源，除非经过明确架构决策。
- UAES-CACHE-002：每项缓存必须明确数据来源。
- UAES-CACHE-003：缓存必须有明确过期策略。
- UAES-CACHE-004：缓存必须定义失效条件。
- UAES-CACHE-005：缓存故障不得导致权威数据不可恢复。
- UAES-CACHE-006：缓存键必须有命名规范和作用域。
- UAES-CACHE-007：缓存内容不得泄露其他用户的数据。
- UAES-CACHE-008：缓存大小和生命周期必须受到控制。

## 3. Cache key

建议结构：

```
{application}:{environment}:{domain}:{entity}:{identifier}:{version}
```

实际键名必须与现有工程兼容，不能直接批量改名而不提供迁移方案。

要求：

- 具有明确业务归属；
- 用户级数据包含适当隔离维度；
- 不将敏感信息直接放入键名；
- 具有 TTL；
- 具备必要的版本区分；
- 防止键冲突。

## 4. Cache invalidation

必须明确：

- 写入后是否立即失效；
- 更新后是否重建；
- 删除后如何清除；
- 多实例如何同步；
- 更新失败如何恢复；
- 是否允许短暂旧值；
- 最长可接受陈旧时间。

优先选择简单、可验证的策略。不得假设删除本地缓存就能同步清除所有实例中的 Redis 或进程缓存。

## 5. Consistency classification

每类数据必须明确一致性要求：

| Data type  | Consistency requirement |
| ---------- | ----------------------- |
| 支付订单状态     | 强一致性处理关键转换              |
| 余额与账务流水    | 强一致性                    |
| Token 扣费依据 | 强一致性或可审计的严格补偿机制         |
| 用户权限       | 不得长期使用过期授权              |
| 模型价格       | 必须有明确生效时间和版本            |
| 模型列表       | 可允许短暂最终一致               |
| 非关键统计数据    | 可按业务允许最终一致              |

最终一致性必须明确最大延迟、冲突解决方式和恢复机制。

## 6. Multi-instance behavior

- UAES-CACHE-009：多实例一致性不得依赖进程内缓存失效。
- UAES-CACHE-010：跨实例锁必须有租约、超时和故障处理。
- UAES-CACHE-011：分布式锁不得被当作唯一的数据正确性保障。
- UAES-CACHE-012：缓存失效通知必须可观察。
- UAES-CACHE-013：Redis 故障时必须定义降级或拒绝服务策略。

## 7. Cache stampede and penetration

必须评估：

- 缓存击穿；
- 缓存雪崩；
- 缓存穿透；
- 热点键；
- 大 Key；
- 慢查询；
- 内存耗尽。

按实际负载选择 singleflight、随机 TTL、负缓存、限流或预热，不要求无差别引入所有机制。

## 8. Acceptance criteria

- 缓存数据来源明确；
- TTL 和失效策略明确；
- 多实例行为有验证；
- 权限和用户数据隔离；
- Redis 不可用时行为明确；
- 缓存故障不破坏权威数据；
- 关键缓存命中率和错误可观察。
