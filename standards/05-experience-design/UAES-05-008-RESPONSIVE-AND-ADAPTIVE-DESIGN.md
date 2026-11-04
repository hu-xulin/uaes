# UAES-05-008 — Responsive and Adaptive Design

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-008 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

定义不同屏幕尺寸、输入方式、窗口状态和设备能力下的适配规则。

## 2. Scope

PC Web、H5、Electron，以及未来移动原生平台的设计适配。

## 3. Definitions

- Responsive：根据视口尺寸调整布局。
- Adaptive：根据设备能力或平台特征调整交互和呈现。
- Breakpoint：布局策略发生变化的断点。
- Safe Area：设备可安全呈现内容的区域。

## 4. Core Principles

内容驱动断点、流式布局优先、平台能力适配、避免设备型号耦合。

## 5. Mandatory Requirements

- UAES-05-008-001 MUST 为页面定义布局策略。
- UAES-05-008-002 MUST 为断点定义明确的布局变化，而非仅改变 CSS 数值。
- UAES-05-008-003 MUST 支持合理的窗口缩放和浏览器缩放。
- UAES-05-008-004 MUST 避免横向溢出破坏主要任务。
- UAES-05-008-005 MUST 为 H5 考虑触摸目标和软键盘。
- UAES-05-008-006 MUST 为 Electron 考虑窗口缩放、最小窗口和桌面交互。
- UAES-05-008-007 MUST 为未来原生平台预留安全区域、系统栏和平台导航适配。
- UAES-05-008-008 MUST 明确表格、侧边栏、导航和复杂表单在窄屏下的变化策略。

## 6. Implementation Rules

不得仅以 iPhone、iPad 或某款显示器型号定义布局。应使用内容约束和视口区间定义断点。

项目可从以下测试区间开始，实际断点应在页面审计后确认：

- Narrow：320–479 CSS px
- Mobile：480–767 CSS px
- Tablet：768–1023 CSS px
- Desktop：1024–1439 CSS px
- Wide：1440 CSS px 及以上

这些是测试区间建议，不是要求每个页面必须使用五个断点。

## 7. Prohibited Practices

- MUST NOT 使用设备型号作为唯一断点依据。
- MUST NOT 依赖固定宽度导致移动端不可用。
- MUST NOT 在移动端简单缩小桌面界面而不评估交互。
- MUST NOT 隐藏关键功能而没有替代入口。

## 8. AI Execution Rules

AI 必须说明目标视口、断点行为、导航变化、内容折叠和溢出策略，并提供相应测试证据。

## 9. Verification

在代表性视口执行布局、交互、缩放、软键盘和溢出测试。

## 10. Acceptance Criteria

关键任务在声明的目标视口可完成，且没有未批准的内容丢失或功能不可达。

## 11. Exceptions

复杂专业数据界面可限定最低支持宽度，但必须明确告知并提供替代访问路径。

## 12. References

WCAG 2.2、UAES-07。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
