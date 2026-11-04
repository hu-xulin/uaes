# UAES-07-002 — Platform Capability Matrix

**Standard ID:** UAES-07-002  
**Standard Name:** Platform Capability Matrix  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** 平台、设备、系统能力清单  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **CAP-001**：每个平台 MUST 声明 OS、SDK、运行环境和设备形态。
- **CAP-002**：每项系统能力 MUST 声明 supported、unsupported、conditional 或 unknown。
- **CAP-003**：conditional 能力 MUST 提供运行时检测。
- **CAP-004**：unknown 能力不得作为业务流程的必要前提。
- **CAP-005**：每项能力 MUST 声明降级方案。
- **CAP-006**：能力清单 MUST 记录最低版本和验证证据。

## 2. Capability Categories

- Network
- Secure Storage
- Local Database
- File System
- Camera
- Microphone
- Notifications
- Deep Links
- Biometrics
- Background Execution
- Clipboard
- Share Sheet
- WebView
- Push
- Payment Handoff
- Device Information
- Accessibility
- Multi-window
- Offline Support
