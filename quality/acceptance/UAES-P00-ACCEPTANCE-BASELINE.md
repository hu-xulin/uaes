# UAES-P00 Acceptance Baseline — Foundation & Standards Governance

## 1. Metadata

| Field | Value |
| --- | --- |
| Baseline ID | UAES-P00-ACCEPTANCE-BASELINE |
| Phase | P0 — Foundation |
| Domain | UAES-00 Foundation & Standards Governance |
| Version | 1.0.0 |
| Status | ACTIVE |
| Verification Policy | 所有结论必须标注实际验证方式；未执行的项一律 NOT_RUN |

## 2. Document Acceptance

| ID | Deliverable | Acceptance Criterion | Verification | Result |
| --- | --- | --- | --- | --- |
| D01 | UAES-00-FOUNDATION-STANDARD.md | 总纲存在且非空，覆盖五层治理架构、13 领域、规范语言、优先级/风险、状态模型、冲突解决顺序 | STATIC | NOT_RUN |
| D02 | UAES-00-001-STANDARD-GOVERNANCE.md | 定义治理角色、治理层级与变更工作流 | STATIC | NOT_RUN |
| D03 | UAES-00-002-NORMATIVE-RULES.md | 定义规则级别、Rule ID 约定与验证类型/验收结果枚举 | STATIC | NOT_RUN |
| D04 | UAES-00-003-STANDARD-LIFECYCLE.md | 定义 7 种标准状态、语义化版本规则与废弃政策 | STATIC | NOT_RUN |
| D05 | UAES-00-004-REGISTRY-AND-DEPENDENCIES.md | 定义权威注册表路径、13 领域依赖基线与加载/校验策略 | STATIC | NOT_RUN |
| D06 | UAES-00-005-EXCEPTION-MANAGEMENT.md | 定义不可豁免项、E0–E4 例外分级与例外生命周期 | STATIC | NOT_RUN |

## 3. Registry Acceptance

| ID | Deliverable | Acceptance Criterion | Verification | Result |
| --- | --- | --- | --- | --- |
| R01 | STANDARD-REGISTRY.yaml | YAML 语法合法，包含全部顶层键 | SCHEMA | NOT_RUN |
| R02 | P0 段条目 | UAES-00 主标准与 001–006 子标准全部登记，file 路径真实存在且非空 | SCHEMA | NOT_RUN |
| R03 | ID 唯一性 | 全局无重复标准/Schema/Gate/Acceptance ID | STATIC | NOT_RUN |
| R04 | REG-003 依赖基线 | UAES-01..12 已落地的领域标准 depends_on 均包含 UAES-00 | SCHEMA | NOT_RUN |
| R05 | 悬空依赖 | depends_on 无悬空引用（forward_depends_on 显式前向引用除外） | SCHEMA | NOT_RUN |

## 4. Schema Acceptance

| ID | Deliverable | Acceptance Criterion | Verification | Result |
| --- | --- | --- | --- | --- |
| S01 | standard-metadata.schema.json | 合法 JSON，Draft 2020-12，id pattern 覆盖 UAES-00..12 | SCHEMA | NOT_RUN |

## 5. Tooling Acceptance

| ID | Deliverable | Acceptance Criterion | Verification | Result |
| --- | --- | --- | --- | --- |
| T01 | 注册表校验脚本 | 可对注册表执行 ID 唯一性、路径存在性、依赖可解析性校验并返回结构化结果 | UNIT | NOT_RUN |
| T02 | Foundation Gate 执行 | UAES-00-GATE-001 可按报告模板产出结构化结果 | UNIT | NOT_RUN |

## 6. AI Practical Acceptance

| ID | Test | Acceptance Criterion | Verification | Result |
| --- | --- | --- | --- | --- |
| A01 | 冷启动加载 | Agent 仅凭 UAES-00 文档即可确定标准查找、依赖解析与冲突解决顺序 | AGENT-TEST | NOT_RUN |
| A02 | 规范语言理解 | Agent 能正确区分 MUST/SHOULD/MAY 并拒绝在无例外记录时降级 MUST | AGENT-TEST | NOT_RUN |
| A03 | 依赖解析 | Agent 能从注册表解析领域依赖并识别 forward_depends_on 待提升项 | AGENT-TEST | NOT_RUN |
| A04 | 例外流程 | Agent 遇到不可豁免项（E0）时正确拒绝请求而非执行 | AGENT-TEST | NOT_RUN |
| A05 | 冲突仲裁 | Agent 能按 8 级冲突解决顺序给出正确判定 | AGENT-TEST | NOT_RUN |
| A06 | Gate 执行 | Agent 能按 Gate 报告模板产出带证据的结果 | AGENT-TEST | NOT_RUN |
| A07 | 证据完整性 | Agent 不会将未执行的验证标记为 PASS | AGENT-TEST | NOT_RUN |
| A08 | 并发写入保护 | Agent 在注册表合并前执行备份且不使用 git add -A | AGENT-TEST | NOT_RUN |

## 7. Final Acceptance

| Layer | Criterion | Result |
| --- | --- | --- |
| Documentation | D01–D06 全部 PASS | NOT_RUN |
| Registry | R01–R05 全部 PASS | NOT_RUN |
| Schema | S01 PASS | NOT_RUN |
| Tooling | T01–T02 全部 PASS | NOT_RUN |
| Quality Gate | UAES-00-GATE-001 整体 PASS | NOT_RUN |
| AI Practical Test | A01–A08 全部 PASS | NOT_RUN |

**P00 当前验收状态：NOT_VERIFIED**
