# UAES-09-003 — Test Strategy and Planning

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-003 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-02, UAES-06 |

## 1. Purpose

定义测试层次、测试计划、测试选择、测试范围、风险覆盖和测试退出条件。

## 2. Test Levels

| 层级 | 目标 | 典型对象 |
|---|---|---|
| Static | 不执行程序，检查结构和规则 | Lint、Typecheck、Vet、SAST |
| Unit | 验证最小逻辑单元 | 函数、类、纯逻辑 |
| Component | 验证组件行为 | React Component、模块 |
| Integration | 验证模块协作 | DB、Redis、HTTP、队列 |
| Contract | 验证接口兼容 | API、事件、第三方 Adapter |
| E2E | 验证完整业务流程 | 用户操作到后端结果 |
| Non-functional | 验证质量属性 | 性能、可靠性、可访问性 |
| Security | 验证安全控制 | 身份、授权、输入、会话等 |

## 3. Test Pyramid

测试组合 SHOULD 采用：

- 大量快速、确定性的 Unit Tests。
- 足够的 Component / Integration / Contract Tests。
- 数量较少但覆盖关键业务旅程的 E2E Tests。

不得将所有验证都堆积到 E2E 测试中，也不得只依赖 Unit Tests。

## 4. Test Planning

每项测试计划 MUST 包含：

1. Test Plan ID。
2. Task ID / Requirement ID。
3. Base / Head Commit SHA。
4. 变更范围。
5. 风险等级。
6. 测试目标。
7. 测试范围和排除范围。
8. 测试层级。
9. 测试用例和场景。
10. 测试数据。
11. 测试环境。
12. 工具和版本。
13. 预期结果。
14. 通过条件。
15. 执行顺序。
16. 失败处理。
17. 回归范围。
18. 退出条件。

## 5. Test Design

测试设计 MUST 覆盖适用的：

- 正常路径。
- 边界值。
- 等价类。
- 异常路径。
- 非法输入。
- 状态转换。
- 权限边界。
- 并发竞争。
- 重复请求。
- 超时与取消。
- 网络中断。
- 数据部分成功。
- 重试与恢复。

不得只按代码分支设计测试，必须结合业务规则和用户行为。

## 6. Uter Test Matrix

### 6.1 Go Backend

必须分别识别和执行以下 Go Modules：

```
.
relaykit/
tokenkit/
tokenkit/tokenkit/
```

每个模块必须单独记录：

- go.mod 路径。
- Go 工具链版本。
- 依赖下载状态。
- Unit Test。
- Vet。
- Build。
- Coverage。
- Race（适用范围）。
- 静态分析结果。

不得以根目录 go test ./... 代表四个模块全部通过。

### 6.2 Web / H5

测试至少覆盖：

- TypeScript 类型检查。
- ESLint 或项目采用的静态规则。
- Vitest。
- React Testing Library。
- 关键页面和路由。
- TanStack Query 请求状态。
- Zustand 状态行为。
- 表单与 Zod 校验。
- 错误、加载、空状态和重试。
- 浏览器兼容性。

### 6.3 Electron

测试至少覆盖：

- Main Process 生命周期。
- Preload API 暴露范围。
- IPC 请求与响应。
- Renderer 行为。
- 文件和系统资源访问。
- 权限拒绝。
- 崩溃和重启恢复。
- 密钥与敏感配置持久化行为。

### 6.4 API / Database

测试至少覆盖：

- Request / Response Contract。
- Authentication / Authorization。
- 输入校验。
- 数据约束。
- 事务边界。
- 迁移兼容性。
- 并发写入。
- 幂等。
- 回滚或恢复。

## 7. Critical Business Test Matrix

支付、充值、退款、余额和 Token 计费 MUST 根据实际业务流程覆盖：

- 成功路径。
- 失败路径。
- 重复通知。
- 通知乱序。
- 非法签名。
- 金额不匹配。
- 订单不存在。
- 订单状态不允许转换。
- 并发回调。
- 主动查询与异步通知竞争。
- 数据库提交失败。
- 业务处理成功但响应丢失。
- 上游服务超时。
- 重试后重复记账。
- 对账和异常恢复。

测试不得使用真实资金或未经批准的真实支付环境。

## 8. Test Selection

测试选择必须基于：

- 变更文件和调用链。
- 依赖关系。
- 需求验收条件。
- 风险等级。
- 历史缺陷。
- 测试耗时与可靠性。

受影响测试集可以优化，但不得因为执行成本而排除关键风险测试。

## 9. Test Exit Criteria

任务只有在以下条件满足后才能完成质量验收：

- 适用强制测试已执行。
- 关键测试通过。
- Critical / High Finding 已按规定处置。
- 回归测试完成。
- 测试结果绑定当前 Head SHA。
- 证据完整。
- 未执行项已明确标注并得到适当处理。

## 10. AI Execution Rules

AI MUST：

- 先输出测试计划，再执行高风险测试。
- 识别仓库真实脚本，不得臆造命令。
- 不得假设测试框架、目录或配置一定存在。
- 不得把测试环境缺失报告为测试通过。
- 不得仅执行最方便的测试。
- 测试失败时必须区分产品缺陷、测试缺陷、环境问题和基础设施问题。

## 11. Verification

- 测试计划 Schema 校验。
- Requirement-to-Test 追踪校验。
- 风险等级与测试深度一致性检查。
- 四个 Go Modules 检查。
- 高风险业务测试场景检查。
- 测试退出条件检查。

## 12. Acceptance Criteria

- 每个任务有明确测试计划或经说明的轻量验证记录。
- 测试计划绑定 Commit SHA。
- 四个 Go Modules 均可单独核验。
- Q0/Q1 变更具备相应集成、回归和异常测试。
- E2E 与 Unit Tests 分工明确。
- 未执行测试不会被计入通过率或标记 PASS。

## 13. References

- ISTQB CTFL v4.0.1：测试基础、测试生命周期、测试设计和测试管理。
- Google Testing Blog：测试金字塔和测试结构。<https://testing.googleblog.com/2020/11/fixing-test-hourglass.html>

## 14. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Test Strategy and Planning Standard |
