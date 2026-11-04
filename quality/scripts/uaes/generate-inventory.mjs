#!/usr/bin/env node
/** Phase I — Repository Inventory generator.
 *  Reads the REAL product repository (read-only) and emits the nine artefacts
 *  required by the UAES Repository Integration phase. Re-runnable.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { CODE_ROOT, GOV_ROOT, codePath, govPath, govExists, loadYaml, isMain, nowIso } from './paths.mjs'

const IGNORE_TOP = new Set(['.git', '.DS_Store', 'node_modules'])

function topLevelDirs() {
  return readdirSync(CODE_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !IGNORE_TOP.has(e.name))
    .map((e) => e.name).sort()
}

function npmDeps(rel) {
  const p = codePath(rel)
  if (!existsSync(p)) return null
  try {
    const d = JSON.parse(readFileSync(p, 'utf8'))
    return {
      name: d.name, version: d.version,
      dependencies: Object.keys(d.dependencies || {}),
      devDependencies: Object.keys(d.devDependencies || {}).slice(0, 12),
      scripts: Object.keys(d.scripts || {}),
    }
  } catch { return null }
}

function goModules() {
  const out = []
  for (const rel of ['go.mod', 'relaykit/go.mod', 'tokenkit/go.mod', 'tokenkit/tokenkit/go.mod']) {
    const p = codePath(rel)
    if (!existsSync(p)) continue
    const text = readFileSync(p, 'utf8')
    out.push({ manifest: rel, module: (text.match(/^module\s+(.+)$/m) || [])[1] || null,
      go: (text.match(/^go\s+(.+)$/m) || [])[1] || null })
  }
  return out
}

function governanceFiles() {
  const roots = ['.uaes/registry', '.uaes/policies', '.uaes/validators', 'quality/scripts/uaes']
  const out = []
  const walk = (rel) => {
    const abs = govPath(rel)
    if (!existsSync(abs)) return
    for (const e of readdirSync(abs, { withFileTypes: true })) {
      const r = join(rel, e.name)
      if (e.isDirectory()) { walk(r); continue }
      if (e.name.startsWith('.')) continue
      out.push({ path: r.replace(/\\/g, '/'), type: 'NEW_IN_GOVERNANCE_REPO' })
    }
  }
  roots.forEach(walk)
  for (const dir of ['reports/baseline', 'reports/quality']) {
    const abs = govPath(dir)
    if (!existsSync(abs)) continue
    for (const e of readdirSync(abs, { withFileTypes: true })) {
      if (e.name.startsWith('UAES-P13-')) out.push({ path: `${dir}/${e.name}`, type: 'GENERATED_EVIDENCE' })
    }
  }
  return out.sort((a, b) => a.path.localeCompare(b.path))
}

function codeHead() {
  try { return execFileSync('git', ['-C', CODE_ROOT, 'rev-parse', 'HEAD'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch { return null }
}

function dirtyCount() {
  try { return execFileSync('git', ['-C', CODE_ROOT, 'status', '--short'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split('\n').filter(Boolean).length
  } catch { return null }
}

export function buildInventory() {
  const modules = loadYaml('.uaes/registry/modules.yaml')
  const mappings = loadYaml('.uaes/registry/mappings.yaml')
  const standards = loadYaml('.uaes/registry/standards.yaml')
  const gates = loadYaml('.uaes/registry/gates.yaml')
  const top = topLevelDirs()

  const codeModules = modules.modules.map((m) => ({
    id: m.id, name: m.name, type: m.type, path: m.path, manifest: m.manifest,
    owner: m.owner, platforms: m.platforms || [], stack: m.stack || [],
    domains: m.standards, verification: m.verification || [],
    manifest_exists: existsSync(codePath(m.manifest)),
    package: m.manifest.endsWith('package.json') ? npmDeps(m.manifest) : null,
  }))

  const order = [
    ['I', '审计当前仓库真实目录和所有代码模块', 'Repository Inventory', 'DONE'],
    ['II', '建立 Module Registry', '.uaes/registry/modules.yaml', 'DONE'],
    ['III', '建立标准与模块映射', '.uaes/registry/mappings.yaml', 'DONE'],
    ['IV', '建立统一标准注册表索引', '.uaes/registry/standards.yaml', 'DONE'],
    ['V', '建立 Schema 和 Registry Validator', '.uaes/schemas/*.schema.json + validate-registry.mjs', 'DONE'],
    ['VI', '建立变更影响分析', 'change-impact.mjs + shared_impact_zones', 'DONE'],
    ['VII', '建立领域质量门禁', 'gates.yaml + quality-gate-runner.mjs (NOT_RUN by default)', 'PARTIAL'],
    ['VIII', '建立全局质量门禁', 'UAES-GLOBAL-GATE-001 aggregation', 'PARTIAL'],
    ['IX', '接入 GitHub Actions', 'requires authorisation to edit product repo .github/', 'PENDING'],
    ['X', '用真实 Uter 任务进行 AI 实战验收', 'Operational Acceptance report', 'PENDING'],
  ]

  return {
    report_id: 'UAES-P13-REPOSITORY-INVENTORY',
    task_id: 'UAES-P13-REPOSITORY-INTEGRATION',
    generated_at: nowIso(),
    repository: {
      id: 'REPO-UTER', root: CODE_ROOT, head: codeHead(), default_branch: 'main',
      dirty_files_at_audit: dirtyCount(),
      note: 'Audited read-only. Uncommitted work was NOT touched, staged or committed.',
    },
    governance_repository: { id: 'REPO-UAES', root: GOV_ROOT, relationship: 'PARALLEL' },
    summary: {
      top_level_directories: top.length,
      go_modules: goModules().length,
      code_modules: codeModules.length,
      uaes_domains: standards.domains.length,
      uaes_standards: standards.standards.length,
      uaes_gates: gates.gates.length,
      real_rule_ids: standards.counts.rule_ids_total,
      mappings: mappings.mappings.length,
      verification_entries: mappings.verification_catalog.length,
    },
    // 1. complete directory inventory
    top_level_directories: top,
    // 2 + 3. real modules, responsibilities, dependencies, stacks
    go_manifests: goModules(),
    code_modules: codeModules,
    existing_governance_systems: modules.existing_governance_systems || [],
    shared_impact_zones: modules.shared_impact_zones || [],
    // 4. domain and rule mapping
    domain_rule_mapping: mappings.mappings.map((m) => ({
      id: m.id, domain: m.domain, modules: m.modules,
      rule_count: (m.rules || []).length, rules: m.rules || [],
      rule_level_status: m.rule_level_status, gate: m.gate, verification: m.verification,
    })),
    domains_without_rule_level_ids: standards.domains.filter((d) => d.rule_level === 'NOT_REGISTERED').map((d) => d.id),
    // 5. governance directories to add (all in the governance repository)
    required_new_directories: [
      { path: '.uaes/registry/', repo: 'REPO-UAES', reason: 'Modules / standards / mappings / gates registries.' },
      { path: '.uaes/policies/', repo: 'REPO-UAES', reason: 'Machine-readable execution policy.' },
      { path: '.uaes/validators/', repo: 'REPO-UAES', reason: 'Validator contracts (executables live in quality/scripts/uaes/).' },
      { path: 'quality/scripts/uaes/', repo: 'REPO-UAES', reason: 'governance.script_directory compliant executable location.' },
      { path: 'reports/baseline/', repo: 'REPO-UAES', reason: 'Repository Inventory evidence.' },
    ],
    ci_integration_targets: [
      { path: '.github/workflows/', repo: 'REPO-UTER', status: 'NOT_MODIFIED', reason: 'Phase IX requires separate authorisation.' },
      { path: '.github/CODEOWNERS', repo: 'REPO-UTER', status: 'NOT_MODIFIED', reason: 'Already exists; ownership mapping pending Phase IX.' },
    ],
    // 6. preserved directories
    preserved_directories: top,
    // 7. adjustments and reasons
    adjustments: [
      { path: '(none)', action: 'NO_CHANGE',
        reason: '核心原则：先适配现有代码，再逐步规范代码。不为适配 UAES 示意图而移动 backend/、web/、electron/ 等真实目录。' },
      { path: 'docs-web/', action: 'REGISTER_AS_MODULE',
        reason: '参考结构未列出，但真实仓库存在 Next.js/Fumadocs 文档站，登记为 MOD-DOCS-WEB。' },
      { path: 'tokenkit/tokenkit/', action: 'REGISTER_AS_SEPARATE_MODULE',
        reason: '第四个 Go module 真实存在且 module 名为上游标识，按 AGENTS.md 不得改名。' },
    ],
    // 8. complete file manifest
    file_manifest: governanceFiles(),
    // 9. implementation order and acceptance conditions
    implementation_order: order.map(([phase, work, deliverable, status]) => ({ phase, work, deliverable, status })),
    acceptance_criteria: [
      'All module paths and manifests resolve against the real repository (validate-registry.mjs PASS).',
      'Every mapped rule ID exists in standards/**/*.md; no invented IDs.',
      'Every declared_in artefact and npm script exists (validate-registry.mjs PASS).',
      'Change Impact Engine expands shared zones and never relies on git diff alone.',
      'Domain gates and the global gate are NOT_RUN until explicitly authorised; never reported as PASS.',
      'Machine-readable reports conform to their JSON Schemas (ajv).',
      'No product-repository file is modified, staged or committed by the governance layer.',
      'Phase IX CI wiring and Phase X operational acceptance require separate authorisation.',
    ],
  }
}

