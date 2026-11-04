# UAES-05-009 — Accessibility

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-009 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

确保产品可被不同能力、输入方式和辅助技术的用户使用。

## 2. Scope

语义结构、键盘、焦点、对比度、文本替代、表单、动态内容、缩放和触摸目标。

## 3. Definitions

- WCAG：Web Content Accessibility Guidelines。
- Assistive Technology：屏幕阅读器等辅助技术。
- Focus Management：焦点进入、移动和返回的管理。
- Accessible Name：控件可被辅助技术识别的名称。

## 4. Core Principles

Perceivable、Operable、Understandable、Robust。

## 5. Mandatory Requirements

- UAES-05-009-001 MUST 以 WCAG 2.2 AA 作为 Web/H5 默认验收目标。
- UAES-05-009-002 MUST 为交互控件提供语义和可访问名称。
- UAES-05-009-003 MUST 保证完整键盘操作。
- UAES-05-009-004 MUST 提供可见且清晰的焦点指示。
- UAES-05-009-005 MUST 满足适用文本和非文本对比度。
- UAES-05-009-006 MUST 为有意义的图片提供替代文本。
- UAES-05-009-007 MUST 为表单错误提供可识别的说明。
- UAES-05-009-008 MUST 为动态更新内容提供适当的辅助技术通知。
- UAES-05-009-009 MUST 支持合理的文本放大和内容重排。
- UAES-05-009-010 MUST 遵循 WCAG 2.2 目标尺寸最低要求：通常至少 24×24 CSS px，或满足规范允许的间距等例外。
- UAES-05-009-011 MUST 不以颜色作为唯一信息表达方式。
- UAES-05-009-012 MUST 为自定义复合控件定义正确的键盘模型和 ARIA 语义。

## 6. Implementation Rules

优先使用原生 HTML 语义元素。仅在原生语义不足时使用 ARIA。

复杂组件必须遵循 WAI-ARIA APG 对应模式，例如 Dialog、Combobox、Tabs、Menu、Grid。

自动化工具只能发现部分问题，不能代替键盘和辅助技术人工验证。

## 7. Prohibited Practices

- MUST NOT 使用 tabIndex 滥造无意义焦点顺序。
- MUST NOT 用 aria-label 掩盖缺失的可见标签。
- MUST NOT 将 ARIA role 与真实元素行为冲突。
- MUST NOT 删除焦点样式而不提供等效替代。
- MUST NOT 把自动化扫描无错误视为完整无障碍验收。

## 8. AI Execution Rules

AI 必须考虑语义、键盘、焦点、错误反馈、对比度和触摸目标。新增复杂控件时必须提供键盘操作说明和测试。

## 9. Verification

结合 axe 类自动化扫描、键盘测试、缩放测试、屏幕阅读器抽样和人工审查。

## 10. Acceptance Criteria

关键任务不存在已知阻断级无障碍问题；自动化和人工测试证据均已记录。

## 11. Exceptions

例外须说明 WCAG 条款、适用条件、原因和替代方案，不得仅以实现困难为理由。

## 12. References

WCAG 2.2、WAI-ARIA APG。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
