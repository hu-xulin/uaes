# UAES-00-001 — Standard Governance

**Standard ID:** UAES-00-001  
**Standard Name:** Standard Governance  
**Version:** 1.1.0  
**Status:** DRAFT  
**Domain:** UAES-00 Foundation  
**Owner:** Uter Engineering Governance  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立 UAES 标准的制定、审查、批准、生效、变更、废弃和退役治理机制，确保所有标准具有明确责任人、唯一版本和可追踪的生效状态。

## 2. Governance Roles

| Role | Responsibility |
|---|---|
| Standard Owner | 维护标准内容和规则完整性 |
| Domain Owner | 负责领域标准设计、实施和持续维护 |
| Engineering Governance | 管理跨领域规则、注册表和冲突 |
| Security Owner | 审查安全、隐私和权限相关要求 |
| Quality Owner | 负责规则验证、Quality Gate 和验收 |
| Approver | 对其权限范围内的标准变更进行正式批准 |
| Implementer | 将规范转化为代码、工具和流程 |
| Auditor | 独立核验执行证据和符合性 |

同一 Agent 可以承担多个执行角色，但不得因为承担编写任务就自动获得审批权。

## 3. Governance Requirements

### UAES-GOV-001 — Named Ownership

**MUST**：每份 ACTIVE 标准必须定义 Owner。

**MUST**：领域标准必须有 Domain Owner。

**MUST NOT**：不得将「AI」作为没有具体责任边界的唯一审批主体。

### UAES-GOV-002 — Independent Approval

**MUST**：影响跨领域强制规则的变更必须经过治理审查。

**MUST**：涉及安全、资金、生产权限或数据完整性的规则变更必须由相应责任人审查。

**MUST NOT**：作者不得仅凭自己生成的内容声明其已经获得批准。

### UAES-GOV-003 — Review Before Activation

**MUST**：DRAFT 标准必须依照 UAES-00-003 的生命周期顺序，经 APPROVED、IMPLEMENTED、VERIFIED 后才能进入 ACTIVE；进入 ACTIVE 前必须完成：

1. 内容完整性审查。
2. 规则 ID 冲突检查。
3. 依赖关系检查。
4. 交叉领域冲突检查。
5. Schema 检查（适用时）。
6. Quality Gate 检查（适用时）。
7. 审批记录。

### UAES-GOV-004 — No Silent Policy Change

**MUST**：正式标准的规则变化必须记录 Change History。

**MUST**：影响现有 Agent、CI 或工程流程的变更必须提供迁移说明。

**MUST NOT**：不得通过直接覆盖旧文件的方式隐藏规范变化。

## 4. Governance Levels

| Level | Scope | Approval |
|---|---|---|
| G0 | Foundation、全局权限、跨领域强制规则 | 用户或明确授权的系统治理负责人 |
| G1 | 领域级标准和领域门禁 | 领域负责人及相关治理责任人 |
| G2 | 子标准和工程实施规则 | 对应 Domain Owner |
| G3 | 模块级配置和局部实现 | 模块负责人，受上级标准约束 |

AI 可以准备提案、分析影响、生成修改和验证结果，但不能虚构批准记录。

## 5. Standard Change Workflow

```text
CHANGE_REQUEST
    ↓
IMPACT_ANALYSIS
    ↓
DRAFT
    ↓
IN_REVIEW
    ├── NEEDS_REVISION → DRAFT
    ├── REJECTED
    └── APPROVED
           ↓
       IMPLEMENTED
           ↓
        VERIFIED
           ↓
         ACTIVE
           ↓
         AUDIT
```

任一阶段失败：

- 保留失败记录。
- 不得跳过审批。
- 不得将状态推进到未满足条件的阶段。
- 如果前置条件、审批或验证未满足，将变更请求结果标记为 BLOCKED，并保留当前生命周期状态；BLOCKED 是任务/验收结果，不是标准生命周期状态。

## 6. Cross-Domain Governance

跨领域规则必须明确：

- 主责领域。
- 受影响领域。
- 规则引用关系。
- 实施责任。
- 验证责任。
- 变更通知范围。

不得通过复制规则正文的方式建立多个相互独立的规则源。

## 7. Governance Audit

每次标准发布必须保留：

- Standard ID。
- Version。
- Commit SHA（若已提交）。
- Change Request。
- Reviewer。
- Approver。
- Approval Timestamp。
- Validation Result。
- Affected Domains。
- Migration Plan。
- Rollback Plan（适用时）。

没有真实审批记录时，审批字段必须为空或标记为 NOT_APPROVED。

## 8. AI Execution Rules

AI MUST：

1. 先读取当前 ACTIVE 标准。
2. 检查目标任务适用范围。
3. 检查是否存在更具体的专项标准。
4. 识别权限和审批要求。
5. 生成可审查的变更提案。
6. 执行授权范围内的工作。
7. 记录验证结果和未解决风险。

AI MUST NOT：

- 自行激活 DRAFT 标准。
- 修改审批记录以伪造授权。
- 因任务紧急跳过强制安全门禁。
- 将建议、推断和已批准规则混为一谈。

## 9. Acceptance Criteria

- 所有 ACTIVE 标准均有 Owner。
- 所有 ACTIVE 标准均有批准记录。
- 标准变更可追踪。
- 跨领域变更具有影响分析。
- 审批角色与实施角色的权限边界明确。
- AI 无法通过普通任务指令绕过治理约束。


## 10. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial governance model |
| 1.1.0 | DRAFT | Align approval, implementation, verification and activation order with UAES-00-003; clarify BLOCKED result semantics |
