# UAES-05-002 — Design Token Architecture

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-002 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立跨设计工具、Web、H5、Electron 和未来原生平台的 Token 单一事实源。

## 2. Scope

颜色、字体、字号、字重、行高、间距、尺寸、圆角、边框、阴影、透明度、动效、层级和主题。

## 3. Definitions

- Primitive Token：原始设计值。
- Semantic Token：具有明确用途的语义值。
- Component Token：组件专属 Token。
- Alias：指向其他 Token 的引用。
- Generated Token：由源 Token 生成的运行时产物。

## 4. Core Principles

Token Source First、Semantic Naming、Alias Reuse、Platform Transformation、Deterministic Build。

## 5. Mandatory Requirements

- UAES-05-002-001 MUST 维护唯一权威 Token 源目录。
- UAES-05-002-002 MUST 使用稳定的机器可读格式。
- UAES-05-002-003 MUST 为 Token 声明名称、类型、值和用途说明。
- UAES-05-002-004 MUST 区分 Primitive、Semantic 和 Component Token。
- UAES-05-002-005 MUST 校验所有 Alias 引用存在且无循环。
- UAES-05-002-006 MUST 为主题差异使用明确的主题层级，不得复制整套 Token 后失去关联。
- UAES-05-002-007 MUST 对生成产物执行确定性构建。
- UAES-05-002-008 MUST 标记弃用 Token，并提供替代项。
- UAES-05-002-009 MUST 禁止业务组件引用未登记的设计变量。
- UAES-05-002-010 MUST 将平台特有值标记为 platform-specific，并说明原因。

## 6. Implementation Rules

推荐层级：

```
primitive/
  color/
  spacing/
  typography/
  radius/
  border/
  motion/

semantic/
  surface/
  text/
  border/
  action/
  feedback/
  focus/

component/
  button/
  input/
  dialog/
  navigation/
```

Web CSS、TypeScript 类型和其他平台资源由源 Token 生成。生成文件应注明生成工具、版本和源文件。

## 7. Prohibited Practices

- MUST NOT 在多个目录维护互相独立的品牌色源。
- MUST NOT 手工修改生成文件。
- MUST NOT 在语义 Token 中重复写入可直接引用的 Primitive 值。
- MUST NOT 用组件 Token 替代全局语义 Token。
- MUST NOT 在没有说明的情况下使用任意数字和色值。

## 8. AI Execution Rules

AI 修改视觉样式前必须检索 Token。没有合适 Token 时，应提出新增 Token 方案，不得擅自把局部硬编码包装成正式规范。

## 9. Verification

执行 Schema、别名解析、循环引用检测、未使用 Token 检测、硬编码样式检测和生成一致性检查。

## 10. Acceptance Criteria

Token 可解析、无循环引用、无未登记引用、生成结果可重复，且 Web 运行时代码使用生成产物。

## 11. Exceptions

临时实验 Token 必须处于明确的实验命名空间，并设置 Owner 和清理期限。

## 12. References

Design Tokens Community Group Format Module 2025.10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
