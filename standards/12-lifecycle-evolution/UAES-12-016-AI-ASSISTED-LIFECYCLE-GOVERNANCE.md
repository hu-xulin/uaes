# UAES-12-016 — AI-Assisted Lifecycle Governance

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-016 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-01, UAES-03, UAES-08, UAES-09, UAES-11 |

## 1. Purpose

规范 AI 对系统生命周期的分析和执行。

## 2. Scope

AI 参与资产识别、技术债务分析、重构提议、依赖升级、迁移计划、知识漂移检查、标准变更和事故复盘的授权边界。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-016-M001 | AI MUST 识别资产 Owner 和生命周期状态。 |
| UAES-12-016-M002 | AI MUST 标记推断和未经验证的事实。 |
| UAES-12-016-M003 | AI 提出的架构变更 MUST 进入 ADR 流程。 |
| UAES-12-016-M004 | AI 提出的技术债务 MUST 经过人工或规则审查后进入正式治理队列。 |
| UAES-12-016-M005 | AI 执行依赖升级 MUST 遵守 P01、P09、P10、P11。 |
| UAES-12-016-M006 | AI 不得自行批准标准或架构决策。 |
| UAES-12-016-M007 | AI 不得自行决定生产数据删除或系统退役。 |
| UAES-12-016-M008 | AI MUST 保留变更、验证和审批证据。 |
| UAES-12-016-M009 | AI MUST 对未知消费者、数据影响和支持状态标记 UNKNOWN。 |
| UAES-12-016-M010 | AI MUST 将失败、未执行和未验证状态如实报告。 |

## 4. Implementation Rules

AI 可以在授权范围内：识别技术债务、提议重构、分析依赖升级、生成迁移计划、检查知识漂移、提出标准变更、生成事故复盘草案、执行已批准的低风险改进。

AI 不得自行：批准 A0/A1 架构决策、批准生产数据删除、决定关键 API 终止日期、关闭重大安全事件、删除审计证据、将 DRAFT 标准标记为正式生效、执行未授权生产变更。

## 5. Verification

- Authorization Test
- Knowledge Provenance Test
- Lifecycle Transition Test
- Unauthorized Retirement Test

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
