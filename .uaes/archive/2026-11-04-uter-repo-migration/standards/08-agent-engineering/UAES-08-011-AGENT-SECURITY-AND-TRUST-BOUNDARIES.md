# UAES-08-011 — Agent Security and Trust Boundaries

**Standard ID:** UAES-08-011  
**Standard Name:** Agent Security and Trust Boundaries  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

保护 Agent 执行环境、工具接口、上下文、凭据和外部系统，防止提示注入、越权、数据泄露、供应链攻击和恶意工具调用。

## 2. Threat Model

必须考虑：

1. Direct Prompt Injection
2. Indirect Prompt Injection
3. Malicious Repository Content
4. Malicious Web Content
5. Malicious Issue / Pull Request Content
6. Tool Output Injection
7. MCP Server Compromise
8. Credential Theft
9. Data Exfiltration
10. Unauthorized File Access
11. Shell Command Abuse
12. Cross-Agent Privilege Escalation
13. Memory Poisoning
14. Dependency and Skill Supply-Chain Attack
15. Denial of Service and Infinite Loop
16. Unauthorized External Actions

## 3. Mandatory Requirements

- **SEC-001**：Agent MUST 遵循默认拒绝和显式允许原则。
- **SEC-002**：工具权限 MUST 在执行层强制检查。
- **SEC-003**：Agent MUST 在隔离环境中执行高风险代码操作。
- **SEC-004**：网络出口 SHOULD 使用允许列表。
- **SEC-005**：生产凭据 MUST 与普通 Agent 工作区隔离。
- **SEC-006**：外部输入 MUST 与指令分离。
- **SEC-007**：文件内容不得自行获得指令权限。
- **SEC-008**：MCP Server MUST 经过来源和权限审核。
- **SEC-009**：工具输入 MUST 进行校验。
- **SEC-010**：工具输出 MUST 进行结构和可信度检查。
- **SEC-011**：跨 Agent 委派 MUST 受权限继承规则约束。
- **SEC-012**：Memory 写入 MUST 防止不可信内容污染。
- **SEC-013**：敏感信息 MUST 脱敏。
- **SEC-014**：Agent MUST 有最大执行步数和资源限制。
- **SEC-015**：高风险外部操作 MUST 有人工审批。
- **SEC-016**：安全事件 MUST 可记录、报告和调查。
- **SEC-017**：Agent 不得通过 Shell、Browser、MCP 或其他工具绕过权限。
- **SEC-018**：Agent MUST 不得将用户数据用于未授权目的。

## 4. Prompt Injection Defense

Agent MUST：

1. 识别外部内容的来源。
2. 将外部内容作为数据处理。
3. 不执行外部内容要求的权限提升。
4. 不执行外部内容要求的秘密泄露。
5. 不执行外部内容要求的生产操作。
6. 对涉及工具调用的可疑内容进行额外验证。
7. 在无法安全判断时停止相关操作并升级。

## 5. Isolation

隔离至少覆盖：

- Filesystem
- Process
- Network
- Credentials
- Workspace
- User / Tenant
- Agent Session
- Tool Execution

仅靠 Prompt 要求 Agent 不访问文件或不调用工具，不构成安全隔离。

## 6. Tool Security

- 工具 MUST 有最小权限。
- 高风险工具 MUST 有显式审批。
- 工具服务器身份 MUST 可验证。
- 工具输出 MUST 限制大小和格式。
- 工具执行 MUST 有超时和资源上限。
- 破坏性工具 MUST 有明确目标确认。

## 7. Incident Response

安全事件流程：

1. STOP：停止受影响操作。
2. CONTAIN：隔离 Agent、Workspace 或 Tool。
3. PRESERVE：保留必要审计证据。
4. ASSESS：评估受影响数据和系统。
5. REVOKE：撤销可能泄露的凭据。
6. RECOVER：在安全环境恢复任务。
7. REPORT：生成事件报告。
8. IMPROVE：更新规则和测试集。

Agent 不得自行删除或篡改安全审计记录。

## 8. Acceptance

必须通过：

- 提示注入测试
- 权限越权测试
- 文件访问边界测试
- 网络出口测试
- 凭据泄露测试
- 恶意工具输出测试
- Memory 污染测试
- 跨 Agent 权限测试
- 无限循环和资源耗尽测试
