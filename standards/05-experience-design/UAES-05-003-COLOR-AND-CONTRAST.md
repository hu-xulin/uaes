# UAES-05-003 — Color and Contrast

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-003 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

定义品牌色、语义色、主题色和对比度要求。

## 2. Scope

文本、背景、边框、图标、交互状态、图表、焦点和状态反馈。

## 3. Definitions

- Brand Color：品牌识别色。
- Semantic Color：表达用途的颜色。
- Contrast Ratio：前景与背景的相对亮度比值。
- Non-text Contrast：图标、控件边界等非文本内容的对比度要求。

## 4. Core Principles

颜色必须表达语义；状态不能只依赖颜色；主题必须完整定义；对比度必须按实际前景背景组合验证。

## 5. Mandatory Requirements

- UAES-05-003-001 MUST 将品牌色与语义色分离。
- UAES-05-003-002 MUST 为浅色和深色主题分别定义语义 Token。
- UAES-05-003-003 MUST 对普通文本与背景满足 WCAG 2.2 AA 的 4.5:1。
- UAES-05-003-004 MUST 对大文本与背景满足至少 3:1。
- UAES-05-003-005 MUST 对必要的非文本视觉信息满足至少 3:1 的相邻颜色对比要求。
- UAES-05-003-006 MUST 为 hover、active、selected、focus、disabled、error、success、warning 等状态定义规则。
- UAES-05-003-007 MUST 保证状态信息不只通过颜色表达。
- UAES-05-003-008 MUST 对渐变背景上的文字按最不利区域进行评估。
- UAES-05-003-009 MUST 检查主题切换后的所有关键色彩组合。
- UAES-05-003-010 MUST 禁止通过透明度叠加规避对比度验证。

## 6. Implementation Rules

UTER Design System 3.0 审计基线：

| 项目 | 当前基线 |
|---|---|
| 品牌主色 | #5B5EE6 |
| 中性色 | Slate |
| 旧品牌色 | #6467F0，不再作为当前主色 |
| 浅色主题 | 独立定义语义色 |
| 深色主题 | 独立定义语义色 |
| 层级 | 1px 描边 + 表面色差优先 |

导航选中态现有组合：

- 前景：#5B5EE6
- 背景：#F0F0FF
- 已知对比度：4.44:1
- 结论：低于普通文本 4.5:1 门槛，不能作为符合 AA 的普通文字组合。

必须通过调整前景或背景 Token 修复，并重新计算实际对比度。不得仅因差距很小而豁免。

## 7. Prohibited Practices

- MUST NOT 将品牌主色直接用于所有状态。
- MUST NOT 仅以红绿区分成功和失败。
- MUST NOT 将 disabled 样式误用于仍可操作的控件。
- MUST NOT 未验证便宣称色彩符合 WCAG。

## 8. AI Execution Rules

AI 新增或修改色彩组合时必须提供前景色、背景色、计算比值、适用文本类型及验证结果。

## 9. Verification

自动扫描所有已登记的文本、图标、边框和状态色组合；动态图片、渐变和运行时组合须增加视觉或人工检查。

## 10. Acceptance Criteria

所有适用组合满足 WCAG 2.2 AA；例外有明确标准依据、记录和补偿措施。

## 11. Exceptions

依 UAES-00-005；不得豁免法律或强制合规要求。

## 12. References

WCAG 2.2 SC 1.4.3、1.4.11。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
