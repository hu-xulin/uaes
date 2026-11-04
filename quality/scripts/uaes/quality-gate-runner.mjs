#!/usr/bin/env node
/** Layer 3 / 4 — Domain Gates + Global Quality Gate.
 *  Default mode is evidence-only: it aggregates REAL Layer 1/2 execution and
 *  records every unexecuted code-repo gate as NOT_RUN. It NEVER claims PASS for
 *  a command it did not run. `--execute` only prints the authorisation-required
 *  command list; running commands inside the product repo needs explicit approval.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import {
  CODE_ROOT, GOV_ROOT, govPath, loadYaml, loadJson, schemaValidate,
  sha256File, codeGitHead, nowIso, isMain,
} from './paths.mjs'
import { runValidation } from './validate-registry.mjs'
import { analyze, filesFromArgs } from './change-impact.mjs'

const REPORT_REL = 'reports/quality/UAES-P13-GOVERNANCE-VERIFICATION.json'

function codeBranch() {
  try {
    return execFileSync('git', ['-C', CODE_ROOT, 'branch', '--show-current'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || null
  } catch { return null }
}

export function buildReport(argv = []) {
  const config = loadYaml('.uaes/config.yaml')
  const gates = loadYaml('.uaes/registry/gates.yaml')
  const validation = runValidation()
  const { files, source } = filesFromArgs(argv)
  const impact = analyze(files)
  if (!argv.includes('--no-write')) {
    writeFileSync(govPath('reports/quality/UAES-P13-REGISTRY-VALIDATION.json'),
      JSON.stringify(validation, null, 2) + '\n')
  }

  const notRunGates = gates.gates.map((g) => `${g.id} (${g.name}): ${g.execution}`)
  const delegated = [...new Set(impact.required_verification
    .filter((v) => v.execution !== 'MANUAL')
    .map((v) => `${v.id}: ${v.command}`))]
  const manual = impact.required_verification.filter((v) => v.execution === 'MANUAL').map((v) => v.id)

  const findings = [...validation.findings]
  findings.push('MOD-TOKENKIT-INNER: the 4th Go module is absent from .quality/.state/inventory.txt; '
    + 'UAES-06/09 gates forbid claiming all modules PASS from one root go test.')
  findings.push('Domains 00/01/03/04/09/10/11/12 have no rule-level IDs registered; '
    + 'their mappings are domain-level only (no fabricated IDs).')

  const evidence = []
  const addEvidence = (type, location) => evidence.push({
    evidence_type: type, location, sha256: sha256File(location) || null,
  })
  addEvidence('REGISTRY_VALIDATION', 'reports/quality/UAES-P13-REGISTRY-VALIDATION.json')
  addEvidence('MODULE_REGISTRY', '.uaes/registry/modules.yaml')
  addEvidence('RULE_MAPPING', '.uaes/registry/mappings.yaml')
  addEvidence('GATE_REGISTRY', '.uaes/registry/gates.yaml')
  addEvidence('STANDARD_INDEX', '.uaes/registry/standards.yaml')
  addEvidence('EXECUTION_POLICY', '.uaes/policies/execution-policy.yaml')
  addEvidence('REPOSITORY_INVENTORY', 'reports/baseline/UAES-P13-REPOSITORY-INVENTORY.json')

  const head = codeGitHead()
  const fail = validation.summary.fail > 0
  const status = fail ? 'FAIL' : 'BLOCKED'   // BLOCKED because L3/L4 are NOT_RUN

  const report = {
    report_id: 'UAES-P13-GOVERNANCE-VERIFICATION',
    task_id: 'UAES-P13-REPOSITORY-INTEGRATION',
    repository: 'https://github.com/hu-xulin/uter',
    branch: codeBranch(),
    base_commit_sha: null,
    commit_sha: head || '0'.repeat(40),
    risk_level: 'R2',
    review_status: fail ? 'FAIL' : 'NOT_VERIFIED',
    gate_status: status,
    tests: [
      `node quality/scripts/uaes/validate-registry.mjs -> ${validation.summary.total} checks, FAIL=${validation.summary.fail}`,
      `node quality/scripts/uaes/change-impact.mjs -> ${files.length} changed file(s), source=${source}`,
      `node quality/scripts/uaes/quality-gate-runner.mjs -> ${gates.gates.length} domain gates aggregated`,
      'ajv schema validation of module/mapping/gate registries',
      'real rule-ID extraction from standards/**/*.md',
    ],
    findings,
    unresolved_risks: [
      'L3/L4 gates require explicit authorisation to run commands inside the product repository.',
      '4th Go module coverage gap in the existing quality inventory.',
      'P05 acceptance remains BLOCKED: component contract fields, brand colour approval, visual regression / axe.',
      'CI integration (Layer 3/4 wiring into .github/workflows) is not performed without authorisation.',
    ],
    not_run_checks: [...notRunGates, ...delegated, ...manual.map((m) => `${m}: MANUAL review`)],
    blocked_checks: [gates.global_gate.id, 'UAES-05-GATE-001'],
    security_summary: 'Security gates (UAES-10) not executed; secret-scan and govulncheck delegated to existing tooling.',
    regression_summary: 'No visual regression, axe or keyboard-focus evidence produced in this governance-only run.',
    evidence,
    generated_at: nowIso(),
    generated_by: 'quality/scripts/uaes/quality-gate-runner.mjs',
    conclusion: fail
      ? 'Governance validation FAILED. Fix registry findings before any code mapping is trusted.'
      : 'Layer 1 (governance validation) and Layer 2 (module/impact resolution) executed with real evidence. '
        + 'Layer 3 domain gates and Layer 4 global gate remain NOT_RUN because the governance layer is '
        + 'read-only against the product repository. Global gate is BLOCKED, not PASS.',
  }

  return { report, validation, impact, config, gates }
}

if (isMain(import.meta.url)) {
  const argv = process.argv.slice(2)
  const { report, validation, impact, gates } = buildReport(argv)

  if (argv.includes('--execute')) {
    console.log('The following commands require separate authorisation to run inside the product repo:')
    for (const c of report.not_run_checks) console.log('  - ' + c)
    console.log('\nNothing was executed. The governance layer is read-only by policy.')
  }

  const sv = schemaValidate('.uaes/schemas/quality-report.schema.json', report)
  console.log(`registry checks : ${validation.summary.total} PASS=${validation.summary.pass} FAIL=${validation.summary.fail} NOT_RUN=${validation.summary.not_run}`)
  console.log(`impact modules  : ${[...impact.direct_modules, ...impact.expanded_modules].length}`)
  console.log(`domain gates    : ${gates.gates.length} (all ${report.gate_status === 'FAIL' ? 'n/a' : 'NOT_RUN'})`)
  console.log(`report schema   : ${sv.available ? (sv.ok ? 'PASS' : 'FAIL ' + sv.detail) : 'NOT_RUN'}`)
  console.log(`gate_status     : ${report.gate_status} / review_status: ${report.review_status}`)

  if (!argv.includes('--no-write')) {
    writeFileSync(govPath(REPORT_REL), JSON.stringify(report, null, 2) + '\n')
    console.log('written: ' + REPORT_REL)
  }
  if (sv.available && !sv.ok) process.exitCode = 1
  if (validation.summary.fail) process.exitCode = 1
}
