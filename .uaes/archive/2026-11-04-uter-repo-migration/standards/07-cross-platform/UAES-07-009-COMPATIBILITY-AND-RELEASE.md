# UAES-07-009 — Compatibility & Release

**Standard ID:** UAES-07-009  
**Standard Name:** Compatibility & Release  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 版本兼容、构建、签名和发布  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **REL-001**：每个平台 MUST 有独立兼容性矩阵。
- **REL-002**：最低 OS、浏览器和 SDK 版本 MUST 明确。
- **REL-003**：依赖升级 MUST 进行平台影响分析。
- **REL-004**：每个平台 MUST 独立构建。
- **REL-005**：签名材料 MUST 使用受控密钥管理。
- **REL-006**：不同环境的配置 MUST 隔离。
- **REL-007**：发布产物 MUST 能追溯到源码 Commit SHA。
- **REL-008**：发布失败 MUST 有回滚或恢复方案。
- **REL-009**：客户端版本兼容 MUST 考虑服务端 API 演进。
- **REL-010**：不再支持的平台版本 MUST 有明确停止支持策略。
