# UAES-00-004 — Standard Registry & Dependencies

**Standard ID:** UAES-00-004  
**Standard Name:** Standard Registry & Dependencies  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-00 Foundation  
**Owner:** Uter Engineering Governance  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立机器可读的 UAES 标准注册表和依赖管理机制，确保 AI、CI 和工程工具能够准确发现、加载和验证适用标准。

## 2. Registry Source of Truth

权威注册表路径：

```text
.uaes/STANDARD-REGISTRY.yaml
```

**MUST**：

- 所有正式标准必须登记。
- 每个标准 ID 必须唯一。
- 每个文件路径必须唯一，除非明确声明为引用关系。
- 注册表路径必须与仓库实际路径一致。
- 标准状态必须与标准文件元数据一致。

**MUST NOT**：

- 不得仅凭目录扫描结果认定文件为 ACTIVE 标准。
- 不得将未登记文件自动加载为强制规范。
- 不得保留指向不存在文件的有效注册条目。

## 3. Registry Required Fields

每条记录至少包含：

- id
- title
- domain
- type
- version
- status
- path
- priority
- owner
- dependencies
- verification
- effective_date

## 4. Dependency Types

| Type | Meaning |
|---|---|
| REQUIRES | 必须先满足的标准 |
| EXTENDS | 在基础标准上增加要求 |
| REFERENCES | 参考但不构成前置条件 |
| IMPLEMENTS | 将标准转化为工程实现 |
| VERIFIES | 验证其他标准的执行结果 |
| CONFLICTS_WITH | 存在潜在冲突，必须治理 |

## 5. Dependency Rules

### UAES-REG-001

**MUST**：依赖项必须引用有效 Standard ID。

### UAES-REG-002

**MUST**：REQUIRES 关系不得形成循环依赖。

### UAES-REG-003

**MUST**：领域标准必须依赖 UAES-00 Foundation。

### UAES-REG-004

**MUST**：跨领域依赖必须说明依赖原因。

### UAES-REG-005

**MUST**：被依赖标准升级时，必须检查下游兼容性。

### UAES-REG-006

**MUST NOT**：不得通过删除依赖关系规避上游强制要求。

## 6. Domain Dependency Baseline

| Domain | Required Dependencies |
|---|---|
| P00 Foundation | None |
| P01 AI Governance | P00 |
| P02 Product Engineering | P00、P01、P03 |
| P03 Knowledge Engineering | P00、P01 |
| P04 System Architecture | P00、P02、P03 |
| P05 Experience & Design | P00、P02、P04 |
| P06 Software Engineering | P00、P01、P04 |
| P07 Cross-Platform | P00、P04、P05、P06 |
| P08 Agent Engineering | P00、P01、P03、P06 |
| P09 Quality Engineering | P00、P01、P02、P04、P06、P08 |
| P10 Security & Reliability | P00、P01、P04、P06、P08、P09 |
| P11 DevOps & Delivery | P00、P01、P06、P09、P10 |
| P12 Lifecycle & Evolution | P00、P01、P03、P04、P09、P10、P11 |

以上是 UAES 领域级最低依赖基线。子标准还必须定义自身的细粒度依赖。

## 7. Loading Strategy

Agent 加载标准时：

1. 读取 UAES 版本。
2. 读取 Registry。
3. 确认任务涉及的领域和平台。
4. 加载 Foundation。
5. 加载对应领域 Domain Standard。
6. 加载其 REQUIRES 依赖。
7. 加载任务适用的子标准。
8. 检查状态和版本。
9. 记录加载的标准 ID 和版本。

不得为了节省上下文而省略与当前任务直接相关的 P0/P1 强制规则。

## 8. Registry Validation

自动检查：

- ID 唯一性。
- 路径存在性。
- 状态合法性。
- 版本格式。
- 必填字段。
- 依赖引用合法性。
- 循环依赖。
- 领域归属一致性。
- 标准文件元数据一致性。
- Schema 兼容性。

## 9. Acceptance Criteria

- Registry 可解析。
- 全部 ID 唯一。
- 全部有效路径存在。
- 依赖关系可解析。
- 无 REQUIRES 循环。
- 领域依赖符合基线。
- Agent 能按任务范围解析并加载标准。
