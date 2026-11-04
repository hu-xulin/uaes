# UAES-02-002 — USER STORY STANDARD

**Version:** 1.0.0  
**Status:** DRAFT

## 1. 用户故事目的

User Story 用于描述某类用户在特定场景下希望完成的目标，以及该目标所产生的价值。

标准格式：

> 作为 [用户角色]，我希望 [完成某项操作]，以便 [获得某种价值]。

## 2. 用户故事结构

每项 User Story 必须包含：

- Story ID。
- 标题。
- 用户角色。
- 用户目标。
- 用户价值。
- 前置条件。
- 正常流程。
- 异常流程。
- 业务规则。
- 验收条件。
- 关联需求。
- 优先级。
- 风险等级。

## 3. 用户角色

用户角色必须基于实际产品角色。

不能为了方便而任意创造管理员、超级管理员、商家或其他角色。

角色不存在时，先提出角色设计建议。

## 4. 用户故事拆分

用户故事必须能够在合理范围内独立实现和验收。

拆分维度包括：

- 用户角色。
- 操作目标。
- 业务流程。
- 权限边界。
- 数据范围。
- 业务状态。
- 平台差异。

禁止只按前端页面或后端文件拆分用户故事。

## 5. INVEST 质量检查

每个 User Story 应检查：

| 原则 | 说明 |
|---|---|
| Independent | 尽量独立 |
| Negotiable | 实现细节可以讨论 |
| Valuable | 对用户有价值 |
| Estimable | 可以估算 |
| Small | 规模适当 |
| Testable | 可以测试 |

不符合 INVEST 时，应调整拆分或补充上下文。

## 6. 用户故事验收

用户故事必须能够通过具体场景验证。

建议采用 Given / When / Then：

```gherkin
Feature: User Login

Scenario: Successful login
  Given the user has a valid account
  And the account is active
  When the user submits valid credentials
  Then the system authenticates the user
  And establishes an authenticated session
```

示例仅用于说明格式，不代表 Uter 当前登录方式或业务规则。

## 7. 强制规则

| Rule ID | 规则 | 级别 |
|---|---|---|
| UAES-02-002-001 | 用户故事必须具有用户价值 | MUST |
| UAES-02-002-002 | 用户角色必须有依据 | MUST |
| UAES-02-002-003 | 用户故事必须具备验收条件 | MUST |
| UAES-02-002-004 | 用户故事必须能够独立验证 | MUST |
| UAES-02-002-005 | 用户故事必须关联需求 | MUST |

**END OF USER STORY STANDARD**