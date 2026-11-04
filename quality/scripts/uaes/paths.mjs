/** Shared resolution helpers for the UAES governance layer.
 *  The governance repository is the ONLY writable location. The product code
 *  repository is read-only, resolved from UTER_REPO_ROOT or the config default.
 */
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const isMain = (metaUrl) => resolve(process.argv[1] || '') === fileURLToPath(metaUrl)

const HERE = dirname(fileURLToPath(import.meta.url))
export const GOV_ROOT = resolve(HERE, '..', '..', '..')
export const CODE_ROOT = resolve(process.env.UTER_REPO_ROOT || '/Users/lincolnhu/uter')

export const govPath = (...p) => join(GOV_ROOT, ...p)
export const codePath = (...p) => join(CODE_ROOT, ...p)
export const govExists = (...p) => existsSync(govPath(...p))
export const codeExists = (...p) => existsSync(codePath(...p))

/** Reuse already-installed parsers from the product repo; degrade gracefully. */
function tryRequire(name) {
  try {
    const req = createRequire('/Users/lincolnhu/uter/web/package.json')
    const mod = req(name)
    return mod && mod.default ? mod.default : mod
  } catch {
    return null
  }
}

const jsYaml = tryRequire('js-yaml')
// The UAES schemas use JSON Schema draft 2020-12; the default ajv entry point
// is draft-07 and rejects the $schema URI. Load the 2020 build explicitly.
const Ajv = tryRequire('ajv/dist/2020') || tryRequire('ajv')
const addFormats = tryRequire('ajv-formats')

export function loadYaml(relOrAbs) {
  const abs = relOrAbs.startsWith('/') ? relOrAbs : govPath(relOrAbs)
  const text = readFileSync(abs, 'utf8')
  if (jsYaml) return jsYaml.load(text)
  // Fallback keeps the governance layer usable without the product repo's deps.
  const out = execFileSync('python3', ['-c',
    'import sys,yaml,json;print(json.dumps(yaml.safe_load(sys.stdin.read()),ensure_ascii=False))'],
    { input: text, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  return JSON.parse(out)
}

export function loadJson(relOrAbs) {
  const abs = relOrAbs.startsWith('/') ? relOrAbs : govPath(relOrAbs)
  return JSON.parse(readFileSync(abs, 'utf8'))
}

export function schemaValidate(schemaRel, data) {
  if (!Ajv) return { available: false, ok: true, errors: [], detail: 'ajv unavailable; skipped' }
  try {
    const ajv = new Ajv({ allErrors: true, strict: false })
    if (addFormats) addFormats(ajv)
    const validate = ajv.compile(loadJson(schemaRel))
    const ok = validate(data)
    return {
      available: true, ok, errors: validate.errors || [],
      detail: ok ? 'conforms' : (validate.errors || []).slice(0, 4)
        .map((e) => `${e.instancePath || '/'} ${e.message}`).join('; '),
    }
  } catch (e) {
    return { available: true, ok: false, errors: [], detail: String(e.message || e) }
  }
}

/** Minimal POSIX glob matcher supporting * and ** (no external dependency). */
export function globMatch(pattern, path) {
  let p = pattern.replace(/^\.\//, '').replace(/\\/g, '/')
  const target = path.replace(/\\/g, '/').replace(/^\.\//, '')
  const escaped = p.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  const re = '^' + escaped
    .replace(/\*\*/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0000/g, '.*')
    .replace(/\?/g, '[^/]') + '$'
  return new RegExp(re).test(target)
}

/** Most specific module wins: longer declared path takes precedence. */
export function sortModules(modules) {
  return [...modules].sort((a, b) => b.path.length - a.path.length)
}

export function moduleForFile(file, modules) {
  const f = file.replace(/^\.\//, '')
  for (const m of sortModules(modules)) {
    const included = (m.include || []).some((g) => globMatch(g, f))
    if (!included) continue
    const excluded = (m.exclude || []).some((g) => globMatch(g, f))
    if (!excluded) return m.id
  }
  return null
}

export function sha256File(relOrAbs) {
  const abs = relOrAbs.startsWith('/') ? relOrAbs : govPath(relOrAbs)
  try { return createHash('sha256').update(readFileSync(abs)).digest('hex') } catch { return null }
}

export function codeGitHead() {
  try {
    return execFileSync('git', ['-C', CODE_ROOT, 'rev-parse', 'HEAD'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch { return null }
}

export function govGitHead() {
  try {
    return execFileSync('git', ['-C', GOV_ROOT, 'rev-parse', 'HEAD'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch { return null }
}

export function readStdin() {
  try { return readFileSync(0, 'utf8') } catch { return '' }
}

export const nowIso = () => new Date().toISOString()
export const SEP = sep
