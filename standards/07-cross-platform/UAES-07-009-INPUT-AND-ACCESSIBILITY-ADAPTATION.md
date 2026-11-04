# UAES-07-009 — Input and Accessibility Adaptation

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-009 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范鼠标、触控、键盘、手柄、辅助技术和平台输入行为。

## 2. Scope

Web、H5、Electron 和原生平台的输入及无障碍交互。

## 3. Definitions

- Input Modality：输入方式。
- Focus Management：焦点管理。
- Assistive Technology：辅助技术。
- Touch Target：触控目标。
- Keyboard Navigation：键盘导航。

## 4. Core Principles

输入方式不应限制核心任务；键盘和辅助技术必须获得合理支持；平台交互保持一致且可预测。

## 5. Mandatory Requirements

- UAES-07-009-001 MUST 为核心功能提供适用的键盘操作。
- UAES-07-009-002 MUST 保证焦点顺序合理。
- UAES-07-009-003 MUST 提供可见焦点状态。
- UAES-07-009-004 MUST 为触控交互设置足够的目标尺寸。
- UAES-07-009-005 MUST 避免仅依靠悬停提供关键功能。
- UAES-07-009-006 MUST 支持必要的屏幕阅读器语义。
- UAES-07-009-007 MUST 处理虚拟键盘遮挡。
- UAES-07-009-008 MUST 避免手势成为唯一操作方式。
- UAES-07-009-009 MUST 尊重系统无障碍设置。
- UAES-07-009-010 MUST 与 UAES-05-009 的无障碍要求保持一致。

## 6. Implementation Rules

PC：

- 键盘导航、Tab 顺序、快捷键和焦点管理。

H5：

- 触控反馈、滚动、软键盘和手势冲突。

Electron：

- 键盘快捷键与系统快捷键避免冲突。

Native：

- 适配 VoiceOver、TalkBack 和目标平台辅助技术。

## 7. Prohibited Practices

- MUST NOT 仅用颜色表达状态。
- MUST NOT 将 Hover 作为唯一交互入口。
- MUST NOT 使用不可访问的自定义控件替代原生语义而不补足交互。
- MUST NOT 阻止用户使用系统缩放或辅助技术。

## 8. AI Execution Rules

AI 修改交互必须检查键盘、触控、焦点、屏幕阅读器和系统辅助设置。

## 9. Verification

键盘、触控、辅助技术和自动化无障碍测试。

## 10. Acceptance Criteria

核心流程可以通过目标平台支持的输入方式完成。

## 11. Exceptions

平台原生限制必须记录并提供替代路径。

## 12. References

WCAG 2.2、WAI-ARIA APG、Apple Accessibility、Android Accessibility。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
