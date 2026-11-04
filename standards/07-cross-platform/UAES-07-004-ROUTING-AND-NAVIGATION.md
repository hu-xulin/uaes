# UAES-07-004 — Routing and Navigation

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-004 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立多平台统一的导航语义和平台路由适配规则。

## 2. Scope

PC Web、H5、Electron 和未来原生端导航。

## 3. Definitions

- Route：可寻址页面或状态。
- Navigation Stack：导航历史栈。
- Deep Link：外部链接直接定位应用内容。
- Navigation Guard：导航前置权限和状态检查。

## 4. Core Principles

路由语义统一、导航表现平台化、权限检查集中、深链安全可控。

## 5. Mandatory Requirements

- UAES-07-004-001 MUST 为核心页面定义稳定的导航身份。
- UAES-07-004-002 MUST 定义平台导航行为。
- UAES-07-004-003 MUST 对路由参数进行校验。
- UAES-07-004-004 MUST 为受保护页面执行权限检查。
- UAES-07-004-005 MUST 定义登录失效和返回行为。
- UAES-07-004-006 MUST 为 Deep Link 定义允许的路由范围。
- UAES-07-004-007 MUST 处理浏览器前进和后退。
- UAES-07-004-008 MUST 明确平台间导航历史差异。

## 6. Implementation Rules

Web：

- 使用项目选定的 TanStack Router。
- 路由参数和 Search Params 必须经过 Schema 验证。
- 页面权限不能仅通过隐藏菜单实现。

H5：

- 处理浏览器返回、系统返回手势和页面恢复。
- 不得把所有返回操作都映射为关闭页面。

Electron：

- 外部链接和内部导航分开管理。
- 深链入口必须经过路由白名单和参数验证。

Native：

- 根据平台导航栈和返回手势定义行为。
- 系统返回操作必须与应用导航状态协调。

## 7. Prohibited Practices

- MUST NOT 将未经验证的 URL 参数直接用于关键业务操作。
- MUST NOT 将 UI 可见性当作授权控制。
- MUST NOT 允许深链直接触发高风险操作。
- MUST NOT 假设所有平台拥有相同返回栈行为。

## 8. AI Execution Rules

AI 修改导航必须检查直接访问、刷新、返回、登录失效、深链和权限场景。

## 9. Verification

路由契约、导航历史、权限、深链和平台返回行为测试。

## 10. Acceptance Criteria

主要路由稳定、权限正确、返回行为可预测、深链受控。

## 11. Exceptions

特殊业务流程可设置独立导航策略。

## 12. References

TanStack Router Documentation、UAES-01、UAES-04、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
