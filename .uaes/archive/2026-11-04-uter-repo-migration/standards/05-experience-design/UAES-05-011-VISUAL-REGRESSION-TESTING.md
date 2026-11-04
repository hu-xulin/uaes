# UAES-05-011 — VISUAL REGRESSION TESTING

**Standard ID:** UAES-05-011  
**Standard Name:** Visual Regression Testing  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-05 Experience & Design  
**Phase:** P4  
**Priority:** MUST  
**Classification:** Enterprise Engineering Standard  

---

## 1. Purpose

建立可重复、可比较、可追踪的视觉回归测试机制，避免设计变更或代码修改导致非预期视觉退化。

## 2. Test Scope

至少覆盖：

- 登录和认证页面。
- 核心产品页面。
- 主要导航。
- 表单。
- 数据表格。
- Dialog 和 Drawer。
- 主要业务操作流程。
- 错误、空状态和加载状态。
- Light / Dark 主题。
- 关键响应式视口。

## 3. Baseline Management

每个视觉基线必须记录：

- Baseline ID。
- Commit SHA。
- Browser / Runtime。
- Viewport。
- Device Scale Factor。
- Theme。
- Locale。
- Font Availability。
- Capture Route。
- Capture State。
- Baseline Owner。
- Approval Status。

基线不能随每次测试自动更新。

## 4. Deterministic Rendering

测试环境必须尽可能固定：

- 浏览器版本。
- 字体文件。
- 视口。
- 设备缩放。
- 时间和日期。
- 网络响应。
- 动画状态。
- 数据集。
- 随机值。
- 测试用户状态。

动态数据应使用稳定测试数据。

## 5. Difference Detection

至少支持：

- Pixel Difference。
- Structural Difference。
- Layout Shift Detection。
- Missing Element Detection。
- Unexpected Overflow。
- Text Wrapping Difference。

像素差异不能直接等同于设计缺陷，必须允许经过审批的动态区域屏蔽和人工复核。

## 6. Threshold Governance

视觉差异阈值必须根据页面特点定义。

禁止设置一个全局宽松阈值掩盖所有差异。

以下差异必须重点审查：

- 品牌颜色变化。
- 字体和行高变化。
- 按钮尺寸变化。
- 导航偏移。
- 页面整体布局变化。
- 关键文字缺失。
- 弹窗位置异常。
- 内容遮挡。
- 关键组件消失。

## 7. Baseline Update

更新基线必须满足：

1. 关联设计变更或缺陷修复。
2. 有变更原因。
3. 有责任人。
4. 有审批记录。
5. 有新旧差异报告。
6. 相关功能和无障碍测试通过。

AI 不得自行批准更新视觉基线。

## 8. CI Integration

建议测试流程：

```text
Build
  ↓
Start Test Environment
  ↓
Load Stable Test Data
  ↓
Render Target Routes
  ↓
Capture Screenshots
  ↓
Compare Baselines
  ↓
Generate Difference Report
  ↓
Review / Approve
  ↓
Pass or Block
```

## 9. Mandatory Rules

| Rule ID | Requirement | Level |
| --- | --- | --- |
| UAES-05-011-001 | 关键页面必须有视觉基线 | MUST |
| UAES-05-011-002 | 基线必须绑定 Commit SHA | MUST |
| UAES-05-011-003 | 测试环境必须尽可能确定性 | MUST |
| UAES-05-011-004 | 必须生成差异证据 | MUST |
| UAES-05-011-005 | 基线更新必须经过审批 | MUST |
| UAES-05-011-006 | 必须检查关键响应式视口 | MUST |
| UAES-05-011-007 | 禁止 AI 未经审批覆盖基线 | MUST NOT |
| UAES-05-011-008 | 禁止通过放宽阈值隐藏真实缺陷 | MUST NOT |

## 10. Acceptance Criteria

- 关键页面基线完整。
- 截图能够重复生成。
- 差异报告可以定位问题。
- 基线变更可追踪。
- CI 能识别未批准的视觉变化。
- 动态区域处理规则明确。

## 11. Related Standards

UAES-05-002、UAES-05-003、UAES-05-004、UAES-05-006、UAES-05-007、UAES-05-008、UAES-05-009、UAES-05-010。
