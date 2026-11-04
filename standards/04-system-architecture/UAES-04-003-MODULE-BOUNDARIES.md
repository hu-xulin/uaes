# UAES-04-003 — Module Boundaries & Dependency Governance

**Standard ID:** UAES-04-003  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

建立 Uter 的模块职责、依赖方向、数据所有权和跨模块通信规则，防止模块之间形成隐式耦合、循环依赖和共享内部状态。

## 2. Module definition

每个核心模块 MUST 具备：

1. 唯一模块 ID；
2. 模块名称；
3. 职责说明；
4. 所属业务领域；
5. 对外公开接口；
6. 内部实现范围；
7. 数据所有权；
8. 允许依赖；
9. 禁止依赖；
10. 测试入口；
11. 维护责任；
12. 风险等级。

模块可以是 Go package、Go module、前端 feature、Electron 主进程模块或独立服务。模块粒度应根据实际工程确定，不得为满足目录形式而人为拆分。

## 3. Dependency rules

### 3.1 General rules

- UAES-MOD-001：模块必须有明确职责。
- UAES-MOD-002：模块不得依赖其他模块的非公开实现。
- UAES-MOD-003：禁止形成循环依赖。
- UAES-MOD-004：跨模块调用必须使用公开接口或契约。
- UAES-MOD-005：模块不得直接修改其他模块拥有的数据。
- UAES-MOD-006：模块不得通过共享全局变量传递业务状态。
- UAES-MOD-007：模块不得绕过应用层直接调用不属于自己的基础设施实现。
- UAES-MOD-008：模块间依赖必须有可追踪的理由。

### 3.2 Dependency direction

推荐逻辑方向：

```
Presentation
     |
     v
Application
     |
     v
Domain
     ^
     |
Infrastructure
```

更准确地说，基础设施可以实现业务层定义的接口，业务层不应依赖具体基础设施实现。

不允许：

```
Domain -> Gin
Domain -> GORM
Domain -> Redis Client
Domain -> Electron
Domain -> React
```

允许通过接口隔离：

```
Application -> Repository Interface
Infrastructure -> Repository Implementation
```

### 3.3 Shared modules

公共模块只能提供真正通用的能力，例如：

- 时间和时区处理；
- ID 生成；
- 通用错误类型；
- 日志接口；
- 通用协议类型；
- 经过验证的公共工具。

禁止把业务模块的内部逻辑放入 `common`、`utils`、`shared` 等目录来绕过模块边界。

## 4. Data ownership

每个核心业务实体必须有唯一的写入所有者。

例如，实际工程中如存在以下业务域，应分别明确其所有权：

| Business domain  | Ownership requirement |
| ---------------- | --------------------- |
| User / Identity  | 用户身份与认证状态             |
| Payment          | 支付订单与渠道状态             |
| Wallet / Balance | 用户资金账本与余额变更           |
| Token / Usage    | Token 使用记录和计费依据       |
| Model / Pricing  | 模型和定价数据               |
| Relay            | 请求转发和上游调用             |
| Task             | 任务状态与执行记录             |
| Notification     | 通知状态和投递记录             |

此表是待核实的业务域分类，不代表仓库已经按照这些模块划分。

规则：

- UAES-MOD-009：核心实体必须有唯一写入所有者。
- UAES-MOD-010：其他模块不得绕过所有者直接更新其核心数据。
- UAES-MOD-011：跨模块数据读取应优先通过接口、只读查询或明确的数据投影实现。
- UAES-MOD-012：共享数据库不等于共享数据所有权。
- UAES-MOD-013：资金和计费数据必须有可审计的变更来源。

## 5. Cross-module communication

允许的通信方式：

1. 同进程公开接口调用；
2. 应用层用例协调；
3. 明确定义的事件；
4. 稳定的 API 契约；
5. 经批准的只读数据访问。

禁止：

- 任意跨模块 SQL 写入；
- 直接修改其他模块内部对象；
- 依赖内部目录结构；
- 通过字符串拼接调用未定义的模块函数；
- 使用全局状态绕过正常调用链。

## 6. Module refactoring

拆分、合并或移动模块时，必须分析：

- 调用方；
- 数据所有权；
- 公开接口；
- 循环依赖；
- 数据迁移；
- 兼容性；
- 测试覆盖；
- 回滚方式。

不得仅因文件过大就机械拆分。必须先识别职责，再决定模块边界。

## 7. Architecture enforcement

建议逐步建立：

- Go package dependency checks；
- Go module dependency checks；
- TypeScript import boundary checks；
- circular dependency detection；
- module manifest validation；
- ownership declaration validation。

自动检查必须以实际目录和模块清单为依据，不能把示例模块名称硬编码为仓库事实。

## 8. Acceptance criteria

- 核心模块有唯一标识；
- 关键模块职责清晰；
- 核心数据写入所有权明确；
- 无未批准的循环依赖；
- 跨模块访问通过公开接口；
- 依赖违规可定位到文件和行；
- 模块重构有影响分析和回归测试。
