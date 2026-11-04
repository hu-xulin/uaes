# UAES-01-002 — Agent Authority & Permissions Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-002 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-01-001 |

## 1. Purpose

定义 Agent 的权限模型、资源访问边界、操作授权和权限撤销机制。

## 2. Permission Dimensions

权限必须由以下维度共同决定：

1. Subject：谁执行。
2. Action：执行什么操作。
3. Resource：操作什么对象。
4. Environment：在哪个环境执行。
5. Scope：操作范围。
6. Risk：风险等级。
7. Time：授权有效期。
8. Approval：审批要求。

只声明 `can_write=true` 不足以构成有效授权。

## 3. Permission Actions

| Action | Meaning |
|---|---|
| READ | 读取 |
| SEARCH | 搜索 |
| CREATE | 创建 |
| UPDATE | 修改 |
| DELETE | 删除 |
| EXECUTE | 执行命令 |
| COMMIT | Git Commit |
| PUSH | Git Push |
| PR_CREATE | 创建 Pull Request |
| PR_MERGE | 合并 Pull Request |
| DEPLOY | 部署 |
| DB_WRITE | 数据库写入 |
| SECRET_READ | 读取密钥 |
| CONFIG_CHANGE | 修改配置 |

## 4. Environment Classification

| Environment | Meaning |
|---|---|
| LOCAL_SANDBOX | 隔离本地环境 |
| DEVELOPMENT | 开发环境 |
| TEST | 测试环境 |
| STAGING | 预发布环境 |
| PRODUCTION | 生产环境 |

生产环境必须采用单独的授权策略。

## 5. Uter Default Authorization Baseline

以下为 UAES 的默认工程授权基线；用户对特定任务明确授予的权限必须记录为独立授权，不得推导成永久权限。

| Action | Default |
|---|---|
| READ source code | ALLOW |
| READ project docs | ALLOW |
| EDIT authorized task files | CONDITIONAL |
| CREATE isolated branch | ALLOW when authorized task requires |
| COMMIT repair branch | ALLOW after required verification |
| PUSH repair branch | ALLOW after required verification |
| CREATE PR | ALLOW after required verification |
| MERGE PR | DENY |
| DEPLOY production | DENY |
| MODIFY production DB | DENY |
| MODIFY real payment configuration | DENY |
| OVERWRITE uncommitted user changes | DENY |
| READ production secrets | DENY |
| CHANGE production security policy | DENY |

上述 ALLOW 仍受任务范围、工具连接权限和仓库实际权限限制。没有技术权限时不得假称执行成功。

## 6. Mandatory Rules

### UAES-PERM-001 — Explicit Scope

- 所有写入操作必须具有明确目标路径或资源范围。

### UAES-PERM-002 — No Permission Inference

- Agent MUST NOT 从"帮我完成项目"推断出生产部署、数据库写入或密钥读取权限。

### UAES-PERM-003 — Local Change Protection

- 执行前必须检查工作区状态。
- MUST NOT 覆盖用户未提交的修改、未跟踪文件或用户明确保留的内容。

### UAES-PERM-004 — Branch Isolation

- 涉及代码修改时，必须使用独立分支或隔离工作区。

### UAES-PERM-005 — Permission Propagation

- 子 Agent 和工具调用不得拥有超出父任务的权限。

### UAES-PERM-006 — Revocation

- 授权撤销后必须停止后续相关操作。

### UAES-PERM-007 — Secret Protection

- 密钥不得写入普通日志、PR 描述、代码或报告。

### UAES-PERM-008 — Destructive Operations

- 删除、覆盖、批量修改和不可逆操作必须有明确范围和相应审批。

## 7. Permission Evaluation

授权判定采用：

- ALLOW / DENY / REQUIRE_APPROVAL / OUT_OF_SCOPE

优先级：

1. 明确禁止项：DENY。
2. 授权缺失：DENY。
3. 需要审批且尚未批准：REQUIRE_APPROVAL。
4. 超出任务范围：OUT_OF_SCOPE。
5. 所有检查通过：ALLOW。

不得通过工具替换、子 Agent 委派或命令封装改变判定结果。

## 8. Acceptance Criteria

- 每项授权具有 Subject、Action、Resource、Environment。
- 默认拒绝未授权操作。
- 不同环境权限隔离。
- 委派不扩大权限。
- 用户本地修改得到保护。
- 生产环境权限默认拒绝。
- 撤销权限后无法继续执行。

## 9. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
