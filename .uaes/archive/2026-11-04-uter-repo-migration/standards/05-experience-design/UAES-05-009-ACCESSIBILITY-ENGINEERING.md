# UAES-05-009 — ACCESSIBILITY ENGINEERING

**Standard ID:** UAES-05-009  
**Standard Name:** Accessibility Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立可感知、可操作、可理解、健壮的界面设计和工程实现要求。

## 2. Compliance Baseline

目标基线：

- WCAG 2.2 Level AA。
- 适用的 WAI-ARIA Authoring Practices。
- 平台原生无障碍语义要求。

WCAG 2.2 AA 是验收目标。实际适用性必须结合网页、Electron 和未来原生平台分别判断。

## 3. Perceivable

必须考虑：

- 文字对比度。
- 非文本对比度。
- 文本替代内容。
- 不依赖颜色传达信息。
- 内容放大。
- 合理的视觉层级。

## 4. Operable

必须考虑：

- 完整键盘操作。
- 可见焦点。
- 焦点顺序。
- 无键盘陷阱。
- 合理的触摸目标。
- 避免仅依赖 Hover。
- 合理的时间限制和动态效果。

## 5. Understandable

必须考虑：

- 表单标签明确。
- 错误信息清楚。
- 操作反馈明确。
- 导航行为一致。
- 关键操作结果可预测。

## 6. Robust

必须考虑：

- 正确的 HTML 语义。
- Accessible Name。
- Accessible Role。
- Accessible State。
- ARIA 使用符合规范。
- 动态内容通知。
- 屏幕阅读器兼容性。

优先使用原生语义元素，不得在没有必要时使用 ARIA 替代原生 HTML 行为。

## 7. Form Accessibility

每个表单控件必须具备：

- 可访问名称。
- 标签与控件关联。
- 必要的输入说明。
- 错误信息关联。
- 必要的必填状态。
- 键盘可操作性。

错误信息不能只通过红色边框表达。

## 8. Dialog and Overlay

必须检查：

- 对话框语义。
- 标题关联。
- 打开后的焦点管理。
- 关闭方式。
- 焦点恢复。
- 键盘操作。
- 背景内容的可操作性限制。

## 9. Automated and Manual Testing

自动化：

- axe 类规则扫描。
- Accessibility Tree 检查。
- 语义元素检查。
- 对比度扫描。
- Accessible Name 检查。

人工：

- 键盘全流程操作。
- 屏幕阅读器测试。
- 内容缩放。
- 关键任务可理解性。
- 错误恢复操作。

自动扫描通过不代表完全符合 WCAG。

## 10. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-009-001 | 以 WCAG 2.2 AA 为网页目标基线 | MUST |
| UAES-05-009-002 | 交互控件必须具有可访问名称 | MUST |
| UAES-05-009-003 | 关键功能必须可键盘操作 | MUST |
| UAES-05-009-004 | 焦点必须可见 | MUST |
| UAES-05-009-005 | 错误状态必须提供文本说明 | MUST |
| UAES-05-009-006 | 动态内容必须考虑辅助技术通知 | MUST |
| UAES-05-009-007 | 自动扫描不能代替人工验收 | MUST |
| UAES-05-009-008 | 禁止滥用 ARIA 破坏原生语义 | MUST NOT |

## 11. Acceptance Criteria

- 关键任务可使用键盘完成。
- 关键页面完成自动无障碍扫描。
- 重要组件具有可访问名称和状态。
- 表单错误可以被辅助技术识别。
- 焦点管理正确。
- 关键页面通过规定的人工辅助技术测试。
- 所有已知 P0 无障碍缺陷均已处理或正式阻断发布。

## 12. Related Standards

UAES-05-003、UAES-05-004、UAES-05-006、UAES-05-007、UAES-05-008、UAES-05-011。

P4-D：设计交付、视觉回归与 AI 执行治理

这部分解决设计工程中最容易产生长期偏差的几个问题：设计稿与代码不同步、Token 被局部覆盖、AI 每次生成不同风格、视觉回归没有稳定基线，以及设计变更无法追踪。
