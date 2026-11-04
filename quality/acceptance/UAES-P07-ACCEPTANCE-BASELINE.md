# UAES-P07-ACCEPTANCE-BASELINE — Cross-Platform Acceptance Baseline

| Field | Value |
|---|---|
| Baseline ID | UAES-P07-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-07 |

## A. Platform Governance

- 平台清单已建立。
- 平台 ID 唯一。
- 平台支持状态准确。
- 最低版本明确。
- 已验证版本有证据。
- 平台能力矩阵完整。
- 已知限制已登记。

## B. Shared Core

- Domain Core 与平台实现分离。
- Application Core 与平台入口分离。
- 平台 Adapter Contract 已定义。
- 核心业务规则只有一个权威来源。
- 共享模块没有未批准的平台 API 依赖。
- Adapter 不重复实现业务规则。
- 平台能力缺失有明确处理方式。

## C. Platform Application Architecture

- 各平台 Bootstrap 明确。
- 生命周期明确。
- 配置加载顺序明确。
- 依赖装配明确。
- 应用恢复和异常退出有处理策略。
- 平台独立构建能力明确。

## D. Routing and Navigation

- 路由身份稳定。
- 路由参数经过验证。
- 权限检查独立于菜单显示。
- 登录失效行为明确。
- Deep Link 受控。
- 浏览器和系统返回行为明确。
- 导航历史和恢复行为通过验证。

## E. Responsive and Adaptive

- 断点已定义。
- 小视口布局可用。
- 中等视口布局可用。
- 大视口布局可用。
- 极端宽高比已验证。
- 窗口动态缩放已验证。
- H5 软键盘遮挡已验证。
- 移动端安全区域已验证。
- 核心功能没有因布局切换而丢失。

## F. Device and Platform API

- 平台能力接口已登记。
- 能力检测有效。
- 权限申请时机合理。
- 权限拒绝有处理。
- 权限撤销有处理。
- 不支持能力有降级。
- Electron 系统能力经受控桥接。
- 原生平台使用官方权限机制。

## G. Offline and Persistence

- 数据权威来源明确。
- 缓存和持久化区分。
- 离线支持范围明确。
- 同步状态明确。
- 重复同步具有幂等保护。
- 冲突解决策略明确。
- 账户切换数据隔离。
- 敏感数据得到保护。
- 资金业务不会因离线状态虚报成功。

## H. Device Compatibility

- 浏览器支持矩阵已建立。
- 操作系统支持范围明确。
- 关键 API 兼容性已检查。
- 模拟器和真实设备证据区分。
- 关键业务场景已覆盖。
- 已知限制有登记。
- 未验证环境明确标记。

## I. Input and Accessibility

- 键盘导航有效。
- 焦点顺序合理。
- 焦点状态可见。
- 触控目标适当。
- Hover 不是唯一入口。
- 屏幕阅读器语义有效。
- 虚拟键盘行为正确。
- 系统辅助设置得到尊重。
- 符合 UAES-05 无障碍要求。

## J. Localization

- 用户界面文案使用翻译资源。
- Locale 定义明确。
- 日期和时间格式正确。
- 时区策略明确。
- 货币代码和精度正确。
- 长文本和字体回退通过验证。
- RTL 支持范围明确。
- 缺失翻译有回退策略。

## K. Build and Packaging

- 平台构建入口明确。
- 工具链版本固定。
- 构建 Commit 可追踪。
- 构建环境可追踪。
- 正式产物签名策略明确。
- 签名密钥安全管理。
- 产物哈希记录。
- 安装和启动验证通过。

## L. AI Execution

- AI 能识别当前平台状态。
- AI 能区分共享与平台专属代码。
- AI 能识别其他平台影响。
- AI 能使用 Adapter Contract。
- AI 不会虚构原生工程。
- AI 不会把单平台测试推广到全部平台。
- AI 能正确报告 NOT_VERIFIED。
- AI 能提供平台差异和回归证据。

## M. Negative Tests

必须验证：

1. PLANNED 平台被错误标记为 SUPPORTED。
2. Shared Core 直接调用浏览器或原生 API。
3. Adapter 缺少必需能力实现。
4. 平台能力不可用时仍报告成功。
5. 用户拒绝权限后应用陷入无限请求。
6. Deep Link 使用未经验证的参数。
7. H5 软键盘遮挡关键提交按钮。
8. 移动安全区域导致关键内容被遮挡。
9. 离线请求重复同步造成重复业务操作。
10. 账户切换后读取到上一账户缓存。
11. 单台设备测试被报告为全平台兼容。
12. 模拟器结果被报告为真实设备验证。
13. 未构建原生工程却报告 Android / iOS / HarmonyOS 通过。
14. NOT_VERIFIED 被报告为 PASS。

## N. Final Acceptance

P07 转为 APPROVED 必须满足：

- 标准文件评审通过。
- 三份 Schema 验证通过。
- Platform Manifest 与真实工程一致。
- Shared Core / Adapter 边界可检查。
- 当前目标平台完成规定验收。
- H5 完成独立兼容性验收。
- Electron 完成桌面运行时验收。
- Native 平台只有在工程实际建立后才纳入 SUPPORTED 验收。
- Cross-Platform Gate 已实现并接入 CI。
- AI 实战任务通过。
- 所有阻断问题关闭或按授权正式豁免。
- Cross-Platform Engineering Owner 批准。

## O. Current Status

| 项目 | 状态 |
|---|---|
| P07 标准文档 | 已交付 |
| Platform Manifest Schema | 已提供，未验证 |
| Capability Schema | 已提供，未验证 |
| Compatibility Evidence Schema | 已提供，未验证 |
| Platform Validator | 未实现 |
| Adapter Contract Validator | 未实现 |
| Cross-Platform Gate | 已定义，未实现 |
| H5 独立验收 | 未执行 |
| Electron 跨平台验收 | 未执行 |
| Native 工程验收 | 未执行 |
| CI 集成 | 未执行 |
| AI 实战验收 | 未执行 |
| 正式批准 | 未批准 |

结论：P07 标准设计交付完成；工程实施、设备验证和正式验收尚未完成。
