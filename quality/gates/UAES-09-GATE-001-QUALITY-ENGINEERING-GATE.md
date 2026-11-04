# UAES-09-GATE-001 — Quality Engineering Gate

## 1. Metadata

| Field | Value |
|---|---|
| Gate ID | UAES-09-GATE-001 |
| Version | 1.0.0 |
| Domain | UAES-09 |
| Status | DRAFT |
| Owner | Uter Engineering Governance |
| Blocking | Yes |
| Applies To | All code changes, defect fixes, AI-generated changes and release candidates |

## 2. Gate Objective

确保代码变更在进入后续交付流程前，具备充分的审查、测试、回归和质量证据。

## 3. Gate Result

- **PASS**：全部强制检查通过。
- **FAIL**：至少一项强制检查失败。
- **BLOCKED**：关键检查无法完成。
- **NOT_RUN**：Gate 未执行。
- **NOT_VERIFIED**：缺少足够证据。

NOT_APPLICABLE 必须有理由和适用性判断记录，不得直接由 Agent 无理由设置。

## 4. Gate Preconditions

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G001 | Task ID 存在 | YES |
| QE-G002 | Base / Head SHA 已固定 | YES |
| QE-G003 | 工作区状态已检查 | YES |
| QE-G004 | 用户未提交修改得到保护 | YES |
| QE-G005 | 变更范围已确认 | YES |
| QE-G006 | 需求和架构引用已关联 | 按适用范围 |

## 5. Code Review Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G010 | 完整 Diff 已审查 | YES |
| QE-G011 | 业务规则一致性已检查 | YES |
| QE-G012 | 模块边界和依赖已检查 | YES |
| QE-G013 | 错误处理和资源生命周期已检查 | YES |
| QE-G014 | 并发、幂等和状态机已检查 | 按适用范围 |
| QE-G015 | API / Data 兼容性已检查 | 按适用范围 |
| QE-G016 | Review Finding 已登记 | YES |
| QE-G017 | Critical Finding 已验证关闭或经批准阻断处置 | YES |
| QE-G018 | High Finding 已验证关闭或经批准阻断处置 | YES |
| QE-G019 | Review 绑定 Head SHA | YES |

## 6. Test Strategy Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G020 | 测试范围已定义 | YES |
| QE-G021 | 测试风险等级已评估 | YES |
| QE-G022 | 正常路径已覆盖 | YES |
| QE-G023 | 异常和边界路径已覆盖 | 按适用范围 |
| QE-G024 | 权限和安全边界已考虑 | 按适用范围 |
| QE-G025 | 测试计划与需求可追踪 | YES |

## 7. Go Module Gate

以下四个模块必须分别核验：

| ID | Module |
|---|---|
| QE-G030 | Repository Root `.` |
| QE-G031 | `relaykit/` |
| QE-G032 | `tokenkit/` |
| QE-G033 | `tokenkit/tokenkit/` |

每个模块按项目实际脚本执行适用检查：

- Dependency Resolution。
- Unit Tests。
- Vet。
- Build。
- Coverage。
- Race Test。
- Static Analysis。

不得仅运行根目录 go test ./... 后将四个模块全部标记 PASS。

任何模块未执行时，必须单独标记 NOT_RUN 或 BLOCKED。

## 8. Web / H5 Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G040 | TypeScript Typecheck | YES |
| QE-G041 | Lint | YES |
| QE-G042 | Unit / Component Tests | 按适用范围 |
| QE-G043 | 关键页面交互测试 | 按适用范围 |
| QE-G044 | 表单与输入验证 | 按适用范围 |
| QE-G045 | 异步状态和错误处理 | 按适用范围 |
| QE-G046 | Browser Compatibility | 按适用范围 |
| QE-G047 | Build | YES |

## 9. Electron Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G050 | Main Process 测试 | 按适用范围 |
| QE-G051 | Preload API 测试 | 按适用范围 |
| QE-G052 | IPC Contract 测试 | 按适用范围 |
| QE-G053 | Renderer 测试 | 按适用范围 |
| QE-G054 | 权限和资源访问验证 | 按适用范围 |
| QE-G055 | Electron Build | YES |

