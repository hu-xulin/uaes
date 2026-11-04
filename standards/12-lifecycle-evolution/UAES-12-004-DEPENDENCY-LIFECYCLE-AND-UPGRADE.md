# UAES-12-004 — Dependency Lifecycle and Upgrade

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-004 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-06, UAES-09, UAES-10, UAES-11 |

## 1. Purpose

管理依赖的引入、维护、升级和移除。

## 2. Scope

Go 多模块（含 relaykit、tokenkit 及嵌套模块）、Web、Electron、脚本与工具链依赖的版本、来源、升级与移除。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-004-M001 | 关键依赖 MUST 记录名称、版本和来源。 |
| UAES-12-004-M002 | 依赖 MUST 评估维护状态和支持期限。 |
| UAES-12-004-M003 | 依赖升级 MUST 检查 Breaking Changes。 |
| UAES-12-004-M004 | 依赖升级 MUST 检查直接和传递依赖影响。 |
| UAES-12-004-M005 | 依赖 MUST 检查安全漏洞和 License。 |
| UAES-12-004-M006 | 依赖升级 MUST 验证锁文件变化。 |
| UAES-12-004-M007 | 关键依赖升级 MUST 有回退或前向修复方案。 |
| UAES-12-004-M008 | 废弃或不再使用的依赖 MUST 有移除记录。 |
| UAES-12-004-M009 | Go 多模块仓库 MUST 分别检查各模块依赖图。 |
| UAES-12-004-M010 | 依赖升级报告 MUST 区分直接依赖、传递依赖和工具链依赖。 |

## 4. Implementation Rules

### 4.1 Uter Implementation

Go 模块检查范围：

- `go.mod`
- `relaykit/go.mod`
- `tokenkit/go.mod`
- `tokenkit/tokenkit/go.mod`

Web 和 Electron 依赖必须依据各自锁文件进行升级和验证。

## 5. Verification

- Dependency Inventory
- Vulnerability Scan
- License Check
- Upgrade Regression

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
