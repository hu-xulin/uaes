# UAES-P04-ACCEPTANCE-BASELINE — System Architecture Acceptance Baseline

| Field | Value |
|---|---|
| Acceptance ID | UAES-P04-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Gate | UAES-04-GATE-001 |

## A. Architecture Governance

- 架构范围和系统上下文明确。
- 架构原则具有唯一 ID。
- 重大架构决策具有 ADR。
- ADR 具有完整背景、选项、决策和后果。
- ADR 等级和审批要求一致。
- Accepted ADR 有有效审批证据。
- 被替代 ADR 保留历史并关联新 ADR。
- ADR 能关联 P02 需求和 P03 知识。

## B. Module Architecture

- 模块 ID 唯一。
- 每个模块具有明确职责。
- 模块公开接口和内部实现边界明确。
- 模块数据所有权明确。
- 模块依赖可追踪。
- 不存在未经批准的循环依赖。
- 跨模块访问遵循契约。
- 架构图和模块清单保持一致。

## C. Backend Architecture

- Go Module 边界清晰。
- Handler、Service、Repository 等职责明确。
- 业务逻辑与基础设施实现适当隔离。
- 错误处理规则统一。
- 配置和密钥不混入业务代码。
- 数据库和 Redis 依赖边界明确。
- 并发和资源生命周期明确。
- 关键接口有契约测试或等效验证。

## D. Frontend Architecture

- React 应用边界清晰。
- 路由、数据请求、状态和 UI 职责明确。
- 服务端状态和客户端状态区分合理。
- 组件不能绕过规定的数据访问边界。
- API Client 与服务端契约一致。
- 表单校验与后端校验职责明确。
- 异步加载、错误和取消机制明确。

## E. Electron Architecture

- Main / Preload / Renderer 信任边界明确。
- IPC 通道有明确契约。
- 不可信 Renderer 不具有任意系统访问能力。
- 权限和文件访问范围最小化。
- 敏感数据存储有保护机制。
- Electron 安全配置具有验证证据。

## F. API and Data

- API 请求和响应结构明确。
- 错误响应和状态码明确。
- 认证与授权契约明确。
- 版本兼容策略明确。
- 数据主键、索引和唯一约束明确。
- 事务边界明确。
- 迁移执行顺序明确。
- 迁移失败恢复方案明确。
- 数据删除和保留策略明确。

## G. Cache / Async / Concurrency

- 缓存具有明确 Source of Truth。
- 缓存失效策略明确。
- 多实例缓存一致性有设计。
- 异步任务有超时和重试规则。
- 重试不会造成重复业务副作用。
- 关键操作有幂等机制。
- 并发状态更新具有原子性保障。
- 死信、补偿或人工恢复路径已定义（适用时）。

## H. External Integration

- 第三方接口具有 Adapter 边界。
- 超时和错误映射明确。
- 签名验真和身份验证明确。
- 限流和重试策略明确。
- 外部故障不会无边界传播。
- 供应商版本和变更可追踪。

## I. Architecture Verification

- 架构图与实际仓库结构一致。
- 模块依赖检查可运行。
- API 契约校验可运行。
- ADR 一致性检查可运行。
- 架构漂移可识别。
- 关键质量属性具有验证方法。
- 关键业务链路可观测。

## J. Uter Project-Specific Baseline

- 根 Go Module 与各子 Module 的依赖边界经过核对。
- Web 前端的 Rsbuild、TanStack、Zustand 等架构职责明确。
- Electron Main / Preload / Renderer 边界经过检查。
- SQLite、MySQL、PostgreSQL 的实际支持范围经过验证。
- Redis 的缓存和协调用途有明确边界。
- 支付、充值、余额和退款具备一致性与幂等设计。
- 模型供应商适配层与内部模型调用契约分离。
- Web 与 Electron 的平台能力没有被混为一谈。
- Android、iOS、HarmonyOS 仅在有实际工程和验证证据后才能标记为已实现。

## K. Negative Tests

- 重复 ADR ID 被拒绝。
- 未经审批的 ADR 不能标记为 ACCEPTED。
- 已接受 ADR 不能静默覆盖。
- 无效 supersedes 引用被拒绝。
- 循环模块依赖被发现。
- 不兼容 API 变更被发现。
- 缺少迁移恢复策略的高风险迁移被阻断。
- 缺少幂等保护的关键资金操作被阻断。
- 外部集成无超时和错误处理时被阻断。
- 实际实现违反 Accepted ADR 时被识别。
- 计划平台不能伪装成已实现平台。

## L. Final Acceptance

P04 必须通过结构校验、语义校验、架构分析、关键契约验证、负面测试和实际项目试运行。

没有运行的检查项必须标记 NOT_RUN；没有证据的检查项必须标记 NOT_VERIFIED。

**文档交付不构成 P04 正式验收通过。**
