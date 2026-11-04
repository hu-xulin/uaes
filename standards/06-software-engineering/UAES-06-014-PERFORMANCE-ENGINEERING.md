# UAES-06-014 — Performance Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-014 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-09 |

## 1. Purpose

建立代码层面的性能设计、测量和优化规则。

## 2. Scope

后端接口、数据库访问、缓存、并发、前端渲染、资源加载和 Electron 启动。

## 3. Definitions

- **Performance Budget**：性能预算。
- **Hot Path**：高频或关键执行路径。
- **Profiling**：性能剖析。
- **Regression**：性能退化。

## 4. Core Principles

Measure First、Optimize Evidence-based、Bounded Resource、User-perceived Performance。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-014-001 | MUST 为关键路径定义性能目标或预算。 |
| UAES-06-014-002 | MUST 在优化前建立测量基线。 |
| UAES-06-014-003 | MUST 避免未经测量的复杂缓存和预优化。 |
| UAES-06-014-004 | MUST 控制数据库查询次数和数据加载规模。 |
| UAES-06-014-005 | MUST 控制并发和队列积压。 |
| UAES-06-014-006 | MUST 避免前端不必要的重复渲染和大型资源加载。 |
| UAES-06-014-007 | MUST 评估 Electron 启动和内存开销。 |
| UAES-06-014-008 | MUST 记录性能优化前后的数据。 |
| UAES-06-014-009 | MUST 避免以性能优化破坏正确性、安全性或可访问性。 |
| UAES-06-014-010 | MUST 为重要性能退化设置检测机制。 |

## 6. Implementation Rules

Go：

- 使用 Benchmark、Profile 和 Trace 等手段定位瓶颈。
- 控制内存分配、锁竞争和 Goroutine 数量。
- 对数据库查询执行计划进行必要分析。

Web：

- 评估 Bundle Size、资源加载、渲染和交互延迟。
- 按需加载路由和大型功能。
- 缓存策略必须明确失效条件。

Electron：

- 评估启动、IPC、内存和后台任务。

## 7. Prohibited Practices

- MUST NOT 为微小收益引入高复杂度。
- MUST NOT 用缓存掩盖数据一致性问题。
- MUST NOT 将性能优化结果只用主观感受描述。
- MUST NOT 牺牲无障碍和正确性换取表面速度。

## 8. AI Execution Rules

AI 必须先提供可复现测量，再进行优化；优化后应提供同环境的对比数据。

## 9. Verification

性能测试、Benchmark、Profile、前端性能分析由 P09 执行。

## 10. Acceptance Criteria

关键路径有性能基线，重大优化有量化证据，未引入不可接受的性能回归。

## 11. Exceptions

无基线的早期模块可先记录初始测量，再制定正式预算。

## 12. References

Go Performance Documentation、Web Vitals、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
