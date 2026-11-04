# UAES-09-005 — Integration and Contract Testing

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-005 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-02, UAES-04, UAES-06 |

## 1. Purpose

验证多个模块、服务、数据库、缓存、消息系统和第三方接口协作时的正确性与兼容性。

## 2. Integration Test Scope

适用对象：

- Go Handler / Service / Repository。
- MySQL / PostgreSQL / SQLite。
- Redis。
- HTTP Client / Server。
- 异步任务与事件处理。
- 模型上游供应商 Adapter。
- 支付渠道 Adapter。
- Web API Client 与 Backend。
- Electron IPC 与 Main Process。
- 跨模块共享接口。

## 3. Integration Test Requirements

- **QE-IT-001 MUST**：集成测试必须明确被测组件和真实集成边界。
- **QE-IT-002 MUST**：涉及数据库行为时，应尽可能使用与目标数据库行为一致的测试环境。
- **QE-IT-003 MUST**：不得仅依赖 Mock 验证事务、锁、约束、索引和并发行为。
- **QE-IT-004 MUST**：测试必须验证数据写入、读取、更新、删除和失败回滚行为（按适用范围）。
- **QE-IT-005 MUST**：测试必须验证依赖不可用、超时、连接中断和恢复行为。
- **QE-IT-006 MUST**：外部服务测试不得默认连接真实生产服务。
- **QE-IT-007 SHOULD**：优先使用隔离的临时数据库、容器或项目认可的测试基础设施。

## 4. Contract Testing

契约测试至少覆盖：

- HTTP Method / Path。
- Request Schema。
- Response Schema。
- Required / Optional Fields。
- 数据类型和格式。
- 错误码和错误结构。
- 认证与授权要求。
- 分页、排序和过滤语义。
- 兼容性和版本策略。
- 超时、重试和幂等约定。

对于事件或消息契约，还必须检查事件名称、版本、Payload、Schema Evolution 和消费者兼容性。

## 5. Database and Migration Testing

数据库迁移必须验证：

1. 从支持的旧版本升级。
2. 迁移前置条件。
3. 迁移后的 Schema。
4. 历史数据兼容。
5. 默认值和约束。
6. 大表迁移影响（适用时）。
7. 中断和重试行为。
8. 迁移失败恢复。
9. 应用新旧版本兼容窗口。
10. 回滚或向前修复策略。

禁止在测试中通过删除重要约束或降低隔离级别来掩盖问题。

## 6. Async and Event Testing

必须覆盖：

- 重复消费。
- 消息乱序。
- 消息丢失或延迟。
- 消费失败。
- 重试和退避。
- 死信处理。
- 幂等消费。
- 任务超时。
- 服务重启后的恢复。
- 多实例竞争。

## 7. Uter Payment and Billing Tests

支付、充值、退款、余额和 Token 计费至少应覆盖：

- 商户订单与内部订单关联。
- 渠道订单号关联。
- 回调签名验证。
- 金额与币种核验。
- 订单状态机。
- 重复通知幂等。
- 并发通知。
- 主动查询和异步通知竞争。
- 支付成功但本地写入失败。
- 本地成功但响应丢失。
- 退款和冲正。
- 对账与异常恢复。
- 余额流水一致性。

充值到账必须由经过验证的支付事实和内部状态迁移共同决定，不能只凭浏览器跳转结果或客户端参数。

## 8. Contract Compatibility

对已有 API、事件和数据结构的变更，必须识别：

- Breaking Change。
- Backward Compatibility。
- Consumer Impact。
- Version Migration。
- Deprecation Period。
- Rollback Constraints。

未经批准，不得静默删除或改变已被使用的契约。

## 9. AI Execution Rules

AI MUST：

- 先确认目标数据库和服务版本。
- 不得假设 Mock 可以证明真实集成正确。
- 不得连接真实支付或生产服务进行普通测试。
- 对外部服务不可用明确标记 BLOCKED。
- 保存测试数据和执行环境信息。

## 10. Verification

验证数据库迁移、API 契约、事件契约、第三方 Adapter、幂等、异常恢复和兼容性测试是否完整。

## 11. Acceptance Criteria

- 核心模块集成边界均有测试。
- 数据库关键行为有真实或等效验证。
- API / Event Contract 有兼容性测试。
- 资金业务关键异常路径有测试。
- 外部依赖失败和恢复有证据。
- 测试不会触及未经授权的生产环境。

## 12. References

UAES-02、UAES-04、UAES-06；ISTQB CTFL v4.0.1。

## 13. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Integration and Contract Testing Standard |
