# UAES-06-GATE-001 — Software Engineering Quality Gate

## 1. Metadata

| Field | Value |
|---|---|
| Gate ID | UAES-06-GATE-001 |
| Version | 1.0.0 |
| Domain | UAES-06 |
| Status | DRAFT |
| Owner | Software Engineering Owner |
| Blocking | Yes |

## 2. Purpose

确保代码实现符合 UAES 的软件工程要求。

## 3. Gate Levels

- G0：任务、需求和架构上下文。
- G1：仓库结构和模块边界。
- G2：语言编码标准。
- G3：错误、日志和资源生命周期。
- G4：配置和依赖。
- G5：代码生成与接口契约。
- G6：重构、可维护性和性能。
- G7：AI 执行证据。

## 4. Mandatory Checks

| ID | 检查项 | 级别 | 通过条件 |
|---|---|---|---|
| SE-001 | 需求追踪 | BLOCKER | 实现关联已确认需求 |
| SE-002 | 架构约束 | BLOCKER | 不违反已批准 ADR |
| SE-003 | 模块边界 | BLOCKER | 无未批准跨界依赖 |
| SE-004 | 循环依赖 | BLOCKER | 不存在禁止的循环依赖 |
| SE-005 | 命名规范 | MAJOR | 符合语言规则 |
| SE-006 | Go Formatter | BLOCKER | gofmt 检查通过 |
| SE-007 | Go Static Analysis | BLOCKER | vet 和规定静态分析通过 |
| SE-008 | Go Module Integrity | BLOCKER | 所有相关 Module 可解析 |
| SE-009 | TypeScript Strict | BLOCKER | 严格类型检查通过 |
| SE-010 | TypeScript Lint | BLOCKER | Linter 通过 |
| SE-011 | React Contract | BLOCKER | 组件符合 P05 契约 |
| SE-012 | React Hooks | BLOCKER | Hooks 规则检查通过 |
| SE-013 | Electron Boundary | BLOCKER | 进程和 IPC 契约明确 |
| SE-014 | Error Handling | BLOCKER | 无未处理的关键错误 |
| SE-015 | Resource Lifecycle | BLOCKER | 资源关闭和取消路径完整 |
| SE-016 | Configuration | BLOCKER | 必需配置可校验 |
| SE-017 | Dependency Lock | BLOCKER | 依赖与锁文件一致 |
| SE-018 | Generated Code | BLOCKER | 生成产物与源契约一致 |
| SE-019 | Public API Change | BLOCKER | 兼容性影响已评估 |
| SE-020 | Documentation | MAJOR | 重要接口和复杂逻辑文档完整 |
| SE-021 | Async and Concurrency | BLOCKER | 无已知未处理的并发风险 |
| SE-022 | Performance | MAJOR | 关键路径无未解释的重大退化 |
| SE-023 | Maintainability | MAJOR | 无未处理的高风险维护问题 |
| SE-024 | Code Review | BLOCKER | 关键 Finding 已处理 |
| SE-025 | AI Execution Report | BLOCKER | 变更和验证证据完整 |

## 5. Uter Project-specific Checks

### Go

- 所有 Go Module 必须纳入检查。
- 必须识别嵌套 Go Module。
- 必须覆盖 go.mod、relaykit/go.mod、tokenkit/go.mod、tokenkit/tokenkit/go.mod。
- 不得只在仓库根目录运行一次 go test ./... 就宣称所有 Module 已验证。
- 每个 Module 必须分别执行适用的依赖、编译、静态分析和测试检查。

### Web

- 使用项目实际选定的 Bun 工具链。
- 使用锁文件冻结安装。
- 执行 TypeScript 类型检查。
- 执行 Lint、Build 和相关测试。
- 检查公共组件与 UTER Design System 3.0 的一致性。

### Electron

- 检查 Main / Preload / Renderer 边界。
- 检查 IPC 契约。
- 检查构建和打包。
- 安全检查由 P10 执行，测试策略由 P09 执行。

## 6. Gate Results

- **PASS**：全部 BLOCKER、MAJOR 检查通过。
- **FAIL**：存在已确认的阻断或严重问题。
- **BLOCKED**：缺少必要权限、输入或环境。
- **NOT_RUN**：未执行。
- **NOT_APPLICABLE**：有证据证明不适用。

## 7. Prohibited Practices

- 不得通过关闭规则使 Gate 假通过。
- 不得只检查仓库根目录而遗漏嵌套模块。
- 不得把编译成功当作测试通过。
- 不得把静态分析通过当作安全审计通过。
- 不得将 NOT_RUN 作为 PASS。
- 不得删除失败记录以隐藏问题。

## 8. Acceptance

Gate 必须具备可执行脚本、机器可读报告、失败证据和 CI 集成。

## 9. References

UAES-04、UAES-05、UAES-09、UAES-10、UAES-11。

## 10. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
