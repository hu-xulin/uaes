# UAES-09-002 — Code Review Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-002 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-06 |

## 1. Purpose

建立可重复、可追踪、以风险和证据为基础的 Code Review 流程。

## 2. Review Scope

Review 至少检查：

- 需求与业务规则一致性。
- 架构和模块边界。
- 代码正确性。
- 状态管理与状态转换。
- 错误处理。
- 并发和资源生命周期。
- API 和数据兼容性。
- 安全风险（具体控制归 P10）。
- 性能与可维护性。
- 测试充分性。
- 文档与代码一致性。
- 自动生成代码及其来源。

## 3. Review Baseline

每次 Review MUST 固定：

- Task ID。
- Base Commit SHA。
- Head Commit SHA。
- Branch。
- 变更文件列表。
- 需求与架构引用。
- 适用标准版本。
- Review 执行者。
- Review 时间。
- 工具和规则集版本。

Review 结果必须针对明确的 Head SHA。Head SHA 变化后，受影响的 Review 必须重新执行。

## 4. Review Workflow

1. **Confirm Workspace**：确认本地状态和用户未提交修改。
2. **Establish Baseline**：固定 Base / Head SHA。
3. **Inspect Diff**：检查完整 Diff，不仅检查新增代码。
4. **Understand Context**：读取调用链、依赖、接口和业务规则。
5. **Run Automated Checks**：运行适用静态检查。
6. **Analyze Risk**：检查业务、安全、并发、数据和兼容性风险。
7. **Record Findings**：使用 P06 code-review-finding.schema.json 约定的数据结构。
8. **Verify Fixes**：对修复进行独立验证。
9. **Publish Review Report**：输出结论和证据。

## 5. Mandatory Review Checklist

### 5.1 Business Logic

- 是否满足已批准需求？
- 是否改变既有业务规则？
- 是否存在未定义的业务行为？
- 是否正确处理边界条件？
- 是否存在权限绕过或状态跳跃？

### 5.2 Data and State

- 是否破坏数据约束？
- 是否存在并发写入问题？
- 是否存在重复处理？
- 是否正确处理事务和失败恢复？
- 是否保证幂等？

### 5.3 API and Compatibility

- 是否改变请求或响应契约？
- 是否改变错误码或错误语义？
- 是否破坏已有客户端？
- 是否存在输入验证缺失？
- 是否暴露内部实现或敏感信息？

### 5.4 Resource and Concurrency

- Goroutine 是否有退出路径？
- Context 是否正确传播？
- 是否存在锁竞争或死锁？
- 文件、连接、定时器是否正确释放？
- 异步任务是否具备超时和恢复机制？

### 5.5 Frontend and Electron

- React Hooks 是否遵守规则？
- 是否出现重复状态源？
- 异步请求是否处理竞态和取消？
- 表单是否进行输入验证？
- Electron IPC 是否限制来源和操作范围？
- Renderer 是否获得不必要的 Node 权限？

### 5.6 Tests

- 是否存在覆盖新增行为的测试？
- 测试是否断言行为而非实现细节？
- 是否覆盖失败路径？
- 是否存在测试污染或不稳定依赖？
- 缺陷修复是否有回归测试？

## 6. Finding Severity

- **Critical**：资金、核心数据、安全边界或系统整体受到严重影响。
- **High**：核心功能错误、关键业务流程不可用、重要数据风险。
- **Medium**：局部错误、重要边界缺陷或明显技术风险。
- **Low**：低影响问题。
- **Informational**：非阻断建议。

Finding 必须记录：

- 唯一 Finding ID。
- 严重度。
- 标题和描述。
- 文件路径与行号。
- 证据。
- 触发条件或复现步骤。
- 预期行为与实际行为。
- 影响范围。
- 根因（确认后填写）。
- 修复建议。
- 回归要求。
- 状态。
- 关联 Task / Commit / Requirement。

## 7. Finding Lifecycle

```
OPEN → TRIAGED → ACCEPTED → IN_PROGRESS → FIXED → VERIFYING → VERIFIED → CLOSED
```

其他状态：

- **REJECTED**：经证据确认不是有效缺陷。
- **DUPLICATE**：重复 Finding，必须关联主 Finding。
- **DEFERRED**：延期处理，必须有风险接受和期限。
- **NEEDS_INFORMATION**：缺少复现或上下文。
- **REOPENED**：修复验证失败或缺陷再次出现。

FIXED 不等于 VERIFIED；VERIFIED 不等于 CLOSED，关闭条件应由质量治理流程确定。

## 8. Review Rules

- Review MUST 覆盖完整变更 Diff。
- Review MUST 结合上下文，不得只看单个代码片段。
- Review MUST 区分确定缺陷、潜在风险和建议。
- Review MUST 提供可复现证据或明确解释证据限制。
- Review MUST NOT 为了达到数量目标而制造 Finding。
- Review MUST NOT 因代码由 AI 生成而降低审查标准。
- Review MUST NOT 将风格偏好冒充功能缺陷。

## 9. Review Independence

Q0 变更 SHOULD 由非主要修复者复核。

Critical / High Finding 的关闭 MUST 有独立验证证据。

当无法获得独立 Reviewer 时，必须使用独立测试、自动化回归和明确的风险说明作为补偿；需要人工审批的事项仍按 P01 执行。

## 10. Review Output

报告至少包括：

- Review ID。
- Task ID。
- Base / Head SHA。
- Review 范围。
- 使用的检查规则和工具。
- Finding 汇总。
- 文件和行号。
- 风险说明。
- 未覆盖范围。
- 修复状态。
- 回归证据。
- 最终 Review 结论。

## 11. AI Execution Rules

AI MUST：

- 检查完整 Diff 和调用上下文。
- 不得把推测当作已确认缺陷。
- 对每个 Finding 给出证据。
- 自动修复前确认权限和工作区。
- 修复后重新审查修改区域及其影响范围。
- 记录无法验证的 Finding，不得虚假关闭。

## 12. Verification

Review Engine 必须测试：

- Finding Schema 合法性。
- 文件和行号定位。
- Base / Head SHA 绑定。
- 重复 Finding 关联。
- Finding 生命周期转换。
- 修复前后证据关联。
- 未验证 Finding 阻断 Gate。

## 13. Acceptance Criteria

- 每次 Review 都能追溯到固定 Commit SHA。
- 所有 Finding 都具备唯一 ID 和生命周期。
- Critical / High Finding 未验证时阻断 Gate。
- Review 不会因自动修复而自动通过。
- AI Review 输出能够区分事实、推断和建议。

## 14. References

- UAES-06-013 Code Review and Maintainability。
- UAES-06 code-review-finding.schema.json。
- ISTQB CTFL v4.0.1 静态测试与评审流程。

## 15. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Code Review Engineering Standard |
