# UAES-07 — Cross-Platform Engineering Standard

**Standard ID:** UAES-07  
**Standard Name:** Cross-Platform Engineering Standard  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** Cross-Platform Engineering  
**Phase:** P5  
**Priority:** P0  
**Applies to:** PC Web / H5 / Electron / Android / iOS / HarmonyOS  
**Owner:** UTER Engineering Governance  
**Related Domains:** UAES-02 / UAES-04 / UAES-05 / UAES-06 / UAES-08 / UAES-09 / UAES-10 / UAES-11  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立统一、可执行、可验证的跨平台工程体系，确保 Uter 在不同设备、操作系统、运行容器和交互环境中具有一致的核心业务行为、可靠的数据处理能力、合理的平台体验和可持续维护的工程结构。

本标准解决以下问题：

1. 多平台代码如何划分与复用。
2. 哪些业务逻辑必须统一，哪些平台实现允许不同。
3. Web、H5、Electron、Android、iOS、HarmonyOS 如何管理差异。
4. 设备能力、系统权限、生命周期和离线状态如何处理。
5. 多平台 API、认证、支付、存储和状态如何保持一致。
6. 如何验证跨平台功能、视觉、性能、安全和兼容性。
7. AI 如何识别平台目标并生成正确的实现，而不是把一种平台的代码错误地迁移到另一种平台。

## 2. Scope

本标准覆盖：

- 平台识别与平台能力管理
- 跨平台架构与代码复用
- 共享领域逻辑和平台适配层
- PC Web 与 H5
- Electron 桌面容器
- React Native
- Android / iOS 原生集成
- HarmonyOS 原生工程
- 设备能力、权限、生命周期
- 网络、存储、通知、文件和深度链接
- 平台兼容性、构建、签名和发布
- 跨平台测试和质量门禁

本标准不替代：

- UAES-04 系统架构规范
- UAES-05 体验与设计规范
- UAES-06 软件工程规范
- UAES-09 质量工程规范
- UAES-10 安全与可靠性规范
- UAES-11 DevOps 与交付规范

## 3. Normative Language

- **MUST**：强制要求。
- **MUST NOT**：绝对禁止。
- **SHOULD**：原则上应当执行，例外必须说明理由。
- **SHOULD NOT**：原则上不应执行，例外必须说明理由。
- **MAY**：允许采用。

## 4. Core Principles

### 4.1 Business Consistency, Platform Adaptation

核心业务规则必须保持一致；交互方式、导航、系统集成、布局和平台能力可以按平台调整。

### 4.2 Share by Responsibility, Not by Percentage

不得以代码复用率作为唯一架构目标。共享代码必须具有清晰职责、稳定接口和可独立测试能力。

### 4.3 Platform First

实现必须尊重目标平台的生命周期、权限模型、系统交互规范和技术限制。

### 4.4 Explicit Capability

平台能力必须显式声明、检测和处理。不得假设某设备必然支持某项能力。

### 4.5 Contract First

跨平台 API、数据模型、错误码、认证方式和业务状态必须遵循统一契约。

### 4.6 Graceful Degradation

能力缺失、权限拒绝、网络异常、系统限制和低性能设备必须有明确降级方案。

### 4.7 Independently Verifiable

每个平台必须能够独立构建、运行、测试和验收。共享模块也必须有独立测试。

### 4.8 No False Compatibility

不得仅凭编译成功或页面可打开，就宣称平台兼容。

## 5. Mandatory Requirements

