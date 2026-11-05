#!/usr/bin/env node
/**
 * UAES Layer-1 registry gate — Positive / Negative / Bypass tests.
 *
 * Why this file exists
 * --------------------
 * Before 2026-11-05, `validate-registry.mjs` reported 18/18 PASS even when a
 * registered Schema was truncated to zero bytes: G-014 only asserted that the
 * path existed. A gate that cannot fail is not a gate. These tests construct
 * real violations in an isolated copy of the governance repository and assert
 * that the content-level checks (G-019..G-023) actually block them.
 *
 * Isolation
 * ---------
 * Every case runs in a temporary copy under os.tmpdir(); the working tree of
 * either repository is never modified. `GOV_ROOT` in paths.mjs is derived from
 * the script location, so a copy resolves to the copy. All cases run with
 * `scope: 'content'`: G-006/G-007/G-014 need the real Uter product repo, which
 * is intentionally absent from the governance-repo CI. They are reported as
 * NOT_RUN (not executed), never manufactured as PASS via a fake stub.
 *
 * Run:  node quality/scripts/uaes/validate-registry.test.mjs
 * Exit: 0 = all three-way assertions hold; 1 = gate regression.
 */
import {
  cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const GOV_ROOT = resolve(HERE, '..', '..', '..')

// Files whose presence is required for paths.mjs to resolve in the copy.
const COPY_INCLUDE = [
  '.uaes', 'standards', 'quality', 'design-system', 'agents', 'skills',
  'workflows', 'reports',
]

let passed = 0
let failed = 0
const results = []

function record(name, ok, detail) {
  results.push({ name, status: ok ? 'PASS' : 'FAIL', detail })
  if (ok) passed++
  else failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}     ${name.padEnd(52)} ${detail}`)
}

/** Build an isolated governance-repo copy; returns { root, cleanup }. */
function makeCopy() {
  const root = mkdtempSync(join(tmpdir(), 'uaes-gate3-'))
  for (const rel of COPY_INCLUDE) {
    const src = join(GOV_ROOT, rel)
    if (existsSync(src)) cpSync(src, join(root, rel), { recursive: true })
  }
  return {
    root,
    cleanup: () => rmSync(root, { recursive: true, force: true }),
  }
}

/** Import a fresh copy of runValidation() bound to the given temp root. */
async function validateAt(root) {
  const script = join(root, 'quality/scripts/uaes/validate-registry.mjs')
  // Cache-bust so each case gets its own module instance / GOV_ROOT.
  const mod = await import(`${pathToFileURL(script).href}?case=${Math.random()}`)
  return mod.runValidation({ scope: 'content' })
}

function checksById(report) {
  return new Map(report.checks.map((c) => [c.id, c]))
}

const CONTENT_IDS = ['G-019', 'G-020', 'G-021', 'G-022', 'G-023']
const contentFailures = (report) => {
  const by = checksById(report)
  return CONTENT_IDS.filter((id) => by.get(id)?.status === 'FAIL')
}

async function main() {
  // ── ① Positive: clean repository must pass all content checks ────────
  {
    const c = makeCopy()
    try {
      const r = await validateAt(c.root)
      const bad = contentFailures(r)
      // The 18 product-repo-dependent checks are explicitly NOT_RUN under
      // content scope. NOT_RUN is not a PASS and must stay visible; it does
      // not invalidate the five content-level assertions below.
      record('positive/clean-repo', bad.length === 0 && r.summary.fail === 0,
        bad.length ? `content FAIL: ${bad.join(',')}`
          : `${r.summary.total} checks: PASS=${r.summary.pass} NOT_RUN=${r.summary.not_run} FAIL=${r.summary.fail}`)
    } finally { c.cleanup() }
  }

  // ── ② Negative A: empty a REGISTERED schema (the original bypass) ────
  {
    const c = makeCopy()
    try {
      writeFileSync(join(c.root, '.uaes/schemas/quality-report.schema.json'), '')
      const r = await validateAt(c.root)
      const by = checksById(r)
      const ok = by.get('G-019')?.status === 'FAIL' && by.get('G-021')?.status === 'FAIL'
      record('negative/empty-registered-schema', ok,
        ok ? 'G-019 + G-021 blocked (was 18/18 PASS before fix)'
           : `NOT BLOCKED: G-019=${by.get('G-019')?.status} G-021=${by.get('G-021')?.status}`)
    } finally { c.cleanup() }
  }

  // ── ③ Negative B: malformed JSON in an UNREGISTERED runtime schema ───
  {
    const c = makeCopy()
    try {
      writeFileSync(join(c.root, '.uaes/schemas/module-registry.schema.json'), '{ not json')
      const r = await validateAt(c.root)
      const ok = checksById(r).get('G-019')?.status === 'FAIL'
      record('negative/malformed-unregistered-schema', ok,
        ok ? 'G-019 blocked full-directory scan'
           : 'NOT BLOCKED: invalid JSON passed the gate')
    } finally { c.cleanup() }
  }

  // ── ④ Negative C: empty a registered standard document ──────────────
  {
    const c = makeCopy()
    try {
      writeFileSync(join(c.root, 'standards/00-foundation/UAES-00-006-AI-ENGINEERING-EXECUTION-MODEL.md'), '')
      const r = await validateAt(c.root)
      const by = checksById(r)
      const ok = by.get('G-020')?.status === 'FAIL' && by.get('G-022')?.status === 'FAIL'
      record('negative/empty-standard-doc', ok,
        ok ? 'G-020 + G-022 blocked'
           : `NOT BLOCKED: G-020=${by.get('G-020')?.status} G-022=${by.get('G-022')?.status}`)
    } finally { c.cleanup() }
  }

  // ── ⑤ Negative D: schema object present but missing $schema ──────────
  {
    const c = makeCopy()
    try {
      writeFileSync(join(c.root, '.uaes/schemas/report.schema.json'), JSON.stringify({ type: 'object' }))
      const r = await validateAt(c.root)
      const ok = checksById(r).get('G-019')?.status === 'FAIL'
      record('negative/missing-meta-schema', ok,
        ok ? 'G-019 blocked incomplete schema' : 'NOT BLOCKED: no-$schema passed')
    } finally { c.cleanup() }
  }

  // ── ⑥ Bypass: hide a violation behind a non-.json extension ──────────
  // The gate scans *.json by design. A file renamed to .txt is not a schema
  // artefact and cannot be consumed by Ajv; document this as scan boundary,
  // but assert that any *real* declared artefact going missing is blocked.
  {
    const c = makeCopy()
    try {
      const declared = join(c.root, '.uaes/schemas/report.schema.json')
      writeFileSync(declared, '')
      // Attempt to "hide" the violation by also leaving a .txt copy.
      writeFileSync(`${declared}.txt`, '{"$schema":"x","type":"object"}')
      const r = await validateAt(c.root)
      const ok = checksById(r).get('G-019')?.status === 'FAIL'
      record('bypass/distractor-file-cannot-mask-empty-schema', ok,
        ok ? 'G-019 still blocked despite .txt decoy' : 'NOT BLOCKED: decoy masked violation')
    } finally { c.cleanup() }
  }

  // ── ⑦ Negative E: duplicate declared artefact path ───────────────────
  {
    const c = makeCopy()
    try {
      const reg = join(c.root, '.uaes/STANDARD-REGISTRY.yaml')
      const text = readFileSync(reg, 'utf8')
      const anchor = '  - id: "UAES-SCHEMA-01-003"\n'
      const dup = '  - id: "UAES-SCHEMA-TEST-DUP"\n    file: ".uaes/schemas/agent-handoff.schema.json"\n    type: "SCHEMA"\n    phase: "P6"\n    status: "DRAFT"\n\n'
      writeFileSync(reg, text.replace(anchor, dup + anchor))
      const r = await validateAt(c.root)
      const ok = checksById(r).get('G-023')?.status === 'FAIL'
      record('negative/duplicate-declared-path', ok,
        ok ? 'G-023 blocked duplicate path' : 'NOT BLOCKED: duplicate path passed')
    } finally { c.cleanup() }
  }

  console.log(`\nthree-way tests: ${passed} PASS / ${failed} FAIL`)
  if (failed) {
    console.error('registry gate regression: at least one violation was not blocked')
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error('test harness error:', e)
  process.exitCode = 1
})
