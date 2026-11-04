# UAES-05-007 — Interaction Patterns

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-007 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

统一交互行为、反馈、表单、导航、表格、对话框和异常状态。

## 2. Scope

点击、键盘、触摸、拖动、输入、提交、加载、确认、取消、重试和导航。

## 3. Definitions

- Interaction Pattern：可复用交互行为。
- Feedback：系统对用户操作的反馈。
- Optimistic UI：服务端确认前先呈现预期结果的界面策略。
- Destructive Action：可能导致数据丢失或不可逆影响的操作。

## 4. Core Principles

可预测、可撤销、及时反馈、错误可恢复、重要操作需确认。

## 5. Mandatory Requirements

- UAES-05-007-001 MUST 为重要操作提供明确反馈。
- UAES-05-007-002 MUST 防止重复提交造成重复业务操作。
- UAES-05-007-003 MUST 为表单提供字段级校验、错误说明和提交状态。
- UAES-05-007-004 MUST 区分客户端校验与服务端校验。
- UAES-05-007-005 MUST 为危险操作提供明确的对象、影响和确认方式。
- UAES-05-007-006 MUST 为异步任务提供等待、成功、失败和恢复状态。
- UAES-05-007-007 MUST 为空状态提供下一步指引。
- UAES-05-007-008 MUST 为表格定义排序、筛选、分页、选择和加载行为。
- UAES-05-007-009 MUST 为弹窗定义焦点进入、焦点限制、关闭和焦点返回行为。
- UAES-05-007-010 MUST 保证重要操作存在键盘可用路径。
- UAES-05-007-011 MUST 明确 optimistic update 的失败回滚策略。
- UAES-05-007-012 MUST 避免在无必要时打断用户流程。

## 6. Implementation Rules

表单：

- 标签与控件关联。
- 错误信息可被辅助技术识别。
- 提交失败保留合理输入。
- 禁用、只读、校验失败状态含义明确。

导航：

- 当前页面状态明确。
- 返回、面包屑和侧边导航行为一致。
- 不依赖 hover 才能访问关键功能。

对话框：

- 明确标题和目的。
- Escape 行为按风险和任务上下文定义。
- 关闭后焦点返回触发元素或合理位置。

## 7. Prohibited Practices

- MUST NOT 无反馈地吞掉用户操作。
- MUST NOT 将危险操作设计为误触即可执行。
- MUST NOT 仅使用 toast 作为必须阅读的关键错误说明。
- MUST NOT 将不可恢复错误伪装为普通加载状态。

## 8. AI Execution Rules

AI 必须描述交互状态机、异常路径和恢复方式；涉及支付、充值、删除、权限等关键操作时，必须遵循 UAES-02、UAES-04、UAES-10 的业务与安全契约。

## 9. Verification

测试键盘、鼠标、触摸、重复提交、超时、失败、取消和恢复。

## 10. Acceptance Criteria

关键流程无死路、无静默失败、重复操作受控、错误可理解且可恢复。

## 11. Exceptions

特殊交互需记录用户影响和可替代操作。

## 12. References

WAI-ARIA APG、UAES-02、UAES-04、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
