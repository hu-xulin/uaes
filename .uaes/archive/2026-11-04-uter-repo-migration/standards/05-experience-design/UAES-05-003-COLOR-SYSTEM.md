# UAES-05-003 — COLOR SYSTEM

**Standard ID:** UAES-05-003  
**Standard Name:** Color System  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立统一的品牌色、功能色、中性色、语义色、主题色和组件颜色规则。

## 2. Color Layers

颜色必须分为：

1. Brand Colors
2. Primitive Palette
3. Semantic Colors
4. Component Colors
5. State Colors
6. Theme Mappings

业务组件应优先引用 Semantic Colors。

## 3. Brand Color Baseline

Uter 当前品牌主色：

`#5B5EE6`

该颜色属于项目既有设计基线。是否需要调整，必须经过设计审查和决策记录，不得由 AI 擅自替换。

## 4. Neutral Colors

中性色采用 Slate 色系作为当前基础参考。

建议基础色阶：

| Token | Value |
| --- | --- |
| slate.50 | #F8FAFC |
| slate.100 | #F1F5F9 |
| slate.200 | #E2E8F0 |
| slate.300 | #CBD5E1 |
| slate.400 | #94A3B8 |
| slate.500 | #64748B |
| slate.600 | #475569 |
| slate.700 | #334155 |
| slate.800 | #1E293B |
| slate.900 | #0F172A |
| slate.950 | #020617 |

基础色阶不能直接代替所有语义颜色。

## 5. Semantic Color Roles

至少建立：

Text

- text.primary
- text.secondary
- text.tertiary
- text.disabled
- text.inverse
- text.link

Surface

- surface.canvas
- surface.default
- surface.subtle
- surface.elevated
- surface.inverse
- surface.selected

Border

- border.default
- border.strong
- border.subtle
- border.focus
- border.disabled

Action

- action.primary
- action.primary.hover
- action.primary.active
- action.secondary
- action.destructive
- action.disabled

Feedback

- feedback.success
- feedback.warning
- feedback.danger
- feedback.info

每个语义角色必须在 Light 和 Dark 主题中有明确映射。

## 6. Light and Dark Theme

浅色和深色主题必须分别定义：

- 页面背景
- 卡片背景
- 弹层背景
- 一级文字
- 二级文字
- 三级文字
- 禁用文字
- 边框
- 主操作
- 成功、警告、危险和信息状态
- 选中状态
- 焦点状态

禁止仅通过简单反色生成 Dark Theme。

## 7. Interaction Colors

公共交互组件至少支持：

- Default
- Hover
- Active
- Focus-visible
- Disabled
- Loading
- Selected（适用时）
- Invalid（适用时）

状态之间必须具有可识别差异。

Hover 不得仅依赖微小的颜色变化来传达状态；可以组合表面变化、边框、图标或其他非颜色信号。

## 8. Contrast Requirements

普通文字：

- WCAG AA：对比度至少 4.5:1。

大号文字：

- 对比度至少 3:1。

非文本 UI 组件和图形：

- 重要视觉信息与相邻颜色对比度至少 3:1，适用时按 WCAG 2.2 相关要求验收。

不得只凭肉眼判断对比度。

所有文字和背景组合必须按实际渲染颜色计算。

## 9. Color Accessibility

颜色不能作为唯一信息表达方式。

例如：

- 错误状态不能只显示红色。
- 成功状态不能只显示绿色。
- 选中状态不能只改变颜色而没有其他可识别信号。
- 图表必须考虑色觉差异。

## 10. Surface Hierarchy

Uter 采用以下层级策略：

1. 优先通过表面色差建立层级。
2. 使用 1px 边框明确组件边界。
3. 使用间距区分内容区域。
4. 使用字体层级区分信息重要性。
5. 投影仅在确实需要表达浮层或空间关系时使用。

不得通过不断叠加阴影解决布局层级问题。

## 11. Color Prohibited Practices

- 禁止直接在业务组件中散布品牌色 Hex。
- 禁止在不同组件中随意定义同义状态色。
- 禁止使用低对比度文字作为正常信息。
- 禁止将品牌色直接用于所有背景和边框。
- 禁止未经批准创建第二套品牌色。
- 禁止仅通过颜色表达错误、警告和成功。
- 禁止 Dark Theme 与 Light Theme 语义不一致。

## 12. Automated Verification

必须具备：

- Hex / Color Space 解析。
- Semantic Token 引用检查。
- Light / Dark 主题完整性检查。
- 文字对比度计算。
- 非文本对比度检查。
- 未登记颜色扫描。
- 禁止颜色组合检查。
- 视觉回归检查。

动态背景、图片和渐变需要采用实际渲染背景进行人工或专项验证，不能简单地以单个 Hex 值替代。

## 13. Acceptance Criteria

- 品牌色唯一且有权威来源。
- 中性色体系完整。
- 语义色覆盖主要 UI 用途。
- Light / Dark 主题映射完整。
- 交互状态颜色完整。
- 对比度检查有自动化结果。
- 颜色不能作为唯一状态表达。
- 颜色变更具有影响分析和回归证据。

## 14. Related Standards

UAES-05-001、UAES-05-002、UAES-05-006、UAES-05-007、UAES-05-009、UAES-05-011。

P4-B：字体、布局与组件工程

这三份标准将设计规范从视觉基础推进到可复用的前端实现。特别强调：字号不能脱离行高、字重、字族和用途单独管理；组件不能只定义外观，还必须定义状态、键盘行为和可访问性。
