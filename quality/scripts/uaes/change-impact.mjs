#!/usr/bin/env node
/** Layer 2 — Module Validation / Change Impact Engine.
 *  Resolves changed files to modules, expands shared-impact zones, and emits
 *  the exact domains, rule IDs, gates and verification commands that apply.
 *  Git diff alone is never sufficient (execution-policy.yaml).
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import {
  CODE_ROOT, govPath, loadYaml, schemaValidate, moduleForFile,
  globMatch, readStdin, nowIso, isMain,
} from './paths.mjs'

export const PAYMENT_EXAMPLE = [
  'service/billing_session.go',
  'model/user.go',
  'go.mod',
  'docs/ai-specs/PRODUCT-REQUIREMENTS-STANDARD.md',
]

export function filesFromArgs(argv) {
  if (argv.includes('--example')) return { files: PAYMENT_EXAMPLE, source: 'EXAMPLE_PAYMENT_DOUBLE_ENTRY' }
  const fi = argv.indexOf('--files')
  if (fi >= 0 && argv[fi + 1]) return { files: argv[fi + 1].split(',').map((s) => s.trim()).filter(Boolean), source: 'ARGS' }
  if (argv.includes('--stdin')) return {
    files: readStdin().split(/\r?\n/).map((s) => s.trim()).filter(Boolean), source: 'STDIN',
  }
  if (argv.includes('--git-diff')) {
    const out = new Set()
    for (const args of [['diff', '--name-only'], ['diff', '--cached', '--name-only']]) {
      try {
        execFileSync('git', ['-C', CODE_ROOT, ...args], { encoding: 'utf8' })
          .split(/\r?\n/).filter(Boolean).forEach((f) => out.add(f))
      } catch { /* ignore */ }
    }
    return { files: [...out], source: 'GIT_DIFF_READONLY' }
  }
  return { files: [], source: 'NONE' }
}

export function analyze(files, taskId = 'UAES-P13-IMPACT-ANALYSIS') {
  const modules = loadYaml('.uaes/registry/modules.yaml')
  const mappings = loadYaml('.uaes/registry/mappings.yaml')
  const catalog = new Map(mappings.verification_catalog.map((v) => [v.id, v]))

  const direct = new Set()
  const moduleMatched = new Set()
  const byModule = {}
  for (const f of files) {
    const id = moduleForFile(f, modules.modules)
    if (!id) continue
    moduleMatched.add(f)
    direct.add(id)
    ;(byModule[id] ||= []).push(f)
  }

  // Shared impact zones: interface refs, shared DB models, rule sources, CI.
  const zones = []
  const expanded = new Set()
  for (const z of modules.shared_impact_zones || []) {
    const hits = files.filter((f) => (z.paths || []).some((g) => globMatch(g, f.replace(/^\.\//, ''))))
    if (!hits.length) continue
    const targets = z.expands_to === '*' ? modules.modules.map((m) => m.id) : z.expands_to
    for (const t of targets) if (!direct.has(t)) expanded.add(t)
    zones.push({ id: z.id, triggered_by: hits, expands_to: z.expands_to === '*' ? ['*'] : targets, reason: z.reason })
  }

  // A rule-source / CI file may belong to no code module yet still expand scope
  // through a shared impact zone. Classify it explicitly instead of calling it
  // "unmatched" — otherwise the impact report would hide a real governance change.
  const zoneMatched = new Set(zones.flatMap((z) => z.triggered_by))
  const ruleSourceFiles = files.filter((f) => !moduleMatched.has(f) && zoneMatched.has(f))
  const unmatched = files.filter((f) => !moduleMatched.has(f) && !zoneMatched.has(f))

  const affected = new Set([...direct, ...expanded])
  const affectedList = [...affected]
  const domainSet = new Set()
  for (const m of modules.modules) if (affected.has(m.id)) for (const d of m.standards || []) domainSet.add(d)

  const applicableMappings = mappings.mappings.filter((m) => {
    if (m.modules === '*') return true
    return m.modules.some((id) => affected.has(id))
  })
  const ruleSet = new Set()
  const gateSet = new Set()
  const verificationSet = new Set()
  for (const m of applicableMappings) {
    for (const r of m.rules || []) ruleSet.add(r)
    gateSet.add(m.gate)
    for (const v of m.verification || []) verificationSet.add(v)
  }

  const requiredVerification = [...verificationSet].sort().map((id) => {
    const v = catalog.get(id) || { id, command: 'UNRESOLVED', cwd: '.', execution: 'MANUAL' }
    return { id, command: v.command, cwd: v.cwd, kind: v.kind, execution: v.execution, declared_in: v.declared_in }
  })

  return {
    task_id: taskId,
    generated_at: nowIso(),
    changed_files: files,
    files_source: undefined,
    direct_modules: [...direct].sort(),
    expanded_modules: [...expanded].sort(),
    module_files: byModule,
    impact_zones: zones,
    domains: [...domainSet].sort(),
    rules: [...ruleSet].sort(),
    gates: [...gateSet].sort(),
    required_verification: requiredVerification,
    applicable_mappings: applicableMappings.map((m) => m.id),
    rule_source_files: ruleSourceFiles,
    unmatched_files: unmatched,
    note: 'Git diff alone is insufficient; shared impact zones expand the scope per execution-policy.yaml.',
  }
}

if (isMain(import.meta.url)) {
  const argv = process.argv.slice(2)
  const { files, source } = filesFromArgs(argv)
  const result = analyze(files)
  result.files_source = source
  if (!files.length) {
    console.log('No changed files. Use --files a,b,c | --stdin | --git-diff | --example')
    process.exit(0)
  }
  console.log(`source          : ${source}`)
  console.log(`changed files   : ${files.length}`)
  console.log(`direct modules  : ${result.direct_modules.join(', ') || '(none)'}`)
  console.log(`expanded modules: ${result.expanded_modules.join(', ') || '(none)'}`)
  console.log(`impact zones    : ${result.impact_zones.map((z) => z.id).join(', ') || '(none)'}`)
  console.log(`domains         : ${result.domains.join(', ') || '(none)'}`)
  console.log(`real rule IDs   : ${result.rules.length}`)
  console.log(`gates           : ${result.gates.join(', ')}`)
  console.log(`verification    : ${result.required_verification.length} command(s)`)
  for (const v of result.required_verification) console.log(`  - [${v.execution}] ${v.id}: ${v.command}`)
  if (result.unmatched_files.length) console.log(`unmatched files : ${result.unmatched_files.join(', ')}`)

  const sv = schemaValidate('.uaes/schemas/change-impact.schema.json', result)
  console.log(`schema          : ${sv.available ? (sv.ok ? 'PASS' : 'FAIL ' + sv.detail) : 'NOT_RUN (ajv unavailable)'}`)
  if (!argv.includes('--no-write')) {
    const out = govPath('reports/quality/UAES-P13-CHANGE-IMPACT.json')
    writeFileSync(out, JSON.stringify(result, null, 2) + '\n')
    console.log('written: reports/quality/UAES-P13-CHANGE-IMPACT.json')
  }
  if (sv.available && !sv.ok) process.exitCode = 1
}
