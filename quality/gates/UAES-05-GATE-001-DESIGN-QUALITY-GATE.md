# UAES-05-GATE-001 — Design Quality Gate

| Field | Value |
|---|---|
| Gate ID | UAES-05-GATE-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Owner | Design System Owner |
| Execution | CI + Local + AI Task Verification |

## 1. Purpose

确保所有 UI 变更符合 UTER Design System 和 UAES 设计工程标准。

## 2. Gate Levels

- G0：输入和规范完整性。
- G1：Token 与设计资产。
- G2：组件契约。
- G3：交互和响应式。
- G4：无障碍。
- G5：视觉回归。
- G6：AI 执行证据和交付。

## 3. Mandatory Checks

| ID | 检查项 | 级别 | 通过条件 |
|---|---|---|---|
| DQ-001 | 设计上下文加载 | BLOCKER | 规范版本已确认 |
| DQ-002 | Token Schema | BLOCKER | Schema 校验通过 |
| DQ-003 | Token 引用解析 | BLOCKER | 无缺失和循环 |
| DQ-004 | 硬编码样式 | BLOCKER | 无未经批准的硬编码 |
| DQ-005 | 主题完整性 | BLOCKER | 必需主题 Token 完整 |
| DQ-006 | 色彩对比度 | BLOCKER | 满足适用 WCAG 要求 |
| DQ-007 | 字体体系 | BLOCKER | 使用登记字体和文本样式 |
| DQ-008 | 间距与层级 | MAJOR | 无未批准设计分支 |
| DQ-009 | 组件注册 | BLOCKER | 正式组件有契约 |
| DQ-010 | 组件状态 | BLOCKER | 适用状态覆盖完整 |
| DQ-011 | 交互语义 | BLOCKER | 语义和行为符合契约 |
| DQ-012 | 键盘操作 | BLOCKER | 关键任务可键盘完成 |
| DQ-013 | 焦点管理 | BLOCKER | 焦点可见且顺序合理 |
| DQ-014 | 表单错误反馈 | MAJOR | 错误明确且可识别 |
| DQ-015 | 触摸目标 | MAJOR | 满足 WCAG 2.2 目标尺寸要求 |
| DQ-016 | 响应式布局 | BLOCKER | 目标视口无关键破坏 |
| DQ-017 | 内容溢出 | MAJOR | 无非预期裁切和横向溢出 |
| DQ-018 | Reduced Motion | MAJOR | 用户运动偏好得到尊重 |
| DQ-019 | 设计资产来源 | BLOCKER | 资产来源和授权明确 |
| DQ-020 | 资产映射 | MAJOR | 关键资产映射可追踪 |
| DQ-021 | 视觉回归 | BLOCKER | 无未批准的关键差异 |
| DQ-022 | 基准变更审批 | BLOCKER | 更新有审批证据 |
| DQ-023 | 组件测试 | BLOCKER | 受影响组件测试通过 |
| DQ-024 | 生成产物一致性 | BLOCKER | Token 生成产物无漂移 |
| DQ-025 | AI 执行报告 | BLOCKER | 变更与验证证据完整 |

## 4. Execution Rules

- PR 必须执行与变更范围匹配的检查。
- Token 或基础组件变更必须扩大影响范围检查。
- 全局主题变更必须执行全局色彩和视觉检查。
- 页面布局变更必须执行目标视口测试。
- 视觉基准更新必须提供差异截图和审批记录。
- 无法执行的检查标记 NOT_RUN，不得标记 PASS。

## 5. Gate Result

- PASS：所有 BLOCKER 和 MAJOR 检查通过。
- FAIL：存在已确认的阻断或严重问题。
- BLOCKED：缺少必要输入、权限或环境。
- NOT_RUN：未执行。
- NOT_APPLICABLE：有明确理由不适用。

WARNING 不直接阻断，但必须记录和跟踪。

## 6. Prohibited Practices

- 不得通过删除测试绕过 Gate。
- 不得以截图人工确认代替 Token 和无障碍检查。
- 不得以自动化无错误代替人工视觉审查。
- 不得把 NOT_RUN 当成 PASS。
- 不得由执行修复的 AI 自行伪造审批。

## 7. Acceptance

Gate 必须在 CI 中可执行，输出机器可读报告，且每项结果可追踪到具体证据。

## 8. References

UAES-05-001 至 UAES-05-013、UAES-09。
