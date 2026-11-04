# UAES-04-004 — Go Backend Architecture Standard

**Standard ID:** UAES-04-004  
**Version:** 1.0.0  
**Status:** DRAFT  
**Technology baseline:** Go / Gin / GORM

## 1. Purpose

规范 Uter Go 后端的模块组织、依赖方向、业务逻辑、数据访问、并发控制、错误处理和资源管理。

## 2. General rules

- UAES-GO-001：Go 代码必须遵循明确的 package 职责。
- UAES-GO-002：package 名称应表达业务或技术职责。
- UAES-GO-003：禁止使用含义模糊的 package 承载大量无关逻辑。
- UAES-GO-004：跨 package 访问必须使用明确的公开 API。
- UAES-GO-005：禁止通过循环依赖实现模块通信。
- UAES-GO-006：不得为了抽象而创建没有实际价值的接口。
- UAES-GO-007：接口应由使用方定义，优先保持小接口。
- UAES-GO-008：业务逻辑必须可独立测试。

## 3. HTTP layer

Gin Handler 负责：

- 解析 HTTP 请求；
- 校验传输层输入；
- 获取身份认证上下文；
- 调用应用层用例；
- 将结果映射为 HTTP 响应。

Handler 不应负责：

- 复杂业务规则；
- 多表事务编排；
- 资金账本计算；
- 复杂计费逻辑；
- 外部服务重试策略；
- 跨模块数据一致性控制。

规则：

- UAES-GO-009：HTTP Handler 必须保持轻量。
- UAES-GO-010：HTTP DTO 不得直接作为数据库实体在全系统传播。
- UAES-GO-011：HTTP 状态码和业务错误必须明确映射。
- UAES-GO-012：请求必须有适当的大小、格式和超时限制。
- UAES-GO-013：不得向客户端返回内部堆栈、SQL、密钥或敏感配置。

## 4. Application layer

应用层负责：

- 用例编排；
- 权限与业务流程协调；
- 事务边界；
- 跨领域调用；
- 外部服务接口调用；
- 结果组装。

规则：

- UAES-GO-014：应用层必须体现明确的业务用例。
- UAES-GO-015：应用层不得直接依赖 Gin Handler。
- UAES-GO-016：跨模块业务操作必须有明确协调者。
- UAES-GO-017：事务边界必须可识别。
- UAES-GO-018：复杂用例必须具备可独立测试的入口。

## 5. Domain layer

领域层负责业务规则、实体、值对象和领域状态转换。

规则：

- UAES-GO-019：核心业务规则不得只存在于 Handler。
- UAES-GO-020：领域逻辑不得依赖 Gin、GORM 或 Redis 的具体实现。
- UAES-GO-021：关键状态机必须定义合法状态与转换。
- UAES-GO-022：金额和计费不得使用不安全的浮点数运算。
- UAES-GO-023：资金操作必须使用明确的精度、币种和舍入规则。
- UAES-GO-024：核心领域行为必须有单元测试。

## 6. Repository and persistence

规则：

- UAES-GO-025：数据库访问必须有明确归属。
- UAES-GO-026：禁止将复杂 SQL 散落在 Handler 中。
- UAES-GO-027：GORM 查询必须注意 N+1、事务、锁和软删除语义。
- UAES-GO-028：涉及多条关联数据的业务变更必须明确事务范围。
- UAES-GO-029：查询必须有合理的分页、排序和数量限制。
- UAES-GO-030：数据库错误必须经过分类和处理，不得静默忽略。
- UAES-GO-031：批量写入必须考虑部分失败和重复执行。
- UAES-GO-032：数据库连接池、连接生命周期和关闭过程必须受控。

## 7. Context and cancellation

- UAES-GO-033：请求级 I/O 必须传递 context.Context。
- UAES-GO-034：不得无理由使用 context.Background() 替代请求上下文。
- UAES-GO-035：长任务必须有明确的取消和超时策略。
- UAES-GO-036：goroutine 必须有明确生命周期和退出条件。
- UAES-GO-037：禁止创建无法停止的后台 goroutine。
- UAES-GO-038：不得在共享 context 中放置大量非必要业务数据。

## 8. Concurrency

- UAES-GO-039：共享可变状态必须有明确同步策略。
- UAES-GO-040：并发访问必须通过适当的 mutex、channel、原子操作或数据库事务控制。
- UAES-GO-041：不得仅依赖进程内锁保证多实例环境的数据一致性。
- UAES-GO-042：关键并发逻辑必须通过 race detector 和并发测试。
- UAES-GO-043：锁的粒度、持有时间和获取顺序必须合理。
- UAES-GO-044：不得在持有锁时执行不必要的网络 I/O。

## 9. Error handling

- UAES-GO-045：错误必须可分类、可追踪。
- UAES-GO-046：错误包装必须保留原始错误链。
- UAES-GO-047：不得忽略关键业务操作返回的 error。
- UAES-GO-048：不得把所有错误统一转换成成功响应。
- UAES-GO-049：外部错误与内部错误必须适当隔离。
- UAES-GO-050：重试必须区分临时错误与永久错误。

## 10. Configuration and secrets

- UAES-GO-051：环境配置必须通过明确配置入口管理。
- UAES-GO-052：禁止硬编码生产密钥和敏感凭据。
- UAES-GO-053：配置必须进行启动时校验。
- UAES-GO-054：生产配置不得被测试代码覆盖。
- UAES-GO-055：配置变更必须明确其作用范围。

## 11. Go modules

Uter 仓库存在多个 Go module 的可能性，实际模块必须通过仓库检查确认。

所有 Go module 必须登记在模块清单中。自动化不得仅检查根目录 go.mod。

每个模块至少执行：

- go test；
- go vet；
- go build；
- 适用时执行 go test -race；
- 依赖漏洞扫描；
- 模块依赖关系检查。

## 12. Acceptance criteria

- 关键业务逻辑不依赖 HTTP 框架；
- 依赖方向清晰；
- 错误处理完整；
- Context 生命周期合理；
- goroutine 无明显泄漏；
- 关键事务边界明确；
- 多实例一致性不依赖本地锁；
- Go module 均纳入检查；
- 关键路径有单元和集成测试。
