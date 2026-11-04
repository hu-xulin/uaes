# UAES-11-014 — AI-Assisted Delivery and Automation

**Standard ID:** UAES-11-014
**Standard Name:** AI-Assisted Delivery and Automation
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

将 AI 自动化纳入可控交付流程。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-014-M001 | AI 执行前 MUST 检查 P01 授权。 |
| UAES-11-014-M002 | AI MUST 使用 P08 定义的隔离工作区机制。 |
| UAES-11-014-M003 | AI MUST 保护用户未提交修改。 |
| UAES-11-014-M004 | AI MUST 执行 P09 规定的验证。 |
| UAES-11-014-M005 | AI MUST 满足 P10 适用安全要求。 |
| UAES-11-014-M006 | AI Commit MUST 关联任务和验证证据。 |
| UAES-11-014-M007 | AI Push 和 Create PR MUST 分别授权或由明确授权覆盖。 |
| UAES-11-014-M008 | AI MUST NOT 自动 Merge PR。 |
| UAES-11-014-M009 | AI MUST NOT 自动执行生产部署。 |
| UAES-11-014-M010 | AI MUST NOT 修改生产数据库或真实支付配置。 |
| UAES-11-014-M011 | AI MUST 报告未执行、失败和未验证项目。 |
| UAES-11-014-M012 | AI 不得通过关闭测试、降低门禁或删除证据制造 PASS。 |

## 3. Verification

Permission Boundary Test、Workspace Preservation Test、PR Evidence Test、Unauthorized Merge / Deploy Negative Test。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
