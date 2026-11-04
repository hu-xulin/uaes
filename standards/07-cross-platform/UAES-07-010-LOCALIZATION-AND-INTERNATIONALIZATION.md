# UAES-07-010 — Localization and Internationalization

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-010 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立多语言、多地区、日期时间、数字和文化格式的跨平台规范。

## 2. Scope

所有用户可见文本、日期、时间、货币、数字、排序和区域设置。

## 3. Definitions

- i18n：Internationalization。
- l10n：Localization。
- Locale：语言和地区标识。
- Translation Key：翻译资源标识。
- RTL：从右向左的排版方向。

## 4. Core Principles

文本资源与代码分离、格式由 Locale 决定、避免硬编码、布局适应语言长度。

## 5. Mandatory Requirements

- UAES-07-010-001 MUST 将用户可见文本与业务代码分离。
- UAES-07-010-002 MUST 为翻译资源建立稳定 Key。
- UAES-07-010-003 MUST 使用标准 Locale 标识。
- UAES-07-010-004 MUST 使用国际化格式化 API 处理日期和数字。
- UAES-07-010-005 MUST 明确时区和时间存储策略。
- UAES-07-010-006 MUST 明确货币代码和精度。
- UAES-07-010-007 MUST 处理不同语言的文本长度变化。
- UAES-07-010-008 MUST 避免拼接句子形成不稳定翻译。
- UAES-07-010-009 MUST 为 RTL 语言评估布局支持。
- UAES-07-010-010 MUST 为缺失翻译提供明确回退策略。

## 6. Implementation Rules

- 日期时间优先使用明确时区语义的时间类型。
- 持久化时间通常保存为标准化时间值，展示时按用户或业务时区格式化。
- 金额使用明确货币代码，不得仅根据符号推断货币。
- 文本长度和字体回退必须纳入 UI 验证。
- 翻译资源应支持完整性检查。

## 7. Prohibited Practices

- MUST NOT 在业务代码中散布用户可见硬编码文案。
- MUST NOT 假设所有地区使用相同日期和数字格式。
- MUST NOT 使用浮点数作为资金精度的唯一表示。
- MUST NOT 将服务器时区直接当作用户时区。

## 8. AI Execution Rules

AI 新增用户可见文本时必须使用项目翻译机制；涉及金额、时间和地区时必须明确 Locale、Currency 和 Timezone。

## 9. Verification

翻译 Key 完整性、Locale 格式、文本溢出、RTL 和时区测试。

## 10. Acceptance Criteria

无遗漏翻译 Key，格式符合 Locale，关键界面可适应语言变化。

## 11. Exceptions

技术日志和内部标识可使用固定语言，但必须与用户界面文案分离。

## 12. References

Unicode CLDR、ECMA-402、UAES-02、UAES-05。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
