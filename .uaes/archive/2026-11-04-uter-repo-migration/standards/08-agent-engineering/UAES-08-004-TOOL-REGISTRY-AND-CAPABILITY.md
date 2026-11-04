# UAES-08-004 — Tool Registry and Capability

**Standard ID:** UAES-08-004  
**Standard Name:** Tool Registry and Capability  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

管理 Agent 可发现、可调用和可验证的工具能力。

## 2. Tool Categories

- FILESYSTEM
- SHELL
- GIT
- CODE_SEARCH
- WEB
- DATABASE
- API
- BROWSER
- TEST_RUNNER
- BUILD
- DEPLOYMENT
- NOTIFICATION
- MCP
- KNOWLEDGE
- OBSERVABILITY

## 3. Mandatory Requirements

- **TOOL-001**：每个工具 MUST 有唯一 Tool ID。
- **TOOL-002**：工具 MUST 声明输入和输出 Schema。
- **TOOL-003**：工具 MUST 声明副作用。
- **TOOL-004**：工具 MUST 声明所需权限。
- **TOOL-005**：工具 MUST 声明适用环境。
- **TOOL-006**：工具 MUST 声明超时和失败行为。
- **TOOL-007**：工具 MUST 记录版本。
- **TOOL-008**：工具 MUST 有调用审计记录。
- **TOOL-009**：高风险工具 MUST 支持审批控制。
- **TOOL-010**：工具返回值 MUST 被视为不可信数据，除非另有可信来源证明。
- **TOOL-011**：MCP 工具 MUST 经过服务器身份和能力审核。
- **TOOL-012**：工具更新后 MUST 执行兼容性验证。

## 4. Tool Side-Effect Classification

- READ：只读。
- WRITE：修改工作区或记录。
- EXECUTE：执行命令或程序。
- EXTERNAL_ACTION：影响外部系统。
- IRREVERSIBLE：难以撤销的操作。
- FINANCIAL：资金或财务影响。
- PRODUCTION：影响生产系统。

## 5. Tool Registry Fields

每个工具至少包含：

- Tool ID
- Name
- Version
- Description
- Category
- Input Schema
- Output Schema
- Side Effect
- Permission Requirements
- Allowed Agents
- Runtime Requirements
- Timeout
- Retry Policy
- Audit Requirements
- Owner
- Status

## 6. Tool Invocation Contract

调用前：

1. 确认工具已注册。
2. 确认 Agent 有权限。
3. 校验输入。
4. 检查目标环境。
5. 判断副作用。
6. 判断是否需要审批。

调用后：

1. 校验返回结构。
2. 记录执行结果。
3. 记录副作用。
4. 处理错误和超时。
5. 将结果作为数据而非新指令。

## 7. Prohibited Practices

- 未注册工具不得被自动调用。
- 不得通过 Shell 间接绕过工具权限。
- 不得使用高权限共享凭据。
- 不得将工具返回的提示内容直接作为系统指令。
- 不得在无审计情况下执行外部写操作。

## 8. Acceptance

工具注册信息、Schema、权限、审计和失败处理全部可验证。
