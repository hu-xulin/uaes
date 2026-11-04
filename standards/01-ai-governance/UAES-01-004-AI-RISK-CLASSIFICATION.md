# UAES-01-004 — AI Risk Classification & Assessment Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-004 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-00-005 |

## 1. Purpose

建立 AI 工程任务的统一风险识别、分类、评估和处理机制。

## 2. Risk Dimensions

必须评估：

- Impact：影响程度。
- Likelihood：发生可能性。
- Reversibility：可逆性。
- Exposure：影响范围。
- Data Sensitivity：数据敏感程度。
- Financial Impact：资金影响。
- Security Impact：安全影响。
- Operational Impact：运行影响。
- Uncertainty：判断不确定性。

## 3. Risk Levels

| Level | Description | Control |
|---|---|---|
| R0 | 无明显业务或技术影响 | 常规执行 |
| R1 | 低风险、容易恢复 | 常规检查 |
| R2 | 中等影响，存在局部失败可能 | 测试与审查 |
| R3 | 高影响或涉及重要数据、安全、业务流程 | 专项评估、独立验证、审批 |
| R4 | 极高影响、重大资金、安全或生产风险 | 默认禁止自动执行，必须人工决策 |

## 4. Mandatory Risk Rules

### UAES-RISK-001 — Pre-Execution Assessment

- 涉及 R2 及以上风险的任务必须先完成风险评估。

### UAES-RISK-002 — Financial Risk

- 支付、退款、充值、余额、账务和 Token 计费变更必须单独评估资金与账务完整性风险。

### UAES-RISK-003 — Production Risk

- 涉及生产环境的操作默认 R4，必须独立授权。

### UAES-RISK-004 — Data Risk

- 删除、迁移、批量更新和敏感数据访问必须评估数据影响与恢复能力。

### UAES-RISK-005 — Uncertainty

- 如果关键事实未经确认，不得以低风险为由执行不可逆操作。

### UAES-RISK-006 — Residual Risk

- 实施控制后仍存在的风险必须记录，不得将控制措施存在等同于风险消失。

## 5. Risk Assessment Method

可采用定性矩阵：

| Likelihood \ Impact | Low | Moderate | High | Critical |
|---|---|---|---|---|
| Rare | R0 | R1 | R2 | R3 |
| Unlikely | R1 | R1 | R2 | R3 |
| Possible | R1 | R2 | R3 | R4 |
| Likely | R2 | R3 | R4 | R4 |
| Almost Certain | R3 | R3 | R4 | R4 |

如果资金、安全、生产数据或法律风险存在不可接受后果，应直接提高风险等级，不得仅依赖矩阵平均值降低等级。

## 6. Risk Treatment

处理方式：

- AVOID：不执行。
- MITIGATE：增加控制措施。
- TRANSFER：通过合同、保险或外部责任安排转移部分风险。
- ACCEPT：由有权责任人接受剩余风险。

AI 不得自行接受 R3/R4 风险。

## 7. Required Risk Record

- Assessment ID。
- Task ID。
- Risk Owner。
- Scope。
- Risk Factors。
- Likelihood。
- Impact。
- Initial Risk。
- Controls。
- Residual Risk。
- Approval。
- Review Date。
- Status。

## 8. Acceptance Criteria

- 重要任务有风险评估。
- R3/R4 风险有专项处理。
- 资金与生产风险被独立识别。
- 剩余风险有记录。
- 不确定性不会被默认为低风险。
- 风险接受者具备对应授权。

## 9. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
