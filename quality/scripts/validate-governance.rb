#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "yaml"
require "set"

ROOT = File.expand_path("../..", __dir__)
ERRORS = []
CHECKS = []

def check(condition, message)
  condition ? CHECKS << message : ERRORS << message
end

def read_yaml(path)
  YAML.safe_load_file(File.join(ROOT, path), permitted_classes: [], aliases: false)
rescue StandardError => e
  ERRORS << "YAML parse failed: #{path}: #{e.class}: #{e.message}"
  {}
end

def require_nonempty(path, label = nil)
  full = File.join(ROOT, path)
  ok = File.file?(full) && File.size(full).positive?
  check(ok, "#{label || path} must exist and be non-empty")
  ok
end

def read_json(path)
  JSON.parse(File.read(File.join(ROOT, path)))
rescue StandardError => e
  ERRORS << "JSON parse failed: #{path}: #{e.class}: #{e.message}"
  {}
end

registry_path = ".uaes/STANDARD-REGISTRY.yaml"
require_nonempty("AGENTS.md")
require_nonempty("CLAUDE.md")
require_nonempty("README.md")
require_nonempty(".uaes/SYSTEM-MANIFEST.md")
require_nonempty(".uaes/PROJECT-CONTEXT.md")
require_nonempty(".uaes/PROJECT-STATUS.md")
require_nonempty(".uaes/VERSION")
require_nonempty(registry_path)

registry = read_yaml(registry_path)
identity = registry["registry"] || {}
check(identity["id"] == "UAES-GLOBAL-REGISTRY", "global registry ID must be UAES-GLOBAL-REGISTRY")
check(identity["version"].to_s.match?(/\A\d+\.\d+\.\d+\z/), "registry version must be semantic version")
check(File.read(File.join(ROOT, ".uaes/VERSION")).strip == identity["version"], ".uaes/VERSION must match registry.version")

expected_phases = (0..12).map { |n| format("P%02d", n) }
actual_phases = (registry["phases"] || {}).keys.sort
check(actual_phases == expected_phases.sort, "phase registry must contain exactly P00-P12")

all_entries = %w[standards schemas gates acceptance system_files tool_adapters].flat_map { |key| Array(registry[key]) }
ids = all_entries.map { |entry| entry["id"] }.compact
check(ids.uniq.length == ids.length, "global registry entry IDs must be unique")

all_entries.each do |entry|
  path = entry["file"]
  if path.nil? || path.empty?
    ERRORS << "registry entry #{entry["id"] || "(unknown)"} has no file path"
    next
  end
  require_nonempty(path, "registered file #{path}")
  if entry["id"].to_s =~ /\AUAES-(?:SCHEMA-)?(\d{2})/
    expected = "P#{$1}"
    check(entry["phase"] == expected, "#{entry["id"]} phase must be #{expected}")
  end
end

%w[.uaes/schemas].each do |dir|
  Dir.glob(File.join(ROOT, dir, "*.json")).each do |file|
    JSON.parse(File.read(file))
  rescue StandardError => e
    ERRORS << "schema JSON invalid: #{file.delete_prefix(ROOT + "/")}: #{e.message}"
  end
end
CHECKS << "registered paths and schema JSON syntax inspected"

agents = read_yaml("agents/registry.yaml")
Array(agents["agents"]).each do |agent|
  manifest_path = agent["manifest"]
  next unless require_nonempty(manifest_path, "agent manifest #{manifest_path}")
  manifest = read_json(manifest_path)
  %w[agentId name version role owner status skillRefs toolRefs inputContract outputContract authorizationRefs evaluationProfile].each do |key|
    check(manifest.key?(key), "#{manifest_path} missing #{key}")
  end
  require_nonempty(manifest["inputContract"]) if manifest["inputContract"]
  require_nonempty(manifest["outputContract"]) if manifest["outputContract"]
  require_nonempty(manifest["evaluationProfile"]) if manifest["evaluationProfile"]
  Array(manifest["authorizationRefs"]).each { |p| require_nonempty(p) }
end

skills = read_yaml("skills/registry.yaml")
Array(skills["skills"]).each do |skill|
  skill_path = skill["skill"]
  manifest_path = skill["manifest"]
  require_nonempty(skill_path, "skill contract #{skill_path}")
  next unless require_nonempty(manifest_path, "skill manifest #{manifest_path}")
  manifest = read_json(manifest_path)
  %w[skillId name version owner status inputSchema outputSchema sideEffects execution authorizationRefs].each do |key|
    check(manifest.key?(key), "#{manifest_path} missing #{key}")
  end
  require_nonempty(manifest["inputSchema"]) if manifest["inputSchema"]
  require_nonempty(manifest["outputSchema"]) if manifest["outputSchema"]
  check(%w[NONE READ_ONLY REVERSIBLE_WRITE EXTERNAL_WRITE IRREVERSIBLE].include?(manifest["sideEffects"]), "#{manifest_path} has invalid sideEffects")
  name = skill["name"]
  require_nonempty(".claude/skills/#{name}/SKILL.md", "Claude skill adapter #{name}")
  require_nonempty(".agents/skills/#{name}/SKILL.md", "Agents skill adapter #{name}")
end

workflows = read_yaml("workflows/registry.yaml")
Array(workflows["workflows"]).each do |workflow|
  require_nonempty(workflow["path"], "workflow #{workflow["id"]}")
end

%w[WORKBUDDY CLAUDE-CODE CODEX CURSOR VSCODE].each do |name|
  require_nonempty(".uaes/TOOL-ADAPTERS/#{name}.md")
end
%w[CLAUDE-CODE CODEX CURSOR GENERIC-AGENT VSCODE-AGENT WORKBUDDY].each do |name|
  require_nonempty("agents/adapters/#{name}.md")
end

puts "UAES governance validation"
puts "Checks recorded: #{CHECKS.length}"
CHECKS.each { |item| puts "PASS: #{item}" }
if ERRORS.any?
  puts "FAIL: #{ERRORS.length} issue(s)"
  ERRORS.each { |item| warn " - #{item}" }
  exit 1
end
puts "PASS: no registry, manifest, adapter, or referenced-file integrity errors"
