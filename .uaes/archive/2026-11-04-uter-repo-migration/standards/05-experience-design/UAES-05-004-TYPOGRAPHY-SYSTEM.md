# UAES-05-004 — TYPOGRAPHY SYSTEM

**Standard ID:** UAES-05-004  
**Standard Name:** Typography System  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立统一的字体族、字号、字重、行高、字距、文本语义和跨平台字体回退体系。

## 2. Font Family

Uter 默认字体：

- Latin / English / Numerals：Inter。
- Chinese：Source Han Sans（思源黑体）。
- Fallback：系统无衬线字体。

CSS 示例：

```css
font-family:
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  system-ui,
  sans-serif;
```

实际字体文件、授权、加载方式和平台回退必须在工程实施阶段核验。

## 3. Typography Scale

基础字号：

| Token | Size | Weight | Line Height | Usage |
| --- | --- | --- | --- | --- |
| display | 36px | 600 | 44px | 特殊展示 |
| page-title | 30px | 600 | 38px | 页面标题 |
| section-title | 24px | 600 | 32px | 页面区块标题 |
| card-title | 18px | 600 | 26px | 卡片标题 |
| group-title | 16px | 600 | 24px | 分组标题 |
| body-long | 16px | 400 | 26px | 长文本 |
| body | 14px | 400 | 22px | 正文 |
| body-medium | 14px | 500 | 22px | 强调正文 |
| label | 13px | 500 | 20px | 表单标签 |
| caption | 12px | 400 | 18px | 辅助信息 |
| micro | 12px | 500 | 16px | 紧凑元数据 |

以上为初始设计基线。实际字体渲染需要通过中英文混排、数字、标点和不同平台截图验证。

## 4. Minimum Font Size

Uter 常规产品界面最小字号为 12px。

禁止为了容纳内容而任意缩小字号。

空间不足时优先：

1. 调整布局。
2. 优化信息层级。
3. 调整容器宽度。
4. 允许合理换行。
5. 使用折叠或渐进披露。

不得将重要正文缩小到 12px 以下。

## 5. Font Weight

统一映射：

- 400：Regular。
- 500：Medium。
- 600：SemiBold。
- 700：Bold，仅在明确需要时使用。

禁止同一语义层级混用多个字重。

## 6. Line Height

所有专用字号必须明确行高。

禁止只定义 font-size 而不定义 line-height。

行高必须同时考虑：

- 中文字符高度。
- 英文小写字母。
- 数字。
- 上下标。
- 多行文本。
- 表单和按钮垂直对齐。

## 7. Typography Semantic Roles

必须定义：

- typography.display
- typography.page-title
- typography.section-title
- typography.card-title
- typography.group-title
- typography.body
- typography.body-long
- typography.label
- typography.caption

组件必须引用语义角色，不得自行拼装一组相似但不一致的字号。

## 8. Text Behavior

必须明确：

- 单行截断。
- 多行截断。
- 自动换行。
- 长 URL 换行。
- 中英文混排。
- 数字对齐。
- 金额和 Token 数值展示。
- 错误提示换行。
- 辅助说明换行。

禁止使用固定高度裁切重要文本。

## 9. Responsive Typography

响应式字号变化必须经过设计批准。

不允许每个页面独立定义一套媒体查询字号。

## 10. Accessibility

- 重要文本不能只靠颜色表达层级。
- 文本放大时不得发生不可恢复的遮挡。
- 用户设置的字体缩放应尽可能得到支持。
- 重要信息不能因固定高度而被裁切。

## 11. Verification

自动检查：

- Token 引用。
- 字号下限。
- 字重合法性。
- 行高定义。
- 字体回退。
- 关键视口溢出。
- 文字放大后的布局异常。

## 12. Acceptance Criteria

- 字体族统一。
- 字号和行高完整。
- 最小字号约束可检测。
- 关键页面中英文混排正常。
- 重要文本支持合理换行。
- 不存在未经批准的局部字号体系。

## 13. Related Standards

UAES-05-002、UAES-05-005、UAES-05-006、UAES-05-008、UAES-05-009、UAES-05-011。
