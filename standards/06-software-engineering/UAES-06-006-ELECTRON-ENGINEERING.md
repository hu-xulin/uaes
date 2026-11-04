# UAES-06-006 — Electron Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-006 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-10 |

## 1. Purpose

定义 Electron 主进程、Preload、Renderer 和 IPC 的工程边界。

## 2. Scope

Electron 桌面端的进程结构、窗口管理、IPC、生命周期、配置和前端集成。

## 3. Definitions

- **Main Process**：应用主进程。
- **Renderer Process**：页面渲染进程。
- **Preload**：隔离上下文中的桥接代码。
- **IPC**：进程间通信。
- **Bridge API**：通过 Preload 暴露给 Renderer 的受控接口。

## 4. Core Principles

Least Privilege、Explicit IPC Contract、Process Separation、Lifecycle Management。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-006-001 | MUST 明确 Main、Preload、Renderer 的责任。 |
| UAES-06-006-002 | MUST 为 IPC 定义稳定契约。 |
| UAES-06-006-003 | MUST 对 IPC 参数和返回值进行验证。 |
| UAES-06-006-004 | MUST 对 IPC 调用定义错误模型。 |
| UAES-06-006-005 | MUST 对窗口、任务和进程退出建立生命周期管理。 |
| UAES-06-006-006 | MUST 限制 Renderer 直接访问系统资源。 |
| UAES-06-006-007 | MUST 为共享类型建立唯一契约来源。 |
| UAES-06-006-008 | MUST 明确窗口关闭、应用退出和后台任务行为。 |
| UAES-06-006-009 | MUST 避免主进程承载不必要的 UI 业务逻辑。 |
| UAES-06-006-010 | MUST 对平台专属能力建立适配层。 |

## 6. Implementation Rules

建议职责：

- **Main**：应用生命周期、窗口、系统集成和受控资源管理。
- **Preload**：暴露最小化、可验证的 Bridge API。
- **Renderer**：UI、用户交互和前端业务呈现。
- **Shared Contract**：IPC 类型、Schema 和错误定义。

安全基线由 UAES-10 约束。Electron 官方安全建议包括启用 Context Isolation、进程沙箱、限制导航、验证 IPC Sender、限制外部内容和 Node.js 能力。

参考：<https://www.electronjs.org/docs/latest/tutorial/security>

## 7. Prohibited Practices

- MUST NOT 将整个 ipcRenderer 暴露给 Renderer。
- MUST NOT 通过通用任意命令接口绕过 IPC 契约。
- MUST NOT 将文件系统和系统 Shell 能力无差别暴露给页面。
- MUST NOT 在 Renderer 中直接依赖 Main 内部模块。
- MUST NOT 让 IPC 错误被静默吞掉。

## 8. AI Execution Rules

AI 修改 Electron 代码时必须说明影响的进程、IPC 契约、权限范围和兼容性；不得为解决普通 UI 问题扩大系统权限。

## 9. Verification

P09 检查 IPC 契约、进程边界、应用生命周期和 Electron 安全测试。

## 10. Acceptance Criteria

进程职责明确、IPC 可追踪、系统能力最小化、错误和生命周期完整。

## 11. Exceptions

必须记录平台限制和替代实现。

## 12. References

Electron Documentation、UAES-04-006、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
