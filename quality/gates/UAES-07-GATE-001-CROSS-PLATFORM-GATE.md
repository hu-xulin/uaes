# UAES-07-GATE-001 — Cross-Platform Quality Gate

| Field | Value |
|---|---|
| Gate ID | UAES-07-GATE-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Owner | Cross-Platform Engineering Owner |

## 1. Purpose

确保多平台实现符合平台支持范围、架构隔离、能力适配和兼容性要求。

## 2. Gate Levels

- G0：Platform Scope and Manifest
- G1：Shared Core and Adapter Boundary
- G2：Platform Application Architecture
- G3：Navigation and Responsive UI
- G4：Device Capability and Permission
- G5：Offline and Persistence
- G6：Compatibility and Accessibility
- G7：Build and Packaging
- G8：AI Execution Evidence

## 3. Mandatory Checks

| ID | 检查项 | 级别 | 通过条件 |
|---|---|---|---|
| CP-001 | Platform Manifest | BLOCKER | 目标平台已登记 |
| CP-002 | Support Status | BLOCKER | 支持状态真实准确 |
| CP-003 | Minimum Version | BLOCKER | 最低版本明确 |
| CP-004 | Capability Matrix | BLOCKER | 必需能力有定义 |
| CP-005 | Shared Core Boundary | BLOCKER | 不依赖平台专属 API |
| CP-006 | Adapter Contract | BLOCKER | 平台适配符合契约 |
| CP-007 | Platform Bootstrap | MAJOR | 入口和装配明确 |
| CP-008 | Lifecycle | BLOCKER | 生命周期处理完整 |
| CP-009 | Navigation | BLOCKER | 路由和返回行为正确 |
| CP-010 | Deep Link | BLOCKER | 外部入口受控 |
| CP-011 | Responsive Layout | BLOCKER | 目标视口可用 |
| CP-012 | Safe Area | BLOCKER | 关键内容不被系统区域遮挡 |
| CP-013 | Input Adaptation | BLOCKER | 核心任务可完成 |
| CP-014 | Accessibility | BLOCKER | 满足 P05/P07 适用要求 |
| CP-015 | Capability Detection | BLOCKER | 能力检测有效 |
| CP-016 | Permission Handling | BLOCKER | 授权、拒绝和撤销可处理 |
| CP-017 | Fallback | BLOCKER | 缺失能力有降级策略 |
| CP-018 | Offline Boundary | BLOCKER | 离线行为和权威数据明确 |
| CP-019 | Account Isolation | BLOCKER | 账户缓存隔离 |
| CP-020 | Compatibility Matrix | BLOCKER | 设备和版本范围明确 |
| CP-021 | Shared Contract Test | BLOCKER | 共享契约验证通过 |
| CP-022 | Platform Regression | BLOCKER | 受影响平台回归完成 |
| CP-023 | Build Reproducibility | BLOCKER | 构建输入可重复 |
| CP-024 | Artifact Integrity | BLOCKER | 构建产物完整性可验证 |
| CP-025 | Platform Evidence | BLOCKER | 环境和 Commit 可追踪 |
| CP-026 | AI Platform Report | BLOCKER | 未验证平台明确标识 |

## 4. Uter Project-specific Checks

### Current Platforms

PC Web：

- 检查现有 React 工程的运行和构建。
- 检查 TanStack Router、Query 和状态管理边界。
- 检查 PC 与移动视口的布局差异。

Electron：

- 检查 Main / Preload / Renderer 边界。
- 检查桌面窗口尺寸、缩放、系统能力和生命周期。
- 检查 IPC 与 Web 共享代码的边界。

H5：

- 建立独立的移动浏览器兼容性验证。
- 检查安全区域、软键盘、浏览器返回和触控。
- 不得以 PC Web 构建成功作为 H5 验收结果。

### Planned Native Platforms

Android、iOS、HarmonyOS：

- 必须先完成平台工程、技术栈、工具链和 Adapter Contract 评审。
- 必须明确原生工程是否真实存在。
- 必须分别验证平台构建、权限、生命周期和设备能力。
- 未完成平台工程时标记 PLANNED，不执行虚假验收。

## 5. Gate Results

- PASS：所有 BLOCKER 检查通过。
- FAIL：存在已确认阻断问题。
- BLOCKED：缺少必要环境、设备、权限或依赖。
- NOT_RUN：未执行。
- NOT_APPLICABLE：有证据证明不适用。

MAJOR 问题必须登记并处理；是否允许带风险通过，依照 P01 授权和 P00 例外机制执行，不得静默豁免。

## 6. Prohibited Practices

- 不得将单平台 PASS 报告为全平台 PASS。
- 不得将模拟器验证报告为真实设备验证。
- 不得将 PLANNED 平台报告为 SUPPORTED。
- 不得删除失败平台的证据。
- 不得将 NOT_VERIFIED 报告为 PASS。
- 不得通过关闭兼容性检查使 Gate 假通过。

## 7. Acceptance

Gate 必须具备：

- Platform Manifest Validator。
- Capability Validator。
- Adapter Contract Validator。
- Compatibility Evidence Validator。
- 设备和浏览器测试矩阵。
- 机器可读结果报告。
- CI 集成。

## 8. References

UAES-04、UAES-05、UAES-06、UAES-09、UAES-10、UAES-11。