function md(inv) {
  const s = inv.summary
  const tbl = (head, rows) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n` +
    rows.map((r) => `| ${r.join(' | ')} |`).join('\n') + '\n'
  let out = `# UAES P13 Repository Integration — Repository Inventory\n\n`
  out += `生成时间：${inv.generated_at} · 审计对象：\`${inv.repository.root}\` · HEAD \`${inv.repository.head}\` · 工作区脏文件 ${inv.repository.dirty_files_at_audit} 项（**只读审计，未触碰**）\n\n`
  out += `规范库：\`${inv.governance_repository.root}\`（独立仓库，关系 \`PARALLEL\`）。\n\n`
  out += `## 摘要\n\n`
  out += tbl(['项', '数量'], Object.entries(s).map(([k, v]) => [k, String(v)]))
  out += `\n## 1. 顶层目录完整清单（${inv.top_level_directories.length}）\n\n\`${inv.top_level_directories.join('`, `')}\`\n\n`
  out += `## 2–3. 真实代码模块、职责、依赖与技术栈\n\n`
  out += tbl(['ID', '路径', '类型', 'Owner', '技术栈', '适用域'],
    inv.code_modules.map((m) => [m.id, `\`${m.path}\``, m.type, m.owner,
      (m.stack || []).join('/') || m.type, m.domains.join(', ')]))
  out += `\nGo manifests：\n\n`
  out += tbl(['manifest', 'module', 'go'], inv.go_manifests.map((g) => [`\`${g.manifest}\``, `\`${g.module}\``, g.go]))
  out += `\n已有治理体系（本层映射复用、不替代）：\n\n`
  out += tbl(['ID', '位置', '说明'], inv.existing_governance_systems.map((g) => [g.id, `\`${g.root}\``, g.note]))
  out += `\n## 4. 领域 / 规则到模块的映射（${inv.domain_rule_mapping.length} 条）\n\n`
  out += tbl(['Mapping', '域', '模块', '真实规则数', '门禁'],
    inv.domain_rule_mapping.map((m) => [m.id, m.domain,
      m.modules === '*' ? '*' : m.modules.join(', '), String(m.rule_count), m.gate]))
  out += `\n**未登记规则级 ID 的域**：${inv.domains_without_rule_level_ids.join(', ')}。这些域仅做域级映射，rules 为空，**未编造任何 ID**。\n\n`
  out += `## 5. 需要新增的治理目录\n\n`
  out += tbl(['目录', '所在仓库', '理由'], inv.required_new_directories.map((d) => [`\`${d.path}\``, d.repo, d.reason]))
  out += `\nCI 接入目标（本阶段未修改）：\n\n`
  out += tbl(['路径', '仓库', '状态', '理由'], inv.ci_integration_targets.map((d) => [`\`${d.path}\``, d.repo, d.status, d.reason]))
  out += `\n## 6. 需要保留的现有目录\n\n全部 ${inv.preserved_directories.length} 个顶层目录原样保留。\n\n`
  out += `## 7. 需要调整的目录及理由\n\n`
  out += tbl(['路径', '动作', '理由'], inv.adjustments.map((a) => [`\`${a.path}\``, a.action, a.reason]))
  out += `\n## 8. 完整文件落库清单（治理库新增 ${inv.file_manifest.length} 项）\n\n`
  out += tbl(['文件', '类型'], inv.file_manifest.map((f) => [`\`${f.path}\``, f.type]))
  out += `\n## 9. 自动化实施顺序与验收条件\n\n`
  out += tbl(['阶段', '工作', '交付物', '状态'], inv.implementation_order.map((o) => [o.phase, o.work, o.deliverable, o.status]))
  out += `\n验收条件：\n\n` + inv.acceptance_criteria.map((a, i) => `${i + 1}. ${a}`).join('\n') + '\n'
  return out
}

if (isMain(import.meta.url)) {
  const inv = buildInventory()
  if (!process.argv.includes('--no-write')) {
    writeFileSync(govPath('reports/baseline/UAES-P13-REPOSITORY-INVENTORY.json'),
      JSON.stringify(inv, null, 2) + '\n')
    writeFileSync(govPath('reports/baseline/UAES-P13-REPOSITORY-INVENTORY.md'), md(inv))
  }
  console.log(`top dirs=${inv.top_level_directories.length} modules=${inv.code_modules.length} ` +
    `go modules=${inv.go_manifests.length} mappings=${inv.domain_rule_mapping.length} files=${inv.file_manifest.length}`)
  console.log('written: reports/baseline/UAES-P13-REPOSITORY-INVENTORY.{json,md}')
}
