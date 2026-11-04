# UAES-06-005 — TypeScript and React Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-005 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-05 |

## 1. Purpose

统一 TypeScript 类型安全、React 组件、Hooks、状态和异步数据实现。

## 2. Scope

React 19、TypeScript、TanStack Router、TanStack Query、Zustand、Base UI、Tailwind CSS 4、React Hook Form、Zod。

## 3. Definitions

- **Static Type**：编译期类型。
- **Runtime Validation**：运行时数据校验。
- **Server State**：由服务端拥有和同步的数据。
- **Client State**：由客户端交互和界面拥有的数据。
- **Derived State**：可从已有状态计算得到的数据。

## 4. Core Principles

Strict Typing、Runtime Validation、Component Contract、State Ownership、Hooks Correctness。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-005-001 | MUST 启用 TypeScript strict。 |
| UAES-06-005-002 | MUST 尽量避免 any。 |
| UAES-06-005-003 | MUST 对外部数据进行运行时校验。 |
| UAES-06-005-004 | MUST 遵守 React Hooks 规则。 |
| UAES-06-005-005 | MUST 遵守 React 组件契约。 |
| UAES-06-005-006 | MUST 区分 Server State 和 Client State。 |
| UAES-06-005-007 | MUST 避免重复存储可推导状态。 |
| UAES-06-005-008 | MUST 明确异步状态和错误状态。 |
| UAES-06-005-009 | MUST 为列表提供稳定的 Key。 |
| UAES-06-005-010 | MUST 避免不必要的 Effect 和同步派生状态。 |
| UAES-06-005-011 | MUST 明确组件 Props、事件和受控状态。 |
| UAES-06-005-012 | MUST 为复杂表单定义 Schema 和提交边界。 |
| UAES-06-005-013 | MUST 避免组件直接承担不必要的网络和业务逻辑。 |
| UAES-06-005-014 | MUST 避免将类型断言当作运行时数据验证。 |
| UAES-06-005-015 | MUST 对公共类型变更执行影响分析。 |

## 6. Implementation Rules

类型：

- 优先使用 unknown 接收不可信数据，再执行收窄和验证。
- 使用联合类型表达有限状态。
- 使用 discriminated union 表达互斥状态。
- 尽量避免过宽泛的可选字段。
- null 和 undefined 的业务语义必须明确。

React：

- 组件负责 UI 组合和交互表达。
- 业务逻辑可抽取为 Hook 或领域服务。
- Effect 用于与外部系统同步，不作为默认数据流机制。
- 组件必须遵循 UAES-05 Component Contract。
- 避免不必要的状态复制和过度提升状态。

状态：

- TanStack Query 管理服务端异步状态。
- Zustand 管理需要跨组件共享的客户端状态。
- React 局部 State 管理局部交互状态。
- React Hook Form 管理复杂表单状态。
- Zod 负责运行时 Schema 校验。
- 同一事实不得在多个状态容器维护互相独立的副本。

路由：

- TanStack Router 管理路由和路由参数。
- 路由参数必须验证。
- 页面级数据依赖应明确声明和错误处理。

## 7. Prohibited Practices

- MUST NOT 使用 as any 作为常规修复方式。
- MUST NOT 为每个组件机械添加 useEffect。
- MUST NOT 将服务端数据无条件复制进 Zustand。
- MUST NOT 在 UI 中直接拼接复杂 API 协议。
- MUST NOT 通过忽略 TypeScript 错误掩盖类型问题。
- MUST NOT 将 React.FC 或其他单一写法规定为所有组件的唯一形式，除非项目另有已批准约定。

## 8. AI Execution Rules

AI 必须先确认数据来源和状态所有权，再决定使用 Hook、Query、Store 或组件局部状态。涉及公共组件和全局 Store 时必须分析影响范围。

## 9. Verification

由 P09 执行 TypeScript 类型检查、Lint、单元、组件、集成和 E2E 测试。

## 10. Acceptance Criteria

无未批准的类型逃逸，状态所有权明确，组件契约完整，运行时输入经过校验。

## 11. Exceptions

历史代码可分阶段提升严格度，但不得新增扩大不安全类型范围的实现。

## 12. References

TypeScript Handbook、React Documentation、TanStack Documentation。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
