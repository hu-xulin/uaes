---

# UAES-05 — Experience & Design Standard

## 1. Purpose

本标准建立 Uter 的体验与设计工程治理体系，使设计规则成为可理解、可实现、可验证、可追踪、可持续演进的工程资产。

本标准不仅约束视觉表现，还约束设计决策、Design Tokens、组件 API、交互行为、响应式布局、无障碍、设计交付、视觉测试及 AI 设计执行。

## 2. Scope

本标准适用于：

- PC Web
- H5
- Electron
- Android
- iOS
- HarmonyOS
- 未来新增的 Uter 产品界面及终端

适用于设计师、产品人员、前端工程师、客户端工程师、测试人员及 AI Agent。

## 3. Definitions

- Design System：设计原则、Tokens、组件、模式、文档、治理流程的集合。
- Design Token：表达设计决策的最小命名单位。
- Primitive Token：基础原始值。
- Semantic Token：表达用途和语义的 Token。
- Component Token：专用于组件的 Token。
- Component Contract：组件的属性、状态、行为、可访问性和验收约束。
- Visual Regression：对比基准视觉与当前渲染结果，发现非预期差异。
- Design Drift：设计规范、设计资产和实际代码之间的偏差。

## 4. Core Principles

### UAES-05-CORE-001 — Single Source of Truth

设计 Token 必须有唯一权威数据源。禁止在多个平台分别维护相互独立且无法同步的设计数值。

### UAES-05-CORE-002 — Semantic First

产品界面优先使用语义 Token，不得在业务组件中任意硬编码品牌色、背景色、文字色和状态色。

### UAES-05-CORE-003 — Component Contract

所有公共组件必须具备明确的组件契约，包括属性、变体、状态、行为、响应式、无障碍和测试要求。

### UAES-05-CORE-004 — Accessible by Default

无障碍要求必须进入设计和组件实现阶段，不能仅依靠最终人工检查。

### UAES-05-CORE-005 — Platform Consistency

跨平台保持设计语义和品牌体验一致；允许平台交互模式存在合理差异，不要求所有平台复制相同代码。

### UAES-05-CORE-006 — Evidence Based

设计验收必须提供 Token 检查、组件测试、无障碍检查或视觉回归等可复核证据。

### UAES-05-CORE-007 — Controlled Evolution

设计系统变更必须具备版本、变更原因、影响范围、迁移策略和验证结果。

## 5. Mandatory Requirements

| Rule ID     | Requirement                              | Level    |
| ----------- | ---------------------------------------- | -------- |
| UAES-05-001 | 必须建立统一设计系统及责任边界                          | MUST     |
| UAES-05-002 | 必须建立唯一权威 Token 数据源                       | MUST     |
| UAES-05-003 | 必须区分 Primitive、Semantic、Component Tokens | MUST     |
| UAES-05-004 | 必须定义颜色、字体、布局和尺寸体系                        | MUST     |
| UAES-05-005 | 公共组件必须定义 Component Contract              | MUST     |
| UAES-05-006 | 交互组件必须定义完整状态                             | MUST     |
| UAES-05-007 | 必须定义响应式规则                                | MUST     |
| UAES-05-008 | 必须定义无障碍验收规则                              | MUST     |
| UAES-05-009 | 关键界面必须纳入视觉回归                             | MUST     |
| UAES-05-010 | AI 必须遵循已批准设计系统                           | MUST     |
| UAES-05-011 | 禁止未经批准创建平行设计 Token                       | MUST NOT |
| UAES-05-012 | 禁止以视觉截图通过代替功能与无障碍验收                      | MUST NOT |
| UAES-05-013 | 设计变更必须有追踪记录                              | MUST     |
| UAES-05-014 | 平台专属实现必须保持语义映射                           | MUST     |

## 6. Design System Layers

设计系统必须划分为以下层次：

