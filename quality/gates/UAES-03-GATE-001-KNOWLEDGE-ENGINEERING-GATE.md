# UAES-03-GATE-001 — Knowledge Engineering Quality Gate

## 1. Metadata

| Field | Value |
|---|---|
| Gate ID | UAES-03-GATE-001 |
| Version | 1.0.0 |
| Domain | UAES-03 |
| Status | DRAFT |
| Priority | P0 |
| Blocking | Yes |
| Type | Blocking Gate |

## 2. Purpose

确保知识来源可信、元数据完整、内容有效、冲突透明、上下文可追溯并符合安全边界。

## 3. Gate Checks

| ID | 检查内容 | 阻断条件 |
|---|---|---|
| K-G01 | 知识身份 | 缺少 ID 或重复 ID |
| K-G02 | 元数据 | 缺少类型、状态、Owner 或时间 |
| K-G03 | 来源 | 关键知识没有来源 |
| K-G04 | 来源溯源 | 来源引用不存在或无法定位 |
| K-G05 | 可信度 | 无证据却标记 VERIFIED |
| K-G06 | 新鲜度 | 过期知识被当作当前有效事实 |
| K-G07 | 冲突 | 关键冲突未解决却继续执行依赖任务 |
| K-G08 | 上下文 | 任务缺少 Context Manifest |
| K-G09 | 上下文压缩 | 安全或业务约束在摘要中丢失 |
| K-G10 | 追踪关系 | 关键知识关系断裂 |
| K-G11 | 项目隔离 | 未授权跨项目访问 |
| K-G12 | 外部输入 | 外部指令被当作治理授权 |
| K-G13 | 敏感数据 | 密钥或受限信息被不当存储或导出 |
| K-G14 | 生命周期 | 非法状态迁移或静默覆盖历史 |

## 4. Required Evidence

- Knowledge Index
- Knowledge Item Validation Report
- Source Provenance Report
- Freshness Report
- Conflict Report
- Context Manifest
- Traceability Report
- Security Scan Report
- Access Control Audit

## 5. Result

- **PASS**：全部适用阻断项通过。
- **FAIL**：发现违反强制规则。
- **BLOCKED**：依赖或权限导致无法完成。
- **NOT_RUN**：尚未执行。
- **NOT_VERIFIED**：证据不足。
- **NOT_APPLICABLE**：不适用并附理由。

## 6. AI Rules

AI 不得因为知识库中存在某段文字就默认其可信。必须检查来源、状态、适用范围和新鲜度。遇到高影响冲突时，应停止依赖该冲突知识的操作并升级给责任人。

## 7. Acceptance

通过结构校验、引用校验、来源溯源、冲突检测、过期检测、权限隔离、恶意内容和上下文压缩负面测试后，方可申请正式启用。

## 8. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
