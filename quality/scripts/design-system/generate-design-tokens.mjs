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
 * Deterministic generator for UAES brand token runtime artifacts.
 *
 * Imported from uaes/p4-design-token-engine and adapted to the UAES standard
 * library layout. UAES-05-002 §6 requires generated files to declare the
 * generator, its version and the source file; UAES-05-011-006 requires the
 * provenance of every generated artifact. UAES-05-002-007 requires a
 * deterministic build, so the same source always produces byte-identical
 * output.
 *
 * Two artifacts are produced from the single DTCG source:
 *   - design-system/tokens/generated/brand.css        (CSS custom properties)
 *   - design-system/tokens/source/uaes-tokens.projected.json
 *       (projection conforming to .uaes/schemas/design-token.schema.json,
 *        so Gate DQ-002 Token Schema can be executed in this project)
 *
 * Usage:
 *   node quality/scripts/design-system/generate-design-tokens.mjs
 *   node quality/scripts/design-system/generate-design-tokens.mjs --check
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname } from 'node:path'
import {
  GENERATED_CSS, GENERATED_CSS_REL, PROJECTED_TOKENS,
  TOKEN_SOURCE, TOKEN_SOURCE_REL,
  GENERATOR_REL, GENERATOR_VERSION,
} from './paths.mjs'

const CHECK_ONLY = process.argv.includes('--check')
const source = JSON.parse(readFileSync(TOKEN_SOURCE, 'utf8'))
const metadata = source.$extensions?.['com.uter.uaes']
if (metadata?.id !== 'UTER-BRAND-TOKEN-SOURCE' || !/^\d+\.\d+\.\d+$/.test(metadata.version ?? '')) {
  throw new Error('Invalid UAES token source metadata')
}
if (metadata.governingStandard !== 'UAES-05-002' || metadata.changeApproval !== 'NOT_VERIFIED') {
  throw new Error('Token source must declare UAES-05-002 governance and must not claim approval')
}

const keys = ['primary', 'primaryForeground', 'hover', 'active', 'soft', 'softForeground', 'border', 'subtleSurface']
const names = {
  primary: 'primary', primaryForeground: 'primary-foreground', hover: 'hover',
  active: 'active', soft: 'soft', softForeground: 'soft-foreground',
  border: 'border', subtleSurface: 'subtle-surface',
}
for (const theme of ['light', 'dark']) {
  const group = source.themes?.[theme]?.brand
  if (group?.$type !== 'color') throw new Error('Missing color group: themes.' + theme + '.brand')
  for (const key of keys) {
    const token = group[key]
    if (typeof token?.$value !== 'string' || !/^#[0-9a-f]{6}$/i.test(token.$value)) {
      throw new Error('Invalid themes.' + theme + '.brand.' + key + ': expected DTCG color token with #RRGGBB $value')
    }
    if (typeof token.$description !== 'string' || !token.$description.trim()) {
      throw new Error('Missing $description for themes.' + theme + '.brand.' + key)
    }
  }
}

const render = theme => keys.map(
  key => '  --uaes-brand-' + names[key] + ': ' + source.themes[theme].brand[key].$value + ';'
).join('\n')

const css = [
  '/*',
  'Copyright (C) 2023-2026 Uter.ai',
  '',
  'This program is free software: you can redistribute it and/or modify',
  'it under the terms of the GNU Affero General Public License as',
  'published by the Free Software Foundation, either version 3 of the',
  'License, or (at your option) any later version.',
  '',
  'This program is distributed in the hope that it will be useful,',
  'but WITHOUT ANY WARRANTY; without even the implied warranty of',
  'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the',
  'GNU Affero General Public License for more details.',
  '',
  'You should have received a copy of the GNU Affero General Public License',
  'along with this program. If not, see <https://www.gnu.org/licenses/>.',
  '',
  'For commercial licensing, please contact support@uter.ai',
  '*/',
  '',
  '/*',
  ' * GENERATED FILE — DO NOT EDIT. UAES-05-002 §7 / UAES-05-011-006.',
  ' * Source: ' + TOKEN_SOURCE_REL,
  ' * Source version: ' + metadata.version + ' (' + metadata.status + ')',
  ' * Generator: ' + GENERATOR_REL,
  ' * Generator version: ' + GENERATOR_VERSION,
  ' * Spec: UAES-05-002 §6, UAES-05-011-006, UAES-05-GATE-001 DQ-024',
  ' */',
  ':root {',
  render('light'),
  '}',
  '',
  '.dark {',
  render('dark'),
  '}',
  '',
].join('\n')

// Projection into the registry-governed UAES token schema. The DTCG source
// remains the single authority (UAES-05 §6); this file is generated, never
// hand-edited, and exists so DQ-002 can be executed against
// .uaes/schemas/design-token.schema.json.
const tokens = {}
for (const theme of ['light', 'dark']) {
  for (const key of keys) {
    const token = source.themes[theme].brand[key]
    const id = 'brand.' + theme + '.' + key.charAt(0).toLowerCase() + key.slice(1)
    tokens[id] = {
      id,
      type: 'color',
      value: token.$value,
      description: token.$description,
      status: metadata.status === 'ACTIVE' ? 'ACTIVE' : 'DRAFT',
      platforms: ['web', 'h5', 'electron'],
      owner: 'Design System Owner',
    }
  }
}
const projected = JSON.stringify({
  $schemaVersion: '1.0.0',
  tokenSet: 'UTER-BRAND-3.0',
  tokens,
}, null, 2) + '\n'

const artifacts = [
  [GENERATED_CSS, css],
  [PROJECTED_TOKENS, projected],
]

if (CHECK_ONLY) {
  let stale = false
  for (const [file, expected] of artifacts) {
    if (!existsSync(file) || readFileSync(file, 'utf8') !== expected) {
      console.error('Stale generated artifact: ' + file)
      stale = true
    }
  }
  if (stale) {
    console.error('Run: node quality/scripts/design-system/generate-design-tokens.mjs')
    process.exit(1)
  }
  console.log('Design token source and all generated artifacts are in sync (DQ-024 PASS).')
} else {
  for (const [file, expected] of artifacts) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, expected)
    console.log('Generated ' + file)
  }
}
