# UAES-11-GATE-001 — DevOps & Delivery Quality Gate

**Gate ID:** UAES-11-GATE-001
**Version:** 1.0.0
**Status:** DRAFT
**Scope:** Git / CI / Build / Artifact / Release / Deployment / Migration / AI Delivery

---

## 1. Gate Decision

允许的结果：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
- NOT_VERIFIED

NOT_RUN、NOT_VERIFIED、BLOCKED 不得转换为 PASS。

## 2. Gate Categories

### A. Git and Branch Governance

- A01 默认分支存在保护规则。
- A02 关键分支禁止未经授权的直接 Push。
- A03 必需审查规则已配置。
- A04 必需 CI 检查已配置。
- A05 Force Push 权限受到限制。
- A06 发布 Tag 可追溯到唯一 Commit。

### B. Workspace and AI Isolation

- B01 AI 任务使用隔离工作区。
- B02 执行前记录 Git 初始状态。
- B03 用户未提交修改得到保护。
- B04 并行任务写入冲突受到控制。
- B05 Worktree 清理不会丢失未保存数据。

### C. Commit and PR

- C01 Commit Message 符合约定。
- C02 变更关联 Task / Requirement。
- C03 PR 描述完整。
- C04 PR 有变更文件清单。
- C05 PR 有测试证据。
- C06 PR 有风险与回滚说明。
- C07 Review Findings 均有处理状态。
- C08 变更后的检查已重新执行。

### D. CI Pipeline Security

- D01 Workflow 使用最小权限。
- D02 第三方 Action 使用固定版本，优先完整 SHA。
- D03 不可信 PR 不获得生产 Secret。
- D04 Job 依赖关系明确。
- D05 关键检查失败会阻断发布。
- D06 Workflow 变更经过审查。
- D07 CI 结果绑定 Source SHA。
- D08 并发运行不会污染或覆盖制品。

### E. Build Matrix

- E01 根 Go Module 独立验证。
- E02 relaykit Go Module 独立验证。
- E03 tokenkit Go Module 独立验证。
- E04 tokenkit/tokenkit Go Module 独立验证。
- E05 Web 冻结依赖安装通过。
- E06 Web Typecheck / Lint / Test / Build 通过。
- E07 Electron Main / Preload / Renderer 构建通过。
- E08 Electron IPC 和凭证相关检查通过。
- E09 构建使用固定工具链和锁文件。

### F. Artifact Integrity and Provenance

- F01 正式制品有唯一标识。
- F02 正式制品有 SHA-256 或更强 Digest。
- F03 下载后验证 Digest。
- F04 Release 关联源 Commit。
- F05 Provenance 可验证或明确记录未提供的限制。
- F06 SBOM 引用 P10 规定的资产。
- F07 不允许无审计覆盖正式制品。
- F08 不同环境晋级使用同一制品 Digest。

### G. Environment and Secrets

- G01 环境明确区分。
- G02 生产与非生产环境隔离。
- G03 配置有 Schema 或类型约束。
- G04 Secret 不在源码和日志中。
- G05 Secret 不进入普通构建制品。
- G06 CI 凭证采用最小权限。
- G07 Secret 轮换和泄漏响应有流程。
- G08 生产配置变更受到审批。

### H. Release and Versioning

- H01 Release Version 唯一。
- H02 版本变更符合兼容性规则。
- H03 Release Notes 完整。
- H04 Release 关联源 Commit。
- H05 Release 关联 Artifact Digest。
- H06 质量门禁通过。
- H07 安全门禁通过。
- H08 必要发布审批完成。

### I. Deployment Authorization

- I01 部署绑定 Release ID。
- I02 部署绑定 Artifact Digest。
- I03 目标环境明确。
- I04 审批绑定制品和环境。
- I05 生产部署具有独立审批。
- I06 未授权部署请求被拒绝。
- I07 部署身份最小权限。
- I08 部署结果有完整记录。

### J. Database Migration

- J01 Migration ID 唯一。
- J02 Schema 版本明确。
- J03 迁移兼容性经过检查。
- J04 锁和停机风险经过评估。
- J05 备份策略符合风险要求。
- J06 重复执行受到保护。
- J07 迁移后数据校验通过。
- J08 恢复或前向修复方案有效。

### K. Post-Deployment Verification

- K01 服务健康检查通过。
- K02 核心接口 Smoke Test 通过。
- K03 核心业务路径验证通过。
- K04 错误率和延迟指标可观察。
- K05 关键告警配置有效。
- K06 部署异常有停止晋级机制。
- K07 发布版本与运行实例可关联。

### L. AI Delivery Permission

- L01 AI 执行前检查 P01 授权。
- L02 AI 使用隔离工作区。
- L03 AI 不覆盖用户未提交修改。
- L04 AI 执行 P09 所需验证。
- L05 AI 满足 P10 适用安全要求。
- L06 AI Commit 关联任务和证据。
- L07 AI Push 和 PR 操作有授权。
- L08 AI 未执行未经授权的 Merge。
- L09 AI 未执行未经授权的生产部署。
- L10 AI 未修改生产数据库和真实支付配置。

### M. Delivery Audit

- M01 Delivery Evidence 完整。
- M02 Evidence 关联 Source SHA。
- M03 Evidence 关联 CI Run。
- M04 Evidence 关联质量与安全门禁。
- M05 Evidence 关联 Artifact Digest。
- M06 发布和部署审批可追溯。
- M07 失败、重试和回滚有记录。
- M08 审计记录能够重建交付过程。

## 3. Blocking Rules

以下任一情况必须阻断：

1. 未授权生产部署。
2. 未授权生产数据库变更。
3. 用户未提交修改遭到覆盖。
4. 关键质量门禁失败。
5. 关键安全门禁失败。
6. 制品 Digest 不匹配。
7. Release 与源 Commit 无法建立可信关联。
8. 生产审批缺失或审批对象不匹配。
9. 关键迁移没有适用的恢复方案。
10. AI 超出授权范围执行写操作。
11. 交付证据被篡改或无法验证。

## 4. Gate Report

报告至少包含：

- Gate ID
- Repository
- Source SHA
- Pipeline Run ID
- Release ID（适用时）
- Environment（适用时）
- Category Results
- Failed Rules
- Blocked Rules
- Evidence References
- Exceptions
- Final Decision
- Timestamp

## 5. Pass Criteria

所有 MUST 规则均通过，适用的 P09 和 P10 门禁均通过，跨对象 Validator 无阻断错误，证据完整，才可判定 PASS。

例外必须通过 P00 正式批准，并记录补偿控制；不能以口头说明替代。

## 6. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial DevOps & Delivery Gate |
