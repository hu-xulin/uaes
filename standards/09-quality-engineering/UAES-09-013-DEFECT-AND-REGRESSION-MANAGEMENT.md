# UAES-09-013 — Defect and Regression Management

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-013 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-02, UAES-06, UAES-08 |

## 1. Purpose

建立从缺陷发现、分级、复现、根因分析、修复、验证到关闭的完整生命周期。

## 2. Defect Record

每项 Defect MUST 包含：

- Defect ID。
- 标题和描述。
- 发现来源。
- 发现时间。
- 受影响版本。
- Base / Head Commit SHA（适用时）。
- 环境信息。
- 复现步骤。
- 预期结果。
- 实际结果。
- 影响范围。
- 严重度。
- 优先级。
- 根因分析。
- 修复方案。
- 回归测试。
- 证据链接。
- Owner。
- 当前状态。

## 3. Severity and Priority

严重度：

- Critical。
- High。
- Medium。
- Low。
- Informational。

处理优先级：

- **P0**：立即处置。
- **P1**：当前修复周期优先处理。
- **P2**：正常排期。
- **P3**：低优先级改进。

严重度不得直接替代优先级。业务影响、可利用性、发生概率和用户影响共同决定处理顺序。

## 4. Defect Lifecycle

```
REPORTED → TRIAGED → CONFIRMED → ASSIGNED → FIX_IN_PROGRESS → FIXED → VERIFYING → VERIFIED → CLOSED
```

其他状态：

- NEEDS_INFORMATION。
- DUPLICATE。
- REJECTED。
- DEFERRED。
- REOPENED。

DEFERRED 必须记录风险接受依据、责任人和重新评估日期。

## 5. Root Cause Analysis

对于 Critical / High 缺陷必须进行根因分析，至少检查：

- 需求是否不明确。
- 业务规则是否遗漏。
- 架构边界是否错误。
- 实现是否有缺陷。
- 测试是否缺失或无效。
- 代码审查是否遗漏。
- 权限或安全控制是否失效。
- 环境和依赖是否异常。
- 质量门禁是否未能阻断。

不得只记录「代码写错了」作为根因。

## 6. Regression Requirements

每项已确认缺陷修复 MUST：

1. 保留缺陷复现条件。
2. 新增或修正回归测试。
3. 验证修复后的目标行为。
4. 验证相关边界条件。
5. 执行受影响模块回归。
6. 对高风险变更执行扩展回归。
7. 记录验证 Commit SHA。
8. 记录是否存在残余风险。

## 7. Regression Selection

回归范围由以下因素决定：

- 修改文件。
- 调用链。
- 依赖关系。
- 数据结构。
- 状态机。
- API 契约。
- 历史缺陷。
- 风险等级。

不得仅运行修改文件附近的测试就宣布整个系统回归通过。

## 8. Reopen Policy

以下任一情况必须重新打开缺陷：

- 原复现步骤再次出现问题。
- 修复引入相关新缺陷。
- 验证证据无效。
- 修复只覆盖表面症状。
- 生产或后续环境发现同一根因问题。

## 9. AI Execution Rules

AI MUST：

- 先确认缺陷真实存在。
- 保存复现证据。
- 修复前检查工作区。
- 不得覆盖用户未提交修改。
- 修复后执行相关回归。
- 无法复现时标记 NEEDS_INFORMATION 或 NOT_VERIFIED，不得直接关闭。
- 报告修改文件、修复原因、测试结果和残余风险。

## 10. Acceptance Criteria

- 缺陷生命周期完整。
- Critical / High 缺陷具备根因分析。
- 每个修复有回归证据。
- 未验证修复不得关闭。
- 缺陷可关联需求、Review、Commit 和测试报告。

## 11. References

UAES-02、UAES-06、UAES-08、UAES-09。

## 12. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Defect and Regression Management Standard |
