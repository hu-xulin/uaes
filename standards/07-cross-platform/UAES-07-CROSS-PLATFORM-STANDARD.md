# UAES-07 — Cross-Platform Engineering Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-07 |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | Cross-Platform Engineering |
| Owner | Cross-Platform Engineering Owner |
| Dependencies | UAES-00, UAES-01, UAES-02, UAES-03, UAES-04, UAES-05, UAES-06 |
| Related domains | UAES-08, UAES-09, UAES-10, UAES-11, UAES-12 |

## 1. Purpose

建立跨平台应用的统一工程模型，确保核心业务一致、平台适配明确、体验符合平台特征，并使平台扩展具备可控性和可验证性。

## 2. Scope

适用于：

- PC Web
- H5
- Electron
- Android
- iOS
- HarmonyOS
- 共享业务模块、API Client、平台适配器、构建和发布产物

## 3. Definitions

- Platform：运行应用的操作系统、浏览器或应用容器。
- Shared Core：不依赖特定平台的共享业务能力。
- Platform Adapter：平台专属能力的适配实现。
- Platform Contract：共享核心与平台适配器之间的接口约定。
- Capability：平台提供的功能能力。
- Adaptive UI：根据可用空间、输入方式和设备能力调整的界面。
- Compatibility Matrix：支持平台、版本和能力的矩阵。
- Feature Parity：平台之间经过定义的功能一致性目标。

## 4. Core Principles

1. Business Consistency：核心业务规则一致。
2. Platform Isolation：平台差异封装在适配层。
3. Progressive Capability：按能力而非设备名称判断功能支持。
4. Experience Adaptation：尊重平台交互习惯。
5. Contract First：共享模块与适配模块通过契约协作。
6. Explicit Compatibility：平台支持范围必须明确。
7. Graceful Degradation：不支持某项能力时提供安全降级。
8. Independent Delivery：允许平台独立构建和发布。
9. Evidence-based Compatibility：兼容性结论必须有验证证据。

## 5. Mandatory Requirements

- UAES-07 MUST 为每个目标平台建立 Platform Manifest。
- UAES-07 MUST 明确平台支持状态：SUPPORTED、PLANNED、EXPERIMENTAL、DEPRECATED、UNSUPPORTED。
- UAES-07 MUST 区分共享业务逻辑与平台实现。
- UAES-07 MUST 为平台专属能力定义 Adapter Contract。
- UAES-07 MUST 明确平台能力缺失时的行为。
- UAES-07 MUST 对平台间业务状态和接口语义保持一致。
- UAES-07 MUST 为每个平台定义导航、输入、布局和生命周期策略。
- UAES-07 MUST 明确浏览器、操作系统和设备支持范围。
- UAES-07 MUST 对平台差异执行兼容性和回归验证。
- UAES-07 MUST 对新增平台执行架构和成本评估。
- UAES-07 MUST 避免共享模块直接依赖平台专属 API。
- UAES-07 MUST 保留平台构建和适配证据。

## 6. Implementation Rules

跨平台实现分为：

- Domain Core：业务规则、状态机和领域模型。
- Application Core：应用服务、用例和业务流程。
- Shared Infrastructure：API Client、序列化、通用存储抽象。
- Platform Adapter：浏览器、桌面、移动和系统能力。
- Platform UI：平台特定交互和呈现。
- Platform Bootstrap：入口、生命周期和配置。

共享程度必须根据业务稳定性、平台差异和维护成本确定，不以代码复用率作为唯一指标。

## 7. Prohibited Practices

- MUST NOT 将平台判断散落在全部业务代码中。
- MUST NOT 假设所有平台都具备相同系统能力。
- MUST NOT 为追求代码共享而牺牲平台体验。
- MUST NOT 把尚未实施的平台标记为 SUPPORTED。
- MUST NOT 通过 User-Agent 单一判断授权或关键能力。
- MUST NOT 让平台 Adapter 擅自改变业务规则。
- MUST NOT 将一个平台的测试结果作为其他平台的兼容性证据。

## 8. AI Execution Rules

AI 必须：

1. 确认目标平台和支持版本。
2. 加载 Platform Manifest 和 Capability Matrix。
3. 识别共享代码和平台专属代码。
4. 优先使用已定义的 Adapter Contract。
5. 对缺失能力设计降级或阻断行为。
6. 分别验证目标平台。
7. 报告未验证的平台和设备。
8. 不得虚构原生工程、设备测试或商店发布结果。

## 9. Verification

由 UAES-07-GATE-001 定义跨平台一致性、适配边界、兼容性、构建和设备验证要求。

## 10. Acceptance Criteria

- 平台矩阵完整。
- Shared Core 和 Adapter 边界明确。
- 平台能力契约可验证。
- 目标平台导航、输入、布局和生命周期有定义。
- 兼容性范围明确。
- 平台构建可重复。
- 关键平台差异有验证证据。
- AI 能正确识别未支持平台。

## 11. Exceptions

例外必须依据 UAES-00-005 登记，明确平台、功能、风险、Owner、期限和替代方案。

## 12. References

UAES-00 至 UAES-06、UAES-09、UAES-10、UAES-11；各平台官方开发文档。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial enterprise standard |
