# UAES-07-003 — Platform Application Architecture

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-003 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范各平台应用入口、生命周期、模块装配和运行时架构。

## 2. Scope

Web、H5、Electron、Android、iOS、HarmonyOS 应用工程。

## 3. Definitions

- Bootstrap：应用初始化入口。
- Runtime：平台运行环境。
- Lifecycle：应用启动、前后台切换、暂停、恢复和退出过程。
- Platform Composition：平台依赖和模块装配。

## 4. Core Principles

入口明确、生命周期可管理、依赖装配可追踪、平台工程独立可构建。

## 5. Mandatory Requirements

- UAES-07-003-001 MUST 为每个平台定义 Bootstrap。
- UAES-07-003-002 MUST 定义应用生命周期处理。
- UAES-07-003-003 MUST 明确运行时配置加载顺序。
- UAES-07-003-004 MUST 明确平台依赖注入和装配方式。
- UAES-07-003-005 MUST 防止平台入口承担大量业务逻辑。
- UAES-07-003-006 MUST 为应用退出和后台任务定义行为。
- UAES-07-003-007 MUST 明确版本和运行环境信息。
- UAES-07-003-008 MUST 支持平台独立构建和验证。

## 6. Implementation Rules

Web：

- 明确浏览器入口、路由、全局状态和 API 初始化顺序。
- 不得假设页面始终保持在前台。

Electron：

- Main 管理应用生命周期和桌面资源。
- Renderer 管理界面。
- Preload 提供受控桥接。

Native：

- Android、iOS、HarmonyOS 分别定义原生生命周期入口。
- 共享模块不得依赖原生入口对象。
- 应用恢复后必须重新检查失效会话和数据状态。

## 7. Prohibited Practices

- MUST NOT 在多个入口重复初始化同一全局资源。
- MUST NOT 忽略后台挂起和恢复行为。
- MUST NOT 假设进程被系统终止前一定能执行清理回调。

## 8. AI Execution Rules

AI 新增平台入口前必须提交平台工程清单、生命周期图和构建验证方式。

## 9. Verification

启动、退出、恢复、异常退出和依赖装配验证。

## 10. Acceptance Criteria

入口、生命周期、配置和模块装配清晰可验证。

## 11. Exceptions

平台 SDK 限制必须记录并提供替代方案。

## 12. References

各目标平台官方生命周期文档、UAES-04、UAES-06。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
