# UAES-07-011 — Platform Build and Packaging

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-011 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

统一各平台构建、打包、签名和产物验证要求。

## 2. Scope

Web 构建、Electron 打包、Android、iOS 和 HarmonyOS 未来构建工程。

## 3. Definitions

- Build Artifact：构建产物。
- Package：平台安装或分发包。
- Signing：代码或应用签名。
- Build Provenance：构建来源和证据。
- Reproducible Build：可重复构建。

## 4. Core Principles

构建可重复、环境可追踪、签名受控、产物可验证。

## 5. Mandatory Requirements

- UAES-07-011-001 MUST 为每个平台定义构建入口。
- UAES-07-011-002 MUST 固定必要工具链版本。
- UAES-07-011-003 MUST 记录构建来源 Commit。
- UAES-07-011-004 MUST 区分开发、测试、预发布和生产构建。
- UAES-07-011-005 MUST 对正式分发产物执行签名要求。
- UAES-07-011-006 MUST 安全管理签名证书和密钥。
- UAES-07-011-007 MUST 记录产物哈希和构建信息。
- UAES-07-011-008 MUST 对构建产物执行完整性检查。
- UAES-07-011-009 MUST 明确平台发布所需的外部账号和审批。
- UAES-07-011-010 MUST 将部署和发布授权交由 UAES-11 管理。

## 6. Implementation Rules

Web：

- 使用锁文件和固定构建工具链。
- 记录构建 Commit、环境和产物哈希。

Electron：

- 明确操作系统目标架构和打包格式。
- 签名和更新机制必须经过安全评估。

Native：

- Android、iOS、HarmonyOS 各自定义工具链、签名、权限声明和打包规则。
- 平台未建成前，不得宣称具备可发布产物。

## 7. Prohibited Practices

- MUST NOT 将开发构建产物作为正式发布产物。
- MUST NOT 将签名密钥提交到仓库。
- MUST NOT 使用来源不明的预编译二进制。
- MUST NOT 以构建成功代替发布验收。

## 8. AI Execution Rules

AI 可以在明确授权下构建和生成产物；签名、上传商店和正式发布必须遵守 P01、P11 的审批和权限规则。

## 9. Verification

工具链、构建、签名、产物哈希和安装启动验证。

## 10. Acceptance Criteria

构建可重复，来源可追踪，签名安全，产物可验证。

## 11. Exceptions

临时本地测试包可免正式签名，但不得用于正式分发。

## 12. References

UAES-10、UAES-11、各平台官方构建文档。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
