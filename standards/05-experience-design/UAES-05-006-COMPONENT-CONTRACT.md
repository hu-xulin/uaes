# UAES-05-006 — Component Contract

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-006 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

定义可复用组件的完整契约，使设计、实现、测试和 AI 调用遵循同一标准。

## 2. Scope

基础组件、复合组件、业务组件、布局组件和跨平台组件。

## 3. Definitions

- Variant：组件外观或行为变体。
- Slot：组件允许插入内容的位置。
- State：组件状态。
- Contract：属性、事件、语义、约束和验证要求的集合。

## 4. Core Principles

契约优先、语义明确、组合优先、状态完整、可访问性内建。

## 5. Mandatory Requirements

- UAES-05-006-001 MUST 为正式组件分配唯一 Component ID。
- UAES-05-006-002 MUST 声明用途、Owner、状态和平台范围。
- UAES-05-006-003 MUST 声明 Props、类型、默认值和约束。
- UAES-05-006-004 MUST 声明 Variants、Slots 和组合规则。
- UAES-05-006-005 MUST 定义 default、hover、focus、active、disabled、loading、error、selected 等适用状态。
- UAES-05-006-006 MUST 定义键盘行为和语义角色。
- UAES-05-006-007 MUST 定义受控与非受控状态规则。
- UAES-05-006-008 MUST 为异步组件定义 loading、success、error 和 retry 行为。
- UAES-05-006-009 MUST 为组件提供可自动执行的测试。
- UAES-05-006-010 MUST 为破坏性 Props 变更提供迁移策略。

## 6. Implementation Rules

组件契约至少包含：

```yaml
component_id: UTER-COMPONENT-BUTTON
name: Button
status: ACTIVE
platforms:
  - web
  - h5
purpose: Trigger an action
props:
  - name: variant
    type: string
    required: false
    default: primary
variants:
  - primary
  - secondary
  - outline
  - ghost
states:
  - default
  - hover
  - focus
  - active
  - disabled
  - loading
accessibility:
  keyboard: true
  semantic_element: button
tests:
  - render
  - keyboard
  - state
  - accessibility
```

此示例是契约表达示意，实际字段以本领域 Schema 为准。

React 组件必须优先组合项目已选用的基础组件体系，避免为视觉差异重新造轮子。

## 7. Prohibited Practices

- MUST NOT 将可点击的 div 作为默认按钮实现。
- MUST NOT 使用无语义的 Props 命名。
- MUST NOT 隐藏组件的 loading/error 状态。
- MUST NOT 通过全局 CSS 破坏组件封装。
- MUST NOT 未登记便复制基础组件形成平行组件库。

## 8. AI Execution Rules

AI 开发组件前必须查询注册表。组件缺失时，先判断是否已有组件可组合；确需新增时，必须补齐契约、实现、测试和文档。

## 9. Verification

组件注册表完整性、Props 类型、状态覆盖、键盘行为、无障碍和组件测试。

## 10. Acceptance Criteria

正式组件均有契约、测试、文档和明确的生命周期状态。

## 11. Exceptions

临时实验组件必须明确标记 EXPERIMENTAL，不得默认进入正式组件 API。

## 12. References

WAI-ARIA APG、UAES-06、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