## 10. Integration / Contract / Database Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G060 | API Contract | 按适用范围 |
| QE-G061 | Database Integration | 按适用范围 |
| QE-G062 | Migration Safety | 按适用范围 |
| QE-G063 | Transaction / Concurrency | 按适用范围 |
| QE-G064 | External Adapter Failure Handling | 按适用范围 |
| QE-G065 | Idempotency / Recovery | 按适用范围 |

## 11. E2E / Visual / Accessibility Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G070 | 关键业务旅程验证 | 按适用范围 |
| QE-G071 | 关键 UI 状态验证 | 按适用范围 |
| QE-G072 | Visual Regression | 设计变更时 |
| QE-G073 | Accessibility Verification | UI 变更时 |
| QE-G074 | Baseline Change Approval | 基线变化时 |

## 12. Performance / Reliability Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G080 | 性能影响分析 | 按适用范围 |
| QE-G081 | 性能回归测试 | 高风险或性能变更 |
| QE-G082 | Timeout / Retry / Recovery | 按适用范围 |
| QE-G083 | Resource Leak / Concurrency | 按适用范围 |

## 13. Security Coordination Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G090 | P10 安全要求已映射 | 按适用范围 |
| QE-G091 | 适用安全扫描已执行 | 按风险 |
| QE-G092 | Critical / High 安全 Finding 已处置 | YES |
| QE-G093 | 安全测试证据已关联 | 按适用范围 |

## 14. Defect / Regression Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G100 | 已确认缺陷均有记录 | YES |
| QE-G101 | 修复缺陷具有回归测试 | 修复任务 |
| QE-G102 | 修复后测试已执行 | 修复任务 |
| QE-G103 | 未验证缺陷未被关闭 | YES |
| QE-G104 | Flaky Test 已披露 | YES |

## 15. Auto-Fix Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G110 | 自动修复授权有效 | AI 修复任务 |
| QE-G111 | 工作区隔离 | AI 修复任务 |
| QE-G112 | 用户未提交修改未被覆盖 | AI 修复任务 |
| QE-G113 | 修复原因与文件清单已记录 | AI 修复任务 |
| QE-G114 | 原缺陷回归验证通过 | AI 修复任务 |
| QE-G115 | 修复后的完整 Diff 已复审 | AI 修复任务 |
| QE-G116 | PR 证据完整 | 创建 PR 时 |

## 16. Evidence Gate

| ID | 检查项 | 强制 |
|---|---|---|
| QE-G120 | Test Result Schema 合法 | YES |
| QE-G121 | Quality Report Schema 合法 | YES |
| QE-G122 | 所有结果绑定 Head SHA | YES |
| QE-G123 | 测试证据可读取 | YES |
| QE-G124 | NOT_RUN / BLOCKED 已披露 | YES |
| QE-G125 | 报告无虚假执行声明 | YES |
| QE-G126 | 质量结论与实际检查一致 | YES |

## 17. Blocking Rules

以下情况直接阻断 Gate：

1. 强制检查 FAIL。
2. Critical / High Finding 未按规定处置。
3. 关键业务测试缺失。
4. 关键测试未执行且没有经批准的适用性判断。
5. 质量证据无法关联到当前 Head SHA。
6. 发现虚构测试结果或虚假审批。
7. 自动修复覆盖用户未提交修改。
8. 未授权的外部副作用。
9. 质量报告 Schema 或语义校验失败。

BLOCKED 不得转换为 PASS。

## 18. Gate Execution Output

必须生成：

- Quality Gate Result。
- Test Result Collection。
- Review Report。
- Finding Collection。
- Defect Collection。
- Coverage Report。
- Security Summary。
- Regression Summary。
- Evidence Index。
- Unresolved Risk List。

## 19. References

UAES-00 至 UAES-12 相关标准；ISTQB CTFL v4.0.1；OWASP WSTG；W3C WCAG 2.2。

## 20. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Quality Engineering Gate |
