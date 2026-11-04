# UAES-09 — Quality Engineering Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-09 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Domain | Quality Engineering |
| Owner | Uter Engineering Governance |
| Normative Language | MUST / MUST NOT / SHOULD / SHOULD NOT / MAY |

## 1. Purpose

建立统一、可追踪、可自动化执行的软件质量工程体系，确保每次需求实现、代码变更、缺陷修复和版本交付均具有充分的质量证据。

质量工程不是单纯执行测试命令，而是建立以下闭环：

```
需求与风险识别 → 质量计划 → 代码审查 → 测试设计 → 测试执行 → 缺陷处理 → 修复验证 → 回归测试 → 质量门禁 → 交付证据
```

边界：P06 定义代码应该如何编写，P09 定义如何证明代码满足质量要求；P10 负责安全控制，P11 负责 CI/CD 执行。P09 不重复定义这些领域的规范，而是通过质量门禁将它们连接起来。

## 2. Scope

本标准适用于：

- Go Backend 及全部独立 Go Modules。
- React / TypeScript Web 与 H5。
- Electron Main / Preload / Renderer。
- API、数据库、缓存、异步任务和第三方集成。
- 跨平台适配层及未来平台工程。
- AI Agent、Skills、Tools、MCP 和自动生成代码。
- CI 中执行的静态检查、自动化测试和质量门禁。
- AI 自动修复及其验证过程。

本标准不替代：

- P06：编码规范、代码组织和可维护性规范。
- P10：安全控制、安全基线和安全风险处置。
- P11：CI/CD、部署、发布和交付流程。
- P01：AI 权限、审批和风险授权。
- P08：Agent 身份、执行、编排和能力治理。

## 3. Quality Engineering Principles

### 3.1 Evidence over Assertion

- **QE-001 MUST**：所有质量结论必须有可核验的执行证据。
- **QE-002 MUST NOT**：仅凭 Agent 自述、代码已修改、测试文件已存在或命令已启动，就声明质量通过。
- **QE-003 MUST**：质量报告必须区分实际执行、未执行、执行失败、执行受阻和不适用。

### 3.2 Risk-Based Quality

- **QE-004 MUST**：测试深度应由业务影响、变更范围、系统复杂度和失败后果共同决定。
- **QE-005 MUST**：支付、充值、退款、余额、认证、授权、密钥、数据迁移和权限边界属于高风险测试对象。
- **QE-006 MUST**：高风险变更不得仅依赖单元测试作为验收依据。

### 3.3 Testability by Design

- **QE-007 MUST**：新增或修改的模块应具备可测试性，包括依赖隔离、可控时间、确定性输入、可观测输出和可清理测试数据。
- **QE-008 SHOULD**：优先通过依赖注入、接口隔离、测试替身和可控适配器建立测试边界。

### 3.4 Independent Verification

- **QE-009 MUST**：修复者不得仅凭自己的主观判断关闭缺陷。
- **QE-010 SHOULD**：高风险修复应由独立 Reviewer、独立 Agent 或自动化回归套件进行复核。

### 3.5 No False Green

- **QE-011 MUST**：NOT_RUN、BLOCKED、NOT_VERIFIED 不得转换为 PASS。
- **QE-012 MUST**：测试跳过、失败重试、测试隔离、阈值降低和基线更新必须留有原因及审计记录。

## 4. Quality Model

质量维度至少包括：

| 维度 | 评价内容 |
|---|---|
| Functional | 功能与业务规则正确性 |
| Reliability | 稳定性、容错、恢复能力 |
| Security | 安全缺陷与安全控制验证 |
| Performance | 延迟、吞吐、资源消耗 |
| Compatibility | API、浏览器、平台和版本兼容 |
| Accessibility | 键盘、语义、对比度和辅助技术 |
| Maintainability | 可理解性、复杂度、可维护性 |
| Data Integrity | 数据一致性、完整性、幂等性 |
| Usability | 用户交互和流程正确性 |

质量维度的定义不意味着所有维度都由 P09 独立拥有；各领域标准负责具体控制，P09 负责验证、证据和 Gate 汇总。

## 5. Quality Lifecycle

每项工程任务 MUST 按适用范围执行：

1. **Identify Change**：确定变更范围和基线 Commit SHA。
2. **Assess Risk**：关联 P02 需求风险、P04 架构影响和 P01 AI 风险。
3. **Define Verification**：确定 Review、测试类型、测试环境和通过条件。
4. **Review Change**：执行代码审查。
5. **Execute Tests**：执行所需测试。
6. **Manage Findings**：记录缺陷和审查发现。
7. **Repair and Re-verify**：修复后执行针对性回归。
8. **Run Quality Gate**：汇总质量结果。
9. **Publish Evidence**：形成可追溯报告。
10. **Accept or Block**：根据证据决定是否通过。

## 6. Mandatory Requirements

