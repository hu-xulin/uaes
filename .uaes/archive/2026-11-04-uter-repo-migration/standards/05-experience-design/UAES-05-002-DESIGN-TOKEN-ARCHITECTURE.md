# UAES-05-002 — DESIGN TOKEN ARCHITECTURE

**Standard ID:** UAES-05-002  
**Standard Name:** Design Token Architecture  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立跨设计工具、Web、H5、Electron 和未来原生平台的统一 Token 架构。

## 2. Token Architecture

必须区分三个层级：

### 2.1 Primitive Tokens

表达基础值，不直接表达业务用途。

示例：

- color.blue.600
- color.slate.900
- spacing.4
- radius.8
- font.size.14

### 2.2 Semantic Tokens

表达实际使用语义。

示例：

- color.text.primary
- color.text.secondary
- color.surface.default
- color.surface.elevated
- color.border.default
- color.action.primary
- spacing.component.gap
- typography.body.default

### 2.3 Component Tokens

表达特定组件的设计值。

示例：

- button.primary.background
- button.primary.text
- input.border.focus
- dialog.surface
- navigation.item.selected.background

Component Token 必须引用 Primitive 或 Semantic Token，不得复制一套独立数值体系。

## 3. Source of Truth

必须建立唯一权威 Token 源文件。

建议使用 DTCG 2025.10 兼容格式：

```text
design-system/tokens/
├── primitives.json
├── semantic.json
├── components.json
└── themes/
    ├── light.json
    └── dark.json
```

该目录是建议目标结构，实施前需要根据实际仓库进行确认。

禁止将 CSS Variables、Tailwind 配置和 TypeScript 常量分别作为互不关联的权威来源。

它们应由 Token 源数据生成，或通过可验证的同步机制维护。

## 4. Naming Convention

统一采用：

```text
{category}.{role}.{variant}.{state}
```

例如：

- color.text.primary
- color.action.primary.hover
- color.border.strong
- button.primary.background.disabled

规则：

1. 使用小写英文。
2. 使用点号分层。
3. 不使用页面名称作为全局 Token 名。
4. 不使用无语义的随机编号。
5. 不重复创建含义相同的 Token。
6. 状态 Token 必须明确状态含义。

## 5. Alias Rules

允许 Token 引用其他 Token。

示例：

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.slate.900}"
      }
    }
  }
}
```

必须保证：

- 引用目标存在。
- 不存在循环引用。
- 类型一致。
- 不存在跨主题无效引用。
- 生成结果可以确定。

## 6. Theme Architecture

至少支持：

- Light
- Dark

未来可以扩展：

- High Contrast
- Brand Variant
- Platform Variant

主题切换只能改变主题映射，不得通过复制完整组件代码实现。

## 7. Token Type Governance

| 类型 | 使用范围 |
| --- | --- |
| color | 颜色 |
| dimension | 尺寸 |
| spacing | 间距 |
| fontFamily | 字体族 |
| fontWeight | 字重 |
| fontSize | 字号 |
| duration | 动画时长 |
| cubicBezier | 缓动曲线 |
| strokeStyle | 描边样式 |
| shadow | 投影 |

实际 DTCG 类型和扩展类型必须按 2025.10 规范及转换工具能力验证，不得假定任意自定义类型均可被所有工具识别。

## 8. Platform Output

统一 Token 数据源应能够生成：

- CSS Custom Properties
- TypeScript Token Types
- Tailwind Theme Integration
- Electron Renderer Styles
- Android Resource Mapping
- iOS Resource Mapping
- HarmonyOS Resource Mapping

不同平台可以拥有独立的生成器，但不能拥有互相矛盾的设计语义。

## 9. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-002-001 | 必须有唯一 Token 源数据 | MUST |
| UAES-05-002-002 | 必须区分三层 Token | MUST |
| UAES-05-002-003 | 必须采用统一命名规则 | MUST |
| UAES-05-002-004 | 必须校验 Token 引用 | MUST |
| UAES-05-002-005 | 必须支持主题映射 | MUST |
| UAES-05-002-006 | 必须校验跨平台生成结果 | MUST |
| UAES-05-002-007 | 禁止业务组件随意硬编码设计值 | MUST NOT |
| UAES-05-002-008 | 禁止存在循环 Token 引用 | MUST NOT |
| UAES-05-002-009 | 禁止未经批准创建重复语义 Token | MUST NOT |

## 10. Token Change Process

每次 Token 变更必须记录：

- Token ID
- 原始值
- 新值
- 变更原因
- 受影响组件
- 受影响页面
- 受影响主题
- 受影响平台
- 视觉回归结果
- 迁移要求

## 11. Verification

自动检查：

- JSON 结构和 Schema。
- Token 类型合法性。
- Token 命名。
- 引用存在性。
- 循环引用。
- 重复语义。
- 主题完整性。
- 平台生成成功。
- 未登记 Token。
- 废弃 Token 使用情况。

## 12. Acceptance Criteria

- 权威 Token 源数据存在。
- Token 三层结构清晰。
- Token Schema 校验通过。
- 主题映射有效。
- 平台生成产物可复现。
- Token 变更可追踪。
- 不存在未处理的循环引用和悬空引用。

## 13. External Specification

基准格式：Design Tokens Community Group Specification 2025.10。

该规范为跨设计工具和代码平台共享 Token 提供格式基础，但不能替代 Uter 自身的命名、治理、语义和验收约束。

## 14. Related Standards

UAES-05-001、UAES-05-003、UAES-05-004、UAES-05-005、UAES-05-006、UAES-05-012。
