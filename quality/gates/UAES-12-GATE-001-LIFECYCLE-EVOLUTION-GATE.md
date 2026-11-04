# UAES-12-GATE-001 — Lifecycle & Evolution Quality Gate

## 1. Metadata

| Field | Value |
|---|---|
| Gate ID | UAES-12-GATE-001 |
| Version | 1.0.0 |
| Domain | UAES-12 |
| Status | DRAFT |
| Owner | Uter Engineering Governance |
| Blocking | Yes |
| Applies To | 生命周期变更、技术债务处置、依赖升级、架构演进、契约弃用、数据迁移、功能发布/退役、事故复盘、标准变更与退役活动 |

## 2. Gate Objective

确保生命周期与演进活动（登记、债务、重构、依赖、架构、契约、数据、功能、反馈、事故、知识、标准、改进、退役、AI 授权）在证据完整、授权合规的前提下推进。

## 3. Gate Decisions

- **PASS**：适用的 MUST 项全部通过，跨对象 Validator 无阻断错误。
- **FAIL**：至少一项强制检查失败。
- **BLOCKED**：命中阻断规则或关键证据缺失。
- **NOT_RUN**：Gate 未执行。
- **NOT_APPLICABLE**：不适用于本次变更（必须有理由）。
- **NOT_VERIFIED**：缺少足够证据。

没有证据的项目不得 PASS。

## 4. Lifecycle Governance

| ID | 检查项 |
|---|---|
| L01 | 关键资产均有唯一 Asset ID。 |
| L02 | 关键资产均有 Owner。 |
| L03 | 资产生命周期状态合法。 |
| L04 | 状态转换符合状态机。 |
| L05 | 关键依赖和消费者已登记。 |
| L06 | 资产复核时间和计划明确。 |
| L07 | 退役资产保留必要审计信息。 |

## 5. Technical Debt

| ID | 检查项 |
|---|---|
| D01 | 已识别技术债务登记完整。 |
| D02 | 技术债务具有影响评估。 |
| D03 | 高风险债务有 Owner 和处理计划。 |
| D04 | 延期债务有理由和重新评估记录。 |
| D05 | 已解决债务有验证证据。 |
| D06 | 逾期债务可以被自动识别。 |

## 6. Refactoring

| ID | 检查项 |
|---|---|
| R01 | 重构目标明确。 |
| R02 | 重构前行为基线存在。 |
| R03 | 行为兼容性要求明确。 |
| R04 | 影响范围已分析。 |
| R05 | 回归验证通过。 |
| R06 | 文档和知识更新完成。 |

## 7. Dependency Lifecycle

| ID | 检查项 |
|---|---|
| P01 | 关键依赖版本和来源明确。 |
| P02 | 依赖支持状态已检查。 |
| P03 | 安全漏洞扫描完成。 |
| P04 | License 检查完成。 |
| P05 | 传递依赖变化可追溯。 |
| P06 | 锁文件变更已审查。 |
| P07 | 升级测试通过。 |
| P08 | 关键依赖具有回退或修复方案。 |
| P09 | 四个 Go Modules 分别完成依赖检查。 |

## 8. Architecture and Contract Evolution

| ID | 检查项 |
|---|---|
| A01 | 重要架构变更关联 ADR。 |
| A02 | ADR 状态与实际批准状态一致。 |
| A03 | 模块依赖边界已检查。 |
| A04 | 架构迁移计划存在。 |
| A05 | API 弃用识别全部关键消费者。 |
| A06 | API 弃用具有迁移窗口。 |
| A07 | 旧接口使用情况可观察。 |
| A08 | API 移除满足退出条件。 |

## 9. Data Evolution

| ID | 检查项 |
|---|---|
| S01 | Schema 变更有 Migration ID。 |
| S02 | 旧版应用兼容性已验证。 |
| S03 | 数据迁移规则明确。 |
| S04 | 数据完整性检查通过。 |
| S05 | 不可逆迁移的恢复限制已记录。 |
| S06 | 关键业务数据迁移经过专项验证。 |

## 10. Feature Lifecycle

| ID | 检查项 |
|---|---|
| F01 | 重要 Feature 有 Owner。 |
| F02 | Feature Flag 有默认值。 |
| F03 | 渐进发布范围明确。 |
| F04 | Kill Switch 或降级策略有效。 |
| F05 | 发布观察指标明确。 |
| F06 | 过期 Feature Flag 有清理任务。 |
| F07 | 退役影响分析完整。 |

## 11. Observability and Feedback

