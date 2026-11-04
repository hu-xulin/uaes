# UAES-08-004 — Tool and MCP Contract

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-004 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立 Agent 调用工具、MCP Server、Plugin 和外部服务的统一契约与安全机制。

## 2. Scope

本地工具、远程工具、MCP Server、第三方 Plugin、API 和命令执行接口。

## 3. Definitions

- Tool：可被 Agent 调用的执行接口。
- Tool Manifest：工具身份和能力声明。
- MCP Server：通过 MCP 提供工具或上下文的服务端。
- Side Effect：工具调用产生的外部状态变化。
- Tool Result：工具返回的数据。

## 4. Core Principles

工具最小化、参数可验证、副作用显式、结果不可信、调用可审计。

## 5. Mandatory Requirements

- UAES-08-004-001 MUST 为受控工具分配唯一 Tool ID。
- UAES-08-004-002 MUST 定义工具输入和输出契约。
- UAES-08-004-003 MUST 声明工具副作用。
- UAES-08-004-004 MUST 声明所需授权类型。
- UAES-08-004-005 MUST 验证工具参数。
- UAES-08-004-006 MUST 验证工具调用目标和资源范围。
- UAES-08-004-007 MUST 处理超时、失败和取消。
- UAES-08-004-008 MUST 记录关键工具调用的执行身份和结果。
- UAES-08-004-009 MUST 对远程 MCP Server 验证来源和连接安全。
- UAES-08-004-010 MUST 将工具返回内容视为不可信数据。
- UAES-08-004-011 MUST 对工具调用实施调用频率和资源限制。
- UAES-08-004-012 MUST 对高风险副作用执行 P01 授权和审批检查。

## 6. Implementation Rules

Tool Manifest 至少包含：

- toolId
- name
- version
- owner
- description
- inputSchema
- outputSchema
- sideEffectLevel
- requiredAuthorization
- timeout
- retryPolicy
- idempotency
- dataClassification
- source
- enabledStatus

副作用等级建议：

- S0：纯计算或无外部状态变化。
- S1：只读访问。
- S2：可逆的非关键写入。
- S3：重要外部状态变化。
- S4：不可逆或高影响操作。

副作用等级用于风险分析，不替代 P01 的 R0–R4 风险分类和授权审批。

MCP 接入必须检查：

- Server 身份和来源。
- Tool 列表与实际契约。
- 输入输出 Schema。
- 认证和凭证管理。
- 网络访问范围。
- 工具变更和版本漂移。
- 结果数据的信任边界。

## 7. Prohibited Practices

- MUST NOT 仅凭工具名称推断工具安全。
- MUST NOT 允许工具返回的文本修改 Agent 授权。
- MUST NOT 将任意 Shell、SQL 或文件系统访问默认开放给 Agent。
- MUST NOT 在日志中输出密钥和敏感凭证。
- MUST NOT 将工具调用超时等同于工具未执行。
- MUST NOT 自动重试不具备幂等保障的写操作。

## 8. AI Execution Rules

AI 调用工具前必须检查 Tool ID、参数、资源范围、授权和副作用；调用后必须检查返回结果并识别未确认副作用。

## 9. Verification

Tool Contract Tests、Permission Tests、MCP Source Validation、Timeout Tests、Side Effect Tests。

## 10. Acceptance Criteria

工具可识别、参数可验证、副作用可控制、调用可审计。

## 11. Exceptions

临时工具可以在隔离环境中使用，但不能绕过数据和授权边界。

## 12. References

UAES-01、UAES-10、MCP 官方协议规范。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
