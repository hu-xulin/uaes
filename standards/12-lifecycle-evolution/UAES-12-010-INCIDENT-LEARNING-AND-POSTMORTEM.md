# UAES-12-010 — Incident Learning and Postmortem

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-010 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-01, UAES-09, UAES-10 |

## 1. Purpose

通过事故复盘降低重复事故概率。

## 2. Scope

重大事故复盘的时间线、影响分析、根因识别、行动项跟踪与安全事件衔接。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-010-M001 | 重大事故 MUST 有时间线和影响范围。 |
| UAES-12-010-M002 | 复盘 MUST 区分事实、推断和未知信息。 |
| UAES-12-010-M003 | 复盘 MUST 识别系统性原因和促成因素。 |
| UAES-12-010-M004 | 复盘 MUST 生成有 Owner 的行动项。 |
| UAES-12-010-M005 | 行动项 MUST 有期限和验证方式。 |
| UAES-12-010-M006 | 逾期行动项 MUST 升级处理。 |
| UAES-12-010-M007 | 事故结束状态 MUST 与行动项关闭状态分开记录。 |
| UAES-12-010-M008 | 安全事件处理 MUST 同时遵循 P10。 |

## 4. Implementation Rules

事故复盘应采用无责备、证据驱动的方式，关注系统性原因和控制缺口。

复盘至少包含：Timeline、Impact、Detection、Response、Root Cause / Contributing Factors、What Worked、What Failed、Corrective Actions、Owners、Due Dates、Verification。

行动项必须进入可追踪任务系统，不能止于复盘文档。

## 5. Verification

- Postmortem Completeness
- Action Item Aging
- Recurrence Analysis

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
