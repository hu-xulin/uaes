# UAES-05-010 — Motion and Animation

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-010 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

定义动效的用途、时长、节奏、性能和用户运动偏好适配。

## 2. Scope

过渡、反馈、加载、展开折叠、页面切换、滚动动画和装饰动画。

## 3. Definitions

- Motion Token：动效时长、缓动和延迟等 Token。
- Reduced Motion：用户减少动态效果的偏好。
- Essential Motion：传达状态或空间关系所必需的动效。

## 4. Core Principles

功能优先、克制使用、可预测、尊重用户偏好、性能稳定。

## 5. Mandatory Requirements

- UAES-05-010-001 MUST 为动效定义 Token。
- UAES-05-010-002 MUST 区分功能动效和装饰动效。
- UAES-05-010-003 MUST 支持 prefers-reduced-motion。
- UAES-05-010-004 MUST 避免持续闪烁和高频刺激。
- UAES-05-010-005 MUST 避免动效阻塞核心操作。
- UAES-05-010-006 MUST 为重要状态变化提供非动效反馈。
- UAES-05-010-007 MUST 对动画性能进行评估。
- UAES-05-010-008 MUST 对自动播放、循环和视差效果提供合理限制。

## 6. Implementation Rules

优先使用 transform 和 opacity 实现过渡；避免频繁触发布局和绘制成本高的属性。

减少动态效果模式下，应取消非必要位移、视差和持续循环动画，并保留必要的状态反馈。

## 7. Prohibited Practices

- MUST NOT 强制用户观看非必要动画。
- MUST NOT 通过持续动画表示唯一状态。
- MUST NOT 使用无法停止的装饰性循环动画干扰任务。

## 8. AI Execution Rules

AI 添加动画时必须说明目的、时长、缓动、性能影响和 reduced-motion 行为。

## 9. Verification

检查动效 Token、媒体查询、动画时长、持续运动和性能表现。

## 10. Acceptance Criteria

核心状态在减少动态效果模式下仍可理解和操作，动画不影响主要任务。

## 11. Exceptions

确有业务意义的动画须记录必要性和替代反馈。

## 12. References

WCAG 2.2、CSS Media Queries prefers-reduced-motion。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
