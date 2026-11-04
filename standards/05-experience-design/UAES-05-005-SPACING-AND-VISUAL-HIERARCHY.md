# UAES-05-005 — Spacing and Visual Hierarchy

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-005 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

统一布局尺寸、间距、容器、边框、圆角、层级和密度。

## 2. Scope

页面布局、导航、表单、卡片、弹层、列表、表格和响应式结构。

## 3. Definitions

- Spacing Scale：统一间距刻度。
- Density：单位空间的信息密度。
- Surface Hierarchy：通过表面色差、边框和层级表达结构关系。
- Elevation：元素相对于其他元素的视觉层级。

## 4. Core Principles

节奏一致、结构明确、减少装饰、内容优先、密度可控。

## 5. Mandatory Requirements

- UAES-05-005-001 MUST 使用统一间距 Token。
- UAES-05-005-002 MUST 定义容器宽度和页面边距规则。
- UAES-05-005-003 MUST 定义圆角、边框宽度和表面层级。
- UAES-05-005-004 MUST 优先通过 1px 描边和表面色差表达层级。
- UAES-05-005-005 MUST 对投影建立受控语义用途。
- UAES-05-005-006 MUST 定义内容密度变体。
- UAES-05-005-007 MUST 防止固定尺寸导致内容裁切。
- UAES-05-005-008 MUST 确保间距变化不破坏交互目标尺寸。

## 6. Implementation Rules

建议基础间距刻度以 4px 为基准递增，具体值由 Token 源文件维护。

层级优先级：

1. 页面背景与内容表面。
2. 表面色差。
3. 1px 边框。
4. 必要时使用轻量阴影表达浮层关系。

阴影不得成为区分普通卡片层级的默认手段。

## 7. Prohibited Practices

- MUST NOT 在业务页面随意创造大量非体系化间距。
- MUST NOT 用多层阴影替代信息结构。
- MUST NOT 用固定高度裁切不确定长度的文本。
- MUST NOT 将所有容器设计为相同视觉权重。

## 8. AI Execution Rules

AI 必须复用间距和容器 Token；新布局应说明容器、列、间距、溢出和密度策略。

## 9. Verification

扫描未登记间距、尺寸、圆角和阴影；测试关键断点和内容极值。

## 10. Acceptance Criteria

布局节奏统一、无意外溢出、层级明确，且不存在未经批准的装饰性层级体系。

## 11. Exceptions

复杂数据可视化可使用专用密度规则，但须记录适用范围。

## 12. References

UAES-05-002、UAES-05-008。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
