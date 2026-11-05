#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "yaml"
require "set"

ROOT = File.expand_path(ENV.fetch("UAES_ROOT", File.expand_path("../..", __dir__)))
REGISTRY_PATH = ".uaes/STANDARD-REGISTRY.yaml"
ERRORS = []
CHECKS = []

def record(condition, message)
  condition ? CHECKS << message : ERRORS << message
end

def load_yaml(root, path)
  YAML.safe_load_file(File.join(root, path), permitted_classes: [], aliases: false)
rescue StandardError => e
  ERRORS << "YAML parse failed: #{path}: #{e.class}: #{e.message}"
  {}
end

def load_json(root, path)
  JSON.parse(File.read(File.join(root, path)))
rescue StandardError => e
  ERRORS << "JSON parse failed: #{path}: #{e.class}: #{e.message}"
  {}
end

def nonempty?(root, path)
  full = File.join(root, path.to_s)
  File.file?(full) && File.size(full).positive?
end

def valid_local_json_pointer?(document, pointer)
  return true unless pointer.start_with?("#/")
  current = document
  pointer.delete_prefix("#/").split("/").each do |part|
    key = part.gsub("~1", "/").gsub("~0", "~")
    current = if current.is_a?(Hash)
                current[key]
              elsif current.is_a?(Array) && key.match?(/\A\d+\z/)
                current[key.to_i]
              end
    return false if current.nil?
  end
  true
end

def visit_dependency(node, graph, visiting, visited, cycles)
  return if visited.include?(node)
  if visiting.include?(node)
    cycles << node
    return
  end
  visiting.add(node)
  Array(graph[node]).each { |child| visit_dependency(child, graph, visiting, visited, cycles) }
  visiting.delete(node)
  visited.add(node)
end

unless nonempty?(ROOT, REGISTRY_PATH)
  ERRORS << "registry missing or empty: #{REGISTRY_PATH}"
