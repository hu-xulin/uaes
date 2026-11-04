# UAES-02-006 — CHANGE IMPACT STANDARD

**Version:** 1.0.0  
**Status:** DRAFT

## 1. 目的

任何需求变更都可能影响业务、架构、数据和已有用户行为。

本标准要求 AI 在修改已批准需求前完成影响分析。

## 2. 变更分类

| 类型 | 定义 |
|---|---|
| CLARIFICATION | 文字澄清，不改变业务含义 |
| ADDITION | 新增需求 |
| MODIFICATION | 修改现有需求 |
| REMOVAL | 删除需求 |
| DEPRECATION | 废弃功能 |
| BREAKING | 不兼容变更 |
| EMERGENCY | 紧急修复 |

## 3. 影响分析范围

必须根据实际影响检查：

- 产品流程。
- 用户角色。
- 业务规则。
- 数据模型。
- 数据迁移。
- API 契约。
- 前端页面。
- 后端模块。
- 缓存。
- 第三方服务。
- 安全。
- 隐私。
- 性能。
- 测试。
- 监控。
- 文档。
- 平台兼容性。
- 发布和回滚。

## 4. 变更记录

```yaml
change:
  id: CHG-0001
  type: MODIFICATION
  status: PROPOSED

  title: ""
  reason: ""

  affected_requirements:
    - REQ-0001

  affected_rules:
    - BR-0001

  affected_modules:
    - ""

  affected_apis:
    - ""

  affected_data:
    - ""

  affected_platforms:
    - ""

  security_impact: ""
  compatibility_impact: ""
  migration_required: false
  rollback_plan: ""

  approval_required: true
  approval_status: PENDING
```

## 5. 兼容性判断

必须判断：

- 是否影响已有用户。
- 是否影响已有数据。
- 是否影响客户端版本。
- 是否影响第三方调用。
- 是否影响历史订单。
- 是否需要灰度。
- 是否需要迁移。
- 是否需要回滚。

## 6. 紧急变更

紧急变更可以缩短审批流程，但不能取消安全和审计要求。

必须在变更后补齐：

- 变更原因。
- 风险评估。
- 执行记录。
- 测试证据。
- 补充审批记录。

## 7. 强制规则

| Rule ID | 规则 | 级别 |
|---|---|---|
| UAES-02-006-001 | 已批准需求变更必须记录 | MUST |
| UAES-02-006-002 | 变更必须执行影响分析 | MUST |
| UAES-02-006-003 | Breaking Change 必须评估迁移 | MUST |
| UAES-02-006-004 | 关键业务变更必须审批 | MUST |
| UAES-02-006-005 | 变更必须记录回滚方案 | MUST |

**END OF CHANGE IMPACT STANDARD**