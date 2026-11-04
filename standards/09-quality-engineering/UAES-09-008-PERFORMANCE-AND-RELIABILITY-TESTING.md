# UAES-09-008 — Performance and Reliability Testing

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-008 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-04, UAES-06 |

## 1. Purpose

验证系统在预期负载、峰值负载、持续运行和故障条件下的性能与可靠性。

## 2. Performance Test Types

- **Load Test**：预期负载下的性能。
- **Stress Test**：超过预期负载后的行为。
- **Spike Test**：突发流量下的行为。
- **Soak Test**：持续运行下的稳定性。
- **Capacity Test**：资源容量和扩展边界。
- **Regression Test**：性能变化对比。

## 3. Required Metrics

按适用范围记录：

- Throughput / RPS。
- Latency：P50、P90、P95、P99。
- Error Rate。
- CPU / Memory。
- Goroutine / Thread。
- Connection Pool。
- Database Query Latency。
- Cache Hit Rate。
- Queue Lag。
- Retry Rate。
- Resource Leak。
- Startup / Shutdown Time。

不得只报告平均延迟而忽略长尾延迟。

## 4. Reliability Testing

必须按风险验证：

- 依赖服务不可用。
- 数据库连接中断。
- Redis 不可用。
- 网络超时。
- 上游模型服务异常。
- 部分请求成功。
- 重试和退避。
- 进程重启。
- 任务恢复。
- 资源耗尽。
- 并发竞争。
- 优雅关闭。

## 5. Uter-Specific Performance Areas

重点评估：

- 模型请求代理与流式响应。
- Token 统计和计费路径。
- API Key 验证。
- 余额与配额检查。
- 高并发任务调度。
- Redis 缓存与数据库一致性。
- Electron 启动与 IPC。
- Web 首屏与关键交互。

## 6. Test Safety

性能测试必须使用隔离环境和测试数据。未经批准不得对生产服务进行压力、故障注入或资源耗尽测试。

## 7. AI Execution Rules

AI MUST：

- 明确负载模型和测试环境。
- 不得将本机性能结果直接等同生产容量。
- 不得隐藏资源限制和测试条件。
- 对性能回归提供可重复基准。
- 故障注入前确认授权与影响范围。

## 8. Acceptance Criteria

- 关键服务具有性能基线。
- 高风险路径有可靠性验证。
- 性能结果包含环境和负载条件。
- 长尾延迟和错误率有记录。
- 故障测试具备恢复证据。

## 9. References

UAES-04 Architecture、UAES-06 Performance Engineering、NIST SSDF。

## 10. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Performance and Reliability Testing Standard |
