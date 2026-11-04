# UAES-02-PRODUCT-ENGINEERING-STANDARD

**Version:** 1.0.0  
**Status:** DRAFT


# Requirement Traceability

## 4. 追踪模型

```text
Business Goal
    |
    v
Requirement
    |
    v
User Story
    |
    v
Business Rule
    |
    v
Architecture / Design
    |
    v
Engineering Task
    |
    v
Implementation
    |
    v
Test Case
    |
    v
Verification Evidence
```

## 5. 追踪要求

关键需求必须具备正向追踪和反向追踪。

正向追踪：

需求 → 实现 → 测试 → 证据。

反向追踪：

代码修改 → 对应需求、缺陷或批准的技术任务。

无法建立关联的代码修改必须说明原因。

## 6. 追踪矩阵

| Requirement | Business Rule | Design | Task | Implementation | Test | Evidence |
|---|---|---|---|---|---|---|
| REQ-0001 | BR-0001 | DES-0001 | TASK-0001 | SRC-001 | TEST-0001 | EVD-0001 |

## 7. 完整性指标

- Requirement Coverage。
- Acceptance Coverage。
- Test Traceability。
- Implementation Traceability。
- Change Impact Coverage。
- Orphan Code Rate。
- Orphan Test Rate。

## 8. 强制规则

| Rule ID | 规则 | 级别 |
|---|---|---|
| UAES-02-008-001 | 需求必须可追踪 | MUST |
| UAES-02-008-002 | 关键需求必须关联测试 | MUST |
| UAES-02-008-003 | 实现必须能追溯来源 | MUST |
| UAES-02-008-004 | 需求变更必须更新追踪关系 | MUST |
| UAES-02-008-005 | 追踪证据必须可验证 | MUST |

**END OF DOCUMENT**