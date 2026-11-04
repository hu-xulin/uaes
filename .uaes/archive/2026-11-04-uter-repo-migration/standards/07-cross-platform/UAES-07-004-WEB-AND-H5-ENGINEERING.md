# UAES-07-004 — Web & H5 Engineering

**Standard ID:** UAES-07-004  
**Standard Name:** Web & H5 Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-07 Cross-Platform Engineering  
**Phase:** P5  
**Scope:** PC Web、移动 H5、浏览器兼容  
**Classification:** Enterprise Engineering Standard

---

## 1. Mandatory Rules

- **WEB-001**：PC Web 与 H5 MUST 明确区分布局、输入方式和交互要求。
- **WEB-002**：页面 MUST 支持响应式布局，不得依赖单一固定视口。
- **WEB-003**：移动 H5 MUST 处理安全区、软键盘和可视视口变化。
- **WEB-004**：触控目标和键盘操作 MUST 分别验证。
- **WEB-005**：浏览器能力 MUST 进行检测，不得只检测 User-Agent。
- **WEB-006**：关键业务流程 MUST 支持网络失败、重试和状态恢复。
- **WEB-007**：敏感数据 MUST 避免写入不安全的浏览器存储。
- **WEB-008**：WebView 环境 MUST 视为独立运行环境进行验证。
- **WEB-009**：跨域、Cookie、SameSite、CSP 和跳转策略 MUST 明确。
- **WEB-010**：H5 页面 MUST 验证主流移动浏览器和嵌入式浏览器差异。
