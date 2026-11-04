# UAES-10-009 — Dependency and Supply Chain Security

| Field | Value |
| --- | --- |
| ID | UAES-10-009 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Dependency Governance

每个直接依赖 MUST 具备来源、版本、许可证和维护状态信息。依赖升级必须评估兼容性、安全修复和回归影响。

## 2. Vulnerability Scanning

- Go 所有模块必须扫描。
- Web/Bun 依赖必须扫描。
- Electron Runtime、打包依赖和原生模块必须纳入扫描。
- 间接依赖必须纳入 SBOM 和漏洞关联。
- 漏洞扫描必须记录工具版本、数据库更新时间和扫描目标。

Uter 当前已知 Go Module 清单：

- `go.mod`
- `relaykit/go.mod`
- `tokenkit/go.mod`
- `tokenkit/tokenkit/go.mod`

不得只扫描仓库根目录而遗漏嵌套 Module。

## 3. SBOM

关键构建 MUST 生成机器可读 SBOM。至少记录：

- Component Name；
- Version；
- Supplier / Publisher（可获得时）；
- Unique Identifier；
- Dependency Relationship；
- Component Hash；
- License；
- SBOM Tool Name；
- SBOM Generation Context；
- Build / Artifact Reference。

建议支持 CycloneDX 或 SPDX，并在项目内选定一种主格式，避免无必要地维护多个不一致版本。

## 4. Build Integrity

- 锁文件必须纳入版本控制。
- CI 必须使用冻结锁文件模式。
- 构建产物必须关联 Commit SHA、构建任务和依赖清单。
- 发布产物应有校验和；适用时采用签名和来源证明。
- 不得在 CI 中执行未经审查的远程脚本。

## 5. License Compliance

不允许依赖许可证检查仅以「工具无报错」作为结论。需识别许可证义务、冲突和分发影响。

## 6. Acceptance

所有生产构建均有 SBOM；四个 Go Module 全部纳入扫描；高风险依赖有明确处置；构建来源可追踪。
