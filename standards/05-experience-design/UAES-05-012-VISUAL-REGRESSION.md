# UAES-05-012 — Visual Regression

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-012 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立可重复的视觉验证流程，识别非预期 UI 变化。

## 2. Scope

页面截图、组件截图、关键交互状态、响应式视口和主题。

## 3. Definitions

- Baseline：经审批的视觉基准。
- Snapshot：某次执行产生的截图。
- Visual Diff：当前截图与基准的差异。
- Noise：由环境、字体、时间或动态内容产生的非产品差异。

## 4. Core Principles

基准受控、环境一致、关键状态覆盖、差异可解释、审批可追踪。

## 5. Mandatory Requirements

- UAES-05-012-001 MUST 为视觉基准记录版本和来源。
- UAES-05-012-002 MUST 固定截图环境中的视口、浏览器、字体和主题。
- UAES-05-012-003 MUST 对关键页面和组件建立基准。
- UAES-05-012-004 MUST 覆盖关键状态和响应式视口。
- UAES-05-012-005 MUST 对动态内容采取稳定化策略。
- UAES-05-012-006 MUST 将视觉差异与代码变更关联。
- UAES-05-012-007 MUST 对基准更新执行审查。
- UAES-05-012-008 MUST 区分可接受变化与意外回归。
- UAES-05-012-009 MUST 保留失败截图和差异证据。

## 6. Implementation Rules

视觉测试环境应固定：

- 浏览器及版本。
- 视口和设备像素比。
- 字体和字体加载状态。
- 时区、语言和测试数据。
- 动画和时间相关内容。
- 网络资源和外部服务依赖。

像素差异阈值不得单独决定通过与否。布局位移、文字裁切、颜色错误和交互状态丢失应有独立规则。

## 7. Prohibited Practices

- MUST NOT 在没有审查的情况下批量更新全部基准。
- MUST NOT 将动态数据噪声直接纳入正式基准。
- MUST NOT 因视觉测试失败就盲目提高容差。
- MUST NOT 只比较首页而忽略关键业务流程。

## 8. AI Execution Rules

AI 修改 UI 后必须运行受影响的视觉测试；基准变化必须解释原因，并不得自行批准高影响基准更新。

## 9. Verification

执行截图、差异分析、关键区域检查、响应式验证和人工审批。

## 10. Acceptance Criteria

关键页面拥有有效基准；所有差异有结论；阻断级视觉回归为零。

## 11. Exceptions

第三方内容和不可稳定内容可排除截图区域，但必须记录排除范围和原因。

## 12. References

UAES-05-006、UAES-05-008、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
