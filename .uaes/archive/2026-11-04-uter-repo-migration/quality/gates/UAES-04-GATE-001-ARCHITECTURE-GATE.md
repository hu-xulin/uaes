# UAES-04-GATE-001 — Architecture Quality Gate

**Gate ID:** UAES-04-GATE-001  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** System Architecture  
**Applies to:** All architecture-affecting changes

---

## 1. Purpose

本门禁用于判断代码变更是否符合 UAES 系统架构标准。

门禁不是架构文档的复述，而是针对代码、模块、接口、数据和运行行为进行验证。

## 2. Gate severity

| Severity | Meaning           | Result |
| -------- | ----------------- | ------ |
| BLOCKER  | 违反关键安全、资金或数据完整性要求 | FAIL   |
| CRITICAL | 核心架构破坏或不可接受的风险    | FAIL   |
| HIGH     | 严重架构违规            | FAIL   |
| MEDIUM   | 一般架构缺陷            | 按策略判定  |
| LOW      | 改进建议              | 可记录通过  |

不得通过降低问题等级来绕过门禁。

## 3. Gate stages

### GATE-01 — Architecture context

检查：

- 固定 Commit SHA；
- 变更范围；
- 相关模块；
- 当前架构；
- 目标架构；
- 关联需求；
- 是否需要 ADR。

### GATE-02 — Module boundaries

检查：

- 模块是否有明确职责；
- 是否存在循环依赖；
- 是否访问其他模块内部实现；
- 是否违反依赖方向；
- 是否存在未经批准的数据写入越权。

### GATE-03 — Backend architecture

检查：

- Handler 是否承载复杂业务逻辑；
- Domain 是否依赖 Gin/GORM；
- Context 是否正确传递；
- goroutine 是否有生命周期；
- 事务边界是否明确；
- 错误是否被忽略；
- 所有 Go modules 是否纳入检查。

### GATE-04 — Frontend architecture

检查：

- Server State / Client State 是否混乱；
- 是否出现不合理全局状态；
- 是否存在未授权的跨模块导入；
- API 调用是否绕过统一接口；
- 类型安全是否被不合理绕过；
- 权限判断是否仅依赖 UI。

### GATE-05 — Electron security boundary

检查：

- contextIsolation；
- nodeIntegration；
- preload 暴露范围；
- IPC 参数校验；
- 外部导航限制；
- 文件系统和命令执行权限；
- 敏感凭据持久化。

### GATE-06 — API contract

检查：

- 请求和响应契约；
- 错误码；
- 认证与授权；
- 版本兼容；
- 幂等要求；
- 前后端契约一致性。

### GATE-07 — Database architecture

检查：

- 数据所有权；
- 数据结构变化；
- 迁移文件；
- 索引；
- 事务；
- 多数据库兼容性；
- 回滚和备份计划。

### GATE-08 — Cache and consistency

检查：

- 缓存来源；
- TTL；
- 失效策略；
- 多实例同步；
- Redis 故障策略；
- 是否错误地将缓存当作权威数据。

### GATE-09 — Async and concurrency

检查：

- 任务状态机；
- 超时与取消；
- 重试边界；
- 重复事件处理；
- 幂等；
- 并发竞争；
- 多实例一致性；
- race detector 结果。

### GATE-10 — External dependencies

检查：

- 第三方适配边界；
- 超时；
- 重试；
- 限流；
- 故障隔离；
- 错误映射；
- 密钥管理。

### GATE-11 — Observability

检查：

- 关键日志；
- 错误追踪；
- 请求关联 ID；
- 关键指标；
- 健康检查；
- 敏感信息脱敏。

### GATE-12 — Verification evidence

检查：

- 相关单元测试；
- 集成测试；
- API 测试；
- 并发测试；
- 架构规则检查；
- 失败记录；
- 未验证项目。

## 4. Mandatory blocking conditions

以下情况必须阻断：

1. 未经批准破坏核心模块边界；
2. 引入未授权的核心技术栈变更；
3. 产生核心模块循环依赖；
4. 破坏资金或计费数据完整性；
5. 造成敏感数据或密钥暴露；
6. 未经批准执行破坏性数据库迁移；
7. 重复回调可能导致重复入账；
8. 关键状态转换存在不可控并发问题；
9. Electron Renderer 获得不必要的高权限；
10. 关键架构变更没有必要的 ADR 或审批；
11. 关键测试失败；
12. 无法确认变更是否会破坏现有业务。

## 5. Gate result

允许结果：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
- NOT_VERIFIED

判定：

- PASS：所有强制检查通过；
- FAIL：存在明确违规；
- BLOCKED：缺少必要输入、权限或环境；
- NOT_RUN：检查未执行；
- NOT_APPLICABLE：检查确实不适用，并有理由；
- NOT_VERIFIED：缺少足够证据。

不得将 BLOCKED、NOT_RUN 或 NOT_VERIFIED 自动转换为 PASS。

## 6. AI execution protocol

AI MUST：

1. 先确定固定 Commit SHA；
2. 检查实际变更范围；
3. 识别架构影响；
4. 执行对应检查；
5. 保存原始结果；
6. 对发现的问题分类；
7. 在授权范围内修复；
8. 对修复执行回归；
9. 生成结构化报告；
10. 对未验证风险明确披露。

AI 不得为了让门禁通过而：

- 删除测试；
- 放宽检查规则；
- 屏蔽失败日志；
- 删除架构声明；
- 将未执行项目标记为通过；
- 修改生产环境或真实支付配置。

## 7. Required report

报告至少包含：

- Gate ID；
- Commit SHA；
- Branch；
- Changed files；
- Architecture impact；
- ADR references；
- Module boundary results；
- API contract results；
- Database results；
- Concurrency results；
- Electron security results；
- Test evidence；
- Findings；
- Fixes；
- Unresolved risks；
- Final result。

## 8. Acceptance criteria

只有满足以下条件才能 PASS：

- 强制检查全部完成；
- 无 BLOCKER / CRITICAL / HIGH 未解决问题；
- 必要 ADR 已接受；
- 相关测试通过；
- 证据可追溯；
- 未验证风险已经明确披露；
- 不存在未经授权的架构变更。

## 9. Exceptions

任何门禁例外必须有明确审批记录、风险说明、补偿措施和到期日期。

BLOCKER 级安全或资金完整性问题不得通过普通例外直接放行。

## 10. Version history

| Version | Status | Description                       |
| ------- | ------ | --------------------------------- |
| 1.0.0   | DRAFT  | Initial Architecture Quality Gate |
