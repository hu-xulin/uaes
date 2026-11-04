# UAES-09-014 — Auto-Fix and Repair Verification

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-014 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-01, UAES-06, UAES-08, UAES-10, UAES-11 |

## 1. Purpose

建立 AI 自动修复的质量闭环，确保自动修复不是简单修改代码，而是经过权限检查、隔离执行、修复验证、回归测试和证据归档的完整工程活动。

## 2. Ownership Boundary

- **P01**：决定 Agent 是否有权执行修复、Commit、Push、创建 PR。
- **P06**：定义代码修改和重构规范。
- **P08**：定义 Agent 身份、工作区隔离、任务执行和恢复。
- **P09**：定义修复质量、测试、回归和验证证据。
- **P10**：定义安全缺陷的安全修复要求。
- **P11**：定义 Git、PR 和 CI 交付流程。

P09 不授予 Agent 新权限。

## 3. Uter Auto-Fix Authorization Baseline

用户已明确允许的自动修复后续动作：

- 在独立修复分支工作。
- 在修复和验证完成后 Commit。
- Push 修复分支。
- 创建 Pull Request。

不包含：

- Merge PR。
- Deploy。
- 修改生产环境。
- 修改生产数据库。
- 修改真实支付配置。
- 覆盖用户未提交的本地修改。

该授权仍须经过 P01 任务级权限检查，不能被解释为对所有未来任务的无条件授权。

## 4. Auto-Fix Lifecycle

```
DETECT
  → TRIAGE
  → CONFIRM_FINDING
  → CHECK_AUTHORIZATION
  → INSPECT_WORKSPACE
  → CREATE_ISOLATED_WORKSPACE
  → PLAN_REPAIR
  → APPLY_REPAIR
  → REVIEW_DIFF
  → RUN_TARGETED_TESTS
  → RUN_REGRESSION_TESTS
  → RUN_QUALITY_GATE
  → VERIFY_EVIDENCE
  → COMMIT / PUSH / CREATE_PR (if authorized)
```

如遇到权限不足、工作区污染、用户未提交修改冲突、生产风险或验证失败，必须停止相应操作并报告。

## 5. Pre-Repair Requirements

修复前 MUST：

1. 记录 Task ID 和 Finding ID。
2. 固定 Base Commit SHA。
3. 检查 Git 工作区状态。
4. 识别用户未提交修改。
5. 分析调用链和影响范围。
6. 确认修复权限。
7. 选择隔离分支或 Worktree。
8. 定义修复计划和验证策略。

不得为了方便而执行 git reset --hard、强制覆盖、清理用户文件或其他可能丢失未提交工作的操作。

## 6. Repair Requirements

修复必须：

- 针对根因，而非只隐藏错误。
- 遵循 P06 编码规范。
- 遵循 P04 架构边界。
- 不引入未经批准的业务规则。
- 不扩大权限和外部副作用。
- 保持 API 和数据兼容性，除非变更已批准。
- 必要时提供数据迁移和恢复策略。
- 更新相关测试和文档。

## 7. Verification Requirements

修复后至少执行：

- Diff Review。
- 原缺陷复现测试。
- 目标模块单元测试。
- 相关集成测试。
- 受影响回归测试。
- 适用静态检查。
- 适用安全检查。
- Quality Gate。

高风险修复必须扩大回归范围，并进行独立复核。

## 8. Repair Result

每次自动修复必须输出：

- Finding ID。
- Task ID。
- Base / Head SHA。
- 修改文件清单。
- 修改原因。
- 根因说明。
- 修复内容。
- 测试命令。
- 测试结果。
- 回归范围。
- Review 结果。
- Quality Gate 结果。
- 未解决问题。
- 残余风险。
- Commit / PR 信息（如已授权且实际完成）。

## 9. Failure Handling

以下情况必须停止或阻断自动修复验收：

- 未获得必要授权。
- 工作区存在无法安全隔离的用户修改。
- 修复涉及未经批准的业务规则。
- 需要修改生产配置。
- 需要访问真实支付环境。
- 关键测试失败。
- 回归结果不明确。
- 修复引入新的 Critical / High Finding。
- 验证证据无法关联到当前 Head SHA。

## 10. No Self-Approval

AI 不得自行批准：

- 自己无权批准的高风险操作。
- 生产环境变更。
- 生产数据库变更。
- 真实支付配置变更。
- PR Merge。
- 安全风险豁免。
- 质量例外。

## 11. Acceptance Criteria

- 自动修复有明确授权。
- 工作区隔离且保护用户未提交修改。
- 修复针对根因。
- 原缺陷具备回归测试。
- 修复后执行相关测试和 Review。
- 所有结果关联 Commit SHA。
- 未验证修复不能报告为已完成。
- Commit / Push / PR 仅在授权范围内执行。

## 12. References

UAES-01、UAES-06、UAES-08、UAES-09、UAES-10、UAES-11。

## 13. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Auto-Fix and Repair Verification Standard |
