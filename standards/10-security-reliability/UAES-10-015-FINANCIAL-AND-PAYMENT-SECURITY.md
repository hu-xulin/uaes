# UAES-10-015 — Financial and Payment Security

| Field | Value |
| --- | --- |
| ID | UAES-10-015 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Scope

适用于支付、充值、余额、Token 额度、退款、账单、优惠抵扣、渠道回调和资金对账。

## 2. Trusted Source

- 客户端提交的金额、订单状态、到账结果和余额均不可信。
- 服务端订单和账本是业务可信记录。
- 支付渠道通知必须通过官方协议验签和业务核对。
- 用户浏览器跳转、支付完成页面或前端轮询结果不得直接触发到账。

## 3. Payment Order

支付订单必须记录：

- Internal Order ID；
- User ID；
- Merchant / Channel；
- Channel Transaction ID；
- Amount；
- Currency；
- Order Status；
- Created / Updated Time；
- Idempotency Key；
- Signature Verification Result；
- Notification History；
- Reconciliation Status。

## 4. Callback Verification

每次通知 MUST 验证：

1. 签名；
2. 商户身份；
3. 应用/产品身份；
4. 内部订单存在且属于预期用户；
5. 金额和币种完全匹配；
6. 渠道交易状态为有效成功状态；
7. 订单状态允许转换；
8. 通知未被重复消费或重放。

任何一项失败都不得到账。

## 5. Idempotent Credit

充值到账 MUST 在数据库事务或等效原子机制中完成：

- 检查订单状态；
- 检查是否已记账；
- 写入唯一账本记录；
- 更新余额或可重建的余额汇总；
- 将订单转换为已入账状态。

唯一约束必须从数据库层防止重复记账。仅使用应用层「先查再写」不足以抵御并发竞争。

## 6. State Machine

必须定义：

- CREATED；
- PENDING；
- PAYING；
- PAID；
- CREDITED；
- FAILED；
- CLOSED；
- REFUND_PENDING；
- REFUNDED；
- RECONCILIATION_REQUIRED。

实际状态名称可由业务模型调整，但必须明确合法转换、重复通知、乱序通知、超时、主动查询和人工核对规则。

PAID 不等于 CREDITED。支付成功和余额入账必须分别可追踪。

## 7. Cross-Domain Payment

如果支付入口域名与运营域名不同：

- 订单归属和到账用户必须由服务端订单绑定；
- 支付入口域名只承担渠道支付流程；
- 可信支付结果通过服务端回调/主动查询确认；
- 运营域名通过服务端订单查询或内部可靠消息获得结果；
- 不得依赖浏览器跨域跳转传递可信到账指令；
- 通信必须认证、幂等并审计。

## 8. Reconciliation

必须支持主动查询、定时对账、差异识别和人工处理。支付成功但未入账、已入账但渠道失败、重复通知、退款不一致等情况必须进入可追踪的异常队列。

## 9. Production Restrictions

生产商户密钥、证书、支付回调配置、生产账本和真实交易不得由未经授权的 AI Agent 修改。测试必须使用沙箱或隔离环境。

## 10. Acceptance

支付回调伪造、金额篡改、跨用户订单、重复通知、并发到账、乱序通知、超时查询和账本恢复测试全部通过。
