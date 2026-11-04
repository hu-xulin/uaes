# UAES-05-010 — DESIGN ASSET AND CODE HANDOFF

**Standard ID:** UAES-05-010  
**Standard Name:** Design Asset And Code Handoff  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立设计资产、设计说明、Token、组件契约和工程实现之间的交付机制。

## 2. Design Handoff Requirements

每项需要工程实现的设计交付必须包含：

- Design ID。
- 设计版本。
- 目标平台。
- 页面或组件范围。
- 视口范围。
- 关联 Token。
- 组件及变体。
- 交互状态。
- 响应式行为。
- 空状态、错误状态和加载状态。
- 无障碍要求。
- 验收标准。
- 相关设计资产链接或文件引用。

## 3. Design-to-Code Mapping

必须建立以下映射：

| Design Asset | Engineering Asset |
| --- | --- |
| Color Styles | Color Tokens |
| Typography Styles | Typography Tokens |
| Spacing | Spacing Tokens |
| Components | Component Registry |
| Component Variants | Component API |
| Interaction Prototype | Interaction Contract |
| Page Layout | Page Implementation |
| Responsive Rules | Responsive Tests |

不得仅凭截图猜测组件的交互行为和状态。

## 4. Asset Management

设计资产必须记录：

- Asset ID。
- Asset Type。
- Source。
- Version。
- Owner。
- Status。
- Related Standard。
- Related Component。
- License or Usage Restriction（适用时）。

禁止将来源不明的图片、图标和字体文件引入正式产品。

## 5. Design Handoff States

建议状态：

- DRAFT
- READY_FOR_REVIEW
- APPROVED
- READY_FOR_IMPLEMENTATION
- IMPLEMENTED
- VERIFIED
- DEPRECATED

IMPLEMENTED 不等于 VERIFIED。

## 6. Discrepancy Management

发现设计稿与代码不一致时，必须分类：

- Intentional Deviation：经过批准的差异。
- Implementation Defect：实现缺陷。
- Design Asset Defect：设计资产缺陷。
- Specification Gap：规范缺失。
- Legacy Deviation：历史遗留偏差。

不得默认将代码现状当作正确设计。

## 7. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-010-001 | 设计交付必须具备唯一标识 | MUST |
| UAES-05-010-002 | 必须声明目标平台和视口 | MUST |
| UAES-05-010-003 | 必须关联 Token 和组件 | MUST |
| UAES-05-010-004 | 必须记录关键交互状态 | MUST |
| UAES-05-010-005 | 设计差异必须分类 | MUST |
| UAES-05-010-006 | 未批准差异不能自动视为符合规范 | MUST NOT |

## 8. Verification

- 设计资产元数据检查。
- 设计与组件映射检查。
- Token 引用检查。
- 设计交付完整性检查。
- 视觉回归检查。
- 差异审批记录检查。

## 9. Acceptance Criteria

设计交付可以明确追踪到实现、组件、Token、测试和验收结果。

## 10. Related Standards

UAES-05-001、UAES-05-002、UAES-05-006、UAES-05-011、UAES-05-013。
