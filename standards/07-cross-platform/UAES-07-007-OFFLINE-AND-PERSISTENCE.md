# UAES-07-007 — Offline and Persistence

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-007 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范跨平台缓存、本地存储、离线行为和数据同步。

## 2. Scope

浏览器存储、Electron 本地存储、移动端持久化、离线队列和数据同步。

## 3. Definitions

- Offline Mode：网络不可用或受限时的运行模式。
- Local Persistence：本地持久化。
- Sync Queue：待同步任务队列。
- Conflict Resolution：同步冲突解决。
- Sensitive Data：敏感数据。

## 4. Core Principles

服务端权威、本地最小持久化、明确同步状态、冲突可处理、敏感数据受保护。

## 5. Mandatory Requirements

- UAES-07-007-001 MUST 明确每类数据的权威来源。
- UAES-07-007-002 MUST 区分缓存与业务持久化。
- UAES-07-007-003 MUST 为离线操作定义支持范围。
- UAES-07-007-004 MUST 为待同步操作定义状态。
- UAES-07-007-005 MUST 为重复同步建立幂等机制。
- UAES-07-007-006 MUST 定义冲突解决策略。
- UAES-07-007-007 MUST 对本地敏感数据加密或避免持久化。
- UAES-07-007-008 MUST 明确缓存过期和清理机制。
- UAES-07-007-009 MUST 处理账户退出和账户切换时的数据隔离。
- UAES-07-007-010 MUST 为同步失败定义重试和终止条件。
- UAES-07-007-011 MUST 防止本地缓存覆盖服务端更新的权威数据。
- UAES-07-007-012 MUST 对关键资金操作禁止未经确认的离线成功状态。

## 6. Implementation Rules

建议同步状态：

- LOCAL_ONLY
- PENDING_SYNC
- SYNCING
- SYNCED
- CONFLICT
- FAILED
- CANCELLED

支付、充值、退款和余额等资金数据以服务端确认为准。客户端离线记录只能表示请求或待同步意图，不得作为到账凭证。

## 7. Prohibited Practices

- MUST NOT 将本地余额作为资金业务最终权威数据。
- MUST NOT 在离线状态伪造服务端成功响应。
- MUST NOT 无限保留敏感会话数据。
- MUST NOT 在账户切换时复用上一账户的私有缓存。
- MUST NOT 未经冲突处理覆盖服务端状态。

## 8. AI Execution Rules

AI 设计离线能力时必须列出数据分类、权威来源、冲突策略、重试和安全清理机制。

## 9. Verification

离线、恢复、重复同步、冲突、账户切换和缓存过期测试。

## 10. Acceptance Criteria

离线边界明确，数据不丢失、不越权、不覆盖权威状态。

## 11. Exceptions

纯展示数据可采用更宽松的缓存策略，但必须标明陈旧状态。

## 12. References

UAES-04-008、UAES-04-009、UAES-04-011、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
