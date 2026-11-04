# UAES-02-004 — ACCEPTANCE CRITERIA STANDARD

**Version:** 1.0.0  
**Status:** DRAFT

## 1. 目的

验收标准用于判断一项需求是否真正完成。

代码编写完成不代表需求完成。

构建成功不代表业务正确。

单元测试通过不代表端到端流程正确。

必须通过需求对应的验收条件。

## 2. 验收标准结构

每条验收标准必须具有：

- AC ID。
- Requirement ID。
- Description。
- Preconditions。
- Input。
- Action。
- Expected Result。
- Verification Method。
- Priority。
- Status。

## 3. Given / When / Then

建议使用：

```gherkin
Feature: Example Feature

Scenario: Expected behavior
  Given the required preconditions
  When the user performs the action
  Then the expected result occurs
```

## 4. 验收类型

| 类型 | 检查内容 |
|---|---|
| Functional | 功能行为 |
| Business | 业务规则 |
| UI | 界面表现 |
| UX | 交互体验 |
| API | 接口行为 |
| Data | 数据一致性 |
| Security | 权限和安全 |
| Performance | 性能 |
| Compatibility | 平台兼容 |
| Reliability | 可靠性 |

## 5. 验收覆盖要求

关键功能必须覆盖：

- 正常路径。
- 异常路径。
- 边界条件。
- 权限边界。
- 重复提交。
- 并发行为。
- 网络异常。
- 外部服务失败。
- 数据一致性。

不适用的项目必须说明原因。

## 6. 验收结果

只能使用：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
- NOT_VERIFIED

## 7. 验收门禁

以下情况不得标记 ACCEPTED：

- 存在未通过的必需验收条件。
- 关键业务规则未确认。
- 关键安全风险未处理。
- 必需测试未运行。
- 测试结果无法验证。
- 关键异常流程未验证。

## 8. 强制规则

| Rule ID | 规则 | 级别 |
|---|---|---|
| UAES-02-004-001 | 验收条件必须可验证 | MUST |
| UAES-02-004-002 | 验收条件必须关联需求 | MUST |
| UAES-02-004-003 | 关键功能必须覆盖异常路径 | MUST |
| UAES-02-004-004 | 不得伪造验收结果 | MUST NOT |
| UAES-02-004-005 | 必需验收失败不得接受 | MUST |

**END OF ACCEPTANCE CRITERIA STANDARD**