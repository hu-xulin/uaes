# UAES-07-005 — React Native Engineering

**Standard ID:** UAES-07-005  
**Standard Name:** React Native Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** RN 工程结构、导航、原生模块  
**Classification:** Enterprise Engineering Standard

---

> 本标准适用于项目决定采用 React Native 的情形，不代表 Uter 当前已经存在 RN 工程。

## 1. Mandatory Rules

- **RN-001**：RN 工程 MUST 独立于 Web UI 层。
- **RN-002**：共享业务逻辑 MUST 使用明确的共享包或稳定接口。
- **RN-003**：平台差异 MUST 使用平台适配模块或平台专属文件隔离。
- **RN-004**：原生模块 MUST 声明输入、输出、错误和生命周期。
- **RN-005**：导航、深度链接和状态恢复 MUST 有统一设计。
- **RN-006**：原生依赖 MUST 记录平台支持范围。
- **RN-007**：升级 RN、Hermes、Metro 或原生依赖 MUST 执行兼容性评估。
- **RN-008**：不得把 Web DOM API 当作 RN 可用能力。
- **RN-009**：不得把 RN API 当作 Web 可用能力。
- **RN-010**：Android 和 iOS 必须分别构建和测试。
