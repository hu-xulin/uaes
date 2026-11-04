# UAES-05-005 — LAYOUT AND SPACING SYSTEM

**Standard ID:** UAES-05-005  
**Standard Name:** Layout And Spacing System  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

统一页面容器、网格、间距、尺寸、圆角、边框和表面层级。

## 2. Spacing Scale

采用 4px 为基础单位：

| Token | Value |
| --- | --- |
| space.0 | 0px |
| space.1 | 4px |
| space.2 | 8px |
| space.3 | 12px |
| space.4 | 16px |
| space.5 | 20px |
| space.6 | 24px |
| space.8 | 32px |
| space.10 | 40px |
| space.12 | 48px |
| space.16 | 64px |
| space.20 | 80px |
| space.24 | 96px |

特殊场景可以使用额外尺寸，但必须说明原因并注册 Token。

## 3. Layout Tokens

至少定义：

- layout.page.padding
- layout.content.max-width
- layout.sidebar.width
- layout.sidebar.collapsed-width
- layout.header.height
- layout.content.gap
- layout.section.gap
- layout.grid.gap

具体数值应通过真实页面审查后确定，不得在没有依据时假定所有页面共享同一个固定宽度。

## 4. Border

默认边框原则：

- 主要边界使用 1px。
- 默认边框必须具有足够可见性。
- Focus 状态使用独立焦点样式。
- Disabled 状态不能仅依赖透明度降低。

## 5. Radius

必须建立统一圆角阶梯：

- radius.none
- radius.xs
- radius.sm
- radius.md
- radius.lg
- radius.xl
- radius.full

实际尺寸由 Token 文件确定，组件不能随意定义圆角。

## 6. Surface Hierarchy

主要层级：

1. Canvas
2. Default Surface
3. Subtle Surface
4. Elevated Surface
5. Overlay

优先通过背景、边框和间距建立层级，不以叠加阴影替代布局设计。

## 7. Grid

页面布局必须定义：

- Columns
- Gutter
- Container Width
- Breakpoints
- Sidebar Behavior
- Content Reflow

禁止使用大量绝对定位实现常规页面布局。

## 8. Overflow

必须明确：

- 横向溢出处理。
- 表格滚动。
- 长文本换行。
- 弹窗最大高度。
- 页面滚动容器。
- 固定导航与内容区域的滚动关系。

禁止通过全局 overflow 隐藏布局缺陷。

## 9. Verification

自动检查：

- 未登记尺寸。
- 负间距。
- 非预期绝对定位。
- 横向溢出。
- 固定高度裁切。
- 断点布局。
- 组件边界和间距 Token 使用。

## 10. Acceptance Criteria

- 页面布局规则统一。
- 间距体系完整。
- 容器与网格规则明确。
- 边框与圆角 Token 统一。
- 不存在未解释的布局溢出。
- 页面能够适配规定视口。

## 11. Related Standards

UAES-05-002、UAES-05-004、UAES-05-006、UAES-05-008、UAES-05-011。