| Rule ID | Name | Requirement |
|---|---|---|
| UAES-07-001 | Platform Declaration | 每个应用、模块和交付任务 MUST 明确目标平台、最低支持版本、运行环境、设备形态和目标能力。 |
| UAES-07-002 | Platform Capability | 所有平台相关能力 MUST 通过能力清单和适配接口管理。 |
| UAES-07-003 | Shared Logic Boundary | 共享领域逻辑 MUST 与平台 UI、系统 API 和运行时实现隔离。 |
| UAES-07-004 | Platform-Specific Implementation | 平台差异 MUST 通过明确的 Adapter、Provider、Driver 或平台专属模块实现。 |
| UAES-07-005 | API Consistency | 跨平台请求 MUST 使用统一 API Contract、认证规则、错误模型和数据结构。 |
| UAES-07-006 | State Persistence | 重要业务状态 MUST 不依赖单一页面、Activity、View 或进程的生命周期。 |
| UAES-07-007 | Permission Governance | 权限请求 MUST 遵循最小权限、按需申请、用途说明、拒绝处理和撤销处理。 |
| UAES-07-008 | Lifecycle Safety | 应用切后台、进程终止、设备旋转、窗口调整、网络切换和恢复 MUST 不导致业务状态错误。 |
| UAES-07-009 | Responsive and Adaptive UI | Web 和原生界面 MUST 根据窗口尺寸、输入方式、设备形态和系统环境进行适配。 |
| UAES-07-010 | Compatibility Verification | 每个平台 MUST 有明确的兼容性矩阵和可复现的验证记录。 |
| UAES-07-011 | Independent Build | 每个平台 MUST 有独立、可重复的构建流程。 |
| UAES-07-012 | Release Isolation | 不同平台的签名、证书、应用标识、发布渠道和环境配置 MUST 独立管理。 |
| UAES-07-013 | Cross-Platform Testing | 共享业务流程 MUST 至少经过契约测试和关键业务路径验证；平台特有行为 MUST 经过对应平台测试。 |
| UAES-07-014 | Design Compliance | 平台 UI MUST 遵循 UAES-05，同时允许符合平台交互习惯的合理差异。 |
| UAES-07-015 | Security Boundary | 不得因为跨平台复用而将服务端密钥、支付私钥、签名密钥或其他服务端机密放入客户端。 |
| UAES-07-016 | AI Platform Awareness | AI MUST 在执行前识别目标平台、运行环境、平台能力、现有工程结构和验证工具。 |

## 6. Platform Architecture

推荐逻辑分层：

1. **Presentation Layer**：平台界面、导航和交互。
2. **Application Layer**：用例编排、状态协调和任务执行。
3. **Domain Layer**：领域模型、业务规则和业务状态机。
4. **Contract Layer**：API、DTO、错误码和事件契约。
5. **Infrastructure Layer**：网络、持久化、缓存和遥测抽象。
6. **Platform Adapter Layer**：系统 API、权限、通知、文件和平台专属能力。

依赖方向必须受控。领域层不得直接依赖浏览器 DOM、Electron API、Android Context、iOS UIKit 或 HarmonyOS 平台对象。

## 7. Prohibited Practices

1. MUST NOT 将平台差异散落在大量无约束条件分支中。
2. MUST NOT 为追求复用而强行共享不兼容的 UI 实现。
3. MUST NOT 将客户端状态视为服务端最终业务状态。
4. MUST NOT 把客户端本地支付成功页面作为充值到账依据。
5. MUST NOT 在客户端保存服务端私钥或长期高权限凭据。
6. MUST NOT 忽略权限拒绝、系统中断和进程终止。
7. MUST NOT 使用未验证的 WebView 桥接执行任意敏感操作。
8. MUST NOT 将未测试的平台标记为已支持。
9. MUST NOT 用单一模拟器结果代替所有目标设备验证。
10. MUST NOT 在未分析平台影响的情况下升级跨平台框架或原生 SDK。

## 8. AI Execution Protocol

每个跨平台任务执行前，AI MUST：

1. 识别任务所属平台和目标设备。
2. 读取平台清单、模块清单和兼容性矩阵。
3. 确认现有代码实际支持的平台。
4. 检查共享模块与平台适配模块。
5. 确认目标平台的 API、SDK、权限和生命周期要求。
6. 分析变更对其他平台的影响。
7. 制定实现、测试和回滚方案。
8. 对无法确认的设备能力或业务规则提出澄清，不得编造。

实施完成后，AI MUST：

1. 执行共享逻辑测试。
2. 执行目标平台测试。
3. 执行受影响平台回归。
4. 检查平台专属依赖和构建产物。
5. 输出兼容性、性能、安全和未验证风险。
6. 更新平台清单和变更记录。

## 9. Verification

至少验证：

