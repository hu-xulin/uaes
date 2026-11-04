# UAES-05-001 — DESIGN SYSTEM GOVERNANCE

**Standard ID:** UAES-05-001  
**Standard Name:** Design System Governance  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

定义 Uter 设计系统的组织方式、权威来源、责任分工、版本管理、审批机制、变更流程及合规要求。

## 2. Governance Model

设计系统分为四个治理对象：

| 对象 | 内容 | 权威来源 |
| --- | --- | --- |
| Design Policy | 设计原则和治理规则 | standards/ |
| Design Tokens | 设计数值和语义 | design-tokens/ |
| Component System | 组件代码与契约 | frontend component source |
| Design Documentation | 使用方式和设计说明 | design-system docs |

任何对象都不得通过复制一份局部文件形成未经授权的第二权威来源。

## 3. Authority

设计决策权必须明确：

- Product Owner：决定产品需求和业务优先级。
- Design Owner：负责视觉体系、设计语言和体验决策。
- Engineering Owner：负责实现架构、可维护性和技术约束。
- Accessibility Reviewer：负责无障碍风险审查。
- AI Agent：负责执行已授权任务，不拥有独立的规范批准权。

AI 可以提出设计建议、执行实现和测试，但不得把自己的建议标记为 APPROVED。

## 4. Design System Structure

建议目录：

```text
design-system/
├── README.md
├── manifest.yaml
├── tokens/
│   ├── primitives.json
│   ├── semantic.json
│   ├── components.json
│   └── themes/
│       ├── light.json
│       └── dark.json
├── components/
│   ├── registry.yaml
│   └── contracts/
├── patterns/
├── templates/
├── docs/
├── migrations/
└── changelog/
```

具体目录可以根据仓库现状调整，但必须保持权威来源唯一、依赖关系清晰。

## 5. Design System Versioning

使用语义版本：

- MAJOR：删除 Token、改变公开组件 API、破坏主题兼容性。
- MINOR：增加向后兼容的 Token、组件或变体。
- PATCH：修正不改变公开契约的视觉或实现缺陷。

禁止通过覆盖旧版本掩盖破坏性变更。

## 6. Change Lifecycle

```text
PROPOSED
  ↓
IMPACT_ANALYSIS
  ↓
DESIGN_REVIEW
  ↓
ENGINEERING_REVIEW
  ↓
APPROVED
  ↓
IMPLEMENTED
  ↓
VERIFIED
  ↓
RELEASED
```

任何阶段失败都必须记录原因。

## 7. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-001-001 | 必须指定 Design Owner | MUST |
| UAES-05-001-002 | 必须指定唯一 Token 权威来源 | MUST |
| UAES-05-001-003 | 必须记录设计系统版本 | MUST |
| UAES-05-001-004 | 必须记录破坏性变更和迁移计划 | MUST |
| UAES-05-001-005 | 必须记录设计决策和审批证据 | MUST |
| UAES-05-001-006 | 禁止 AI 自行批准设计系统变更 | MUST NOT |
| UAES-05-001-007 | 禁止未经评估删除公共 Token | MUST NOT |
| UAES-05-001-008 | 发布前必须执行设计质量门禁 | MUST |

## 8. Conflict Resolution

发生设计规则冲突时，依次执行：

1. 查找当前已批准的 UAES 规则。
2. 查找当前设计系统 manifest。
3. 查找已批准的设计决策记录。
4. 查找组件契约。
5. 查找历史设计资产。

不得单纯以“代码目前就是这样”推断该实现符合规范。

如果两个已批准规则冲突，创建设计决策记录，确定适用范围和迁移方式。

## 9. Deprecation

废弃 Token 或组件必须：

- 标记 deprecated。
- 提供替代项。
- 提供迁移指南。
- 记录受影响页面和组件。
- 在合理迁移期后删除。
- 删除前通过引用检查。

## 10. Verification

自动检查：

- Manifest 存在且版本有效。
- 每个 Token 有唯一 ID 和唯一语义。
- 公共组件在 registry 中登记。
- 设计变更具有审批记录。
- Deprecated 对象有替代项。
- 不存在未批准的平行 Token 系统。

## 11. Acceptance Criteria

- 设计系统责任人已明确。
- 权威来源已明确。
- 版本规则已建立。
- 设计变更流程已建立。
- 废弃与迁移机制已建立。
- 设计决策可以追踪。
- AI 权限与人工审批边界明确。

## 12. Related Standards

UAES-05、UAES-05-002、UAES-05-006、UAES-05-010、UAES-05-012、UAES-05-013。
