# UAES-09-006 — End-to-End and UI Testing

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-006 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-02, UAES-07 |

## 1. Purpose

通过接近真实用户的操作路径验证系统跨页面、跨服务和跨模块的完整业务行为。

## 2. Scope

- Web PC。
- H5。
- Electron。
- 核心 API。
- 用户登录与账户流程。
- 模型调用与任务流程。
- 支付后充值到账流程（仅测试环境）。
- 关键管理后台操作。

## 3. E2E Principles

- **QE-E2E-001 MUST**：E2E 测试必须围绕用户旅程和业务验收条件设计。
- **QE-E2E-002 MUST**：优先覆盖关键业务旅程，不得追求无差别地覆盖所有页面细节。
- **QE-E2E-003 MUST**：测试必须隔离账号、数据和环境。
- **QE-E2E-004 MUST**：关键流程必须验证最终业务结果，而不只是页面按钮点击成功。
- **QE-E2E-005 MUST**：测试应尽量避免依赖固定屏幕坐标和脆弱的 DOM 层级选择器。
- **QE-E2E-006 SHOULD**：优先使用可访问名称、角色和稳定测试标识定位控件。
- **QE-E2E-007 MUST**：失败报告必须保留必要的截图、日志、Trace 或其他诊断证据。

## 4. E2E Scenario Design

每个场景至少定义：

- Scenario ID。
- 业务目标。
- 前置条件。
- 测试账号或数据。
- 操作步骤。
- 预期 UI 行为。
- 预期 API / 数据行为。
- 清理步骤。
- 失败诊断方式。

## 5. Uter Critical User Journeys

应根据仓库实际功能确认并建立测试：

- 登录、退出和会话恢复。
- 用户账户与个人设置。
- API Key 创建、查看、撤销。
- 模型列表与模型调用。
- Token 使用量与余额变化。
- 充值订单创建和支付结果处理。
- 管理后台关键配置。
- 任务创建、执行、失败和重试。
- Electron 启动、登录和关键桌面交互。

未在产品中实现的功能应标记为 NOT_APPLICABLE 或 FUTURE_SCOPE，不得声称已验证。

## 6. Browser and Platform Matrix

每项 E2E 测试必须声明浏览器或运行环境。

浏览器矩阵由 P07 定义，P09 负责执行和报告验证结果。

对于 H5，必须覆盖实际支持的视口和触控行为；不得以 PC 浏览器缩窄窗口完全替代真实移动端验证。

Electron E2E 应覆盖应用启动、窗口生命周期、IPC 交互和必要的系统集成。

## 7. Test Stability

- 测试必须使用明确等待条件。
- 不得滥用固定 Sleep。
- 测试数据不得跨场景污染。
- 网络依赖必须可控。
- 失败时必须区分产品缺陷、测试脚本缺陷和环境问题。
- 重试不能掩盖第一次失败；所有重试记录必须保留。

## 8. AI Execution Rules

AI MUST：

- 根据需求和业务旅程设计 E2E。
- 不得只以页面渲染成功作为验收。
- 不得通过跳过关键断言使测试变绿。
- 不得将测试环境结果描述为生产支付成功。
- 失败时保留诊断证据。

## 9. Verification

检查关键旅程覆盖、测试数据隔离、真实业务结果断言、环境矩阵、失败证据和稳定性。

## 10. Acceptance Criteria

- 关键业务旅程有 E2E 或等效完整流程验证。
- 关键场景验证最终业务状态。
- 浏览器和运行环境有记录。
- 失败能够定位。
- 测试不依赖真实用户数据和生产资金。

## 11. References

ISTQB CTFL v4.0.1；UAES-02 产品验收标准；UAES-07 跨平台兼容标准。

## 12. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial End-to-End and UI Testing Standard |
