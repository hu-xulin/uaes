# UAES-07-005 — Responsive and Adaptive Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-005 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范不同视口、屏幕尺寸、方向和输入环境下的布局适配。

## 2. Scope

PC Web、H5、Electron 和未来原生应用 UI。

## 3. Definitions

- Responsive：根据视口尺寸变化布局。
- Adaptive：根据平台、输入和设备能力选择不同交互。
- Breakpoint：布局切换阈值。
- Safe Area：设备系统 UI 占用的安全区域。

## 4. Core Principles

内容优先、连续适配、布局稳定、触控友好、遵循 UAES-05。

## 5. Mandatory Requirements

- UAES-07-005-001 MUST 以可用视口而非设备名称作为布局判断基础。
- UAES-07-005-002 MUST 定义响应式断点。
- UAES-07-005-003 MUST 处理横竖屏和窗口缩放。
- UAES-07-005-004 MUST 避免关键内容被裁切。
- UAES-07-005-005 MUST 为移动端考虑安全区域。
- UAES-07-005-006 MUST 为触控和鼠标分别评估交互。
- UAES-07-005-007 MUST 防止横向溢出破坏主要任务。
- UAES-07-005-008 MUST 在窗口动态缩放时保持可用性。
- UAES-07-005-009 MUST 遵守 UAES-05 的字体、颜色、间距和组件规范。

## 6. Implementation Rules

断点建议初始值，最终以 UTER Design System 3.0 的实际布局审计为准：

| 类型 | 视口宽度 |
|---|---|
| Compact | < 640px |
| Medium | 640–1023px |
| Wide | 1024–1439px |
| Extra Wide | ≥ 1440px |

这些值是建议的工程断点，不代表所有组件必须在相同宽度切换。

H5 必须处理：

- viewport 配置。
- 动态视口高度。
- 安全区域 Insets。
- 软键盘弹出和表单可见性。
- 触控目标与滚动容器。
- 横屏和浏览器工具栏变化。

Electron 必须处理窗口最小尺寸、缩放和多显示器环境。

## 7. Prohibited Practices

- MUST NOT 仅按设备型号选择布局。
- MUST NOT 依赖固定屏幕高度构建主要页面。
- MUST NOT 隐藏必要功能以掩盖布局问题。
- MUST NOT 在移动端直接缩小 PC 页面代替适配。

## 8. AI Execution Rules

AI 必须检查断点边界、极端宽高比、动态窗口和键盘遮挡；不得只验证一个常规屏幕尺寸。

## 9. Verification

响应式截图、视口边界、触控交互和安全区域验证由 P09 执行。

## 10. Acceptance Criteria

核心任务在规定视口范围内可完成，无关键遮挡和不可操作问题。

## 11. Exceptions

复杂数据表格可使用受控横向滚动或移动端替代呈现，但必须有明确交互说明。

## 12. References

UAES-05、W3C CSS、各平台安全区域文档。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
