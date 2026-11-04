# UAES-05 — Experience & Design Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-05 |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | Experience & Design |
| Normative level | Enterprise |
| Owner | Design System Owner |
| Dependencies | UAES-00, UAES-01, UAES-02, UAES-03, UAES-04 |
| Related domains | UAES-06, UAES-07, UAES-09, UAES-10, UAES-11, UAES-12 |

## 1. Purpose

建立覆盖设计决策、设计资产、Token、组件、交互、响应式、无障碍、动效、设计到代码同步和视觉回归的统一工程标准。

设计必须成为可追踪、可复用、可验证的工程资产，而不是仅存在于设计稿或 AI 对话中的视觉描述。

## 2. Scope

适用于：

- Uter PC Web、H5、Electron。
- 后续 Android、iOS、HarmonyOS 等平台的设计适配。
- Figma 或其他设计工具中的设计资产（若使用）。
- React 组件库、页面、交互和设计 Token。
- AI 生成、修改、重构的 UI 代码和设计资产。

本标准不定义具体产品业务规则；业务含义由 UAES-02 管理，技术模块边界由 UAES-04 管理。

## 3. Definitions

- Design System：设计决策、Token、组件、模式、文档及其治理机制的集合。
- Design Token：可跨工具和平台共享的设计属性。
- Primitive Token：原始值，如品牌色、基础间距。
- Semantic Token：具有语义用途的 Token，如文本主色、危险状态背景。
- Component Contract：组件的属性、变体、插槽、状态、行为、可访问性和约束。
- Visual Baseline：被批准用于视觉回归比较的基准图像。
- Design Drift：设计规范、设计资产和实际实现之间的偏离。
- Design Exception：经审批的设计规范例外。

## 4. Core Principles

1. Single Source of Truth：每类设计事实必须有唯一权威来源。
2. Token First：实现必须优先引用 Token，不得任意散落硬编码样式。
3. Semantic over Literal：业务组件优先使用语义 Token，不直接绑定原始色值。
4. Contract over Appearance：组件不仅要视觉一致，还必须具有明确行为和状态契约。
5. Accessible by Default：无障碍要求属于组件基础契约，不是后期补丁。
6. Responsive by Design：布局必须适配目标视口和输入方式。
7. Evidence-based Verification：设计合规必须有自动化或人工验收证据。
8. Controlled Evolution：设计变更必须有影响分析、版本管理和迁移策略。

## 5. Mandatory Requirements

### 5.1 Governance

- UAES-05 MUST 由 Design System Owner 维护。
- 所有规范、Token、组件契约和基准图必须具备版本及状态。
- 未批准的设计建议不得被描述为正式设计规则。
- 破坏性变更 MUST 经过影响分析、迁移计划和审批。
- 例外 MUST 通过 UAES-00 的 Exception Management 管理。

### 5.2 Source of Truth

设计 Token 必须有机器可读的源文件；组件契约必须有可检索的注册表；视觉基准必须有可追踪的版本与环境信息。

生成产物不得反向成为 Token 的权威来源。

### 5.3 Implementation

- UI MUST 使用已登记的设计 Token。
- 可复用 UI MUST 优先使用登记的基础组件。
- 组件 MUST 遵守其 Component Contract。
- 不得通过局部覆盖、深层选择器或重复组件绕过设计系统。
- 页面级特殊实现必须记录原因和适用范围。

### 5.4 Accessibility

Web/H5 默认目标为 WCAG 2.2 AA。

必须覆盖键盘操作、焦点可见、语义结构、对比度、表单错误提示、目标尺寸、缩放和辅助技术兼容。

### 5.5 Responsive

每个页面必须声明布局策略、断点行为、溢出策略和关键交互在不同视口下的适配方式。

### 5.6 Verification

设计质量验证至少包括：

- Token Schema Validation。
- Token Reference Resolution。
- Hard-coded Style Detection。
- Component Contract Validation。
- Accessibility Automated Checks。
- Responsive Viewport Tests。
- Visual Regression Tests。
- Manual Design Review。

## 6. Implementation Rules

建议仓库结构：

```
design-system/
├── tokens/
│   ├── source/
│   ├── themes/
│   └── generated/
├── components/
│   ├── registry/
│   └── contracts/
├── patterns/
├── foundations/
├── assets/
├── docs/
└── visual-baselines/
```

具体路径可结合现有仓库审计调整，不得在未检查仓库前假设上述目录已经存在。

Token 源文件应使用 DTCG 2025.10 稳定格式作为跨工具交换基线；内部扩展必须使用受控命名空间，并通过转换工具生成 CSS、TypeScript 等运行时产物。

## 7. Prohibited Practices

- MUST NOT 在业务页面中任意定义第二套品牌色、字体体系或间距体系。
- MUST NOT 将截图或设计稿当作唯一可执行规范。
- MUST NOT 将自动生成的 CSS 当作 Token 源数据。
- MUST NOT 仅凭截图"看起来相似"判定视觉验收通过。
- MUST NOT 以颜色作为唯一状态表达方式。
- MUST NOT 删除焦点轮廓以追求视觉整洁。
- MUST NOT 未经审批改变已批准的品牌识别元素。

## 8. AI Execution Rules

AI 在执行 UI 任务前 MUST：

1. 加载相关设计规范和 Token。
2. 检查组件注册表，识别可复用组件。
3. 明确目标平台、视口和交互方式。
4. 将需求映射到设计 Token 和组件契约。
5. 对未知设计决策标记为 UNKNOWN 或 PROPOSAL。
6. 不得自行创造正式品牌规范。
7. 完成实现后执行相关设计 Gate。
8. 提供变更文件、Token 使用、组件复用、无障碍和视觉验证证据。

## 9. Verification

由 UAES-05-GATE-001 执行。静态规则、Schema 校验、浏览器测试、视觉回归和人工评审分别记录结果，不得相互替代。

## 10. Acceptance Criteria

- Token 源数据唯一且可解析。
- 所有正式组件均有契约。
- 关键色彩组合满足对比度要求。
- 关键交互可通过键盘操作。
- PC/H5 目标视口不存在未批准的布局破坏。
- 视觉回归基准经过审批。
- AI 能在不绕过设计系统的前提下完成典型 UI 任务。
- 所有阻断级 Gate 均 PASS。

## 11. Exceptions

必须记录 Exception ID、影响范围、原因、风险、补偿措施、Owner、批准人、到期时间和复核条件。涉及无障碍、安全或法律要求的例外必须由对应领域 Owner 共同评估。

## 12. References

- W3C WCAG 2.2
- WAI-ARIA Authoring Practices Guide
- Design Tokens Community Group Format Module 2025.10
- UAES-00 至 UAES-04

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial enterprise standard |
