# UAES-03-003 — Knowledge Classification

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-003 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

统一知识类型、可信度、敏感级别和生命周期状态，避免不同性质的信息被混合使用。

## 2. Knowledge Type

- PROJECT_FACT
- USER_REQUIREMENT
- BUSINESS_RULE
- ARCHITECTURE_DECISION
- DESIGN_SPECIFICATION
- ENGINEERING_STANDARD
- CODE_REFERENCE
- API_CONTRACT
- TEST_EVIDENCE
- SECURITY_CONTROL
- OPERATIONAL_RECORD
- EXTERNAL_REFERENCE
- AI_ANALYSIS
- TASK_CONTEXT

## 3. Confidence Classification

- **VERIFIED**：已有直接证据验证。
- **CORROBORATED**：多个独立来源相互印证。
- **SOURCE_ASSERTED**：来源明确陈述，但尚未独立验证。
- **INFERRED**：由已知事实推导。
- **ASSUMED**：暂时假设。
- **UNKNOWN**：无法确定。

## 4. Sensitivity Classification

- PUBLIC
- INTERNAL
- CONFIDENTIAL
- RESTRICTED

敏感等级只用于知识访问控制和处理要求，不代表内容本身的真实性。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-003-M001 | 知识 MUST 同时记录 Type、Confidence 和 Lifecycle Status。 |
| UAES-03-003-M002 | 敏感知识 MUST 记录访问范围。 |
| UAES-03-003-M003 | 未经验证的推断 MUST NOT 标记为 VERIFIED。 |
| UAES-03-003-M004 | AI 生成内容 MUST 标记为 GENERATED 或 AI_ANALYSIS。 |
| UAES-03-003-M005 | 知识分类变更 MUST 保留变更记录。 |

## 6. Acceptance

对混合事实、推断、假设和外部资料的测试样本，分类器或人工审核流程必须能够正确区分。

## 7. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
