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
 * Component registry check (UAES-05-006 / Gate DQ-009, DQ-010, DQ-020).
 *
 * Imported from uaes/p4-design-token-engine. The product branch assumed the
 * whole React component tree existed next to the registry. This standard
 * library only carries the registry and its reference assets, so filesystem
 * parity is reported as NOT_RUN (never PASS) unless --implementation-root is
 * supplied. UAES-05-GATE-001 §4/§6 forbids reporting NOT_RUN as PASS.
 *
 * Usage:
 *   node quality/scripts/design-system/check-component-registry.mjs
 *   node quality/scripts/design-system/check-component-registry.mjs --implementation-root /path/to/uter/web
 *   node quality/scripts/design-system/check-component-registry.mjs --strict
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import {
  COMPONENT_REGISTRY, COMPONENT_IMPLEMENTATION_ROOT,
  UAES_CONTRACT_SCHEMA, REFERENCE_WEB,
} from './paths.mjs'

const argValue = (flag) => {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : undefined
}
const explicitRoot = argValue('--implementation-root')
const IMPL_ROOT = explicitRoot ? resolve(explicitRoot) : null
const FILE_PARITY = Boolean(IMPL_ROOT && existsSync(join(IMPL_ROOT, 'src/components/ui')))

const registry = JSON.parse(readFileSync(COMPONENT_REGISTRY, 'utf8'))
const contractSchema = JSON.parse(readFileSync(UAES_CONTRACT_SCHEMA, 'utf8'))
const errors = []
const warnings = []
const ids = new Set()
const files = new Set()

if (registry.designSystem !== 'UTER Design System 3.0') errors.push('Registry designSystem must be UTER Design System 3.0')
if (registry.implementationRoot !== COMPONENT_IMPLEMENTATION_ROOT) {
  errors.push('Unexpected implementation root: expected ' + COMPONENT_IMPLEMENTATION_ROOT)
}
if (!Array.isArray(registry.components)) errors.push('components must be an array')

for (const component of registry.components ?? []) {
  if (ids.has(component.id)) errors.push('Duplicate component ID: ' + component.id)
  ids.add(component.id)
  if (files.has(component.file)) errors.push('Duplicate component file: ' + component.file)
  files.add(component.file)
  if (FILE_PARITY && !existsSync(join(IMPL_ROOT, component.file))) errors.push('Missing component file: ' + component.file)
  if (!component.contract?.states?.length) errors.push('Missing states: ' + component.id)
  for (const section of ['accessibility', 'responsive', 'tokens', 'evidence']) {
    if (!component.contract?.[section]) errors.push('Missing contract section ' + section + ': ' + component.id)
  }
  if (!['NOT_VERIFIED', 'PARTIAL', 'VERIFIED', 'EXCEPTION'].includes(component.contract?.evidence?.status)) {
    errors.push('Invalid evidence status: ' + component.id)
  }
  if (FILE_PARITY) {
    for (const test of component.contract?.evidence?.tests ?? []) {
      if (!existsSync(join(IMPL_ROOT, test))) errors.push('Missing test evidence file ' + test + ' for ' + component.id)
    }
  }
  if (component.contract?.evidence?.status !== 'VERIFIED') warnings.push('Evidence not verified: ' + component.id)
}

// Gap analysis against .uaes/schemas/component-contract.schema.json.
// UAES-05-006 requires props/variants/tests; the imported registry records
// states/accessibility/responsive/tokens/evidence instead. Report the gap as
// NOT_VERIFIED instead of inventing contract data.
const required = contractSchema.required ?? []
const gap = {}
for (const field of required) {
  const missing = (registry.components ?? []).filter((c) => c[field] === undefined).length
  if (missing) gap[field] = missing
}

function collectTsx(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') return []
      return collectTsx(full)
    }
    if (!entry.isFile() || !entry.name.endsWith('.tsx')) return []
    if (/\.(test|spec)\.tsx$/.test(entry.name)) return []
    return [relative(IMPL_ROOT, full).replaceAll('\\', '/')]
  })
}

if (FILE_PARITY) {
  const UI_ROOT = join(IMPL_ROOT, 'src/components/ui')
  const actual = new Set(collectTsx(UI_ROOT))
  for (const file of actual) if (!files.has(file)) errors.push('Unregistered UI component file: ' + file)
  for (const file of files) if (!actual.has(file)) errors.push('Registry entry is not an eligible UI component: ' + file)
}

const summary = {
  registered: registry.components.length,
  contractSchema: '.uaes/schemas/component-contract.schema.json',
  contractSchemaStatus: Object.keys(gap).length ? 'NOT_VERIFIED' : 'VERIFIED',
  contractSchemaMissingFields: gap,
  filesystemParity: FILE_PARITY ? 'RUN' : 'NOT_RUN',
  referenceAssets: REFERENCE_WEB,
  evidenceVerified: registry.components.filter((x) => x.contract.evidence.status === 'VERIFIED').length,
  evidencePartial: registry.components.filter((x) => x.contract.evidence.status === 'PARTIAL').length,
  evidenceNotVerified: registry.components.filter((x) => x.contract.evidence.status === 'NOT_VERIFIED').length,
  errors: errors.length,
  warnings: warnings.length,
}
console.log('[UAES Component Registry]', JSON.stringify(summary, null, 2))
if (!FILE_PARITY) {
  console.log('NOT_RUN: component source files and test evidence are not part of this import.')
  console.log('         Re-run with --implementation-root <product-web-root> in the product repository.')
}
for (const error of errors) console.error('ERROR:', error)
for (const warning of warnings) console.warn('WARN:', warning)
if (errors.length) process.exit(1)
if (process.argv.includes('--strict') && warnings.length) {
  console.error('Strict mode: all registered components must have VERIFIED evidence.')
  process.exit(1)
}
console.log('Component registry structure is valid; NOT_RUN checks are not claimed as PASS.')
