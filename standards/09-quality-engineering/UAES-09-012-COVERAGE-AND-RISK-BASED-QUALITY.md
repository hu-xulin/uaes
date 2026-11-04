# UAES-09-012 — Coverage and Risk-Based Quality

| Metadata | Value |
|---|---|
| Standard ID | UAES-09-012 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-09, UAES-02, UAES-06 |

## 1. Purpose

建立多维测试覆盖率和风险覆盖机制，防止将代码覆盖率误认为完整质量证明。

## 2. Coverage Dimensions

至少区分：

- Line Coverage。
- Statement Coverage。
- Branch Coverage。
- Function Coverage。
- Requirement Coverage。
- Business Rule Coverage。
- Risk Coverage。
- API Contract Coverage。
- State Transition Coverage。
- Platform Coverage。
- Defect Regression Coverage。

## 3. Coverage Rules

- **QE-COV-001 MUST**：覆盖率必须说明统计工具、统计范围、排除规则和 Commit SHA。
- **QE-COV-002 MUST**：不同 Go Module 的覆盖率必须分别记录，不得只报告仓库根目录结果。
- **QE-COV-003 MUST**：覆盖率报告不得将未执行代码视为已覆盖。
- **QE-COV-004 MUST**：排除目录或文件必须有理由和审查记录。
- **QE-COV-005 MUST**：新增关键业务逻辑必须有行为验证。
- **QE-COV-006 MUST**：覆盖率下降必须识别影响范围和原因。
- **QE-COV-007 MUST NOT**：通过删除断言、排除关键代码或增加无意义测试提高覆盖率。

## 4. Uter Coverage Matrix

Go Modules:

- `.`
- `relaykit/`
- `tokenkit/`
- `tokenkit/tokenkit/`

Frontend:

- TypeScript typecheck
- Unit / Component Tests
- Route and user journey coverage

Electron:

- Main / Preload / Renderer
- IPC contract and behavior

API / Database:

- API contract
- Data migration
- Transaction and concurrency

## 5. Initial Coverage Targets

初始建议：

- 新增一般业务代码：Line Coverage ≥ 80%。
- 关键业务逻辑：目标 ≥ 90%。
- 高风险状态机：必须覆盖关键状态和转换。
- 关键异常路径：必须有显式测试。

这些数值是标准目标，不是当前仓库实测数据。无法以行覆盖率准确表达的行为，应采用分支、状态、需求和风险覆盖证据。

## 6. Coverage Quality

必须识别：

- 测试是否有有效断言。
- 是否存在只执行不验证的测试。
- 是否只覆盖 Happy Path。
- 是否覆盖错误分支。
- 是否验证数据副作用。
- 是否验证权限边界。
- 是否验证恢复能力。

## 7. Risk Coverage

风险覆盖率应以已识别风险项为分母，不能通过不登记风险提高覆盖率。

Q0 / Q1 风险必须逐项映射到测试用例或明确的人工验证证据。

## 8. AI Execution Rules

AI MUST：

- 报告实际测量值。
- 不得编造覆盖率。
- 不得仅为了覆盖率新增无效测试。
- 解释排除项。
- 对未覆盖的关键路径说明残余风险。

## 9. Acceptance Criteria

- 覆盖率绑定 Commit SHA。
- 四个 Go Modules 分别报告。
- 需求和风险均可追踪到测试。
- 覆盖率变化有解释。
- 覆盖率数字不替代行为质量判断。

## 10. References

ISTQB CTFL v4.0.1、UAES-02 Requirement Traceability、UAES-06 Software Engineering。

## 11. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial Coverage and Risk-Based Quality Standard |
