# UAES-05-008 — RESPONSIVE DESIGN

**Standard ID:** UAES-05-008  
**Standard Name:** Responsive Design  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立适用于 PC Web、H5、Electron 及未来移动平台的响应式布局规范。

## 2. Design Principle

响应式设计应根据内容和布局需求决定断点，而不是只根据设备名称决定。

必须考虑：

- Viewport Width
- Viewport Height
- Device Pixel Ratio
- Input Method
- Orientation
- Content Density
- Touch Target
- Safe Area

## 3. Breakpoint Baseline

以下作为初始候选断点，不是对所有页面的强制固定值：

| Token | Width |
| --- | --- |
| breakpoint.sm | 640px |
| breakpoint.md | 768px |
| breakpoint.lg | 1024px |
| breakpoint.xl | 1280px |
| breakpoint.2xl | 1536px |

实际断点应由布局失效点和内容宽度决定。

## 4. Layout Adaptation

PC Web：

- 保持合理的内容最大宽度。
- 导航和侧栏行为明确。
- 数据密集型界面优先保证可读性。
- 不应为了响应式破坏主要操作路径。

H5：

- 优先保证主要任务可完成。
- 合理调整导航结构。
- 表格可以采用横向滚动、卡片转换或重点字段展示。
- 交互控件必须考虑触摸操作。
- 避免横向溢出。

Electron：

- 必须考虑窗口缩放和最小窗口尺寸。
- 不得假定用户始终使用固定窗口大小。

## 5. Content Adaptation

必须定义：

- 内容折行。
- 图片裁切。
- 表格适配。
- 侧栏收缩。
- 导航折叠。
- 弹窗尺寸。
- 多列布局转换。
- 固定工具栏。
- 页面滚动区域。

不得简单隐藏重要业务信息来解决窄屏问题。

## 6. Touch and Pointer

触摸目标应优先达到 WCAG 2.2 AA 2.5.8 的 24 × 24 CSS px 最低要求，或满足标准规定的间距例外；对高频主要操作建议采用更大的触摸目标。

不能将鼠标 Hover 作为唯一可用交互方式。

## 7. Safe Area

H5 和原生平台需要考虑：

- 顶部安全区域。
- 底部安全区域。
- 刘海和圆角屏。
- 系统手势区域。
- 软键盘弹出。

## 8. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-008-001 | 页面必须定义支持的视口范围 | MUST |
| UAES-05-008-002 | 必须检查横向溢出 | MUST |
| UAES-05-008-003 | 必须验证关键断点 | MUST |
| UAES-05-008-004 | 重要内容不能仅为适配窄屏而丢失 | MUST |
| UAES-05-008-005 | 必须考虑触摸操作 | MUST |
| UAES-05-008-006 | 必须考虑安全区域 | MUST |
| UAES-05-008-007 | 禁止依赖 Hover 作为唯一操作方式 | MUST NOT |

## 9. Verification

至少验证：

- 640px。
- 768px。
- 1024px。
- 1280px。
- 1440px。
- 1920px。
- 常见移动视口。
- 横屏和纵屏。
- 窗口缩放。
- 软键盘弹出场景。

具体测试视口应按实际页面适用范围调整。

## 10. Acceptance Criteria

关键页面在目标视口下无不可接受的横向溢出、内容遮挡、交互不可用和信息丢失问题。

## 11. Related Standards

UAES-05-005、UAES-05-006、UAES-05-007、UAES-05-009、UAES-05-011。
