# UAES-05-004 — Typography and Content

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-004 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

统一字体、字号、字重、行高、字距、文本层级和内容可读性。

## 2. Scope

页面标题、区块标题、卡片标题、正文、表单、表格、数据、说明、辅助信息和多语言内容。

## 3. Definitions

- Type Scale：字号体系。
- Text Style：字号、字重、行高、字距和语义的组合。
- Long-form Content：需要持续阅读的长文本。
- Numeric Typography：数字、金额、Token 数量等数据的排版规则。

## 4. Core Principles

层级清晰、阅读优先、语义一致、跨平台可读、多语言适配。

## 5. Mandatory Requirements

- UAES-05-004-001 MUST 使用统一字体 Token。
- UAES-05-004-002 MUST 为每个正式文本层级定义字号、字重和行高。
- UAES-05-004-003 MUST 为长文本定义专用阅读样式。
- UAES-05-004-004 MUST 统一金额、日期、时间、代码和数字的排版规则。
- UAES-05-004-005 MUST 处理中文与西文混排、换行和字宽差异。
- UAES-05-004-006 MUST 避免仅通过字号表达全部层级。
- UAES-05-004-007 MUST 保证用户缩放后内容可读且不被裁切。
- UAES-05-004-008 MUST 为字体加载失败提供合理回退字体。

## 6. Implementation Rules

UTER Design System 3.0 基线：

| 语义层级 | 字号 | 字重 | 行高 |
|---|---|---|---|
| page-title | 30px | 600 | 1.25 |
| section-title | 24px | 600 | 1.3 |
| card-title | 18px | 600 | 1.4 |
| group-title | 16px | 600 | 1.5 |
| body | 14px | 400 | 1.5 |
| body-long | 16px | 400 | 1.625 |
| caption | 12px | 400 | 1.5 |

上述行高是 P05 的建议落地基线，最终须经现有页面审计与视觉验收确认。

字体：

- Inter：英文和数字优先。
- Source Han Sans（思源黑体）：中文优先。
- 系统回退字体必须明确配置。

最小字号为 12px。不得以此为由将重要信息长期压缩到 12px；辅助信息也必须满足可读性和对比度要求。

## 7. Prohibited Practices

- MUST NOT 在组件中随意设置独立字号。
- MUST NOT 依赖浏览器默认标题样式。
- MUST NOT 用全局 `*` 选择器覆盖所有字体。
- MUST NOT 将行高省略为不可预测的默认值。
- MUST NOT 将重要说明以低对比度小字隐藏。

## 8. AI Execution Rules

AI 必须使用语义文本样式，不得只凭视觉感受随意选择字号。新增层级必须先提出规范变更。

## 9. Verification

检查 Token 使用、字体加载、字号下限、行高、溢出、缩放和多语言布局。

## 10. Acceptance Criteria

页面文本层级清晰、无异常裁切、长文本舒适可读，且字号体系不存在未经登记的长期分支。

## 11. Exceptions

仅对数据密集型专业界面允许经过评审的局部密度变体。

## 12. References

WCAG 2.2、UAES-05-003。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
