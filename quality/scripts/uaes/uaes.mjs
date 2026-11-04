#!/usr/bin/env node
/** UAES Governance Layer — single CLI entry point.
 *
 *  node quality/scripts/uaes/uaes.mjs <command> [options]
 *
 *  validate    Layer 1: registry / schema / real-ID / real-path validation
 *  impact      Layer 2: change impact (--files, --stdin, --git-diff, --example)
 *  inventory   Phase I: regenerate Repository Inventory (JSON + Markdown)
 *  gate        Layer 3/4: aggregate evidence into a quality-report.json
 *  all         inventory -> validate -> impact -> gate -> inventory refresh
 */
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const cmd = args[0] || 'all'
const rest = args.slice(1)

const SCRIPTS = {
  validate: 'validate-registry.mjs',
  impact: 'change-impact.mjs',
  inventory: 'generate-inventory.mjs',
  gate: 'quality-gate-runner.mjs',
}

function run(name, extra = []) {
  const file = SCRIPTS[name]
  if (!file) { console.error('unknown command:', name); process.exit(2) }
  console.log(`\n=== ${name} (${file}) ===`)
  const r = spawnSync(process.execPath, [join(HERE, file), ...extra], { stdio: 'inherit' })
  if (r.error) { console.error(r.error.message); process.exitCode = 1 }
  else if (r.status !== 0) { console.error(`${name} exited ${r.status}`); process.exitCode = r.status || 1 }
  return r.status
}

if (cmd === 'all') {
  run('validate')
  run('impact', rest.length ? rest : ['--example'])
  run('inventory')
  run('gate', ['--example'])
  // Refresh the manifest so it includes the final generated evidence.
  run('inventory')
} else if (cmd in SCRIPTS) {
  run(cmd, rest)
} else {
  console.log('Usage: uaes.mjs <validate|impact|inventory|gate|all> [options]')
  console.log('  impact options: --files a,b,c | --stdin | --git-diff | --example')
  console.log('  gate options  : --execute (prints authorisation-required commands only)')
  process.exitCode = 2
}
