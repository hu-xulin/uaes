# UAES-P06-ACCEPTANCE-BASELINE — Software Engineering Acceptance

## 1. Metadata

| Field | Value |
|---|---|
| Acceptance ID | UAES-P06-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-06 |
| Gate | UAES-06-GATE-001 |

## A. General Engineering

- 统一编码原则已批准。
- 语言规范已明确。
- Formatter、Linter、Compiler 已确定。
- 模块边界已建立。
- 代码责任和 Owner 已明确。
- 公共 API 变更治理已建立。

## B. Repository and Module

- 仓库目录结构已审计。
- 所有 Go Module 已登记。
- Web 模块已登记。
- Electron 模块已登记。
- 模块依赖关系可生成。
- 不存在未经批准的循环依赖。
- 内部实现边界得到保护。
- 共享代码有明确归属。

## C. Go Engineering

- gofmt 检查通过。
- go vet 检查通过。
- 所有 Go Module 均可解析。
- 所有 Go Module 均完成编译验证。
- Context 使用规则已执行。
- 错误链和错误分类符合规范。
- Goroutine 生命周期明确。
- 并发共享状态有保护。
- 数据库资源生命周期完整。
- 多 Module 检查没有遗漏嵌套 Module。

## D. TypeScript and React

- TypeScript strict 已启用。
- any 使用经过审计。
- 外部数据运行时校验已建立。
- React Hooks 规则通过。
- 组件契约与 P05 一致。
- Server State 和 Client State 已区分。
- TanStack Query 使用边界明确。
- Zustand 使用边界明确。
- React Hook Form 和 Zod 使用规则明确。
- 路由参数和输入得到验证。
- 无未批准的全局类型逃逸。

## E. Electron

- Main / Preload / Renderer 边界明确。
- IPC 契约已登记。
- IPC 输入和返回值验证已建立。
- 应用生命周期管理完整。
- Renderer 不持有不必要的系统能力。
- Electron 安全检查由 P10 覆盖。

## F. Error and Logging

- 错误分类已统一。
- 错误传播链完整。
- 请求关联 ID 已建立。
- 日志结构统一。
- 敏感字段过滤有效。
- 错误不会静默丢失。

## G. Configuration and Dependencies

- 必需配置有 Schema。
- 启动阶段执行配置验证。
- Go Module 依赖锁定。
- Bun 锁文件纳入版本控制。
- CI 使用冻结锁文件安装。
- 依赖新增和升级有记录。
- 依赖许可证和安全审查有对应机制。
- 不存在未经授权的密钥提交。

## H. Code Generation

- 生成器和版本已登记。
- 源契约明确。
- 生成产物有来源标记。
- 生成过程可重复。
- 生成产物漂移可以检测。
- 公共 API 变更具有兼容性分析。

## I. Refactoring and Migration

- 重构和行为变化有明确区分。
- 迁移影响范围已记录。
- 破坏性变化有过渡方案。
- 回滚或补偿策略明确。
- 用户未提交修改得到保护。
- 迁移后旧路径得到清理。

## J. Maintainability and Performance

- 代码审查标准已执行。
- Review Finding 可追踪。
- 高风险问题已关闭或正式豁免。
- 关键路径有性能基线。
- 重大性能变化有量化证据。
- 文档与实现一致。

## K. AI Execution

- AI 能识别模块边界。
- AI 能选择正确语言规范。
- AI 能遵循现有代码风格。
- AI 不会随意引入依赖。
- AI 不会擅自修改生成文件。
- AI 能处理错误和资源生命周期。
- AI 能正确报告验证结果。
- AI 不会覆盖用户未提交修改。

## L. Negative Tests

必须验证以下失败场景：

1. Go Module 检查遗漏嵌套 Module。
2. TypeScript 通过 any 绕过严格类型检查。
3. 外部输入未经过运行时验证。
4. Go Goroutine 无退出路径。
5. 错误被静默吞掉。
6. React 状态出现多个权威副本。
7. IPC 暴露不受限制的通用命令接口。
8. 生成代码被手工修改。
9. 锁文件与依赖清单不一致。
10. AI 在重构时覆盖用户本地修改。
11. 公共 API 变更没有兼容性分析。
12. 代码审查 Finding 未验证便关闭。
13. NOT_RUN 被报告为 PASS。

## M. Final Acceptance

全部满足以下条件后，P06 才能由 DRAFT 转为 APPROVED：

- 所有标准文件完成评审。
- Schema 实际验证通过。
- 模块清单与实际仓库一致。
- Go / TypeScript / Electron 规范已经落地。
- Formatter、Linter、Compiler 已接入。
- 代码质量 Gate 可执行。
- CI 集成完成。
- AI 实战任务验收通过。
- 阻断级问题全部关闭。
- Software Engineering Owner 正式批准。

## N. Current Status

| 项目 | 状态 |
|---|---|
| P06 标准文档 | 已交付落盘 |
| Schema | 已提供，未实际验证 |
| 模块清单 | 未进行仓库一致性验证 |
| Go 规范 | 已定义，未实测 |
| TypeScript / React 规范 | 已定义，未实测 |
| Electron 规范 | 已定义，未实测 |
| Formatter / Linter | 未完成统一实施验证 |
| Code Quality Gate | 已定义，未实现 |
| CI 集成 | 未执行 |
| AI 实战验收 | 未执行 |
| 正式批准 | 未批准 |

结论：P06 文档设计交付完成，工程实施和正式验收尚未执行。

## Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
