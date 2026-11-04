# UAES-12-006 — API and Contract Deprecation

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-006 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-02, UAES-04, UAES-09, UAES-11 |

## 1. Purpose

管理 API、事件、协议和外部契约的弃用。

## 2. Scope

对外 API、管理接口、事件契约、协议版本和外部集成契约的弃用、迁移与移除。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-006-M001 | 对外契约 MUST 有版本和 Owner。 |
| UAES-12-006-M002 | 弃用提案 MUST 识别消费者。 |
| UAES-12-006-M003 | 弃用 MUST 提供替代契约或说明无替代方案。 |
| UAES-12-006-M004 | 弃用 MUST 定义迁移窗口。 |
| UAES-12-006-M005 | 关键消费者 MUST 获得迁移通知。 |
| UAES-12-006-M006 | MUST 监控旧契约的实际使用情况。 |
| UAES-12-006-M007 | 移除 MUST 满足约定的退出条件。 |
| UAES-12-006-M008 | 紧急安全移除 MUST 记录风险和补偿措施。 |

## 4. Implementation Rules

弃用必须定义：受影响的消费者、替代接口、兼容期限、通知方式、迁移指南、使用情况监测、停止服务条件、最终移除审批。

不得在消费者仍有实际使用且没有迁移安排时直接删除关键接口，除非存在经批准的紧急安全处置。

## 5. Verification

- Consumer Inventory
- Usage Telemetry
- Compatibility Test
- Sunset Approval

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
