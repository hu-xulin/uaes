#!/usr/bin/env ruby
require "json"
require "yaml"

def fail_check(message)
  warn "SKILL RUNTIME ADAPTERS: FAIL: #{message}"
  exit 1
end

root = File.expand_path(ENV.fetch("UAES_ROOT", File.expand_path("../../..", __dir__)))
registry_path = File.join(root, "skills/registry.yaml")
fail_check("missing skills/registry.yaml") unless File.file?(registry_path)

begin
  registry = YAML.safe_load(File.read(registry_path), aliases: true)
rescue StandardError => error
  fail_check("cannot parse skills/registry.yaml: #{error.message}")
end

runtime_adapters = registry.dig("registry", "runtime_adapters")
fail_check("registry.runtime_adapters must define claude_code and agents_runtime") unless
  runtime_adapters.is_a?(Hash) &&
  runtime_adapters["claude_code"].is_a?(String) &&
  runtime_adapters["agents_runtime"].is_a?(String)

skills = registry["skills"]
fail_check("skills must be a non-empty array") unless skills.is_a?(Array) && !skills.empty?

names = skills.map { |skill| skill["name"] }
fail_check("duplicate skill names") unless names.uniq.length == names.length

def parse_frontmatter(path, label)
  content = File.read(path)
  match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  fail_check("#{label} is missing YAML frontmatter") unless match
  YAML.safe_load(match[1])
rescue Psych::Exception => error
  fail_check("#{label} frontmatter is invalid: #{error.message}")
end

expected_names = names.sort

{
  "claude_code" => runtime_adapters["claude_code"],
  "agents_runtime" => runtime_adapters["agents_runtime"]
}.each do |adapter_id, adapter_root|
  adapter_root = adapter_root.sub(%r{/+\z}, "")
  adapter_directory = File.join(root, adapter_root)
  fail_check("#{adapter_id} adapter directory missing: #{adapter_root}") unless Dir.exist?(adapter_directory)

  actual_names = Dir.children(adapter_directory).select do |entry|
    File.directory?(File.join(adapter_directory, entry))
  end.sort
  fail_check("#{adapter_id} adapter directory set differs from registry; expected #{expected_names.inspect}, got #{actual_names.inspect}") unless
    actual_names == expected_names

  skills.each do |skill|
    name = skill["name"]
    canonical_relative = skill["skill"]
    canonical_path = File.join(root, canonical_relative)
    manifest_path = File.join(root, skill["manifest"])
    adapter_path = File.join(adapter_directory, name, "SKILL.md")

    [canonical_path, manifest_path, adapter_path].each do |path|
      fail_check("missing required skill file: #{path.delete_prefix(root + File::SEPARATOR)}") unless File.file?(path) && File.size?(path)
    end

    canonical_frontmatter = parse_frontmatter(canonical_path, canonical_relative)
    fail_check("#{canonical_relative} frontmatter name mismatch") unless canonical_frontmatter["name"] == name

    begin
      manifest = JSON.parse(File.read(manifest_path))
    rescue JSON::ParserError => error
      fail_check("#{skill["manifest"]} is invalid JSON: #{error.message}")
    end
    fail_check("#{skill["manifest"]} skillId mismatch") unless manifest["skillId"] == skill["id"]
    fail_check("#{skill["manifest"]} name mismatch") unless manifest["name"] == name

    adapter_frontmatter = parse_frontmatter(adapter_path, adapter_path.delete_prefix(root + File::SEPARATOR))
    fail_check("#{adapter_path} frontmatter name mismatch") unless adapter_frontmatter["name"] == name

    adapter_content = File.read(adapter_path)
    fail_check("#{adapter_path} does not point to canonical skill #{canonical_relative}") unless
      adapter_content.include?(canonical_relative)
    fail_check("#{adapter_path} does not declare itself a non-authoritative runtime adapter") unless
      adapter_content.include?("does not grant permissions or override AGENTS.md")
  end
end

puts "SKILL RUNTIME ADAPTERS: PASS (#{skills.length} canonical skills; #{expected_names.length * 2} runtime adapters)"
puts "NOTE: static discovery-contract integrity only; actual agent runtime discovery and skill execution require runtime evaluation."
