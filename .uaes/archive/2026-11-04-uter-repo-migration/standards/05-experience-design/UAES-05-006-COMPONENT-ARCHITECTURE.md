# UAES-05-006 — COMPONENT ARCHITECTURE

**Standard ID:** UAES-05-006  
**Standard Name:** Component Architecture  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立可复用、可测试、可访问、可维护的 UI 组件架构。

## 2. Component Layers

Layer 1: Primitive Components

基础交互元素：

- Button
- Icon
- Text
- Spinner
- Separator

Layer 2: Form Components

- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Date Picker

Layer 3: Feedback Components

- Alert
- Toast
- Tooltip
- Progress
- Skeleton
- Empty State

Layer 4: Overlay Components

- Dialog
- Drawer
- Popover
- Dropdown Menu
- Context Menu

Layer 5: Data Components

- Table
- Pagination
- Tabs
- Tree
- Data List

Layer 6: Product Components

由业务需求组合而成，不得将业务逻辑不加区分地塞入基础组件。

## 3. Component Contract

每个公共组件必须有明确契约：

```yaml
component:
  name: Button
  category: primitive
  version: 1.0.0

  variants:
    - primary
    - secondary
    - outline
    - ghost
    - destructive

  sizes:
    - sm
    - md
    - lg

  states:
    - default
    - hover
    - active
    - focus-visible
    - disabled
    - loading

  accessibility:
    keyboard: true
    semantic_element: button
    accessible_name_required: true

  tests:
    unit: required
    interaction: required
    accessibility: required
    visual: required
```

该示例是契约结构示意，具体字段以 Component Contract Schema 为准。

## 4. Component API

必须遵守：

- API 语义清晰。
- 默认值合理。
- 受控和非受控模式明确。
- 不暴露不必要的内部实现。
- 不重复封装浏览器原生行为。
- 不通过大量布尔属性产生组合爆炸。
- 复杂组件使用明确的子组件或组合 API。

## 5. Styling

组件样式必须：

- 使用语义 Token。
- 支持主题。
- 支持规定的尺寸和变体。
- 避免全局样式污染。
- 避免高优先级选择器滥用。
- 避免依赖 DOM 结构脆弱选择器。

禁止在组件内随意硬编码品牌色、字号、间距和圆角。

## 6. State Management

交互状态必须明确由谁控制：

- Component Internal State
- Controlled Props
- Form State
- Application State

组件不能隐式修改外部业务状态。

## 7. Composition

优先采用组合而非巨型组件。

禁止：

- 单个组件承担多个不相关业务场景。
- 使用过多条件分支控制完全不同的 UI。
- 复制组件源码作为页面特例。
- 通过隐藏内部状态掩盖组件契约缺陷。

## 8. React Engineering

React 组件必须遵守：

- Props 使用明确的 TypeScript 类型。
- 公共组件避免无约束的 any。
- 列表使用稳定 key。
- 事件处理语义明确。
- 副作用必须有明确生命周期。
- 避免不必要的状态复制。
- 组件拆分应基于职责和复用边界。
- 不得为了追求复用而过度抽象。

## 9. Component Registry

公共组件必须登记：

- Component ID
- Name
- Category
- Source Path
- Contract Path
- Token Dependencies
- Status
- Version
- Test Coverage
- Deprecation Status

## 10. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-006-001 | 公共组件必须登记 | MUST |
| UAES-05-006-002 | 公共组件必须有契约 | MUST |
| UAES-05-006-003 | 必须定义变体与尺寸 | MUST |
| UAES-05-006-004 | 必须定义组件状态 | MUST |
| UAES-05-006-005 | 必须支持语义 Token | MUST |
| UAES-05-006-006 | 必须有 TypeScript 类型 | MUST |
| UAES-05-006-007 | 必须具有适当测试 | MUST |
| UAES-05-006-008 | 禁止业务组件绕过公共组件体系重复造轮子 | MUST NOT |
| UAES-05-006-009 | 禁止使用 any 掩盖公共组件 API 问题 | MUST NOT |

## 11. Verification

自动检查：

- 组件登记完整性。
- TypeScript 类型检查。
- Token 引用。
- API 契约。
- 重复组件检测。
- 交互状态测试。
- Accessibility 测试。
- 视觉回归。

## 12. Acceptance Criteria

- 公共组件有清晰分类。
- 组件 API 稳定。
- 变体和状态完整。
- Token 使用合规。
- 测试可以独立运行。
- 业务组件与基础组件边界清晰。

## 13. Related Standards

UAES-04-003、UAES-04-005、UAES-05-001、UAES-05-002、UAES-05-003、UAES-05-004、UAES-05-005、UAES-05-007、UAES-05-009。

P4-C：交互、响应式与无障碍工程

这部分是 P4 中非常重要的工程约束。一个组件即使视觉上正确，如果键盘无法操作、焦点丢失、窄屏无法使用或错误状态没有语义，也不能视为合格组件。

无障碍基线采用 WCAG 2.2 AA 作为目标；自动化工具只能覆盖部分问题，仍需键盘、屏幕阅读器和人工检查。
