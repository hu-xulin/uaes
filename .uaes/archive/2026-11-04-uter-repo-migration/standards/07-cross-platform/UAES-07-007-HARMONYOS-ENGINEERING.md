# UAES-07-007 — HarmonyOS Engineering

**Standard ID:** UAES-07-007  
**Standard Name:** HarmonyOS Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** ArkTS、ArkUI、Ability、鸿蒙能力  
**Classification:** Enterprise Engineering Standard

---

> 本标准适用于目标 HarmonyOS SDK 和设备范围已经确认的工程。

## 1. Mandatory Rules

- **HOS-001**：HarmonyOS 工程 MUST 声明 SDK、DevEco Studio 和 ArkTS 版本。
- **HOS-002**：UI MUST 使用目标 SDK 支持的 ArkUI 能力。
- **HOS-003**：应用模型、Ability 和生命周期 MUST 明确。
- **HOS-004**：数据存储 MUST 使用符合目标平台能力的方案。
- **HOS-005**：权限和系统能力 MUST 按 HarmonyOS 规则独立验证。
- **HOS-006**：不得假设 Android APK 或 Android 原生依赖可直接复用。
- **HOS-007**：跨设备能力 MUST 经过真实目标设备验证。
- **HOS-008**：分布式能力、后台任务和设备协同 MUST 声明权限与限制。
- **HOS-009**：HarmonyOS UI MUST 遵守平台交互与无障碍要求。
- **HOS-010**：应用发布 MUST 遵守对应应用市场和签名流程。