1. Foundation：颜色、字体、尺寸、间距、边框、圆角等基础体系。
2. Tokens：Primitive、Semantic、Component Tokens。
3. Components：Button、Input、Select、Dialog、Table 等基础和复合组件。
4. Patterns：表单、导航、搜索、空状态、错误恢复等交互模式。
5. Templates：页面级结构与业务布局模板。
6. Product Experience：实际产品页面和业务流程。

上层只能依赖下层公开的稳定契约，不得绕过 Token 和组件治理直接复制实现。

## 7. Project Baseline

当前 Uter 设计资产审查基线：

- 设计资产：UTER Design System 3.0。
- 品牌主色：#5B5EE6。
- 字体：Inter + 思源黑体。
- 正文基准：14px。
- 最小字号：12px。
- 层级表达：优先使用 1px 描边和表面色差。
- 投影：不作为主要层级表达方式。

以上是项目输入事实，不自动构成已批准的 UAES 合规结论。若现有资产与本标准冲突，必须记录差异并经过设计决策流程。

## 8. AI Design Execution Requirements

AI 在设计或开发界面前必须：

1. 读取项目设计系统入口。
2. 读取 Token 定义和主题规则。
3. 检查是否存在可复用组件。
4. 阅读组件契约和交互状态要求。
5. 明确目标平台、视口和响应式要求。
6. 确认无障碍要求。
7. 规划视觉回归验证。

AI 不得：

- 擅自更换品牌主色。
- 擅自增加新的颜色体系。
- 通过随机 padding、margin 和 font-size 修补布局。
- 为单个页面复制一套已有公共组件。
- 以个人审美推翻已经批准的设计决策。
- 删除无障碍语义或键盘交互以简化实现。
- 将未经确认的设计建议标记为已批准规则。

如果规范缺失或存在冲突，AI 必须说明冲突、提供建议并请求适当审批，不得伪造审批状态。

## 9. Verification

P4 至少建立以下自动化检查：

- Design Token JSON Schema 校验。
- Token 引用完整性检查。
- 未登记 Token 检查。
- 颜色对比度检查。
- 组件契约检查。
- 组件状态覆盖检查。
- 响应式视口检查。
- Accessibility 自动化扫描。
- 关键页面视觉回归。
- 设计变更追踪检查。

自动化检查不能完全替代人工可用性和视觉评审。

## 10. Acceptance Criteria

P4 领域验收必须同时满足：

1. 所有必需标准文档已完成并相互引用正确。
2. Token 数据源及 Schema 已建立。
3. Token 能够生成目标平台所需的实现产物。
4. 公共组件具有完整契约。
5. 关键组件具有状态与无障碍测试。
6. 关键页面具有视觉回归基线。
7. AI 执行规则能够被实际 Agent 使用。
8. Design Quality Gate 能在 CI 中运行。
9. 所有 P0 设计违规均已解决或经过正式例外审批。
10. 验收证据可追踪到具体提交和测试运行。

## 11. Exceptions

任何例外必须记录：

- Exception ID
- 关联规则 ID
- 例外原因
- 影响范围
- 风险
- 临时缓解措施
- 责任人
- 批准人
- 到期时间
- 恢复符合规范的计划

安全、无障碍和品牌核心规则不得通过无记录的临时实现绕过。

## 12. Related Standards

- UAES-05-001 Design System Governance
- UAES-05-002 Design Token Architecture
- UAES-05-003 Color System
- UAES-05-004 Typography System
- UAES-05-005 Layout and Spacing System
- UAES-05-006 Component Architecture
- UAES-05-007 Interaction and Component States
- UAES-05-008 Responsive Design
- UAES-05-009 Accessibility Engineering
- UAES-05-010 Design Asset and Code Handoff
- UAES-05-011 Visual Regression Testing
- UAES-05-012 AI Design Execution
- UAES-05-013 Design Documentation and Change Governance

## 13. Change History

| Version | Status | Change                          |
| ------- | ------ | ------------------------------- |
| 1.0.0   | DRAFT  | Initial UAES P4 domain standard |
