# UAES-09-001 — Quality Model and Governance

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09 |

## 1. Purpose

定义 Uter 质量目标、质量责任、质量度量、风险驱动测试和质量决策机制。

## 2. Quality Ownership

| 角色 | 职责 |
|---|---|
| Product Owner | 确认需求和业务验收条件 |
| Engineering Owner | 对技术实现质量负责 |
| Reviewer | 独立审查代码与变更风险 |
| Test Owner | 设计和执行测试策略 |
| Security Owner | 负责 P10 安全控制与安全风险判断 |
| Agent Owner | 确保 Agent 按授权执行 |
| Quality Owner | 维护质量策略、Gate 和质量报告 |
| Approver | 按 P01 权限规则批准高风险事项 |

同一人可以承担多个角色，但高风险事项必须识别利益冲突，并通过独立复核或人工审批进行补偿。

## 3. Quality Dimensions

必须评估：

- 功能正确性。
- 业务规则正确性。
- 数据完整性和一致性。
- 接口契约兼容性。
- 安全性。
- 可靠性。
- 性能。
- 可访问性。
- 平台兼容性。
- 可维护性。

## 4. Risk-Based Test Classification

质量风险分级采用 P02 风险与 P01 AI 风险体系进行映射，不创建冲突的独立授权等级。

### Q0 — Critical Business Risk

适用：

- 支付、充值、退款、余额和资金流水。
- 认证、授权和权限提升。
- 数据迁移、删除和恢复。
- 密钥、凭证和敏感数据处理。
- 核心服务启动、升级和恢复。

要求：Review、Unit Test、Integration Test、Contract Test（适用时）、E2E 或等效业务流程验证、并发/幂等/异常恢复验证（适用时）、安全测试（由 P10 定义）、回归测试、独立复核。

### Q1 — High Business Risk

适用：核心业务功能、用户账户、模型调用、任务调度、配额、计费规则和重要数据操作。

要求：Review、Unit Test、Integration Test、关键异常路径、相关回归测试、关键接口兼容性验证。

### Q2 — Normal Risk

适用：普通业务功能、非关键 API、页面状态和模块内部逻辑。

要求：Review、Unit / Component Test、受影响模块回归、基本兼容性检查。

### Q3 — Low Risk

适用：纯文案、低风险样式、无行为影响的文档或静态资源调整。

要求：变更审查、相关轻量检查、说明不执行更深层测试的理由。

风险等级不得仅由文件类型决定。修改一行代码也可能属于 Q0。

## 5. Change Impact Assessment

每次变更至少分析：

- 影响的业务功能。
- 影响的模块和依赖。
- API / 数据结构变化。
- 状态机变化。
- 并发和异步行为。
- 权限与安全边界。
- 平台差异。
- 测试覆盖范围。
- 回滚和恢复路径。

## 6. Quality Metrics

质量报告 SHOULD 记录：

| 指标 | 定义 |
|---|---|
| Test Pass Rate | 通过测试数 / 实际执行测试数 |
| Requirement Coverage | 有验证证据的需求 / 适用需求 |
| Risk Coverage | 已验证风险项 / 识别风险项 |
| Regression Coverage | 已回归缺陷 / 需要回归的已修复缺陷 |
| Finding Density | Finding 数量 / 变更规模（仅用于趋势分析） |
| Flaky Rate | 非产品缺陷导致的不稳定测试比例 |
| Escaped Defects | 已进入后续环境或版本才发现的缺陷 |
| Mean Time to Repair | 缺陷从确认到修复验证完成的时间 |

指标必须说明统计口径、时间窗口、数据来源和样本数量。

禁止把单一覆盖率、Finding 数量或测试通过率作为软件质量的唯一指标。

## 7. Quality Threshold Policy

初始建议基线：

- 新增关键业务逻辑：必须有对应测试。
- 新增或修改状态机：必须覆盖合法与非法状态转换。
- 修复缺陷：必须增加或完善能够捕获原缺陷的回归测试。
- 关键业务模块：不得因本次变更降低已有有效测试覆盖。
- 新增代码覆盖率目标：原则上不低于 80%，关键业务逻辑目标不低于 90%。

以上覆盖率为初始治理目标，不得直接当作已测量的仓库现状。对于无法可靠计算的代码，应记录原因并采用行为、分支或风险覆盖证据补充。

覆盖率阈值不能代替测试质量评估。

## 8. Quality Decision

质量决策必须考虑：

1. 强制 Gate 是否通过。
2. 是否存在未关闭 Critical / High Finding。
3. 是否有 BLOCKED 或 NOT_RUN 检查。
4. 是否有有效例外批准。
5. 证据是否与当前 Commit SHA 一致。
6. 是否存在已知残余风险。

任何强制检查未通过，均不得报告整体 PASS。

## 9. AI Execution Rules

AI MUST：

- 先评估变更风险，再确定测试深度。
- 对风险判断给出依据。
- 不得通过降低风险等级绕过测试要求。
- 不得自行批准其自身无权批准的例外。
- 在报告中区分自动化结论和人工结论。

## 10. Verification

- 检查风险等级是否有映射规则。
- 检查 Q0/Q1 是否具备强制测试矩阵。
- 检查质量指标是否具有统计口径。
- 检查质量决策是否能识别未执行项。
- 检查 AI 是否能正确处理例外和残余风险。

## 11. Acceptance Criteria

- 每种风险等级均有可执行测试要求。
- 每项质量指标有定义和数据来源。
- 高风险变更具备独立验证机制。
- 质量决策不依赖单一覆盖率。
- Gate 能区分 PASS、FAIL、BLOCKED、NOT_RUN、NOT_APPLICABLE、NOT_VERIFIED。

## 12. References

参考 UAES-00、01、02、04、06、09 及 ISTQB CTFL v4.0.1。

## 13. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Quality Model and Governance Standard |
