# UAES-09-007 — Visual and Accessibility Testing

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-007 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-05 |

## 1. Purpose

验证界面实现是否符合已批准设计规范、视觉基线和可访问性要求。

## 2. Scope

- UTER Design System 3.0。
- Design Tokens。
- React Component Registry。
- PC Web / H5 / Electron UI。
- 页面布局、字体、色彩、间距、图标和交互状态。
- 键盘操作和辅助技术支持。

## 3. Visual Regression

- **QE-VIS-001 MUST**：视觉回归必须绑定基线版本、测试 Commit SHA、视口尺寸和渲染环境。
- **QE-VIS-002 MUST**：截图比较必须使用稳定的测试数据和可控的动态内容。
- **QE-VIS-003 MUST**：视觉差异必须经过分类，区分预期设计变更、环境差异和真实回归。
- **QE-VIS-004 MUST**：未经批准不得直接覆盖正式视觉基线。
- **QE-VIS-005 MUST**：更新视觉基线必须关联需求、设计变更或批准记录。
- **QE-VIS-006 SHOULD**：对关键页面、核心组件及其主要交互状态建立视觉回归。

## 4. Visual Test Dimensions

必须按适用范围验证：

- Layout 和尺寸。
- 字体、字号、字重和行高。
- 品牌色与语义色。
- 间距、边框、圆角和阴影。
- Icon 和图片。
- Hover / Focus / Active / Disabled。
- Loading / Empty / Error / Success。
- Responsive 和 Adaptive。
- 长文本、溢出和缩放。
- 深色与浅色主题（若产品支持）。

## 5. UTER Design System 3.0 Baseline

以下是现有设计资产的待验证基线，不代表已完成 P05 合规验收：

- 品牌主色：#5B5EE6。
- 字体：Inter + 思源黑体。
- PC Web 正文基准：14px。
- 最小字号：12px。
- 长文本：16px。
- 中性色体系：Slate。
- 层级表达：优先采用 1px 描边与表面色差，不依赖投影。

导航选中态中 #5B5EE6 在 #F0F0FF 上的对比度已知约为 4.44:1，低于普通文本 4.5:1 的 WCAG AA 门槛。该项必须在 P05 设计规范中修正并纳入视觉与可访问性回归。

## 6. Accessibility Testing

目标基线：WCAG 2.2 Level AA，具体适用标准由 P05 定义。

必须检查：

- 文本对比度。
- 键盘可操作性。
- 焦点可见性。
- 焦点顺序。
- 表单标签与错误提示。
- 语义结构。
- 图片替代文本。
- 控件名称、角色和值。
- 状态变化通知。
- 缩放和重排。
- 触控目标尺寸。
- 动态内容和减少动态效果偏好。

自动化扫描不能替代键盘、屏幕阅读器和人工可访问性检查。

## 7. Baseline Management

视觉基线必须包含：

- Baseline ID。
- 设计规范版本。
- 组件或页面标识。
- 视口尺寸。
- 浏览器和渲染环境。
- 主题。
- 字体与资源版本。
- 生成 Commit SHA。
- 审批记录。

基线更新必须审查差异，不能直接接受全部变化。

## 8. AI Execution Rules

AI MUST：

- 先读取当前 Design Tokens 和组件规范。
- 不得自行改变品牌色、字体和基础视觉规则。
- 不得通过更新截图基线掩盖布局错误。
- 对动态内容采用合理屏蔽或确定性 Fixture。
- 对可访问性自动化扫描的局限作出说明。

## 9. Verification

- Token 与设计规范一致性。
- 关键页面截图回归。
- 组件状态回归。
- WCAG 自动化检查。
- 键盘操作检查。
- 基线变更审批。
- 视觉差异分类和证据。

## 10. Acceptance Criteria

- 关键页面和组件具备视觉回归基线。
- 基线可追溯到设计版本和 Commit SHA。
- 不存在未处理的高风险可访问性问题。
- 自动化和人工检查均有记录。
- 未批准的基线变化不能自动通过。

## 11. References

- W3C WCAG 2.2：<https://www.w3.org/TR/WCAG22/>
- W3C WCAG 2.2 Publication History：<https://www.w3.org/standards/history/WCAG22/>
- UAES-05 Experience & Design。
- UTER Design System 3.0。

## 12. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Visual and Accessibility Testing Standard |
