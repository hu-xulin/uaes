# UAES-00-GATE-001 — Foundation Gate

## 1. Gate Metadata

| Field | Value |
| --- | --- |
| Gate ID | UAES-00-GATE-001 |
| Gate Name | Foundation Gate |
| Domain | UAES-00 Foundation & Standards Governance |
| Version | 1.0.0 |
| Status | ACTIVE |
| Blocking | Yes |
| Scope | 所有 UAES 阶段交付、标准文件、注册表变更、Schema 与验收基线在进入 APPROVED/ACTIVE 状态前必须通过本 Gate |

## 2. Purpose

Foundation Gate 是 UAES 框架的第一道质量闸门，用于在**任何标准或交付物被采纳之前**验证基础治理层的完整性。它确保：

1. 标准注册表（`.uaes/STANDARD-REGISTRY.yaml`）结构完整、机器可解析、无悬空引用；
2. 所有标准文件遵循统一命名、元数据与规范语言约定；
3. 领域依赖关系满足 UAES-REG-003 基线；
4. 例外与豁免流程（E0–E4）未被绕过；
5. 证据链完整，验收结论可追溯。

## 3. Check Rules

### G00-001 — Registry Integrity

| Item | Requirement |
| --- | --- |
| 检查项 | `.uaes/STANDARD-REGISTRY.yaml` 存在、YAML 语法合法、包含全部顶层键（registry/phases/standards/schemas/gates/acceptance/system_files/tool_adapters/dependencies/validation/history） |
| 通过条件 | YAML 可解析且顶层键齐全 |
| 失败 | BLOCK |

### G00-002 — Reference Integrity

| Item | Requirement |
| --- | --- |
| 检查项 | 注册表中登记的每一个 `file` 路径在仓库中真实存在且非空；`depends_on` 中的每个引用均可解析到已登记标准 |
| 通过条件 | 悬空文件引用 = 0；悬空依赖 = 0（`forward_depends_on` 显式前向引用除外，阶段落地后必须提升） |
| 失败 | BLOCK |

### G00-003 — Identifier Uniqueness

| Item | Requirement |
| --- | --- |
| 检查项 | 所有标准 ID、Schema ID、Gate ID、Acceptance Baseline ID 在注册表内全局唯一；规则 ID 遵循 `UAES-{DOMAIN}-{SEQUENCE}` / `UAES-{DOMAIN}-GATE-{SEQ}` / `UAES-P{DOMAIN}-ACCEPTANCE-BASELINE` 约定 |
| 通过条件 | 无重复 ID，无违反 ID 模式的条目 |
| 失败 | BLOCK |

### G00-004 — Domain Dependency Baseline (UAES-REG-003)

| Item | Requirement |
| --- | --- |
| 检查项 | 每个领域标准（UAES-01..12）的 `depends_on` 必须包含 `UAES-00`；子标准依赖其所属域主标准 |
| 通过条件 | 全部领域标准满足 REG-003 |
| 失败 | BLOCK |

### G00-005 — Normative Language Compliance

| Item | Requirement |
| --- | --- |
| 检查项 | 标准正文中的规范性陈述使用 MUST / MUST NOT / SHOULD / SHOULD NOT / MAY 规范语言；MUST 级要求不得在无 E0/E1 级例外记录的情况下被降级或忽略 |
| 通过条件 | 抽样标准正文规范语言合规，无未记录的降级 |
| 失败 | BLOCK |

### G00-006 — Schema Validity

| Item | Requirement |
| --- | --- |
| 检查项 | `.uaes/schemas/*.schema.json` 全部为合法 JSON 且使用 JSON Schema Draft 2020-12；标准文件 front matter 可被 `standard-metadata.schema.json` 校验 |
| 通过条件 | 全部 Schema JSON 合法，抽样 front matter 通过校验 |
| 失败 | BLOCK |

### G00-007 — Evidence Integrity

| Item | Requirement |
| --- | --- |
| 检查项 | 每条验收结论（acceptance baseline 中的 D/T/S 项）标注了实际执行的验证方式与证据来源；未实际执行的测试必须标注 NOT_RUN，不得标记为 PASS |
| 通过条件 | 无「未执行却标记 PASS」的结论 |
| 失败 | BLOCK |

## 4. Severity

| Severity | Meaning | Action |
| --- | --- | --- |
| BLOCKER | 违反 MUST 级基础治理要求，交付不可进入 ACTIVE | Gate 判定 FAIL，交付回退至 IN_REVIEW |
| INFO | 不影响结构完整性的改进建议 | 记录至 history，不阻断 |

## 5. Gate Results

| Check ID | Description | Severity | Result |
| --- | --- | --- | --- |
| G00-001 | Registry Integrity | BLOCKER | NOT_RUN |
| G00-002 | Reference Integrity | BLOCKER | NOT_RUN |
| G00-003 | Identifier Uniqueness | BLOCKER | NOT_RUN |
| G00-004 | Domain Dependency Baseline | BLOCKER | NOT_RUN |
| G00-005 | Normative Language Compliance | BLOCKER | NOT_RUN |
| G00-006 | Schema Validity | BLOCKER | NOT_RUN |
| G00-007 | Evidence Integrity | BLOCKER | NOT_RUN |

**总体判定规则**：任一 BLOCKER 项 FAIL 或 NOT_RUN → Gate 整体 FAIL；全部 BLOCKER 项 PASS → Gate 整体 PASS。

## 6. Report Template

```yaml
gate_report:
  gate_id: "UAES-00-GATE-001"
  run_at: "<ISO-8601 timestamp>"
  run_by: "<agent or human id>"
  results:
    - check: "G00-001"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
    - check: "G00-002"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
    - check: "G00-003"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
    - check: "G00-004"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
    - check: "G00-005"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
    - check: "G00-006"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
    - check: "G00-007"
      result: "PASS | FAIL | NOT_RUN"
      evidence: "<path or command output reference>"
  overall: "PASS | FAIL"
  blocking_findings: []
  notes: ""
```

## 7. AI Execution Requirements

1. 执行 Foundation Gate 前必须先完成注册表备份（写入 `/tmp` 或同等位置）。
2. 每项检查必须产出可复查的证据（命令输出、文件路径、脚本退出码），不得只给结论。
3. 未实际执行的检查必须如实标注 NOT_RUN，禁止推断为 PASS。
4. 发现 BLOCKER 级问题时必须停止推进，先报告再等待处置授权，不得自行放宽断言。
5. 不得通过删除检查项、缩小断言范围或修改阈值使 Gate 通过。
6. 检查过程产生的临时脚本与备份不得留在仓库工作区内。
7. Gate 报告按第 6 节模板输出，并将报告归档至 `reports/` 目录。

## 8. Acceptance Criteria

- [ ] G00-001..007 全部执行且有证据；
- [ ] 全部 BLOCKER 项 PASS；
- [ ] Gate 报告已按模板生成并归档；
- [ ] 只有全部 P0 基础检查通过，才允许 Foundation Gate 返回 PASS。
