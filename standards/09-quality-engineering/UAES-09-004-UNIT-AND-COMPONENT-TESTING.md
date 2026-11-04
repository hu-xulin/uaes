# UAES-09-004 — Unit and Component Testing

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-004 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-06 |

## 1. Purpose

定义单元测试与组件测试的设计、实现、执行和维护要求，确保模块内部逻辑及独立组件行为可重复验证。

## 2. Unit Test Requirements

- **QE-UT-001 MUST**：单元测试应验证可独立识别的业务逻辑、函数、方法或类行为。
- **QE-UT-002 MUST**：测试必须具有确定性，不得依赖不可控的外部网络、真实支付渠道、生产数据库或不稳定的外部服务。
- **QE-UT-003 MUST**：外部依赖应通过接口、Fake、Stub、Mock 或其他适当的测试替身隔离。
- **QE-UT-004 MUST**：测试应验证输出、状态变化、副作用和错误行为，不得只验证函数被调用。
- **QE-UT-005 SHOULD**：优先使用真实、轻量且隔离的实现；仅在需要隔离边界、模拟故障或验证交互时使用 Mock。
- **QE-UT-006 MUST**：测试不得依赖执行顺序，不得通过共享可变状态造成测试间污染。
- **QE-UT-007 MUST**：测试必须包含失败路径和边界条件。

## 3. Go Unit Testing

Go 单元测试必须遵循：

- 使用标准 testing 包及项目已批准的测试工具。
- 合理使用 Table-Driven Tests。
- 并行测试前确认共享状态安全。
- 使用 t.Cleanup 管理测试资源。
- 使用 t.Context() 或适当 Context 机制管理生命周期（以实际 Go 工具链支持为准）。
- 不得使用 time.Sleep 作为主要同步机制；优先使用 Channel、Condition、可控 Clock 或显式等待条件。
- 不得吞掉测试错误。
- 不得因测试方便而修改生产逻辑的语义。
- 测试数据必须隔离，避免测试间互相依赖。

每个 Go Module 必须独立执行单元测试。最低模块清单：

```
go.mod
relaykit/go.mod
tokenkit/go.mod
tokenkit/tokenkit/go.mod
```

## 4. TypeScript / React Component Testing

React 组件测试 MUST 验证用户可观察行为：

- 初始渲染。
- 用户交互。
- 表单输入与校验。
- 加载状态。
- 空状态。
- 错误状态。
- 成功状态。
- 异步状态变化。
- 键盘交互。
- 可访问名称和角色。
- 权限限制和禁用状态。

SHOULD 使用 Testing Library 查询用户可观察的角色、名称和文本，而不是依赖内部 DOM 结构或实现细节。

不得为了通过测试而给生产组件添加无意义的测试专用逻辑。

## 5. State and Async Testing

必须覆盖：

- 连续点击。
- 重复提交。
- 请求乱序。
- 请求取消。
- 组件卸载时的异步清理。
- 旧请求覆盖新状态。
- 多次状态更新。
- Loading / Error / Empty 状态转换。
- 缓存命中和失效（适用时）。

## 6. Test Data and Isolation

- 每项测试应创建自己的数据或使用明确隔离的 Fixture。
- 测试结束必须清理资源。
- 不得依赖本机特定文件、用户名或固定绝对路径。
- 时间、随机数、外部 ID 应可控或可注入。
- 不能安全并行的测试必须明确标记并隔离。

## 7. Prohibited Practices

- 只断言组件存在，不验证核心行为。
- 使用过多 Mock 使测试脱离真实逻辑。
- 使用固定延时掩盖竞态。
- 依赖其他测试先执行。
- 删除失败测试而不处理根因。
- 通过放宽断言掩盖产品缺陷。
- 把未执行的测试报告为通过。

## 8. AI Execution Rules

AI MUST：

- 优先复现真实行为。
- 新增业务逻辑时同步新增测试。
- 修复缺陷时优先增加能捕获旧缺陷的测试。
- 不得只修改测试使其适配错误实现。
- 对不稳定测试先定位原因，再决定修复或隔离。

## 9. Verification

检查测试隔离、确定性、资源清理、异常路径、并发安全、断言有效性及测试与生产行为的一致性。

## 10. Acceptance Criteria

- 核心逻辑有单元测试。
- 关键组件有用户行为测试。
- 测试不依赖执行顺序。
- 资源得到清理。
- 测试失败可以定位到具体行为。
- 缺陷修复具备对应回归测试。

## 11. References

UAES-06 Software Engineering、ISTQB CTFL v4.0.1、Testing Library 官方文档。

## 12. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Unit and Component Testing Standard |
