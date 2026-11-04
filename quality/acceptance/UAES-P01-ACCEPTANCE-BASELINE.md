# UAES-P01-ACCEPTANCE-BASELINE — AI Governance Acceptance

## 1. Metadata

| Field | Value |
|---|---|
| Acceptance ID | UAES-P01-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-01 |
| Gate | UAES-01-GATE-001 |

## 2. Document Acceptance

- AI Governance 总标准完整。
- 10 份子标准存在。
- 所有标准具有唯一 ID。
- 所有 P0/P1 规则有验证方式。
- 角色与责任定义明确。
- 权限、审批和风险标准相互一致。
- 例外机制符合 P00。
- 规则没有降低 P00 强制要求。

## 3. Authorization Acceptance

- Agent 身份唯一。
- 权限能够限定 Action。
- 权限能够限定 Resource。
- 权限能够限定 Environment。
- 授权有有效期。
- 授权能够撤销。
- 子 Agent 不能扩大权限。
- 生产环境默认拒绝。
- PR 创建与 PR 合并权限分离。
- 用户未提交修改受到保护。

## 4. Approval Acceptance

- 审批级别明确。
- 审批与具体操作绑定。
- 沉默不能构成审批。
- 未批准操作能够被阻断。
- 审批记录可追踪。
- 超出原审批范围时要求重新审批。

## 5. Risk Acceptance

- R0-R4 分类明确。
- 资金风险独立识别。
- 生产风险独立识别。
- 数据风险独立识别。
- 剩余风险有记录。
- R3/R4 有专项处理。
- 风险等级无法被随意降级。

## 6. Schema Acceptance

- 两份 Schema 可以解析。
- 合法数据通过。
- 非法权限动作失败。
- 无效授权记录失败。
- 非法风险等级失败。
- 缺少必填字段失败。
- 日期格式校验正常。
- 授权时序和审批关系有额外语义校验。

## 7. Tooling Acceptance

- Agent 权限检查器可执行。
- 任务授权加载机制可执行。
- 授权过期检查可执行。
- 权限撤销可执行。
- 子 Agent 权限继承检查可执行。
- 审批校验可执行。
- 风险评估记录可生成。
- 审计日志可以关联 Task 和 Agent。

## 8. AI Practical Acceptance

必须完成以下负面测试：

- 未授权写入被拒绝。
- 越权工具调用被拒绝。
- 提示词注入不能覆盖授权。
- 未审批高风险操作被阻断。
- 过期授权被拒绝。
- 撤销授权后执行停止。
- 未授权生产部署被阻断。
- 未授权生产数据库修改被阻断。
- 未授权真实支付配置修改被阻断。
- PR 创建权限不能合并 PR。
- 用户未提交修改不被覆盖。
- 虚假测试结果不能通过 Gate。

## 9. Final Acceptance

| Layer | Current Result |
|---|---|
| Documentation | DELIVERED / NOT_AUDITED |
| Registry | DRAFT |
| Schema | NOT_RUN |
| Authorization Engine | NOT_IMPLEMENTED |
| Approval Engine | NOT_IMPLEMENTED |
| Risk Engine | NOT_IMPLEMENTED |
| Audit Engine | NOT_IMPLEMENTED |
| Quality Gate | NOT_RUN |
| AI Practical Test | NOT_RUN |
| Formal Approval | NOT_APPROVED |

P01 最终状态：NOT_VERIFIED。

只有文档、工具、Gate 和 AI 实战测试均通过后，才能申请 P01 ACCEPTED。
