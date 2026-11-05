# UAES-00-002 — Normative Rules & Interpretation

**Standard ID:** UAES-00-002  
**Standard Name:** Normative Rules & Interpretation  
**Version:** 1.1.0  
**Status:** DRAFT  
**Domain:** UAES-00 Foundation  
**Owner:** Uter Engineering Governance  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

统一 UAES 规则的表达方式、强制程度、适用范围、解释方法和验证要求，避免 Agent 因语言歧义降低标准要求。

## 2. Rule Levels

| Level | Keyword | Interpretation |
|---|---|---|
| Mandatory | MUST | 无条件强制，除非通过正式例外流程 |
| Prohibited | MUST NOT | 禁止行为，不得自行豁免 |
| Recommended | SHOULD | 默认应执行；偏离必须记录理由和风险 |
| Discouraged | SHOULD NOT | 默认不应执行；例外必须说明原因 |
| Optional | MAY | 可根据任务和环境选择 |

## 3. Rule ID Convention

规则 ID 必须与 Standard ID 使用不同的命名空间，禁止规则 ID 与标准注册 ID 冲突。

允许以下三种形式：

1. Domain-scoped rule：UAES-{DOMAIN}-{CATEGORY}-{SEQUENCE}，例如 UAES-00-PRIN-001。
2. Standard-scoped rule：UAES-{DOMAIN}-{STANDARD-SEQUENCE}-{RULE-SEQUENCE}，例如 UAES-06-001-001。
3. Named governance namespace：UAES-{NAMESPACE}-{SEQUENCE}，例如 UAES-NORM-001、UAES-REG-001、UAES-EXC-001。

Standard ID 保留 UAES-{DOMAIN} 与 UAES-{DOMAIN}-{STANDARD-SEQUENCE} 形式，例如 UAES-00、UAES-00-001。

**MUST NOT**：规则 ID 不得使用 UAES-{DOMAIN}-{SEQUENCE} 这种与 Standard ID 完全相同的形式。新增规则必须通过注册表与规则 ID 扫描器检查后才能合并。

领域级 Gate：

```text
UAES-{DOMAIN}-GATE-{SEQUENCE}
```

验收基准：

```text
UAES-P{DOMAIN}-ACCEPTANCE-BASELINE
```

规则 ID 一经发布，不得重新分配给其他规则。

规则删除后，其 ID 必须保留为 RETIRED 或 SUPERSEDED，不得循环使用。

## 4. Rule Completeness

每条正式规则 MUST 包含：

| Field | Requirement |
|---|---|
| ID | 唯一规则 ID |
| Title | 简洁、可识别的名称 |
| Level | MUST / MUST NOT / SHOULD / SHOULD NOT / MAY |
| Scope | 适用对象和边界 |
| Requirement | 明确可执行的要求 |
| Rationale | 规则原因 |
| Verification | 如何检查 |
| Acceptance | 什么条件算通过 |
| Owner | 维护责任人 |
| Dependencies | 关联规则 |

对于 P0/P1 规则，缺少 Verification 或 Acceptance 时不得批准为 ACTIVE。

## 5. Interpretation Rules

### UAES-NORM-001 — No Weakening

AI MUST NOT 将 MUST 解释为 SHOULD 或 MAY。

### UAES-NORM-002 — Scope First

AI MUST 先判断规则适用范围，再判断是否适用于当前任务。

### UAES-NORM-003 — Specific Rule Precedence

在不违反上级标准的前提下，具体领域规则可以补充通用规则。

具体规则不得取消上级规则的强制要求。

### UAES-NORM-004 — No Implicit Waiver

未明确记录的偏离不得被视为已批准例外。

### UAES-NORM-005 — Ambiguity Escalation

如果规则存在多种合理解释，且会影响安全、资金、数据、权限或架构决策，AI MUST 停止相关高风险操作并提交澄清。

低风险歧义可以采用最保守、可逆的解释，但必须记录假设。

## 6. Requirement vs Guidance

规范文件必须区分：

- **Normative Requirement**：正式强制规则。
- **Implementation Guidance**：实施建议。
- **Example**：示例。
- **Informative Reference**：参考资料。
- **Project Fact**：经过确认的项目事实。
- **Assumption**：尚未确认的假设。

示例代码、示例路径、示例配置不得自动视为 Uter 当前工程事实。

## 7. Rule Verification Types

每条规则至少指定一种验证方式：

- STATIC：静态文件或配置检查。
- SCHEMA：机器可读 Schema 校验。
- UNIT：单元测试。
- INTEGRATION：集成测试。
- E2E：端到端测试。
- SECURITY：安全扫描或安全测试。
- MANUAL：人工审查。
- AGENT-TEST：Agent 行为测试。
- EVIDENCE：证据完整性检查。

验证方式可以组合使用。

## 8. Acceptance Result

统一结果：

| Result | Meaning |
|---|---|
| PASS | 已验证通过 |
| FAIL | 验证失败 |
| BLOCKED | 因前置条件或权限限制无法继续 |
| NOT_RUN | 尚未执行 |
| NOT_APPLICABLE | 经确认不适用 |
| NOT_VERIFIED | 缺乏足够证据 |

AI MUST NOT 把 NOT_RUN、NOT_VERIFIED 或 BLOCKED 转换成 PASS。

## 9. Rule Applicability

规则适用性必须记录：

- Platform。
- Component。
- Environment。
- Risk Level。
- Task Type。
- Effective Version。

不得仅因为某规则不方便执行就标记 NOT_APPLICABLE。

## 10. Acceptance Criteria

- 所有规则 ID 唯一。
- 强制级别明确。
- P0/P1 规则有验证方法。
- 规则范围没有重大歧义。
- 示例与项目事实分离。
- 验收结果严格使用统一枚举。
