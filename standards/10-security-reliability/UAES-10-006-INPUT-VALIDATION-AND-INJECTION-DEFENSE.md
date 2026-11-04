# UAES-10-006 — Input Validation and Injection Defense

| Field | Value |
| --- | --- |
| ID | UAES-10-006 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Input Validation

所有外部输入 MUST 在服务端验证：

- 类型；
- 长度；
- 格式；
- 范围；
- 枚举；
- 编码；
- 业务状态；
- 资源归属；
- 允许的协议和目标。

采用允许列表（Allowlist）优先。不得仅依赖黑名单过滤。

## 2. Injection Defense

- **SQL**：使用参数化查询或安全 ORM API。
- **Shell**：避免拼接命令；优先直接调用 API；必须执行时使用固定命令和参数白名单。
- **HTML**：使用上下文安全编码和可靠的 Sanitizer。
- **JavaScript**：避免动态执行不可信字符串。
- **Template**：禁止不可信模板表达式进入执行上下文。
- **Path**：规范化路径并限制在允许根目录。
- **LDAP/NoSQL**：使用对应安全参数化机制。
- **Deserialization**：拒绝不可信对象类型和不必要的多态反序列化。

## 3. SSRF

URL 抓取和外部请求必须：

- 限定协议；
- 校验主机名；
- 解析并检查 IPv4/IPv6 地址；
- 阻止 loopback、link-local、私网和云元数据地址，除非有明确授权的内部用途；
- 控制 DNS Rebinding；
- 禁止或重新验证重定向；
- 限制端口、响应大小、连接时间和总超时；
- 避免把内部网络响应泄漏给调用者。

## 4. File Security

文件上传必须限制：

- 文件大小；
- 文件类型；
- 文件名；
- 文件内容；
- 存储位置；
- 下载权限；
- 病毒/恶意内容检测（适用时）。

不得仅通过扩展名判断文件类型。上传文件不得默认拥有可执行权限。

## 5. Output Encoding

所有动态输出必须按 HTML、Attribute、URL、JavaScript、CSS 等上下文使用正确编码。富文本必须经过明确的 Sanitization Policy。

## 6. Negative Tests

SQLi、XSS、路径穿越、命令注入、SSRF、恶意重定向、超大请求、畸形编码和多态反序列化必须有负面测试。

## 7. Acceptance

外部输入均有验证边界；注入测试通过；高风险输入处理逻辑有独立测试。
