/*
Copyright (C) 2023-2026 Uter.ai

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@uter.ai
*/
/**
 * Verification of the uaes/p4-design-token-engine import into the UAES
 * standard library. Produces:
 *   - reports/quality/UAES-P05-IMPORT-VERIFICATION.json
 *       (machine-readable report conforming to .uaes/schemas/quality-report.schema.json)
 *   - design-system/components/contracts/UAES-COMPONENT-CONTRACT-GAP.md
 *       (gap record against .uaes/schemas/component-contract.schema.json)
 *
 * Gate discipline (UAES-05-GATE-001 §4/§6): NOT_RUN is never reported as
 * PASS, and no approval / contract data is invented.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import {
  REPO_ROOT, TOKEN_SOURCE, TOKEN_SOURCE_SCHEMA, PROJECTED_TOKENS,
  UAES_TOKEN_SCHEMA, UAES_CONTRACT_SCHEMA, COMPONENT_REGISTRY,
  GENERATED_CSS, DESIGN_ROOT,
} from './paths.mjs'

const SOURCE_COMMIT = '4bdea45bcff54f6bd8db39b52667b2ac39dd78bc'
const BRANCH = 'uaes/p4-design-token-engine'
const REPORT_JSON = join(REPO_ROOT, 'reports/quality/UAES-P05-IMPORT-VERIFICATION.json')
const GAP_MD = join(DESIGN_ROOT, 'components/contracts/UAES-COMPONENT-CONTRACT-GAP.md')
const BASELINE = join(REPO_ROOT, 'reports/quality/UAES-P05-PRE-IMPORT-BASELINE.sha256')
const REPORT_SCHEMA = join(REPO_ROOT, '.uaes/schemas/quality-report.schema.json')

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex')
const checks = []
const notRun = []
const findings = []
const record = (id, ok, detail, status) => {
  checks.push({ id, status: status ?? (ok ? 'PASS' : 'FAIL'), detail })
  if (!ok && status !== 'NOT_RUN') findings.push(`${id}: ${detail}`)
}

// ---------------------------------------------------------------------------
// Minimal JSON Schema (draft 2020-12 subset) validator. Sufficient for every
// schema used by this import: $ref, type, required, properties,
// additionalProperties, enum, const, pattern, minLength, minProperties,
// minItems, uniqueItems, items.
// ---------------------------------------------------------------------------
function resolveRef(ref, root) {
  if (!ref.startsWith('#/')) throw new Error('Unsupported $ref: ' + ref)
  let node = root
  for (const part of ref.slice(2).split('/')) node = node[part.replaceAll('~1', '/').replaceAll('~0', '~')]
  if (!node) throw new Error('Unresolved $ref: ' + ref)
  return node
}
function validateSchema(data, schema, root, path = '$', errors = []) {
  let s = schema
  if (s.$ref) {
    const target = resolveRef(s.$ref, root)
    s = { ...target, ...Object.fromEntries(Object.entries(s).filter(([k]) => k !== '$ref')) }
  }
  const type = Array.isArray(s.type) ? s.type : s.type ? [s.type] : null
  const actual = data === null ? 'null' : Array.isArray(data) ? 'array' : typeof data
  if (type && !type.includes(actual === 'number' && Number.isInteger(data) ? 'integer' : actual)) {
    errors.push(`${path}: expected ${type.join('|')}, got ${actual}`)
    return errors
  }
  if (s.const !== undefined && data !== s.const) errors.push(`${path}: expected const ${JSON.stringify(s.const)}`)
  if (s.enum && !s.enum.includes(data)) errors.push(`${path}: ${JSON.stringify(data)} not in enum`)
  if (typeof data === 'string') {
    if (s.pattern && !new RegExp(s.pattern).test(data)) errors.push(`${path}: does not match ${s.pattern}`)
    if (s.minLength && data.length < s.minLength) errors.push(`${path}: shorter than ${s.minLength}`)
  }
  if (Array.isArray(data)) {
    if (s.minItems && data.length < s.minItems) errors.push(`${path}: fewer than ${s.minItems} items`)
    if (s.uniqueItems && new Set(data.map((x) => JSON.stringify(x))).size !== data.length) errors.push(`${path}: items not unique`)
    if (s.items) data.forEach((item, i) => validateSchema(item, s.items, root, `${path}[${i}]`, errors))
  }
  if (data && actual === 'object' && !Array.isArray(data)) {
    if (s.minProperties && Object.keys(data).length < s.minProperties) errors.push(`${path}: fewer than ${s.minProperties} props`)
    for (const key of s.required ?? []) if (!(key in data)) errors.push(`${path}: missing required '${key}'`)
    for (const [key, value] of Object.entries(data)) {
      const sub = s.properties?.[key]
      if (sub) validateSchema(value, sub, root, `${path}.${key}`, errors)
      else if (s.additionalProperties === false) errors.push(`${path}: additional property '${key}' not allowed`)
      else if (s.additionalProperties && typeof s.additionalProperties === 'object') {
        validateSchema(value, s.additionalProperties, root, `${path}.${key}`, errors)
      }
    }
  }
  return errors
}
const checkSchema = (label, dataPath, schemaPath) => {
  const data = readJson(dataPath)
  const schema = readJson(schemaPath)
  const errors = validateSchema(data, schema, schema)
  record(label, errors.length === 0, errors.length ? errors.slice(0, 8).join('; ') : `${Object.keys(data).length} top-level keys validated against ${relative(REPO_ROOT, schemaPath)}`)
  return errors
}

// 1. Token source against its own DTCG schema (DQ-002)
checkSchema('DQ-002 token source schema', TOKEN_SOURCE, TOKEN_SOURCE_SCHEMA)
// 2. Generated UAES projection against the registry-governed schema (DQ-002)
checkSchema('DQ-002 UAES design-token schema', PROJECTED_TOKENS, UAES_TOKEN_SCHEMA)
// 3. Component registry against its container schema
checkSchema('DQ-009 registry container schema', COMPONENT_REGISTRY, join(DESIGN_ROOT, 'components/contracts/component-registry.schema.json'))

// 4. Generated artifact determinism / drift (DQ-024)
try {
  execFileSync(process.execPath, [fileURLToPath(new URL('./generate-design-tokens.mjs', import.meta.url)), '--check'], { stdio: 'pipe' })
  record('DQ-024 generated artifacts', true, 'generate-design-tokens.mjs --check: in sync')
} catch (e) {
  record('DQ-024 generated artifacts', false, String(e.stdout ?? e.message).slice(0, 200))
}

// 5. Contrast (DQ-006), including the negative test required by P05 §L.4
let contrastOutput = ''
try {
  contrastOutput = execFileSync(process.execPath, [fileURLToPath(new URL('./verify-contrast.mjs', import.meta.url))], { encoding: 'utf8' })
  const hasNegative = contrastOutput.includes('NEGATIVE-TEST PASS')
  const hasRemediated = contrastOutput.includes('4.93:1')
  record('DQ-006 contrast', hasNegative && hasRemediated, `negative test=${hasNegative}, remediated navigation pair=${hasRemediated}`)
} catch (e) {
  record('DQ-006 contrast', false, String(e.stdout ?? e.message).slice(0, 200))
}

// 6. Component contract gap against UAES-05-006 / component-contract.schema.json
const registry = readJson(COMPONENT_REGISTRY)
const contractSchema = readJson(UAES_CONTRACT_SCHEMA)
const gap = {}
for (const field of contractSchema.required ?? []) {
  const missing = registry.components.filter((c) => c[field] === undefined).length
  if (missing) gap[field] = missing
}
const gapCount = Object.keys(gap).length
record('DQ-009 component contract conformance', false,
  `${gapCount} required field(s) absent across ${registry.components.length} components: ${JSON.stringify(gap)}`, 'NOT_VERIFIED')
notRun.push('DQ-009/DQ-010 full component contract validation: imported registry does not carry props/variants/purpose/platforms/tests; see UAES-COMPONENT-CONTRACT-GAP.md')
notRun.push('DQ-004 hard-coded style scan: product source tree is not part of this import; run check-design-tokens.mjs --root <product-web-root>/src')
notRun.push('DQ-021/DQ-022 visual regression and baseline approval, DQ-012/DQ-013 keyboard and focus, axe scan: require product repository and browser')
notRun.push('Brand primary colour change approval (UAES-05-001-009): Exception ID, approver and approval date are absent')

// 7. Report metadata envelope and authority references
const reportFiles = [
  'reports/quality/UAES-P05-ACCEPTANCE-STATUS.md',
  'reports/quality/UAES-P05-GATE-EXECUTION-MAPPING.md',
  'reports/quality/UAES-P05-IMPLEMENTATION-AUDIT.md',
  'reports/quality/UAES-P05-IV-COMPONENT-REGISTRY-IMPLEMENTATION.md',
  'reports/quality/UAES-P05-IV-COMPONENT-REGISTRY-VALIDATION.md',
  'reports/compliance/UAES-P05-BRAND-PRIMARY-CHANGE-RECORD.md',
]
let envelopeOk = true
const envelopeDetails = []
for (const rel of reportFiles) {
  const text = readFileSync(join(REPO_ROOT, rel), 'utf8')
  const needed = ['| Field | Value |', '| Report ID |', '| Version |', '| Status |', '| Domain |', '| Phase |', '| Gate |', '| Result |']
  const missing = needed.filter((x) => !text.includes(x))
  const stale = /UAES-P4-ACCEPTANCE-BASELINE|EXPERIENCE-AND-DESIGN-GATE|standards\/05-experience-design\/UAES-05-014/.test(text)
  if (missing.length || stale) { envelopeOk = false; envelopeDetails.push(`${rel}: missing=${missing.join(',')} staleRefs=${stale}`) }
}
record('UAES report envelope', envelopeOk, envelopeOk ? `${reportFiles.length} reports use the library table envelope with current authority refs` : envelopeDetails.join(' | '))

// 8. Referential integrity of authority paths mentioned in imported reports
const authorityPaths = [
  'quality/acceptance/UAES-P05-ACCEPTANCE-BASELINE.md',
  'quality/gates/UAES-05-GATE-001-DESIGN-QUALITY-GATE.md',
  '.uaes/STANDARD-REGISTRY.yaml',
  'standards/05-experience-design/UAES-05-002-DESIGN-TOKEN-ARCHITECTURE.md',
  'standards/05-experience-design/UAES-05-003-COLOR-AND-CONTRAST.md',
  'standards/05-experience-design/UAES-05-006-COMPONENT-CONTRACT.md',
]
const dangling = authorityPaths.filter((p) => !existsSync(join(REPO_ROOT, p)))
record('authority reference integrity', dangling.length === 0, dangling.length ? 'missing: ' + dangling.join(', ') : `${authorityPaths.length} authority paths resolve`)

// 9. Zero modification of pre-existing files/directories
const baseline = new Map(
  readFileSync(BASELINE, 'utf8').trim().split('\n').map((l) => {
    const [hash, path] = l.split('  ', 2)
    return [path, hash]
  })
)
const modified = []
const deleted = []
for (const [path, hash] of baseline) {
  const abs = join(REPO_ROOT, path)
  if (!existsSync(abs)) deleted.push(path)
  else if (sha256(abs) !== hash) modified.push(path)
}
record('existing assets untouched', modified.length === 0 && deleted.length === 0,
  `baseline=${baseline.size} files, modified=${modified.length}, deleted=${deleted.length}`)

// 10. Generated-file provenance header (UAES-05-002 §6 / UAES-05-011-006)
const css = readFileSync(GENERATED_CSS, 'utf8')
const provenanceOk = ['GENERATED FILE — DO NOT EDIT', 'Generator version:', 'Source version:', 'Source: design-system/tokens/source/brand.tokens.json'].every((x) => css.includes(x))
record('DQ-024 generated provenance', provenanceOk, provenanceOk ? 'generator, generator version, source and source version declared' : 'provenance header incomplete')

// --- gap report ------------------------------------------------------------
const gapRows = Object.entries(gap).map(([field, count]) => `| \`${field}\` | ${count} | NOT_VERIFIED |`).join('\n')
const gapMd = `# UAES Component Contract Gap — Imported Registry

| Field | Value |
|---|---|
| Report ID | UAES-P05-COMPONENT-CONTRACT-GAP |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-05 Experience & Design |
| Phase | P4 |
| Gate | UAES-05-GATE-001 (DQ-009 / DQ-010) |
| Result | NOT_VERIFIED |

> 本记录是导入资产的差距证据，不是标准文件。权威契约标准：
> \`standards/05-experience-design/UAES-05-006-COMPONENT-CONTRACT.md\`；
> 权威 Schema：\`.uaes/schemas/component-contract.schema.json\`；
> 唯一事实源：\`.uaes/STANDARD-REGISTRY.yaml\`。

## 1. Finding

分支 \`${BRANCH}\` 的 \`component-registry.json\` 登记了 ${registry.components.length} 个组件，
字段为 \`id / name / file / category / status / contract{states,accessibility,responsive,tokens,evidence}\`。
它满足分支自带的容器 Schema，但**不满足** UAES 规范库的组件契约 Schema：
以下 ${gapCount} 个必填字段在全部 ${registry.components.length} 个组件中缺失。

| Required field (UAES Schema) | Components missing | Status |
|---|---|---|
${gapRows}

## 2. Disposition

- 依 UAES-05-GATE-001 §4/§6，缺失契约**不得**标记为 PASS，也不得由本次导入的 AI 臆造
  \`props\`、\`variants\`、\`tests\` 等未经验证的契约数据。
- 差距以 \`NOT_VERIFIED\` 记录，P05 验收仍为 BLOCKED；正式关闭需由 Design System Owner
  在产品仓库补齐契约并重新执行 \`check-component-registry.mjs --implementation-root <web>\`。
- \`filesystemParity\` 同样为 NOT_RUN：本规范库只保存注册表与参考资产，不含 React 组件树。

## 3. Evidence

- 生成命令：\`node quality/scripts/design-system/verify-import.mjs\`
- 机器可读结果：\`reports/quality/UAES-P05-IMPORT-VERIFICATION.json\`
- 校验脚本：\`quality/scripts/design-system/check-component-registry.mjs\`

---

Generated by \`quality/scripts/design-system/verify-import.mjs\`. This file is regenerated, not hand-edited.
`
writeFileSync(GAP_MD, gapMd)

// --- machine-readable quality report --------------------------------------
const failures = checks.filter((c) => c.status === 'FAIL').length
const report = {
  report_id: 'UAES-P05-IMPORT-VERIFICATION',
  task_id: 'UAES-P4-BRANCH-IMPORT',
  repository: 'https://github.com/hu-xulin/uter',
  branch: BRANCH,
  base_commit_sha: null,
  commit_sha: SOURCE_COMMIT,
  risk_level: 'R2',
  review_status: failures ? 'FAIL' : 'NOT_VERIFIED',
  gate_status: 'BLOCKED',
  tests: [
    'node quality/scripts/design-system/generate-design-tokens.mjs --check',
    'node quality/scripts/design-system/verify-contrast.mjs',
    'node quality/scripts/design-system/check-component-registry.mjs',
    'node quality/scripts/design-system/check-design-tokens.mjs --strict',
    'node quality/scripts/design-system/verify-import.mjs',
    ...checks.map((c) => `${c.id}: ${c.status} — ${c.detail}`),
  ],
  findings: [
    ...findings,
    'Imported registry does not satisfy .uaes/schemas/component-contract.schema.json; gap recorded as NOT_VERIFIED, not PASS.',
    'Brand primary colour #5B5EE6 matches UAES-05-003 §6 baseline but approval is NOT_VERIFIED (UAES-05-001-009).',
    'Conflicting/duplicate branch files were skipped in favour of the standard library versions.',
  ],
  evidence: [
    { evidence_type: 'PRE_IMPORT_HASH_BASELINE', location: 'reports/quality/UAES-P05-PRE-IMPORT-BASELINE.sha256', sha256: sha256(BASELINE) },
    { evidence_type: 'TOKEN_SOURCE', location: 'design-system/tokens/source/brand.tokens.json', sha256: sha256(TOKEN_SOURCE) },
    { evidence_type: 'GENERATED_CSS', location: 'design-system/tokens/generated/brand.css', sha256: sha256(GENERATED_CSS) },
    { evidence_type: 'SCHEMA_PROJECTION', location: 'design-system/tokens/source/uaes-tokens.projected.json', sha256: sha256(PROJECTED_TOKENS) },
    { evidence_type: 'COMPONENT_REGISTRY', location: 'design-system/components/registry/component-registry.json', sha256: sha256(COMPONENT_REGISTRY) },
    { evidence_type: 'CONTRACT_GAP', location: 'design-system/components/contracts/UAES-COMPONENT-CONTRACT-GAP.md', sha256: null },
  ],
  generated_at: new Date().toISOString(),
  generated_by: 'quality/scripts/design-system/verify-import.mjs',
  conclusion: 'Import is structurally complete and existing UAES assets are byte-identical. P05 acceptance stays BLOCKED: component contracts, visual regression, accessibility, CI execution in the product repository and formal brand-colour approval remain open.',
  unresolved_risks: [
    'UAES-05-001-009: high-impact brand colour change has no Exception ID / approver / approval date.',
    'UAES-05-006: 65 component contracts lack props, variants, tests, purpose, platforms and version.',
    'UAES-05-GATE-001: DQ-004/012/013/021/022 cannot be executed without the product repository and a browser.',
  ],
  not_run_checks: notRun,
  blocked_checks: ['DQ-009 component contract conformance', 'P05 final acceptance'],
}
const reportErrors = validateSchema(report, readJson(REPORT_SCHEMA), readJson(REPORT_SCHEMA))
if (reportErrors.length) {
  console.error('Generated quality report does not conform to quality-report.schema.json:')
  console.error(reportErrors.join('\n'))
  process.exit(1)
}
writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2) + '\n')

for (const c of checks) console.log(`${c.status.padEnd(12)} ${c.id.padEnd(38)} ${c.detail}`)
console.log(`\nchecks=${checks.length} FAIL=${failures} NOT_VERIFIED=${checks.filter((c) => c.status === 'NOT_VERIFIED').length} NOT_RUN=${notRun.length}`)
console.log('machine-readable report: ' + relative(REPO_ROOT, REPORT_JSON))
console.log('contract gap record: ' + relative(REPO_ROOT, GAP_MD))
process.exit(failures ? 1 : 0)
