# UAES-P05-ACCEPTANCE-BASELINE — Experience & Design Acceptance Baseline

| Field | Value |
|---|---|
| Baseline ID | UAES-P05-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-05 |

## A. Governance Acceptance

- Design System Owner 已确定。
- 设计系统版本和状态管理机制已建立。
- 设计变更流程和审批机制已建立。
- 例外管理已关联 UAES-00。
- 设计系统历史版本可追踪。

## B. UTER Design System 3.0 Audit

- 已审查现有 Design System 3.0 文档。
- 已审查现有 React 组件。
- 已审查当前颜色 Token。
- 已审查字体与字号体系。
- 已审查间距、边框、圆角和阴影。
- 已审查导航、表单、表格、弹窗等交互。
- 已记录规范与实际实现之间的差异。
- 已形成整改清单。

## C. Token Engineering

- Token 唯一源目录已建立。
- Primitive / Semantic / Component 分层完成。
- Token Schema 校验通过。
- Alias 引用解析通过。
- 无循环引用。
- 浅色主题完整。
- 深色主题完整。
- Web 运行时 Token 已生成。
- 生成产物可重复构建。
- 未登记硬编码样式扫描通过。

## D. Color and Typography

- 品牌色与语义色分离。
- 全部必要文本组合达到对比度要求。
- 非文本对比度检查完成。
- 导航选中态 4.44:1 问题已整改并复测。
- Inter 和思源黑体加载与回退验证完成。
- 正文 14px、最小字号 12px 等现有基线完成核验。
- 长文本行高和排版通过可读性评审。
- 深色主题完成检查。

## E. Component Engineering

- 正式组件均有唯一 ID。
- 正式组件均有 Component Contract。
- Props、Variants、Slots 定义完整。
- 必要状态已覆盖。
- 组件注册表与实际代码映射一致。
- 不存在未经批准的平行基础组件。
- 关键组件具备单元和交互测试。

## F. Interaction Engineering

- 导航模式一致。
- 表单校验和错误反馈一致。
- 表格交互规则一致。
- 对话框焦点管理正确。
- 加载、空、错误和成功状态完整。
- 危险操作有适当确认。
- 重复提交得到保护。
- 关键业务交互有失败恢复策略。

## G. Responsive Acceptance

- PC Web 代表性视口通过。
- H5 代表性视口通过。
- Electron 窗口缩放通过。
- 320 CSS px 窄视口检查完成。
- 关键内容不存在非预期裁切。
- 关键任务在目标设备可完成。
- 软键盘和触摸交互通过。
- 不存在未批准的功能隐藏。

## H. Accessibility Acceptance

- WCAG 2.2 AA 自动化检查完成。
- 键盘操作检查完成。
- 焦点可见性检查完成。
- 屏幕阅读器抽样测试完成。
- 图片替代文本检查完成。
- 表单标签和错误提示检查完成。
- 文本放大和重排检查完成。
- 触摸目标尺寸检查完成。
- Reduced Motion 检查完成。
- 无未解决的阻断级问题。

## I. Design-to-Code Sync

- Token 源文件和运行时产物映射明确。
- 设计资产来源和授权明确。
- 设计资产与代码组件映射完成。
- 生成工具和版本已记录。
- 设计漂移检查机制已建立。
- 生成失败不会破坏有效产物。

## J. Visual Regression

- 关键页面基准截图建立。
- 关键组件状态截图建立。
- PC/H5 代表性视口基准建立。
- 截图环境固定。
- 视觉差异报告可生成。
- 基准更新有审批机制。
- 视觉回归可在 CI 执行。

## K. AI Design Execution

- AI 能加载设计系统规范。
- AI 能查询组件注册表。
- AI 能正确使用语义 Token。
- AI 不会擅自创造品牌规范。
- AI 能完成响应式页面实现。
- AI 能识别无障碍问题。
- AI 能执行视觉回归。
- AI 能生成完整设计执行报告。

## L. Negative Tests

必须验证以下失败场景：

1. 未登记色值进入业务组件。
2. Token 引用不存在。
3. Token 存在循环引用。
4. 普通文字对比度低于 4.5:1。
5. 组件缺少必需状态。
6. 交互控件无法键盘操作。
7. Dialog 关闭后焦点丢失。
8. 移动视口出现关键内容裁切。
9. 视觉基准被未经批准更新。
10. 生成文件被手工修改。
11. 设计资产来源或授权未知。
12. AI 绕过已有组件自行复制基础组件。
13. AI 将未执行的检查报告为 PASS。

每个负面测试必须验证系统能够识别并按规则阻断或告警。

## M. Final Acceptance

以下全部满足才允许将 P05 从 DRAFT 转为 APPROVED：

- 文档完整。
- Schema 实际验证通过。
- Token 工具实际运行。
- 组件注册表与代码一致。
- Design Quality Gate 已实现。
- CI 执行成功。
- 关键无障碍测试通过。
- 关键视觉回归通过。
- AI 实战测试通过。
- 所有 BLOCKER 问题关闭。
- Owner 和相关审批人完成正式批准。

## N. Current Status

| 项目 | 当前状态 |
|---|---|
| P05 标准文档 | 已交付 |
| Schema | 已提供，未执行实际校验 |
| Token 工具 | 未实施验证 |
| Component Registry | 未实施验证 |
| Design Quality Gate | 已定义，未实现 |
| CI 集成 | 未实施 |
| 现有 Design System 3.0 审计 | 未执行 |
| 视觉回归 | 未执行 |
| 无障碍实测 | 未执行 |
| AI 实战验收 | 未执行 |
| 正式批准 | 未批准 |

当前结论：P05 文档设计交付完成，工程实施与正式验收仍为 NOT_RUN。
