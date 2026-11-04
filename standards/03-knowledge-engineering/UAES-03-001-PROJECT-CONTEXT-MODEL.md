# UAES-03-001 — Project Context Model

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

定义统一的项目上下文模型，使 AI 在执行任务前能够准确识别项目、工程结构、技术栈、当前状态、关键约束和知识入口。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-001-M001 | 每个项目 MUST 有唯一 Project ID。 |
| UAES-03-001-M002 | 项目上下文 MUST 标记项目名称、仓库地址和主要分支。 |
| UAES-03-001-M003 | 技术栈 MUST 标记版本和证据来源。 |
| UAES-03-001-M004 | 项目上下文 MUST 区分已确认信息和待确认信息。 |
| UAES-03-001-M005 | 项目状态 MUST 记录最后确认时间。 |
| UAES-03-001-M006 | 平台能力 MUST 区分已实现、计划支持和不支持。 |
| UAES-03-001-M007 | 项目上下文 MUST 引用相关规范、架构、需求和设计入口。 |
| UAES-03-001-M008 | 项目上下文 MUST NOT 被用来替代实际仓库检查。 |

## 3. Project Context Structure

项目上下文至少包含：

1. **Identity**：项目身份。
2. **Repository**：仓库、分支、Commit。
3. **Technology**：语言、框架、数据库和工具版本。
4. **Architecture**：模块边界和系统结构。
5. **Product**：核心业务和需求入口。
6. **Design**：设计系统和组件规范入口。
7. **Platforms**：平台支持状态。
8. **Quality**：测试、CI 和质量门禁状态。
9. **Security**：安全约束入口。
10. **Operations**：环境和交付状态。
11. **Knowledge Index**：知识索引。
12. **Last Verified**：最后验证时间和证据。

## 4. AI Execution

AI MUST 在重大工程任务开始前检查 Context Model。若仓库状态与上下文记录不一致，必须以当前可验证的仓库证据更新判断，并记录差异。

## 5. Verification

检查项目 ID 唯一、关键字段完整、引用可解析、仓库快照可识别、平台状态没有被混淆。

## 6. Acceptance

通过项目上下文 Schema 校验、仓库事实核对和过期信息负面测试。

## 7. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