- 平台声明完整性
- 平台能力声明完整性
- 共享模块边界
- API Contract 一致性
- 生命周期恢复
- 权限拒绝和撤销
- 网络中断和恢复
- 窗口、方向和尺寸变化
- 深度链接和外部跳转
- 平台独立构建
- 关键业务流程一致性
- 平台视觉与交互验收
- 安全和依赖扫描

## 10. Acceptance Criteria

P5 通过必须满足：

1. 10 项子标准全部建立。
2. 平台能力和兼容性 Schema 可解析。
3. 所有目标平台均有明确状态，不得将规划平台标记为已支持。
4. 共享代码边界和平台适配边界明确。
5. 平台生命周期、权限、存储和网络策略完整。
6. 跨平台 Quality Gate 已定义。
7. 验收基准和证据格式完整。
8. 至少完成一次基于真实仓库的静态盘点。
9. 对尚不存在的平台工程，明确标记 NOT_IMPLEMENTED，不得虚构构建和测试结果。

## 11. Exceptions

任何例外必须记录：

- Exception ID
- 适用平台
- 涉及标准 ID
- 例外原因
- 风险评估
- 补偿措施
- 责任人
- 到期时间
- 复审条件

## 12. Related Standards

- UAES-02 Product Engineering
- UAES-04 System Architecture
- UAES-05 Experience & Design
- UAES-06 Software Engineering
- UAES-08 AI Agent Engineering
- UAES-09 Quality Engineering
- UAES-10 Security & Reliability
- UAES-11 DevOps & Delivery
- UAES-12 Lifecycle & Evolution

## 13. Change History

| Version | Status | Description |
|---|---|---|
| 1.0.0 | DRAFT | Initial enterprise cross-platform standard |

## Appendix A — Platform Technology Selection Boundaries

| 平台 | 标准约束 | 不预先强制的事项 |
|---|---|---|
| PC Web | 延续 React 19 / TypeScript 工程，桌面浏览器优先 | 不强制迁移框架 |
| H5 | 明确移动浏览器、触控、视口、安全区及网络适配 | 不默认等同于 PC Web 缩小版 |
| Electron | 独立处理桌面容器、主进程、预加载及系统能力 | 不把 Electron 等同于普通浏览器 |
| Android | 原生或跨端实现均须遵守平台能力和生命周期约束 | 不预先指定 Kotlin 或 React Native |
| iOS | 原生或跨端实现均须遵守 Apple 平台能力和生命周期约束 | 不预先指定 Swift 或 React Native |
| HarmonyOS | 按目标 HarmonyOS 版本与 SDK 能力独立验证 | 不假设 Android 代码可直接运行于 HarmonyOS |

说明：React Native 官方文档明确提供平台模块和平台专属文件扩展来隔离差异，而不是要求所有平台共享同一实现；Android 官方架构指南强调分层、单一数据源、状态持久化和自适应布局；HarmonyOS 官方开发资料以 ArkTS、ArkUI、Ability Kit 等平台能力构成独立应用开发体系。

## Appendix B — Sub-Standard Index

| 标准 ID | 标准名称 | 核心责任 |
|---|---|---|
| UAES-07-001 | Cross-Platform Principles | 跨平台原则、架构分层、平台边界 |
| UAES-07-002 | Platform Capability Matrix | 平台、设备、系统能力清单 |
| UAES-07-003 | Shared Code & Boundaries | 共享代码、领域逻辑和适配层 |
| UAES-07-004 | Web & H5 Engineering | PC Web、移动 H5、浏览器兼容 |
| UAES-07-005 | React Native Engineering | RN 工程结构、导航、原生模块 |
| UAES-07-006 | Native Android & iOS Integration | 原生模块、系统 API、平台集成 |
| UAES-07-007 | HarmonyOS Engineering | ArkTS、ArkUI、Ability、鸿蒙能力 |
| UAES-07-008 | Device Lifecycle & Permissions | 生命周期、权限、存储、网络 |
| UAES-07-009 | Compatibility & Release | 版本兼容、构建、签名和发布 |
| UAES-07-010 | Cross-Platform Testing | 契约、设备、端到端和回归测试 |
