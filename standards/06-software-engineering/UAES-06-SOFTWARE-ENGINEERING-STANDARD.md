# UAES-06 — Software Engineering Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-06 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Domain | Software Engineering |
| Owner | Software Engineering Owner |
| Dependencies | UAES-00, UAES-01, UAES-02, UAES-03, UAES-04, UAES-05 |
| Related domains | UAES-07, UAES-08, UAES-09, UAES-10, UAES-11, UAES-12 |

## 1. Purpose

建立统一的软件实现标准，使项目代码具备可读性、可维护性、可扩展性、可验证性和可演进性，并使 AI 能够按照明确的工程约束完成代码实现。

P06 的核心任务是把 UAES 的架构、产品需求和设计规范转化为可维护、可审查、可生成、可验证的软件实现规则。P06 不重复 P04 的系统架构决策，也不把 P09 的测试体系提前塞进编码规范：P06 规定代码应该如何组织、编写、演进和维护；P09 负责验证代码是否正确；P10 负责安全控制；P11 负责构建、交付和发布。

针对 Uter 当前工程，P06 必须覆盖：

- Go 后端及多个 Go Module。
- React 19 + TypeScript Web 前端。
- Electron 桌面端。
- Bun、Rsbuild、TanStack Router、TanStack Query、Zustand、Base UI、Tailwind CSS 4、React Hook Form、Zod。
- GORM、Gin、SQLite/MySQL/PostgreSQL、Redis。
- 多 AI 工具协作，包括 WorkBuddy、Codex、Claude Code、Cursor 等。

**重要边界**：以上是当前项目技术基线，不代表本轮已对本地仓库执行代码检查。本阶段交付的是标准设计，不声称已运行 Formatter、Linter、Compiler 或 CI。

## 2. Scope

适用于：

- Go 后端和 Go Modules。
- TypeScript、React Web 前端。
- Electron 主进程、Preload 和 Renderer。
- API Client、SDK、代码生成工具。
- 数据访问、缓存访问、异步任务和并发代码。
- 配置、依赖、日志、错误处理和文档。
- AI 生成、修改、重构和迁移的所有代码。

## 3. Definitions

- **Coding Standard**：代码编写规则。
- **Module Boundary**：模块责任和依赖边界。
- **Generated Code**：由工具根据 Schema 或契约生成的代码。
- **Handwritten Code**：人工或 AI 直接编写的代码。
- **Refactoring**：在不改变外部可观察行为的前提下改善内部结构。
- **Migration**：涉及接口、数据、依赖或运行行为变化的迁移。
- **Technical Debt**：为短期收益而形成的维护成本。
- **Code Ownership**：代码目录、模块和接口的责任归属。

## 4. Core Principles

1. **Correctness First**：正确性优先于代码简短。
2. **Explicit over Implicit**：重要行为必须显式表达。
3. **Cohesion and Low Coupling**：高内聚、低耦合。
4. **Type Safety**：使用类型系统约束非法状态。
5. **Fail Explicitly**：错误必须可识别、可追踪。
6. **Single Responsibility**：模块和函数责任明确。
7. **Reuse with Discipline**：优先复用稳定能力，不制造过度抽象。
8. **Deterministic Tooling**：工具链和依赖必须可重复。
9. **Contract-driven Implementation**：以需求、架构和接口契约为实现依据。
10. **Evidence-based Delivery**：代码完成不等于工程验收完成。

## 5. Mandatory Requirements

### 5.1 General

- UAES-06 MUST 遵守 UAES-04 的架构和模块边界。
- UAES-06 MUST 遵守 UAES-05 的设计 Token 和组件契约。
- UAES-06 MUST 使用项目规定的 Formatter、Linter、Compiler 和类型检查工具。
- UAES-06 MUST 为所有正式模块明确入口、依赖和责任。
- UAES-06 MUST 对错误、配置、日志、并发和资源生命周期作出明确处理。
- UAES-06 MUST 禁止未经批准的跨模块内部实现依赖。
- UAES-06 MUST 对公共 API、共享类型和持久化模型变更执行影响分析。
- UAES-06 MUST 保留生成代码与源契约之间的映射关系。

### 5.2 Go

- 使用标准 Go 格式化工具。
- 明确 Context 传递和取消语义。
- 错误必须保留必要上下文。
- 并发操作必须有退出和资源回收机制。
- 公共接口必须具有稳定的语义。
- 禁止无必要的全局可变状态。

### 5.3 TypeScript / React

- 启用严格类型检查。
- 禁止以 any 作为默认逃逸方式。
- 运行时外部输入必须经过验证。
- 组件必须遵守 UAES-05 Component Contract。
- Hooks 必须遵守 React Hooks 规则。
- 服务端状态、客户端状态和表单状态必须明确区分。

### 5.4 Electron

- Main、Preload、Renderer 职责分离。
- IPC 必须具有明确契约。
- Renderer 不得直接获得不必要的 Node.js 能力。
- 主进程与渲染进程之间的调用必须经过受控桥接。
- 安全控制细则由 UAES-10 进一步规定。

### 5.5 Dependencies and Configuration

- 依赖必须锁定并可重复安装。
- 依赖新增、升级、移除必须记录原因。
- 不得将密钥和环境敏感配置写入源码。
- 配置必须经过结构和运行时校验。

## 6. Implementation Rules

每个模块应明确：

- 职责和边界。
- 对外接口。
- 内部实现。
- 依赖方向。
- 错误模型。
- 日志和可观测性要求。
- 配置和资源生命周期。
- 代码生成来源（若适用）。
- 验证入口（与 P09 对接）。

代码必须经过与变更风险相匹配的检查，不能以编译成功代替完整质量验证。

## 7. Prohibited Practices

- MUST NOT 为消除编译错误而随意使用类型断言或忽略检查。
- MUST NOT 静默吞掉错误。
- MUST NOT 引入未经评估的重复依赖。
- MUST NOT 在多个模块复制同一套业务规则。
- MUST NOT 将数据库访问、网络调用和业务决策无边界地混入 UI 组件。
- MUST NOT 在重构时同时夹带无关业务变化。
- MUST NOT 修改生成代码而不更新源契约。
- MUST NOT 将测试、代码审查或安全检查结果虚报为通过。

## 8. AI Execution Rules

AI 必须：

1. 加载需求、架构决策、接口契约和设计规范。
2. 确认目标模块和允许修改范围。
3. 识别已有实现和复用入口。
4. 编写符合对应语言规范的代码。
5. 遵守本地未提交修改保护规则。
6. 运行适用的格式化、类型检查、编译和验证命令。
7. 对未执行项目明确标记 NOT_RUN。
8. 输出修改文件、变更理由、风险和验证证据。
9. 不得擅自修改生产配置或执行未经授权的部署操作。

## 9. Verification

具体执行由 UAES-06-GATE-001 定义。测试策略、测试数据和测试覆盖率由 UAES-09 管理。

## 10. Acceptance Criteria

- 语言规范完整。
- 模块结构和依赖方向符合架构。
- 类型检查、Formatter、Linter 和编译通过。
- 配置和依赖可重复构建。
- 错误、日志和异步处理符合标准。
- 生成代码来源可追踪。
- 代码审查无未解决的阻断级问题。

## 11. Exceptions

所有例外必须通过 UAES-00-005 登记，注明范围、原因、风险、Owner、批准人、到期时间和替代措施。

## 12. References

Go Documentation、Effective Go、TypeScript Handbook、React Documentation、Electron Documentation、Bun Documentation、UAES-00 至 UAES-05。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial enterprise standard |
