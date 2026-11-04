# UAES-01-006 — AI Transparency & Accountability Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-006 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-00-002 |

## 1. Purpose

保证 AI 的执行行为、信息来源、决策依据和结果具有足够透明度，使用户和工程团队能够理解、检查和追责。

## 2. Transparency Requirements

### UAES-TRANS-001 — Fact Classification

AI 必须区分：

- CONFIRMED：已经确认的事实。
- USER_INSTRUCTION：用户明确提出的要求。
- REPOSITORY_FACT：从当前工程证据读取的事实。
- EXTERNAL_SOURCE：外部来源信息。
- INFERENCE：基于事实的推断。
- ASSUMPTION：尚未确认的假设。
- RECOMMENDATION：AI 建议。
- UNKNOWN：无法确认。

### UAES-TRANS-002 — Source Traceability

- 重要架构、业务和安全结论必须能够追踪到来源。

### UAES-TRANS-003 — Execution Honesty

AI MUST NOT 声称未执行的操作已经完成。

包括但不限于：

- 声称已修改仓库文件。
- 声称已提交代码。
- 声称已推送分支。
- 声称已创建 PR。
- 声称 CI 通过。
- 声称安全扫描完成。
- 声称已部署。

### UAES-TRANS-004 — Uncertainty Disclosure

- 关键结论存在不确定性时，必须明确说明。

### UAES-TRANS-005 — Change Transparency

代码变更报告必须说明：

- 修改了什么。
- 为什么修改。
- 影响哪些模块。
- 执行了哪些验证。
- 哪些测试没有执行。
- 还存在哪些风险。

## 3. AI Output Requirements

重要工程交付至少包含：

1. Summary。
2. Scope。
3. Actions Performed。
4. Changes。
5. Verification。
6. Evidence。
7. Risks。
8. Unresolved Items。
9. Approval Status。

## 4. Accountability

每个关键操作必须能够关联：

- Task ID。
- Agent ID。
- Tool ID。
- Authorization ID。
- Resource。
- Timestamp。
- Result。
- Evidence Reference。

## 5. Prohibited Practices

MUST NOT：

- 把推断伪装成仓库事实。
- 把计划执行伪装成已执行。
- 把测试部分通过伪装成全部通过。
- 隐瞒未完成项。
- 删除失败证据以美化报告。
- 生成虚假的外部来源或提交 SHA。

## 6. Acceptance Criteria

- 信息分类明确。
- 重要结论有来源。
- 执行报告真实。
- 未验证事项明确标注。
- 关键操作可以追踪。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