| ID | 检查项 |
|---|---|
| O01 | 关键服务有健康指标。 |
| O02 | 关键服务有错误和延迟指标。 |
| O03 | 关键业务流程可观察。 |
| O04 | 反馈记录关联版本和来源。 |
| O05 | 反馈可以关联工程任务。 |
| O06 | 告警有 Owner 和响应路径。 |
| O07 | 监控变化经过影响分析。 |

## 12. Incident Learning

| ID | 检查项 |
|---|---|
| I01 | 重大事故有完整时间线。 |
| I02 | 事故复盘区分事实、推断和未知。 |
| I03 | 系统性原因和促成因素已分析。 |
| I04 | 改进措施有 Owner。 |
| I05 | 改进措施有期限。 |
| I06 | 改进措施有验证证据。 |
| I07 | 逾期行动项可追踪。 |
| I08 | 事故关闭与行动项关闭分离。 |

## 13. Knowledge and Documentation Drift

| ID | 检查项 |
|---|---|
| K01 | 关键文档有 Owner。 |
| K02 | 关键知识有来源和验证时间。 |
| K03 | API 文档与契约一致。 |
| K04 | 架构文档与 ADR 和模块清单一致。 |
| K05 | 过期知识有状态标记。 |
| K06 | 重大代码变更会触发文档检查。 |
| K07 | 自动生成内容有来源记录。 |
| K08 | 未验证 AI 输出未被标记 VERIFIED。 |

## 14. Standard Evolution

| ID | 检查项 |
|---|---|
| T01 | 每份标准有唯一 ID 和版本。 |
| T02 | 标准变更有提案。 |
| T03 | 变更影响分析完整。 |
| T04 | MUST 级别变化明确记录。 |
| T05 | Schema 和 Gate 兼容性已检查。 |
| T06 | 正式批准可追溯。 |
| T07 | 旧版本保留。 |
| T08 | Registry 与文件一致。 |
| T09 | 变更生效时间明确。 |

## 15. Continuous Improvement

| ID | 检查项 |
|---|---|
| C01 | 改进任务有基线。 |
| C02 | 目标有可测量指标。 |
| C03 | 统计口径和时间窗口明确。 |
| C04 | 改进任务有 Owner。 |
| C05 | 改进结果经过测量。 |
| C06 | 未达标结果如实保留。 |
| C07 | 指标没有通过修改口径制造成功。 |

## 16. Decommission

| ID | 检查项 |
|---|---|
| X01 | 退役提案有 Owner。 |
| X02 | 消费者和依赖检查完成。 |
| X03 | 数据保留与删除义务已评估。 |
| X04 | 凭证撤销计划完整。 |
| X05 | DNS、网络、监控和基础设施已检查。 |
| X06 | 必要审批完成。 |
| X07 | 退役执行证据完整。 |
| X08 | 归档数据完整性可验证。 |

## 17. AI Lifecycle Governance

| ID | 检查项 |
|---|---|
| AI01 | AI 执行前检查 P01 授权。 |
| AI02 | AI 加载 P03 知识来源和可信度。 |
| AI03 | AI 识别未知消费者和未知数据影响。 |
| AI04 | AI 提议重大架构变更时进入 ADR。 |
| AI05 | AI 未自行批准高风险变更。 |
| AI06 | AI 未自行批准标准生效。 |
| AI07 | AI 未未经授权删除生产数据。 |
| AI08 | AI 未未经授权执行系统退役。 |
| AI09 | AI 保留变更和验证证据。 |
| AI10 | AI 准确报告未执行和未验证事项。 |

## 18. Blocking Rules

以下任一情况必须阻断：

1. 关键资产无人负责且没有经过批准的临时责任安排。
2. 未经授权执行重大架构、生产数据或系统退役变更。
3. 关键数据迁移没有完整性验证。
4. 关键消费者未迁移却直接移除接口。
5. 关键依赖存在未处置的阻断级安全风险。
6. 重大事故行动项被无证据关闭。
7. 正式标准未经审批被修改为 ACTIVE。
8. 生命周期状态与实际资产状态存在重大不一致。
9. AI 越权执行生命周期操作。
10. 关键审计证据缺失或被篡改。

## 19. Pass Criteria

适用的 MUST 项全部通过，跨对象 Validator 无阻断错误，必要证据完整，例外均符合 P00 审批流程，方可 PASS。

## 20. Gate Report

Gate 报告必须包含：

- Gate ID
- Repository
- Baseline Commit SHA
- Asset Registry Version
- Standard Registry Version
- Check Results
- Failed Rules
- Blocked Rules
- Technical Debt Summary
- Dependency Risk Summary
- Deprecation Summary
- Improvement Results
- Evidence References
- Exceptions
- Final Decision
- Timestamp

## 21. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial gate |
