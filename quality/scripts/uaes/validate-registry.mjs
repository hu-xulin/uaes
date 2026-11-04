#!/usr/bin/env node
/** Layer 1 — Governance Validation.
 *  Validates the four registries, their schemas, and — most importantly —
 *  that every mapped rule ID, module path, gate and verification command
 *  actually exists in the real repositories. No check is faked as PASS.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import {
  GOV_ROOT, CODE_ROOT, govPath, codePath, govExists, codeExists,
  loadYaml, loadJson, schemaValidate, nowIso, isMain,
} from './paths.mjs'

const RULE_RE = /UAES-\d{2}-\d{3}-\d{3}/g

function collectRuleIds() {
  const ids = new Set()
  const where = new Map()
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) { walk(p); continue }
      if (!e.name.endsWith('.md')) continue
      const text = readFileSync(p, 'utf8')
      for (const m of text.matchAll(RULE_RE)) {
        ids.add(m[0])
        if (!where.has(m[0])) where.set(m[0], relative(GOV_ROOT, p))
      }
    }
  }
  walk(govPath('standards'))
  return { ids, where }
}

function check(id, name, fn) {
  try {
    const r = fn()
    return { id, name, status: r.status || 'PASS', detail: r.detail || '' }
  } catch (e) {
    return { id, name, status: 'FAIL', detail: String(e && e.message || e) }
  }
}

export function runValidation() {
  const config = loadYaml('.uaes/config.yaml')
  const modules = loadYaml('.uaes/registry/modules.yaml')
  const mappings = loadYaml('.uaes/registry/mappings.yaml')
  const standards = loadYaml('.uaes/registry/standards.yaml')
  const gates = loadYaml('.uaes/registry/gates.yaml')
  const policy = loadYaml('.uaes/policies/execution-policy.yaml')
  const { ids: realRuleIds, where: ruleWhere } = collectRuleIds()

  const moduleIds = new Set(modules.modules.map((m) => m.id))
  const gateIds = new Set(gates.gates.map((g) => g.id))
  const domainIds = new Set(standards.domains.map((d) => d.id))
  const verificationIds = new Set(mappings.verification_catalog.map((v) => v.id))
  const domainsWithRules = new Set(standards.domains.filter((d) => d.rule_level === 'REGISTERED').map((d) => d.id))

  const checks = []

  checks.push(check('G-001', 'registries loadable', () => ({
    detail: `modules=${modules.modules.length} mappings=${mappings.mappings.length} gates=${gates.gates.length} standards=${standards.standards.length}`,
  })))

  checks.push(check('G-002', 'module registry schema', () => {
    const r = schemaValidate('.uaes/schemas/module-registry.schema.json', modules)
    return { status: !r.available ? 'NOT_RUN' : r.ok ? 'PASS' : 'FAIL', detail: r.detail }
  }))
  checks.push(check('G-003', 'mapping schema', () => {
    const r = schemaValidate('.uaes/schemas/standard-mapping.schema.json', mappings)
    return { status: !r.available ? 'NOT_RUN' : r.ok ? 'PASS' : 'FAIL', detail: r.detail }
  }))
  checks.push(check('G-004', 'gate registry schema', () => {
    const r = schemaValidate('.uaes/schemas/gate-registry.schema.json', gates)
    return { status: !r.available ? 'NOT_RUN' : r.ok ? 'PASS' : 'FAIL', detail: r.detail }
  }))

  checks.push(check('G-005', 'unique module IDs', () => {
    const dup = modules.modules.length - moduleIds.size
    return { status: dup ? 'FAIL' : 'PASS', detail: dup ? `${dup} duplicate(s)` : `${moduleIds.size} unique` }
  }))

  checks.push(check('G-006', 'module paths exist in code repo', () => {
    const missing = modules.modules.filter((m) => !codeExists(m.path)).map((m) => `${m.id}:${m.path}`)
    return { status: missing.length ? 'FAIL' : 'PASS',
      detail: missing.length ? 'missing: ' + missing.join(', ') : `${modules.modules.length}/${modules.modules.length} exist` }
  }))

  checks.push(check('G-007', 'module manifests exist', () => {
    const missing = modules.modules.filter((m) => !codeExists(m.manifest)).map((m) => `${m.id}:${m.manifest}`)
    return { status: missing.length ? 'FAIL' : 'PASS',
      detail: missing.length ? 'missing: ' + missing.join(', ') : 'all manifests present' }
  }))

  checks.push(check('G-008', 'domain IDs resolvable', () => {
    const bad = []
    for (const m of modules.modules) for (const d of m.standards || []) if (!domainIds.has(d)) bad.push(`${m.id}:${d}`)
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join(', ') : `${domainIds.size} domains indexed` }
  }))

  checks.push(check('G-009', 'mapped rule IDs are REAL', () => {
    const referenced = new Set()
    for (const m of mappings.mappings) for (const r of m.rules || []) referenced.add(r)
    const invented = [...referenced].filter((r) => !realRuleIds.has(r))
    return { status: invented.length ? 'FAIL' : 'PASS',
      detail: invented.length ? 'invented: ' + invented.join(', ')
        : `${referenced.size} mapped IDs all found in standards/**/*.md (${realRuleIds.size} available)` }
  }))

  checks.push(check('G-010', 'rule-level status consistency', () => {
    const bad = []
    for (const m of mappings.mappings) {
      const has = (m.rules || []).length > 0
      const domainHasRules = domainsWithRules.has(m.domain)
      if (has && !domainHasRules) bad.push(`${m.id}: rules present but ${m.domain} has no registered IDs`)
      if (!has && domainHasRules && m.rule_level_status !== 'NO_RULE_IDS_REGISTERED_IN_DOMAIN')
        bad.push(`${m.id}: empty rules without status note`)
      if (has && !ruleWhere.has((m.rules || [])[0])) bad.push(`${m.id}: first rule has no source file`)
    }
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join('; ') : 'consistent' }
  }))

  checks.push(check('G-011', 'mapping modules resolvable', () => {
    const bad = []
    for (const m of mappings.mappings) {
      if (m.modules === '*') continue
      for (const id of m.modules) if (!moduleIds.has(id)) bad.push(`${m.id}:${id}`)
    }
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join(', ') : 'all resolvable' }
  }))

  checks.push(check('G-012', 'mapping gates resolvable', () => {
    const bad = mappings.mappings.filter((m) => !gateIds.has(m.gate)).map((m) => `${m.id}:${m.gate}`)
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join(', ') : `${gateIds.size} gates indexed` }
  }))

  checks.push(check('G-013', 'verification IDs resolvable', () => {
    const bad = []
    for (const m of mappings.mappings) for (const v of m.verification || []) if (!verificationIds.has(v)) bad.push(`${m.id}:${v}`)
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join(', ') : `${verificationIds.size} catalog entries` }
  }))

  checks.push(check('G-014', 'declared_in artefacts exist', () => {
    const bad = []
    for (const v of mappings.verification_catalog) {
      const d = v.declared_in || ''
      const inGov = v.declared_in_repo === 'GOVERNANCE'
      if (d.includes('#scripts.')) {
        const [file, scriptName] = d.split('#scripts.')
        const abs = inGov ? govPath(file) : codePath(file)
        if (!existsSync(abs)) { bad.push(`${v.id}:${file} missing`); continue }
        try {
          const pkg = JSON.parse(readFileSync(abs, 'utf8'))
          if (!pkg.scripts || !(scriptName in pkg.scripts)) bad.push(`${v.id}: script ${scriptName} missing`)
        } catch (e) { bad.push(`${v.id}: bad package.json`) }
      } else {
        const ok = inGov ? govExists(d) : codeExists(d)
        if (!ok) bad.push(`${v.id}:${d} missing`)
      }
    }
    return { status: bad.length ? 'FAIL' : 'PASS',
      detail: bad.length ? bad.join('; ') : `${mappings.verification_catalog.length} verification declarations verified` }
  }))

  checks.push(check('G-015', 'gate documents exist in governance repo', () => {
    const bad = gates.gates.filter((g) => !govExists(g.file)).map((g) => g.id)
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join(', ') : `${gates.gates.length} gate docs present` }
  }))

  checks.push(check('G-016', 'shared impact zones resolve', () => {
    const bad = []
    for (const z of modules.shared_impact_zones || []) {
      if (z.expands_to === '*') continue
      for (const id of z.expands_to) if (!moduleIds.has(id)) bad.push(`${z.id}:${id}`)
    }
    return { status: bad.length ? 'FAIL' : 'PASS', detail: bad.length ? bad.join(', ') : `${(modules.shared_impact_zones || []).length} zones` }
  }))

  checks.push(check('G-017', 'read-only boundary enforced', () => {
    const ok = config.repositories?.code?.write_access === false &&
      policy.read_only_boundary?.code_repository_writable === false
    return { status: ok ? 'PASS' : 'FAIL',
      detail: ok ? 'code repo is read-only for the governance layer' : 'boundary NOT enforced' }
  }))

  checks.push(check('G-018', 'no implicit PASS for unexecuted layers', () => {
    const l3 = config.layers.find((l) => l.id === 'L3')
    const l4 = config.layers.find((l) => l.id === 'L4')
    const ok = l3?.executes === false && l3?.default_status === 'NOT_RUN' &&
      l4?.executes === false && l4?.default_status === 'NOT_RUN' &&
      config.evidence?.forbid_implicit_pass === true
    return { status: ok ? 'PASS' : 'FAIL', detail: ok ? 'L3/L4 default NOT_RUN' : 'implicit PASS possible' }
  }))

  const fail = checks.filter((c) => c.status === 'FAIL')
  const notRun = checks.filter((c) => c.status === 'NOT_RUN')
  return {
    report_id: 'UAES-P13-REGISTRY-VALIDATION',
    generated_at: nowIso(),
    governance_root: GOV_ROOT,
    code_root: CODE_ROOT,
    checks,
    summary: { total: checks.length, pass: checks.length - fail.length - notRun.length,
      fail: fail.length, not_run: notRun.length },
    findings: fail.map((c) => `${c.id} ${c.name}: ${c.detail}`),
    rule_catalog: { total_real_ids: realRuleIds.size,
      mapped_ids: [...new Set(mappings.mappings.flatMap((m) => m.rules || []))].length },
  }
}

if (isMain(import.meta.url)) {
  const r = runValidation()
  for (const c of r.checks) {
    console.log(`${c.status.padEnd(8)} ${c.id}  ${c.name.padEnd(38)} ${c.detail}`)
  }
  console.log(`\nchecks=${r.summary.total} PASS=${r.summary.pass} FAIL=${r.summary.fail} NOT_RUN=${r.summary.not_run}`)
  if (!process.argv.includes('--no-write')) {
    const out = govPath('reports/quality/UAES-P13-REGISTRY-VALIDATION.json')
    const { writeFileSync } = await import('node:fs')
    writeFileSync(out, JSON.stringify(r, null, 2) + '\n')
    console.log('written: reports/quality/UAES-P13-REGISTRY-VALIDATION.json')
  }
  if (r.summary.fail) process.exitCode = 1
}
