# UAES-00-005 — Exception & Waiver Management

**Standard ID:** UAES-00-005  
**Standard Name:** Exception & Waiver Management  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-00 Foundation  
**Owner:** Uter Engineering Governance  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

定义在特殊情况下申请、审查、批准、实施和撤销 UAES 规则例外的流程。

例外机制用于处理真实工程限制，不得成为规避标准的常规手段。

## 2. Non-Waivable Requirements

以下事项不得通过普通例外申请豁免：

1. 法律法规和监管强制要求。
2. 未经授权的生产环境操作。
3. 未经授权的生产数据库修改。
4. 未经授权的真实支付配置修改。
5. 用户明确禁止的行为。
6. 覆盖用户未提交本地修改。
7. 伪造审批、测试、扫描或验收证据。
8. 绕过身份验证、权限控制或资金完整性保护。
9. 将未经验证的安全关键变更标记为 PASS。

## 3. Exception Classification

| Class | Description | Approval |
|---|---|---|
| E0 | 法律、安全底线或明确授权边界 | 不允许普通豁免 |
| E1 | P0 规则例外 | 用户或授权治理负责人 |
| E2 | P1 规则例外 | 对应领域负责人及相关风险负责人 |
| E3 | P2/P3 规则例外 | Domain Owner |
| E4 | 临时工程偏离 | 模块负责人，按领域政策授权 |

审批人必须具有对应权限。AI 不得自行成为其所申请例外的唯一批准人。

## 4. Exception Request

每个例外申请必须包含：

- Exception ID。
- Related Rule IDs。
- Requester。
- Reason。
- Business Justification。
- Technical Constraints。
- Risk Assessment。
- Affected Components。
- Security Impact。
- Data Impact。
- Financial Impact。
- Compensating Controls。
- Expiration Date。
- Rollback Plan。
- Verification Plan。
- Approver。
- Approval Evidence。

## 5. Exception Lifecycle

```text
REQUESTED
   ↓
RISK_ASSESSED
   ↓
IN_REVIEW
   ├── REJECTED
   ├── NEEDS_REVISION
   └── APPROVED
          ↓
       ACTIVE
          ↓
      EXPIRED / REVOKED / CLOSED
```

## 6. Mandatory Controls

### UAES-EXC-001 — Explicit Approval

**MUST**：所有需要审批的例外必须有明确批准记录。

### UAES-EXC-002 — Time Bound

**MUST**：临时例外必须设置失效时间。

不得将临时例外无限期延长而不重新审查。

### UAES-EXC-003 — Compensating Controls

**MUST**：无法满足原规则时，必须评估替代控制措施。

### UAES-EXC-004 — Traceability

**MUST**：例外必须关联原规则、任务、PR 和验证证据。

### UAES-EXC-005 — Automatic Expiry

**MUST**：到期例外不得继续作为有效授权使用。

## 7. AI Execution Rules

AI 可以：

- 识别规则冲突。
- 提出例外申请。
- 生成风险评估。
- 建议补偿性控制。
- 跟踪例外状态。

AI 不得：

- 自行批准需要人工授权的例外。
- 把未回复理解为批准。
- 将例外扩大到其他规则或其他任务。
- 在例外过期后继续使用。
- 因测试失败而自动申请豁免并标记通过。

## 8. Acceptance Criteria

- 每个例外均有唯一 ID。
- 关联规则有效。
- 审批权限符合要求。
- 风险与补偿措施明确。
- 到期时间可检查。
- 过期例外能够被识别并阻止继续使用。
