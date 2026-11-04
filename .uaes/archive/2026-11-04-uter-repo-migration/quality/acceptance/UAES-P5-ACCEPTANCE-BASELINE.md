# UAES P5 — Cross-Platform Acceptance Baseline

**Acceptance ID:** UAES-P5-ACCEPTANCE-BASELINE  
**Version:** 1.0.0  
**Status:** DRAFT  
**Target:** UAES P5 Cross-Platform Engineering  
**Phase:** P5  
**Gate:** UAES-07-GATE-001

---

## 1. Acceptance Principles

P5 验收分为三个层次：

1. **Document Acceptance**：规范文档是否完整。
2. **Tooling Acceptance**：Schema、扫描器和 Quality Gate 是否可以执行。
3. **Engineering Acceptance**：是否通过真实仓库和平台工程验证。

文档完成不等于工具完成；工具完成不等于真实平台已经支持。

## 2. Document Acceptance

| ID | Acceptance Item | Expected Result |
|---|---|---|
| P5-D01 | 主标准 | UAES-07 完整 |
| P5-D02 | 原则标准 | UAES-07-001 完整 |
| P5-D03 | 能力矩阵 | UAES-07-002 完整 |
| P5-D04 | 共享边界 | UAES-07-003 完整 |
| P5-D05 | Web/H5 | UAES-07-004 完整 |
| P5-D06 | React Native | UAES-07-005 完整 |
| P5-D07 | Android/iOS | UAES-07-006 完整 |
| P5-D08 | HarmonyOS | UAES-07-007 完整 |
| P5-D09 | 生命周期和权限 | UAES-07-008 完整 |
| P5-D10 | 兼容性与发布 | UAES-07-009 完整 |
| P5-D11 | 跨平台测试 | UAES-07-010 完整 |
| P5-D12 | Quality Gate | UAES-07-GATE-001 完整 |
| P5-D13 | 验收基准 | 本文档完整 |
| P5-D14 | Schema | 三份 Schema 完整 |
| P5-D15 | Registry | 注册表和依赖关系完整 |

## 3. Tooling Acceptance

| ID | Tooling Item | Pass Criteria |
|---|---|---|
| P5-T01 | Platform Manifest Schema | 可通过 JSON Schema 校验 |
| P5-T02 | Capability Schema | 可通过 JSON Schema 校验 |
| P5-T03 | Compatibility Schema | 可通过 JSON Schema 校验 |
| P5-T04 | Platform Registry | 能识别所有平台状态 |
| P5-T05 | Dependency Boundary | 能识别非法跨平台依赖 |
| P5-T06 | Build Matrix | 能执行各已支持平台构建 |
| P5-T07 | Test Matrix | 能汇总平台测试结果 |
| P5-T08 | Gate Runner | 能输出 PASS / FAIL / BLOCKED |
| P5-T09 | Evidence Report | 能追踪 Commit SHA 和测试证据 |

## 4. Engineering Acceptance

### 4.1 Existing Platform Audit

必须盘点：

- PC Web
- H5
- Electron
- Android
- iOS
- HarmonyOS

每个平台必须记录：

- 当前状态
- 工程目录
- 技术栈
- 构建工具
- 最低支持版本
- 依赖
- 测试能力
- 发布能力
- 风险和缺口

### 4.2 Cross-Platform Architecture

验证：

- 共享逻辑与平台 UI 是否隔离。
- API Contract 是否统一。
- 业务状态机是否统一。
- 平台适配层是否明确。
- 是否存在非法跨平台依赖。

### 4.3 Critical User Journey

至少选择以下业务旅程进行跨平台验证：

1. 登录和会话恢复。
2. 用户资料读取和更新。
3. Token 或用量信息读取。
4. 核心 AI 请求提交。
5. 请求超时和网络恢复。
6. 账户余额和用量状态同步。
7. 退出登录和敏感状态清理。

如果目标平台尚未实现，标记 NOT_IMPLEMENTED，不得伪造测试结果。

### 4.4 Device and Lifecycle

至少验证：

- 前后台切换
- 进程终止和恢复
- 网络断开和恢复
- 窗口尺寸变化
- 屏幕方向变化
- 权限拒绝和撤销
- 重复提交和重复回调

### 4.5 Release Verification

验证：

- 平台独立构建
- 环境配置隔离
- 签名与密钥管理
- 版本号管理
- 构建产物追溯
- 回滚策略

## 5. Acceptance Status

每项结果只能为：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
- NOT_VERIFIED
- NOT_IMPLEMENTED

## 6. Final Acceptance

P5 正式验收要求：

- 所有 P0 文档验收项 PASS。
- 所有必需 Schema 校验 PASS。
- Quality Gate 能正确识别阻断问题。
- 现有仓库平台盘点完成。
- 已支持平台有真实构建和测试证据。
- 规划平台明确标记 NOT_IMPLEMENTED 或 PLANNED。
- 所有 P0/P1 风险得到处理。
- 所有例外具有正式记录。

## 7. Acceptance Report

最终报告必须包含：

- UAES Version
- P5 Version
- Commit SHA
- Standards Reviewed
- Schema Validation
- Platform Inventory
- Build Matrix
- Test Matrix
- Gate Results
- Open Findings
- Accepted Risks
- Final Decision
- Approver
- Acceptance Date

## 8. Current Status

当前文档交付状态为 DRAFT。

尚未代表：

- 文档已经写入 Uter 仓库。
- JSON Schema 已实际运行验证。
- CI 已集成 P5 Gate。
- Android、iOS、HarmonyOS 已经实现。
- 所有平台已经通过真实设备测试。

以上事项必须在工程实施阶段单独验证。

## Appendix A — Uter Existing Engineering Facts at P5 Inception

这里必须区分「标准要求」和「现有工程事实」。下表为 P5 启动时掌握的初始事实，不能直接作为正式支持声明，还需要通过实际仓库目录、构建配置、依赖、CI 和设备测试核验。

| 平台 | 当前掌握的工程事实 | P5 初始状态建议 |
|---|---|---|
| PC Web | React 19 / TypeScript 工程 | EXISTING — 待审计 |
| H5 | 可评估现有 Web 响应式能力 | NOT_VERIFIED |
| Electron | 仓库存在 Electron 工程 | EXISTING — 待审计 |
| Android | 未发现原生工程目录 | NOT_IMPLEMENTED |
| iOS | 未发现原生工程目录 | NOT_IMPLEMENTED |
| HarmonyOS | 未发现原生工程目录 | NOT_IMPLEMENTED |

需要特别注意的五个落地问题：

1. **Web 与 H5 是否共用同一套应用入口**：可以共享业务层，但应分别验证路由、视口、触控、键盘、安全区、Cookie 和 WebView 环境。
2. **Electron 是否真正隔离主进程和渲染进程**：不能让普通前端组件直接访问 Node.js 或任意系统能力。
3. **未来是否采用 React Native**：应先做技术决策和成本评估，不应因为现有前端使用 React 就直接认定 RN 是最佳选择。
4. **HarmonyOS 是否独立建设**：必须按 ArkTS、ArkUI、目标 SDK 和实际设备能力建立独立验证链路，不能把 Android 支持状态直接映射到 HarmonyOS。
5. **支付、认证、余额和 Token 用量**：所有平台都必须以服务端权威状态为准。跨平台客户端只能发起请求和展示结果，不得自行决定支付到账或账户余额。
