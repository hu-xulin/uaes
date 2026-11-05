# UAES-00-003 — Standard Lifecycle & Versioning

**Standard ID:** UAES-00-003  
**Standard Name:** Standard Lifecycle & Versioning  
**Version:** 1.1.0  
**Status:** DRAFT  
**Domain:** UAES-00 Foundation  
**Owner:** Uter Engineering Governance  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

定义 UAES 标准从提出到退役的生命周期，以及版本号、兼容性、迁移和历史记录规则。

## 2. Lifecycle

```text
PROPOSED
   ↓
DRAFT
   ↓
IN_REVIEW
   ├── NEEDS_REVISION → DRAFT
   ├── REJECTED
   └── APPROVED
          ↓
      IMPLEMENTED
          ↓
       VERIFIED
          ↓
         ACTIVE
          ↓
      DEPRECATED
          ↓
        RETIRED
```

SUPERSEDED 表示该标准已被另一个标准或版本替代，可作为历史记录保留。IMPLEMENTED 与 VERIFIED 是批准后的实施和验证状态；只有满足发布条件并完成正式生效记录后才能进入 ACTIVE。

## 3. Status Definitions

| Status | Meaning |
|---|---|
| PROPOSED | 已提出，尚未正式起草 |
| DRAFT | 草案 |
| IN_REVIEW | 正在审查 |
| NEEDS_REVISION | 需要修改 |
| APPROVED | 已批准，尚未完成实施与验证，不代表已经生效 |
| IMPLEMENTED | 已完成规范要求的工程实施，仍需验证 |
| VERIFIED | 已通过规定的验证与证据审查，等待正式生效 |
| ACTIVE | 正式生效 |
| REJECTED | 被拒绝 |
| DEPRECATED | 不建议新任务继续采用 |
| SUPERSEDED | 已由新版本替代 |
| RETIRED | 已退役 |

状态集合必须与 `.uaes/STANDARD-REGISTRY.yaml`、`standard-registry.schema.json` 和 `standard-metadata.schema.json` 完全一致。任何状态集合变化都必须同步更新以上资产并运行 P00 正向、负向测试。

## 4. Semantic Versioning

UAES 使用：

```text
MAJOR.MINOR.PATCH
```

### MAJOR

以下情况需要 MAJOR：

- 规则语义发生不兼容变化。
- 强制要求被删除或改变。
- Schema 存在不兼容变更。
- 标准结构或规则 ID 体系发生重大变化。
- Agent 执行协议发生破坏性变化。

### MINOR

以下情况可以使用 MINOR：

- 增加新的标准或规则。
- 增加可选字段。
- 增加兼容的验证要求。
- 扩展适用范围但不改变既有语义。

### PATCH

以下情况可以使用 PATCH：

- 修正错别字。
- 修复不影响规则语义的描述错误。
- 修正示例。
- 修复文档链接或元数据错误。

## 5. Version Immutability

### UAES-LIFE-001

**MUST**：已发布 ACTIVE 版本必须保持可追溯。

**MUST NOT**：不得静默覆盖已经批准的历史版本。

### UAES-LIFE-002

**MUST**：任何规范语义变化必须更新版本和 Change History。

### UAES-LIFE-003

**MUST**：MAJOR 变更必须提供迁移计划。

### UAES-LIFE-004

**MUST**：旧版本退役前必须确定替代版本或明确终止原因。

## 6. Effective Version

每个任务必须明确使用的 UAES 版本。

如果任务跨越标准升级：

1. 记录任务启动时的标准版本。
2. 识别升级影响。
3. 判断是否需要重新验证。
4. 对安全或数据完整性相关变更执行专项复核。

不得在同一个任务中无记录地混用不同版本规则。

## 7. Migration Plan

MAJOR 变更必须包含：

- Current Version。
- Target Version。
- Breaking Changes。
- Affected Domains。
- Affected Agents。
- Affected Workflows。
- Schema Migration。
- CI Migration。
- Compatibility Strategy。
- Rollback Strategy。
- Verification Plan。

## 8. Deprecation Policy

DEPRECATED 标准必须说明：

- 废弃原因。
- 废弃时间。
- 替代标准。
- 允许继续使用的条件。
- 计划退役时间或复核条件。

DEPRECATED 不等于立即删除。

## 9. Release Manifest

每次 UAES 正式发布必须保留：

- UAES Version。
- Release Date。
- Registry Version。
- Schema Version。
- Active Standards。
- Deprecated Standards。
- Superseded Standards。
- Gate Versions。
- Migration Notes。
- Approval Record。

## 10. Acceptance Criteria

- 每个 ACTIVE 标准都有明确版本。
- 版本变化符合语义化版本规则。
- MAJOR 变更有迁移计划。
- 历史版本可追溯。
- 旧标准有废弃和替代记录。
- 任务可以确定使用的标准基线。
