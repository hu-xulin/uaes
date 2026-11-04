# UAES-04-005 — React & TypeScript Frontend Architecture Standard

**Standard ID:** UAES-04-005  
**Version:** 1.0.0  
**Status:** DRAFT  
**Technology baseline:** React 19 / TypeScript / Rsbuild 2 / Bun

## 1. Purpose

建立 Uter Web 前端的应用分层、模块边界、状态管理、数据请求、表单、路由、错误处理和组件复用规则。

## 2. Frontend architecture principles

- UAES-FE-001：前端必须按业务职责组织，而非只按文件类型组织。
- UAES-FE-002：业务模块必须具有明确边界。
- UAES-FE-003：组件必须区分展示职责和业务编排职责。
- UAES-FE-004：共享组件不得隐式依赖具体业务模块。
- UAES-FE-005：服务端状态和客户端交互状态必须区分管理。
- UAES-FE-006：类型定义必须尽可能来源于明确的数据契约。
- UAES-FE-007：不得使用 `any` 隐藏未知类型问题，确实无法避免时必须缩小范围并说明理由。
- UAES-FE-008：禁止通过全局状态存储所有页面数据。

## 3. Suggested logical structure

```
src/
├── app/
│   ├── providers/
│   ├── router/
│   ├── layouts/
│   └── bootstrap/
│
├── features/
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── model/
│       ├── routes/
│       └── index.ts
│
├── entities/
├── shared/
│   ├── ui/
│   ├── lib/
│   ├── hooks/
│   ├── api/
│   └── types/
│
├── services/
├── styles/
└── assets/
```

这是建议的逻辑组织方式，不要求把现有仓库立即重构为此目录。迁移必须经过影响分析。

## 4. Component boundaries

- UAES-FE-009：组件必须有单一、清晰的主要职责。
- UAES-FE-010：通用 UI 组件不得包含具体业务 API 调用。
- UAES-FE-011：组件不得直接访问不属于其职责范围的模块内部状态。
- UAES-FE-012：复杂业务页面应将数据编排与视觉展示适当分离。
- UAES-FE-013：组件 Props 必须有明确类型。
- UAES-FE-014：不得使用大量布尔 Props 构建难以理解的多模式组件。
- UAES-FE-015：组件副作用必须有明确生命周期和清理机制。

## 5. State management

必须区分：

### Server state

例如：

- 用户资料；
- 模型列表；
- 订单记录；
- Token 使用记录；
- 任务状态；
- 服务端分页数据。

优先使用 TanStack Query 管理。

### Client state

例如：

- 侧边栏展开状态；
- 本地弹窗状态；
- 页面交互状态；
- 不需要服务端同步的临时选择状态。

可使用 React state 或 Zustand。

规则：

- UAES-FE-016：不得把服务端缓存当作普通全局客户端状态重复维护。
- UAES-FE-017：服务端数据更新必须明确缓存失效或同步策略。
- UAES-FE-018：客户端状态必须有明确所有者。
- UAES-FE-019：不得在多个全局 Store 中重复保存同一事实数据。
- UAES-FE-020：敏感数据不得无必要地持久化到浏览器存储。

## 6. API access

- UAES-FE-021：业务组件不得随意构造 API URL。
- UAES-FE-022：API 调用应经过统一客户端或模块级 API 层。
- UAES-FE-023：请求、响应和错误类型必须明确。
- UAES-FE-024：认证凭据处理必须集中管理。
- UAES-FE-025：不得在客户端硬编码服务端密钥。
- UAES-FE-026：请求取消、超时和重复提交必须有明确处理策略。
- UAES-FE-027：API 失败不得被静默伪装成正常数据。

## 7. Forms and validation

- UAES-FE-028：表单必须有明确的数据结构和校验规则。
- UAES-FE-029：前端校验不能替代服务端业务校验。
- UAES-FE-030：复杂表单必须定义初始值、提交、错误和重置行为。
- UAES-FE-031：异步提交期间必须防止不合理的重复提交。
- UAES-FE-032：Zod 等校验规则应尽可能与接口契约保持一致。

## 8. Routing

- UAES-FE-033：路由必须有明确的页面归属。
- UAES-FE-034：权限校验不能仅依赖隐藏菜单或按钮。
- UAES-FE-035：直接访问受保护路由必须执行正确的身份和权限检查。
- UAES-FE-036：路由参数必须经过解析和校验。
- UAES-FE-037：页面导航不得泄露敏感参数。

## 9. Error and loading states

页面必须合理处理：

- Loading；
- Empty；
- Success；
- Error；
- Partial failure；
- Permission denied；
- Session expired；
- Network unavailable。

不得让用户在请求失败时误以为操作已成功。

涉及支付、充值、退款等资金操作时，必须明确显示服务端确认状态，不能仅根据前端请求已发送就显示成功。

## 10. Performance

- UAES-FE-038：避免不必要的重复渲染。
- UAES-FE-039：大型列表应考虑分页或虚拟化。
- UAES-FE-040：大型依赖应评估代码分割。
- UAES-FE-041：避免在渲染期间执行昂贵的同步计算。
- UAES-FE-042：图片、字体和静态资源必须考虑加载成本。
- UAES-FE-043：性能优化必须有测量证据，不得仅凭主观判断。

## 11. Design system integration

- UAES-FE-044：UI 实现必须遵守当前批准的 UTER Design System。
- UAES-FE-045：不得随意创建与设计系统冲突的颜色、字号和间距体系。
- UAES-FE-046：通用组件必须保持一致的状态、尺寸和交互契约。
- UAES-FE-047：设计 Token 应通过统一入口使用。
- UAES-FE-048：视觉回归必须覆盖关键页面和组件状态。

## 12. Acceptance criteria

- 业务模块边界明确；
- API 调用有统一入口；
- Server State 与 Client State 区分；
- 无未经解释的危险类型逃逸；
- 路由权限与服务端权限不冲突；
- 表单校验完整；
- 错误和加载状态明确；
- 设计系统使用一致；
- 前端测试覆盖关键业务路径。
