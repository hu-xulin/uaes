# UAES-06-004 — Go Engineering Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-004 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06 |

## 1. Purpose

建立 Go 后端统一编码、包组织、错误、Context、并发和资源管理标准。

## 2. Scope

Uter Go 服务、多个 Go Module、CLI、后台任务和 SDK。

## 3. Definitions

- **Context**：请求生命周期、取消和截止时间传递机制。
- **Error Wrapping**：为错误增加上下文并保留错误链。
- **Goroutine Ownership**：协程的创建、取消、退出和资源回收责任。
- **Module**：Go Module。

## 4. Core Principles

Idiomatic Go、显式错误、Context 贯穿、并发可控、资源有界、接口最小化。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-004-001 | MUST 使用 gofmt 统一格式。 |
| UAES-06-004-002 | MUST 遵循 go vet 和项目静态检查要求。 |
| UAES-06-004-003 | MUST 为请求相关操作传递 context.Context。 |
| UAES-06-004-004 | MUST 将 Context 作为函数首个参数（适用时）。 |
| UAES-06-004-005 | MUST 明确处理错误返回值。 |
| UAES-06-004-006 | MUST 使用 %w 或等价方式保留需要检查的错误链。 |
| UAES-06-004-007 | MUST 避免通过字符串比较判断结构化错误类型。 |
| UAES-06-004-008 | MUST 为 Goroutine 提供退出路径。 |
| UAES-06-004-009 | MUST 为并发共享数据建立同步策略。 |
| UAES-06-004-010 | MUST 对数据库连接、文件、网络响应等资源及时释放。 |
| UAES-06-004-011 | MUST 为外部调用设置合理的超时和取消机制。 |
| UAES-06-004-012 | MUST 避免无边界创建 Goroutine。 |
| UAES-06-004-013 | MUST 对公共包 API 保持最小化。 |
| UAES-06-004-014 | MUST 为 Go Module 明确依赖和版本策略。 |
| UAES-06-004-015 | MUST 对重要配置和外部输入进行校验。 |

## 6. Implementation Rules

错误：

- 使用 sentinel error、typed error 或 wrapping 表达稳定错误语义。
- 不得重复记录同一错误导致日志噪声。
- 错误返回必须携带足够定位上下文。
- 不得将内部错误原样暴露给外部用户。

Context：

- 不得将 Context 长期存入普通业务结构体作为默认模式。
- 不得使用 nil Context。
- 后台任务应具有明确的根 Context 和关闭流程。

并发：

- 优先使用有界 Worker Pool。
- Channel 的关闭责任必须明确。
- 不得在多个位置重复关闭同一个 Channel。
- 共享状态应优先减少而不是增加锁。
- 锁的范围必须尽量短。

数据库：

- 事务边界由业务一致性要求决定。
- 事务内避免不必要的网络请求和长时间阻塞。
- 数据库连接、Rows 和事务必须按生命周期释放。
- ORM 不能替代数据库约束和事务设计。

HTTP / Gin：

- Handler 负责协议适配和输入输出。
- 业务逻辑不得无边界堆积在 Handler。
- Middleware 只承担横切职责。
- 绑定请求数据后必须执行必要的业务校验。

## 7. Prohibited Practices

- MUST NOT 使用 panic 作为常规业务错误处理。
- MUST NOT 无原因忽略错误返回值。
- MUST NOT 使用无限制 Goroutine。
- MUST NOT 将全局可变状态作为默认共享机制。
- MUST NOT 在 Context 中存储大型业务对象。
- MUST NOT 在事务中执行不可控的外部调用。
- MUST NOT 使用 init() 隐式执行重要业务初始化。

## 8. AI Execution Rules

AI 修改 Go 代码必须检查调用链、错误链、Context、并发和资源释放；涉及 Module 边界时必须同步检查所有受影响 Go Module。

## 9. Verification

由 P09 执行 gofmt、go vet、编译、测试、race 检查、静态分析和依赖扫描。P06 只规定代码要求。

## 10. Acceptance Criteria

Go 代码符合格式、类型、错误、Context、并发和资源生命周期规则。

## 11. Exceptions

性能优化或兼容性特殊实现必须提供依据和风险说明。

## 12. References

Go Documentation、Effective Go、Go Code Review Comments、Go Modules Reference。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
