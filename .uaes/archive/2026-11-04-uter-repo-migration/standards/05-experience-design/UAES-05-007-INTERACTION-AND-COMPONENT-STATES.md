# UAES-05-007 — INTERACTION AND COMPONENT STATES

**Standard ID:** UAES-05-007  
**Standard Name:** Interaction And Component States  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

定义统一的交互行为、反馈方式、组件状态和状态转换规则。

## 2. Standard States

交互组件必须根据实际适用性定义：

- Default
- Hover
- Active
- Focus-visible
- Disabled
- Loading
- Selected
- Expanded
- Collapsed
- Invalid
- Success
- Read-only

不能要求每个组件机械地实现所有状态，但必须明确哪些状态适用、哪些不适用及原因。

## 3. Interaction Contract

每个交互组件必须定义：

1. 用户触发方式。
2. 输入条件。
3. 状态变化。
4. 成功反馈。
5. 失败反馈。
6. 禁止操作。
7. 键盘行为。
8. 焦点行为。
9. 异步行为。
10. 可访问名称和状态。

## 4. Focus Management

- 键盘焦点必须可见。
- 焦点顺序必须符合内容逻辑。
- 弹窗打开后应按场景管理焦点。
- 弹窗关闭后焦点应返回合理位置。
- 不得随意移除浏览器默认键盘可访问性。
- 不得制造键盘陷阱。

## 5. Async Interaction

异步操作必须考虑：

- Loading
- Success
- Failure
- Timeout
- Retry
- Duplicate Submission
- Cancellation（适用时）

提交操作不能因为视觉反馈不明显而导致重复触发。

## 6. Destructive Actions

删除、重置、退款等具有破坏性或不可逆影响的操作，应按业务风险提供确认、明确反馈及必要的恢复机制。

## 7. Motion

动画必须服务于状态反馈和空间关系。

必须考虑：

- 动画时长。
- 缓动方式。
- 减少动态效果偏好。
- 低性能设备。
- 不必要的持续动画。

禁止以动画作为唯一状态表达方式。

## 8. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-007-001 | 交互组件必须声明适用状态 | MUST |
| UAES-05-007-002 | 焦点状态必须可见 | MUST |
| UAES-05-007-003 | 异步操作必须有反馈 | MUST |
| UAES-05-007-004 | 失败操作必须提供合理恢复方式 | MUST |
| UAES-05-007-005 | 破坏性操作必须按风险设计确认机制 | MUST |
| UAES-05-007-006 | 必须支持减少动态效果偏好 | MUST |
| UAES-05-007-007 | 禁止制造键盘陷阱 | MUST NOT |
| UAES-05-007-008 | 禁止只用颜色表达交互状态 | MUST NOT |

## 9. Verification

- 状态覆盖测试。
- 键盘操作测试。
- 焦点顺序测试。
- 异步成功与失败测试。
- 重复提交测试。
- 动画偏好测试。

## 10. Acceptance Criteria

关键组件的适用状态均已定义，键盘交互正常，异步反馈完整，焦点管理合理，失败场景可恢复。

## 11. Related Standards

UAES-05-006、UAES-05-008、UAES-05-009、UAES-05-011。
