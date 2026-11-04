# UAES-05-012 — AI DESIGN EXECUTION

**Standard ID:** UAES-05-012  
**Standard Name:** Ai Design Execution  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

规定 AI 在设计分析、界面生成、组件实现、样式修改、视觉修复和设计系统维护中的行为。

目标是让 AI 严格执行既定设计体系，而不是每次任务都重新创造一套 UI 风格。

## 2. Required Context

AI 开始设计任务前必须获取：

1. 当前项目设计系统版本。
2. Token 权威来源。
3. 目标主题。
4. 字体体系。
5. 目标平台和视口。
6. 组件注册表。
7. 相关组件契约。
8. 相关页面和现有实现。
9. 无障碍约束。
10. 视觉回归基线。

如果缺少必要上下文，AI 必须明确标注未知内容，不能将猜测作为设计事实。

## 3. Execution Workflow

```text
Receive Task
    ↓
Read Design System
    ↓
Read Tokens and Component Registry
    ↓
Inspect Existing Implementation
    ↓
Identify Reusable Components
    ↓
Analyze Responsive and Accessibility
    ↓
Create Implementation Plan
    ↓
Implement
    ↓
Run Type / Lint / Unit Tests
    ↓
Run Accessibility Tests
    ↓
Run Visual Regression
    ↓
Generate Evidence
    ↓
Submit for Review
```

## 4. Design Decision Classification

AI 必须区分：

- APPROVED_RULE：已批准规则。
- PROJECT_FACT：已确认项目事实。
- EXISTING_IMPLEMENTATION：现有代码实现。
- AI_PROPOSAL：AI 提出的建议。
- UNCONFIRMED_ASSUMPTION：未确认假设。
- EXCEPTION：经批准的例外。

禁止将 AI_PROPOSAL 当作 APPROVED_RULE。

## 5. Prohibited Actions

AI 不得：

- 擅自修改品牌色。
- 擅自修改字体体系。
- 擅自修改字号等级。
- 擅自增加全局颜色。
- 擅自建立新的间距体系。
- 擅自绕过组件库。
- 使用随机样式值修补布局。
- 删除无障碍属性。
- 破坏键盘交互。
- 无证据更新视觉基线。
- 将未验证的视觉结果报告为通过。
- 将局部页面风格扩展成全局设计规则。

## 6. Existing Component Priority

AI 选择组件时：

1. 优先使用现有合规公共组件。
2. 如果现有组件可以扩展，优先通过新增变体扩展。
3. 如果存在实质不同的交互契约，才建立新组件。
4. 如果设计系统缺少必要能力，提出规范变更建议。
5. 经过审批后再修改权威 Token 或公共组件契约。

## 7. Visual Fix Workflow

AI 修复视觉问题必须：

1. 复现问题。
2. 识别对应设计规则。
3. 确认问题来源。
4. 检查 Token 和组件。
5. 确定最小修改范围。
6. 实施修复。
7. 检查相关页面。
8. 运行视觉回归。
9. 检查无障碍。
10. 输出修复证据。

禁止仅凭单张截图进行大范围样式替换。

## 8. Multi-Agent Coordination

多个 Agent 同时修改设计系统时：

- Token Owner 负责 Token 变更。
- Component Owner 负责组件契约。
- Page Owner 负责页面实现。
- Test Owner 负责视觉和无障碍测试。

共享 Token 和组件文件必须指定唯一修改负责人，避免并发覆盖。

## 9. AI Output Requirements

AI 交付报告必须包括：

- Task ID。
- Design System Version。
- Changed Files。
- Changed Tokens。
- Changed Components。
- Affected Pages。
- Affected Platforms。
- Accessibility Results。
- Responsive Results。
- Visual Regression Results。
- Unresolved Risks。
- Approval Requirements。

## 10. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-012-001 | AI 必须先读取设计规范 | MUST |
| UAES-05-012-002 | AI 必须检查现有组件 | MUST |
| UAES-05-012-003 | AI 必须使用批准 Token | MUST |
| UAES-05-012-004 | AI 必须区分事实与建议 | MUST |
| UAES-05-012-005 | AI 必须提供验证证据 | MUST |
| UAES-05-012-006 | AI 不得自行批准设计规则 | MUST NOT |
| UAES-05-012-007 | AI 不得未经审批修改视觉基线 | MUST NOT |
| UAES-05-012-008 | AI 不得隐瞒未通过的检查 | MUST NOT |

## 11. Acceptance Criteria

AI 在实际任务中能够：

- 准确读取设计上下文。
- 复用现有组件。
- 使用正确 Token。
- 不随意创造设计规则。
- 完成规定测试。
- 提交变更证据。
- 明确未解决风险。

## 12. Related Standards

UAES-01、UAES-03、UAES-05、UAES-05-001、UAES-05-002、UAES-05-006、UAES-05-009、UAES-05-011、UAES-05-013。
