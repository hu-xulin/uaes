# UAES-06-002 — Repository and Module Structure

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-002 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06 |

## 1. Purpose

统一仓库、模块、包和目录的组织方式。

## 2. Scope

Monorepo、多 Go Module、Web、Electron 和共享代码。

## 3. Definitions

- **Repository**：版本控制仓库。
- **Module**：具有明确责任和依赖的工程单元。
- **Package**：语言级组织单元。
- **Boundary**：模块可访问范围。
- **Internal Package**：仅允许模块内部使用的实现。

## 4. Core Principles

按业务和领域组织、依赖方向明确、内部实现封装、公共接口受控。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-002-001 | MUST 为每个正式模块声明唯一身份和责任。 |
| UAES-06-002-002 | MUST 明确模块公开接口。 |
| UAES-06-002-003 | MUST 限制跨模块访问内部实现。 |
| UAES-06-002-004 | MUST 防止循环依赖。 |
| UAES-06-002-005 | MUST 明确共享代码的归属。 |
| UAES-06-002-006 | MUST 对跨模块移动和拆分执行影响分析。 |
| UAES-06-002-007 | MUST 为 Go Module 明确模块路径和版本关系。 |
| UAES-06-002-008 | MUST 为 Web 功能模块明确路由、状态、API 和 UI 边界。 |
| UAES-06-002-009 | MUST 避免通过共享目录形成无主代码。 |
| UAES-06-002-010 | MUST 在模块清单中记录 Owner、依赖和验证入口。 |

## 6. Implementation Rules

Go 模块可按职责组织：

```
module/
├── cmd/
├── internal/
├── pkg/
├── api/
├── migrations/
├── configs/
└── go.mod
```

并非所有目录都必须存在。不得为追求模板一致而创建空目录。

Web 功能模块可按业务边界组织：

```
src/
├── app/
├── routes/
├── features/
├── components/
├── services/
├── shared/
├── hooks/
├── stores/
└── types/
```

实际路径必须先审计现有工程，再制定迁移计划。

## 7. Prohibited Practices

- MUST NOT 直接跨模块导入私有实现。
- MUST NOT 建立无边界的 common、utils 巨型模块。
- MUST NOT 仅因复用而将强耦合业务逻辑抽到共享包。
- MUST NOT 在未分析依赖关系时移动公共包。

## 8. AI Execution Rules

AI 修改目录结构前必须先生成依赖和引用影响清单；涉及公共模块迁移时必须分阶段执行。

## 9. Verification

模块清单、依赖图、循环依赖扫描和包边界检查。

## 10. Acceptance Criteria

所有正式模块具有明确边界，依赖关系可检查，无未批准的跨界访问。

## 11. Exceptions

历史遗留结构可设置迁移例外和清理计划。

## 12. References

UAES-04-003、UAES-04-004、UAES-04-005。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
