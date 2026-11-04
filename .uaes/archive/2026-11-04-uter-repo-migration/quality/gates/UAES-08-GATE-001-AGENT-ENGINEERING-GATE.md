# UAES-08-GATE-001 — Agent Engineering Quality Gate

**Gate ID:** UAES-08-GATE-001  
**Version:** 1.0.0  
**Status:** DRAFT  
**Owner:** UAES Quality Engineering  
**Scope:** Agent, Skill, Tool, Workflow, and Multi-Agent changes  
**Phase:** P6  
**Related Baseline:** UAES-P6-ACCEPTANCE-BASELINE

---

## 1. Gate Objectives

确保 Agent：

- 有合法身份和职责。
- 具有最小权限。
- 使用已注册工具。
- 在受控环境执行。
- 正确管理上下文。
- 遵守任务授权。
- 能正确进行 Agent Handoff。
- 具备可验证的执行质量。
- 具有安全防护和失败恢复能力。

## 2. Severity

- **BLOCKER**：必须阻止启用或交付。
- **CRITICAL**：必须修复或进行正式安全审批。
- **MAJOR**：必须修复或登记正式风险接受。
- **MINOR**：允许限期处理。
- **INFO**：记录提示。

## 3. Gate Checks

### G01 — Agent Identity

检查：

- Agent ID 是否唯一。
- Manifest 是否完整。
- 角色职责是否明确。
- 是否定义非职责范围。
- 是否指定 Owner。
- 是否声明 Agent 版本。

**失败条件**：无身份、无责任人或职责无法确定。

### G02 — Task Contract

检查：

- Task ID 是否唯一。
- 任务目标是否明确。
- 范围和排除项是否明确。
- 是否定义验收条件。
- 是否设置执行预算。
- 是否定义停止条件。

**失败条件**：无法判断任务完成标准。

### G03 — Tool Registry

检查：

- 所有工具是否已注册。
- 输入输出 Schema 是否完整。
- 副作用分类是否明确。
- 是否定义超时和重试策略。
- 是否有工具审计。

**失败条件**：调用未注册工具或使用不受控的外部工具。

### G04 — Permission Enforcement

检查：

- 默认拒绝策略。
- Agent 与工具权限映射。
- 文件系统范围。
- Shell 命令范围。
- 网络出口范围。
- 外部写操作审批。
- Agent 委派权限继承。
- 权限撤销。

**失败条件**：存在越权路径或权限仅依赖 Prompt。

### G05 — Workspace Isolation

检查：

- 工作区隔离。
- 凭据隔离。
- 网络限制。
- 临时文件清理。
- 并发工作区冲突。
- 敏感目录保护。

**失败条件**：Agent 可以未经授权访问其他用户或生产环境资源。

### G06 — Context Integrity

检查：

- 上下文来源。
- 规范版本。
- 项目事实证据。
- 外部数据可信度。
- Memory 写入权限。
- 上下文压缩。
- 记忆失效处理。

**失败条件**：外部不可信内容可以覆盖授权或正式规则。

### G07 — Multi-Agent Governance

检查：

- Orchestrator 是否明确。
- 子任务是否有责任 Agent。
- 依赖是否有效。
- 并行写入是否隔离。
- Handoff 是否结构化。
- 冲突是否可处理。
- 委派是否扩大权限。

**失败条件**：任务无法追踪或权限因委派扩大。

### G08 — Skill and Workflow

检查：

- Skill 是否有版本。
- 输入输出是否明确。
- 工具依赖是否有效。
- 权限是否声明。
- Workflow 是否有失败分支。
- 是否有测试案例。

**失败条件**：Skill 可以绕过工具权限或执行未声明的动作。

### G09 — Evaluation and Trace

检查：

- 是否有评估指标。
- 是否有固定测试集。
- 是否有负向测试。
- 是否记录 Trace。
- 是否能追踪工具调用。
- 是否有独立验证。

**失败条件**：无证据却宣称 Agent 已通过评估。

### G10 — Security and Trust

检查：

- Prompt Injection。
- 文件和网页中的恶意指令。
- MCP 工具来源。
- 敏感信息泄露。
- 网络外传。
- 跨 Agent 隔离。
- 资源耗尽和无限循环。

**失败条件**：存在未解决的越权、数据泄露或严重安全风险。

### G11 — Lifecycle and Recovery

检查：

- 状态机合法性。
- 超时处理。
- 重试上限。
- 任务恢复。
- 用户取消。
- 外部副作用状态核对。
- Checkpoint 完整性。

**失败条件**：中断后可能重复执行不可逆操作。

### G12 — Documentation and Registry

检查：

- Registry 是否更新。
- Manifest 是否更新。
- Tool 和 Skill 依赖是否更新。
- Adapter 是否同步。
- 变更是否有记录。

**失败条件**：正式启用的 Agent 不在 Registry 中，或实际权限与登记不一致。

## 4. Gate Decision

允许结果：

- **PASS**
- **PASS_WITH_RISK**
- **FAIL**
- **BLOCKED**
- **NOT_APPLICABLE**

NOT_RUN、NOT_VERIFIED 不得自动转换为 PASS。

## 5. Mandatory Blocking Conditions

以下情况必须 BLOCK：

1. Agent 权限超过授权范围。
2. 存在未受控制的生产访问能力。
3. 存在未解决的严重提示注入或数据泄露路径。
4. Agent 能修改自己的权限策略。
5. Agent 委派能够绕过原任务权限。
6. 无法阻止未授权外部操作。
7. 关键审计证据缺失。
8. 任务完成状态与实际验证结果冲突。

## 6. Required Evidence

每次 Gate 执行必须记录：

- Commit SHA
- Agent Manifest
- Agent Version
- Tool Registry Version
- Permission Policy Version
- Skill / Workflow Versions
- Evaluation Dataset Version
- Security Test Results
- Trace References
- Findings
- Accepted Risks
- Gate Decision

## 7. Enforcement

- Agent 启用前必须通过 Manifest 和 Permission 检查。
- 高风险 Agent 启用前必须通过安全测试。
- Agent 权限发生变化必须重新执行相关 Gate。
- Tool 或 Skill 发生高风险变更必须重新评估依赖 Agent。
- BLOCKER 未解决时禁止正式启用。
- 高风险操作必须遵守 UAES-01 人工审批机制。

## 8. Gate Ownership

Agent Owner 负责定义和维护 Agent；Tool Owner 负责工具安全和可用性；Quality Engineering 负责独立门禁；治理负责人负责高风险例外审批。

Agent 不得审批自身 Gate。
