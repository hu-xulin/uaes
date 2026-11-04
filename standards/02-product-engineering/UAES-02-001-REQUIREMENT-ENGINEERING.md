# UAES-02-001 — REQUIREMENT ENGINEERING

**Version:** 1.0.0  
**Status:** DRAFT

## 1. 需求记录结构

每项正式需求必须具备唯一记录。

```yaml
requirement:
  id: REQ-0001
  title: ""
  type: FR
  priority: P1
  status: PROPOSED

  objective: ""
  background: ""

  actors:
    - ""

  preconditions:
    - ""

  expected_behavior:
    - ""

  business_rules:
    - BR-0001

  constraints:
    - ""

  dependencies:
    - ""

  acceptance_criteria:
    - AC-0001

  risk_level: R1

  assumptions:
    - statement: ""
      status: UNCONFIRMED

  references:
    - ""

  owner: ""
  created_at: ""
  updated_at: ""
```

## 2. 需求编写规则

每项需求必须描述：

- 系统当前行为。
- 当前问题。
- 期望行为。
- 业务价值。
- 使用场景。
- 前置条件。
- 输入。
- 输出。
- 异常。
- 边界。
- 验收标准。

## 3. 需求原子化

一个 Requirement 应当表达一个可独立验证的业务目标。

如果一项需求同时包含多个相互独立的目标，必须拆分。

例如：

不推荐：

“用户可以登录、充值、购买套餐、查看账单和申请退款。”

建议拆分为：

- REQ：用户身份认证。
- REQ：用户账户充值。
- REQ：用户购买套餐。
- REQ：用户查看账单。
- REQ：用户申请退款。

## 4. 需求歧义管理

以下表达必须进行进一步分析：

- 快速。
- 稳定。
- 美观。
- 方便。
- 自动。
- 智能。
- 实时。
- 兼容。
- 安全。
- 高性能。

必须将其转换为可以验证的指标或行为。

例如：

“页面加载要快”应明确测试条件、页面范围和目标指标。

如果无法得到准确指标，应将其标记为待确认，而不是编造数字。

## 5. 需求假设管理

AI 可以提出假设，但必须标记：

- ASSUMPTION ID。
- 假设内容。
- 假设依据。
- 影响范围。
- 风险。
- 是否需要用户确认。

对于支付、资金、账户、安全和隐私相关假设，不允许未经确认直接投入实施。

## 6. 需求验收

每项需求必须具有：

- 正常流程验收。
- 异常流程验收。
- 边界条件验收。
- 权限验收（适用时）。
- 数据一致性验收（适用时）。
- 兼容性验收（适用时）。

## 7. 强制规则

| Rule ID | 规则 | 级别 |
|---|---|---|
| UAES-02-001-001 | 需求必须原子化 | MUST |
| UAES-02-001-002 | 需求必须记录业务目标 | MUST |
| UAES-02-001-003 | 歧义必须识别 | MUST |
| UAES-02-001-004 | 假设必须单独标记 | MUST |
| UAES-02-001-005 | 高风险假设必须确认 | MUST |
| UAES-02-001-006 | 需求必须具备验收条件 | MUST |
| UAES-02-001-007 | 需求必须具备追踪 ID | MUST |

**END OF REQUIREMENT ENGINEERING**