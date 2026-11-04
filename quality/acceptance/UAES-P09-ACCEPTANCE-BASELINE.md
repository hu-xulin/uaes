# UAES-P09-ACCEPTANCE-BASELINE — Quality Engineering Acceptance

## 1. Metadata

| Field | Value |
|---|---|
| Acceptance ID | UAES-P09-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-09 |
| Gate | UAES-09-GATE-001 |

## A. Documentation Acceptance

- P09 总标准存在。
- UAES-09-001 至 UAES-09-015 全部存在。
- 每份标准包含统一模板。
- 每条强制规则具备唯一 ID。
- 所有标准 ID 与 Registry 一致。
- 不存在重复或冲突的 Finding Schema。
- P06、P08、P10、P11 的职责边界明确。

## B. Schema Acceptance

- test-result.schema.json 存在。
- quality-gate-result.schema.json 存在。
- defect.schema.json 存在。
- quality-report.schema.json 存在。
- P06 code-review-finding.schema.json 已被正确引用。
- 所有 Schema 通过 JSON Schema Validator。
- 非法数据负面样本被正确拒绝。
- 跨对象语义校验已实现。
- Schema 版本兼容性有验证。

## C. Review Engineering Acceptance

- Review 固定 Base / Head SHA。
- Review 覆盖完整 Diff。
- Finding 具有唯一 ID。
- Finding 有严重度、位置和证据。
- Finding 生命周期可执行。
- Critical / High Finding 未验证时阻断 Gate。
- 修复后 Review 可以重新执行。
- AI Review 能区分事实、推断和建议。

## D. Test Strategy Acceptance

- 测试计划结构明确。
- 测试层级划分明确。
- 测试范围和排除范围明确。
- 风险等级映射测试深度。
- 正常、异常、边界路径均有策略。
- 需求到测试可追踪。
- 测试退出条件明确。

## E. Go Module Acceptance

分别验证：

- 根模块。
- relaykit/。
- tokenkit/。
- tokenkit/tokenkit/。

每个模块：

- Unit Test。
- Vet。
- Build。
- Coverage。
- Race（适用范围）。
- Static Analysis（适用范围）。

不得以一个根目录命令替代全部模块检查。

## F. Web / Electron Acceptance

- TypeScript Typecheck。
- Lint。
- Vitest。
- Testing Library。
- 关键路由和页面测试。
- 表单与校验测试。
- 异步状态测试。
- Electron Main / Preload / Renderer 测试。
- IPC Contract 测试。
- Electron Build。

## G. Integration / Contract Acceptance

- API Contract Test。
- 数据库集成测试。
- 数据迁移测试。
- 事务测试。
- 并发测试。
- 幂等测试。
- 外部服务异常测试。
- 异步任务恢复测试。
- 关键资金业务测试。

## H. E2E / Visual / Accessibility Acceptance

- 核心用户旅程已识别。
- 关键业务流程 E2E 可执行。
- 测试数据与环境隔离。
- 关键 UI 状态有测试。
- 视觉基线有版本和审批。
- 关键设计变更有视觉回归。
- WCAG 2.2 AA 检查已纳入适用 UI 验收。
- 自动化检查和人工检查有明确区分。

## I. Performance / Reliability Acceptance

- 关键服务性能基线。
- P95 / P99 延迟。
- 错误率和吞吐量。
- 高风险路径性能回归。
- Timeout / Retry / Recovery。
- 资源泄漏检查。
- 故障恢复证据。

## J. Security Testing Acceptance

- P10 安全要求映射。
- SAST / SCA / Secret Scan（按适用范围）。
- DAST / API Security（按风险）。
- Electron 安全检查。
- 安全 Finding 生命周期。
- Critical / High 安全问题阻断规则。
- 主动测试授权记录。

## K. Defect and Regression Acceptance

- Defect Schema 校验。
- Defect Lifecycle 可执行。
- Critical / High 根因分析。
- 缺陷修复有回归测试。
- 修复后执行相关测试。
- 未验证缺陷无法关闭。
- Reopened 流程有效。

## L. Auto-Fix Acceptance