else
  registry = load_yaml(ROOT, REGISTRY_PATH)
  required_keys = %w[registry phases standards schemas gates acceptance system_files tool_adapters dependencies validation history]
  required_keys.each { |key| record(registry.key?(key), "registry top-level key exists: #{key}") }

  identity = registry["registry"].is_a?(Hash) ? registry["registry"] : {}
  version = identity["version"].to_s
  record(identity["id"] == "UAES-GLOBAL-REGISTRY", "global registry identity")
  record(version.match?(/\A(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\z/), "registry version is semantic")
  version_file = File.join(ROOT, ".uaes/VERSION")
  record(File.file?(version_file) && File.read(version_file).strip == version, ".uaes/VERSION matches registry.version")

  statuses = Array(identity["lifecycle_status"])
  record(statuses.any? && statuses.uniq.length == statuses.length, "lifecycle status list is non-empty and unique")
  record(statuses.all? { |s| s.is_a?(String) && s.match?(/\A[A-Z][A-Z_]*\z/) }, "lifecycle status values use canonical uppercase identifiers")
  valid_statuses = statuses.to_set
  record(valid_statuses.include?(identity["status"]), "global registry status is declared")

  expected_phases = (0..12).map { |n| format("P%02d", n) }.to_set
  phases = registry["phases"].is_a?(Hash) ? registry["phases"] : {}
  record(phases.keys.to_set == expected_phases, "phase registry contains exactly P00-P12")
  phases.each do |phase, value|
    record(valid_statuses.include?(value["status"]), "#{phase} has a registered lifecycle status")
  end

  collections = %w[standards schemas gates acceptance system_files tool_adapters]
  entries = collections.flat_map { |key| Array(registry[key]).map { |entry| [key, entry] } }
  ids = entries.map { |_kind, entry| entry["id"] }.compact
  record(ids.uniq.length == ids.length, "registered IDs are globally unique")
  paths = entries.map { |_kind, entry| entry["file"] }.compact
  record(paths.uniq.length == paths.length, "registered file paths are globally unique")

  standard_entries = Array(registry["standards"])
  standard_ids = standard_entries.map { |entry| entry["id"] }.compact.to_set
  entries.each do |kind, entry|
    id = entry["id"].to_s
    path = entry["file"].to_s
    record(id.match?(/\AUAES-[A-Z0-9]+(?:-[A-Z0-9]+)*\z/), "#{kind} ID format: #{id}")
    record(!path.empty? && !path.start_with?("/") && !path.split("/").include?(".."), "#{id} uses a safe relative file path")
    record(nonempty?(ROOT, path), "#{id} file exists and is non-empty: #{path}")
    record(valid_statuses.include?(entry["status"]), "#{id} lifecycle status is valid") if entry.key?("status")
    if kind == "schemas"
      record(path.start_with?(".uaes/schemas/"), "#{id} schema path is under .uaes/schemas/")
      if nonempty?(ROOT, path)
        schema = load_json(ROOT, path)
        record(schema["$schema"] == "https://json-schema.org/draft/2020-12/schema", "#{id} declares JSON Schema Draft 2020-12")
        Array(schema["$ref"] ? [schema["$ref"]] : []).each do |ref|
          record(valid_local_json_pointer?(schema, ref), "#{id} local root schema ref resolves: #{ref}")
        end
        schema_refs = []
        walk = lambda do |value|
          case value
          when Hash
            schema_refs << value["$ref"] if value["$ref"].is_a?(String)
            value.each_value { |child| walk.call(child) }
          when Array
            value.each { |child| walk.call(child) }
          end
        end
        walk.call(schema)
        schema_refs.each do |ref|
          next unless ref.start_with?("#/")
          record(valid_local_json_pointer?(schema, ref), "#{id} local schema ref resolves: #{ref}")
        end
      end
    end
  end

  schema_paths = Array(registry["schemas"]).map { |entry| entry["file"] }.to_set
  Dir.glob(File.join(ROOT, ".uaes/schemas/**/*.json")).each do |full|
    relative = full.delete_prefix(ROOT + "/")
    record(schema_paths.include?(relative), "schema file is registered: #{relative}")
  end

  dependency_records = Array(registry["dependencies"])
  dependency_sources = dependency_records.map { |item| item["standard"] }
  record(dependency_sources.uniq.length == dependency_sources.length, "dependency source IDs are unique")
  graph = {}
  dependency_records.each do |item|
    source = item["standard"]
    record(standard_ids.include?(source), "dependency source exists: #{source}")
    required = Array(item["depends_on"])
    forward = Array(item["forward_depends_on"])
    record((required & forward).empty?, "#{source} has no duplicate required/forward dependencies")
    record(required.uniq.length == required.length && forward.uniq.length == forward.length, "#{source} dependency lists are unique")
    required.each do |target|
      record(standard_ids.include?(target), "#{source} required dependency exists: #{target}")
    end
    graph[source] = required.select { |target| standard_ids.include?(target) }
    forward.each do |target|
      record(target.to_s.match?(/\AUAES-[A-Z0-9]+(?:-[A-Z0-9]+)*\z/), "#{source} forward dependency ID is well formed: #{target}")
    end
  end
  cycles = []
  visited = Set.new
  graph.keys.each { |node| visit_dependency(node, graph, Set.new, visited, cycles) }
  record(cycles.empty?, "required dependency graph has no cycles#{cycles.empty? ? "" : ": #{cycles.uniq.join(", ")}"}")

  history = Array(registry["history"])
  history_versions = history.map { |item| item["version"] }
  record(history_versions.uniq.length == history_versions.length, "registry history versions are unique")
  record(history_versions.all? { |v| v.to_s.match?(/\A\d+\.\d+\.\d+\z/) }, "registry history versions are semantic")
  record(history.last && history.last["version"] == version, "latest history version matches registry.version")

  %w[standard-registry.schema.json standard-metadata.schema.json].each do |name|
    path = ".uaes/schemas/#{name}"
    next unless nonempty?(ROOT, path)
    schema = load_json(ROOT, path)
    declared = if name == "standard-registry.schema.json"
                 schema.dig("$defs", "lifecycleStatus", "enum")
               else
                 schema.dig("properties", "status", "enum")
               end
    record(declared.is_a?(Array) && declared.to_set == valid_statuses, "#{name} lifecycle enum matches registry.lifecycle_status")
  end
end

puts "UAES P00 Foundation Registry Audit"
puts "PASS checks: #{CHECKS.length}"
CHECKS.each { |message| puts "PASS: #{message}" }
if ERRORS.any?
  warn "FAIL findings: #{ERRORS.length}"
  ERRORS.each { |message| warn "FAIL: #{message}" }
  exit 1
end
puts "PASS: P00 registry, references, IDs, schemas, dependencies, statuses, and versions"