| ID | Requirement |
|---|---|
| QE-013 | 每项非文档类代码变更都必须关联 Task ID、基线 Commit SHA 和变更文件清单。 |
| QE-014 | 所有测试结果必须关联测试对象、测试版本、执行环境、命令或执行入口、开始与结束时间、结果和证据位置。 |
| QE-015 | 测试计划必须覆盖正常路径、边界条件、异常路径和权限边界。 |
| QE-016 | 涉及状态机的变更必须验证合法转换、非法转换、重复请求、并发转换和异常恢复。 |
| QE-017 | 涉及数据库变更的任务必须验证迁移前置条件、迁移结果、兼容性和回滚或恢复方案。 |
| QE-018 | 涉及 API 的任务必须验证请求、响应、错误语义、鉴权和兼容性。 |
| QE-019 | 关键业务流程必须有集成测试或端到端验证证据。 |
| QE-020 | 缺陷修复必须包含复现或根因证据、修复说明和回归验证。 |
| QE-021 | 质量门禁不得通过降低覆盖率阈值、跳过失败测试或隐藏 Finding 来获得虚假 PASS。 |
| QE-022 | 测试报告必须记录测试工具及其版本；无法确认版本时标记 UNKNOWN。 |

## 7. Quality Result Vocabulary

统一结果：

- **PASS**：所有适用的强制检查通过且证据完整。
- **FAIL**：至少一项强制检查失败。
- **BLOCKED**：因环境、权限、依赖或外部条件无法完成。
- **NOT_RUN**：尚未执行。
- **NOT_APPLICABLE**：经说明确认不适用。
- **NOT_VERIFIED**：有执行记录，但证据不足以证明结果。

整体 Gate 只有在所有强制检查 PASS 或经过批准的 NOT_APPLICABLE 时才能 PASS。BLOCKED、NOT_RUN、NOT_VERIFIED 均不能被视为通过。

## 8. Quality Severity

Finding 严重度：

- **Critical**：可能导致资金损失、重大数据破坏、权限全面绕过或核心服务不可用。
- **High**：核心业务流程失效、敏感数据暴露、重要安全边界失效。
- **Medium**：局部功能异常、重要边界条件错误或显著维护风险。
- **Low**：低影响缺陷或轻微行为偏差。
- **Informational**：建议、观察项或非阻断改进。

严重度描述影响；优先级描述处理顺序。两者不得混用。

## 9. Prohibited Practices

- **QE-023 MUST NOT**：伪造测试日志、覆盖率、扫描结果、CI 状态或人工审批。
- **QE-024 MUST NOT**：将测试失败通过无依据的 skip、exclude、弱化断言或扩大容忍范围掩盖。
- **QE-025 MUST NOT**：在没有证据的情况下将 Finding 标记为已修复或已关闭。
- **QE-026 MUST NOT**：将开发环境测试结果描述为生产环境验证结果。
- **QE-027 MUST NOT**：在测试中使用真实用户资金、真实支付配置或未经授权的生产数据。
- **QE-028 MUST NOT**：自动修改用户未提交的本地变更。

## 10. AI Execution Rules

- **QE-029 MUST**：AI 在执行质量任务前读取相关需求、架构、编码规范、质量标准和当前仓库状态。
- **QE-030 MUST**：AI 必须先确认工作区状态，不得覆盖用户未提交的修改。
- **QE-031 MUST**：AI 自动修复必须遵守 P01 权限和审批规则。
- **QE-032 MUST**：AI 修复后必须执行相关测试，并根据影响范围扩展回归测试。
- **QE-033 MUST**：AI 不得把「修复代码」当作「缺陷已关闭」。
- **QE-034 MUST**：AI 必须报告未解决问题、未执行检查、环境限制和残余风险。

## 11. Verification

质量工程本身必须通过：

- Schema Validation。
- Registry Consistency Validation。
- Gate Rule Validation。
- Test Result Integrity Validation。
- Negative Test Suite。
- AI Execution Simulation。
- Repository Integration Verification。

## 12. Acceptance Criteria

本标准只有在以下条件全部满足后才能从 DRAFT 升级：

1. P09 所有标准文件已建立并通过格式与元数据校验。
2. 所有 Schema 已由真实 Validator 执行校验。
3. Quality Gate 已实现并在 CI 中运行。
4. 四个 Go Modules 均纳入质量执行矩阵。
5. Web、Electron、API、数据库测试均有明确执行策略。
6. Finding、Defect、Test Result 和 Quality Report 可追踪。
7. Auto-Fix 具备修复前后验证闭环。
8. 负面测试通过。
9. AI 实战验收通过。
10. 正式批准完成。

## 13. Exceptions

例外必须遵守 P00 Exception Management 和 P01 权限治理。例外必须包含范围、理由、风险、补偿措施、Owner、有效期和到期处置。不得以长期豁免替代修复。

## 14. References

- ISTQB CTFL v4.0.1：测试原则、测试生命周期、静态测试、测试设计、测试管理。<https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf>
- Google Testing Blog：测试分层与测试金字塔实践。<https://testing.googleblog.com/2020/11/fixing-test-hourglass.html>
- OWASP Web Security Testing Guide：安全测试方法。<https://owasp.org/www-project-web-security-testing-guide/>
- W3C WCAG 2.2：可访问性验收参考。<https://www.w3.org/TR/WCAG22/>
- NIST SSDF：安全软件开发生命周期实践。<https://csrc.nist.gov/projects/ssdf>

## 15. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Quality Engineering Standard |