- 自动修复前检查 Git 状态。
- 用户未提交修改得到保护。
- 独立分支或 Worktree 可用。
- 权限检查有效。
- 自动修复 Diff 可审查。
- 原缺陷回归测试通过。
- 相关测试通过。
- 质量门禁通过。
- 报告包含修改文件和原因。
- 未授权 Merge / Deploy / 生产操作被阻止。

## M. Negative Test Suite

以下负面测试必须全部通过：

1. 根模块测试通过但 tokenkit/tokenkit 未执行时，整体不能 PASS。
2. 测试命令启动但没有结果证据时，不能 PASS。
3. 测试失败后重试成功，不能抹掉首次失败。
4. Critical Finding 未关闭时，不能 PASS。
5. High Finding 未验证时，不能 PASS。
6. 测试报告 Commit SHA 与当前 Head SHA 不一致时，不能 PASS。
7. 测试数据包含真实密钥时，必须阻断或触发安全处理。
8. 未批准的视觉基线覆盖必须失败。
9. Flaky Test 被隔离后不得计入 PASS。
10. 测试跳过不得计入 PASS。
11. 修复没有新增回归测试时，必须说明并按规则阻断。
12. 数据库迁移失败时，不能报告迁移验证通过。
13. API Contract Breaking Change 未经批准时必须阻断。
14. 自动修复覆盖用户未提交文件时，必须失败并触发事故处理。
15. 未授权真实支付测试必须被拒绝。
16. Agent 虚构 CI 结果时，证据校验必须拒绝。
17. Finding 被标记 CLOSED 但没有验证证据时，必须失败。
18. Gate 汇总统计与逐项结果不一致时，必须失败。
19. 关键 E2E 只断言按钮点击，不断言业务结果时，不能 PASS。
20. 自动化可访问性扫描通过但关键人工检查未执行时，不能声称完整可访问性验收通过。

## N. AI Execution Acceptance

- AI 能读取并应用 P09。
- AI 能识别风险并制定测试计划。
- AI 能执行适用测试。
- AI 能区分产品缺陷、测试缺陷和环境问题。
- AI 能正确记录 Finding。
- AI 能执行修复后的回归。
- AI 不会虚构测试结果。
- AI 不会扩大授权。
- AI 能保护用户未提交修改。
- AI 能生成符合 Schema 的质量报告。

## O. Registry and Gate Acceptance

- P09 Registry 已增量合并。
- 所有标准 ID 唯一。
- 所有文件路径存在。
- 所有 Schema 引用存在。
- 所有依赖关系有效。
- Gate 规则可映射到自动化检查。
- Acceptance Baseline 可执行。
- CI 集成完成并保留运行证据。

## P. Final Acceptance

只有以下条件全部满足，P09 才可从 DRAFT 升级为 APPROVED：

1. 文档验收通过。
2. Schema 验收通过。
3. Validator 实现并通过负面测试。
4. Quality Gate 实现并通过负面测试。
5. Uter 四个 Go Modules 全部纳入验证。
6. Web / Electron 测试链路有效。
7. 关键业务流程测试有效。
8. Auto-Fix 验证闭环有效。
9. CI 运行结果可追踪。
10. AI 实战验收通过。
11. 正式审批完成。

## Q. Current Acceptance Status

| 项目 | 当前状态 |
|---|---|
| 标准文档落盘 | COMPLETED |
| Schema 落盘 | COMPLETED |
| Registry 增量 | COMPLETED（独立增量文件，待 P00 合并） |
| Schema 实际验证 | NOT_RUN |
| 语义 Validator | NOT_IMPLEMENTED |
| Quality Gate 工具 | NOT_IMPLEMENTED |
| CI 集成 | NOT_RUN |
| 四个 Go Modules 实际验证 | NOT_RUN |
| AI 实战验收 | NOT_RUN |
| 正式批准 | NOT_APPROVED |

当前 P09 总体状态：**DRAFT / NOT_ACCEPTED**

文档交付不等于工程实施完成，也不等于 Uter 当前代码已达到本标准。

## Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Acceptance Baseline |
