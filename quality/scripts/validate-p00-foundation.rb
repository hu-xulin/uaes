#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "yaml"
require "set"
require "date"

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
  required_keys = %w[registry phases standards schemas gates acceptance system_files tool_adapters exceptions dependencies validation history]
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
  if %w[APPROVED IMPLEMENTED VERIFIED ACTIVE].include?(identity["status"])
    approval = identity["approval"].is_a?(Hash) ? identity["approval"] : {}
    %w[approver approved_at evidence change_request].each { |key| record(!approval[key].to_s.empty?, "global registry approval record includes #{key}") }
  end

  expected_phases = (0..12).map { |n| format("P%02d", n) }.to_set
  phases = registry["phases"].is_a?(Hash) ? registry["phases"] : {}
  record(phases.keys.to_set == expected_phases, "phase registry contains exactly P00-P12")
  phases.each do |phase, value|
    record(valid_statuses.include?(value["status"]), "#{phase} has a registered lifecycle status")
    if %w[APPROVED IMPLEMENTED VERIFIED ACTIVE].include?(value["status"])
      approval = value["approval"].is_a?(Hash) ? value["approval"] : {}
      %w[approver approved_at evidence change_request].each { |key| record(!approval[key].to_s.empty?, "#{phase} approval record includes #{key}") }
    end
  end

  collections = %w[standards schemas gates acceptance system_files tool_adapters]
  entries = collections.flat_map { |key| Array(registry[key]).map { |entry| [key, entry] } }
  ids = entries.map { |_kind, entry| entry["id"] }.compact
  record(ids.uniq.length == ids.length, "registered IDs are globally unique")
  path_groups = entries.group_by { |_kind, entry| entry["file"] }.reject { |path, _group| path.nil? || path.empty? }
  duplicate_path_groups = path_groups.select { |_path, group| group.length > 1 }
  duplicate_path_groups.each do |path, group|
    canonical_id = group.first[1]["id"]
    group.drop(1).each do |kind, entry|
      record(kind == "schemas" && entry["shared_with"] == canonical_id,
             "duplicate path #{path} is explicitly shared with #{canonical_id}")
    end
  end
  record(duplicate_path_groups.values.all? { |group| group.drop(1).all? { |kind, entry| kind == "schemas" && entry["shared_with"] == group.first[1]["id"] } },
         "registered file paths are unique or explicitly shared")
  entries.each do |kind, entry|
    next unless entry["shared_with"]
    target = entries.find { |_target_kind, candidate| candidate["id"] == entry["shared_with"] }
    record(kind == "schemas" && target && target[1]["file"] == entry["file"],
           "#{entry["id"]} shared_with points to a registered schema with the same path")
  end

  standard_entries = Array(registry["standards"])
  standard_ids = standard_entries.map { |entry| entry["id"] }.compact.to_set
  entries.each do |kind, entry|
    id = entry["id"].to_s
    path = entry["file"].to_s
    record(id.match?(/\AUAES-[A-Z0-9]+(?:-[A-Z0-9]+)*\z/), "#{kind} ID format: #{id}")
    record(!path.empty? && !path.start_with?("/") && !path.split("/").include?(".."), "#{id} uses a safe relative file path")
    record(nonempty?(ROOT, path), "#{id} file exists and is non-empty: #{path}")
    record(valid_statuses.include?(entry["status"]), "#{id} lifecycle status is valid")
    if kind == "standards" && nonempty?(ROOT, path)
      source = File.read(File.join(ROOT, path))
      status_match = source.match(/^\s*\*\*Status:\*\*\s*([A-Z_]+)/i) ||
                     source.match(/^\s*\|\s*Status\s*\|\s*([A-Z_]+)\s*\|/i) ||
                     source.match(/^\s*Status:\s*([A-Z_]+)/i)
      record(status_match && status_match[1] == entry["status"],
             "#{id} file status matches registry status")
    end
    if %w[standards schemas gates acceptance].include?(kind)
      record(!entry["phase"].to_s.empty? && phases.key?(entry["phase"]), "#{id} has a registered phase")
    end
    if %w[APPROVED IMPLEMENTED VERIFIED ACTIVE].include?(entry["status"])
      approval = entry["approval"].is_a?(Hash) ? entry["approval"] : {}
      %w[approver approved_at evidence change_request].each { |key| record(!approval[key].to_s.empty?, "#{id} approval record includes #{key}") }
    end
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

  # Rule definitions may be headings, bold labels, or the first cell of a rule table.
  rule_occurrences = Hash.new { |hash, key| hash[key] = [] }
  standard_entries.each do |entry|
    path = File.join(ROOT, entry["file"].to_s)
    next unless File.file?(path)
    File.readlines(path, chomp: true).each_with_index do |line, index|
      heading_match = line.match(/^\s*\#{3,6}\s+(UAES-[A-Z0-9-]+)\s*(?:[—-]|$)/)
      match = heading_match ||
              line.match(/^\s*\|\s*(UAES-[A-Z0-9-]+)\s*\|/) ||
              line.match(/^\s*(?:[-*]\s*)?\*\*(UAES-[A-Z0-9-]+)\s*(?:[—-]|\*\*)/)
      next unless match
      rule_id = match[1]
      rule_format = /\AUAES-(?:(?:0[0-9]|1[0-2])-[A-Z][A-Z0-9]*-\d{3}|(?:0[0-9]|1[0-2])-\d{3}-(?:[A-Z]{1,4})?\d{3}|[A-Z][A-Z0-9]*-\d{3})\z/
      next unless rule_id.match?(rule_format)
      if ids.include?(rule_id)
        record(false, "rule ID collides with registered ID: #{rule_id}") if heading_match
        next
      end
      rule_occurrences[rule_id] << "#{entry["file"]}:#{index + 1}"
    end
  end
  duplicate_rules = rule_occurrences.select { |_id, locations| locations.length > 1 }
  record(duplicate_rules.empty?, "normative rule definitions are unique#{duplicate_rules.empty? ? "" : ": #{duplicate_rules.keys.join(", ")}"}")
  collisions = rule_occurrences.keys & ids
  record(collisions.empty?, "rule IDs do not collide with registered standard/schema/gate IDs#{collisions.empty? ? "" : ": #{collisions.join(", ")}"}")


  requirement_levels = Array(identity["requirement_levels"])
  expected_requirement_levels = %w[MUST MUST_NOT SHOULD SHOULD_NOT MAY]
  record(requirement_levels.to_set == expected_requirement_levels.to_set, "normative requirement levels match MUST/MUST_NOT/SHOULD/SHOULD_NOT/MAY")
  priority_levels = Array(identity["priority_levels"])
  record(priority_levels.to_set == %w[P0 P1 P2 P3].to_set, "priority levels match P0-P3")

  dependency_map = dependency_records.to_h { |item| [item["standard"], Array(item["depends_on"])] }
  standard_entries.each do |entry|
    if entry["id"].to_s.match?(/\AUAES-(?:0[1-9]|1[0-2])\z/)
      record(dependency_map.fetch(entry["id"], []).include?("UAES-00"), "#{entry["id"]} domain standard depends on UAES-00")
    end
  end

  exceptions = Array(registry["exceptions"])
  exception_ids = exceptions.map { |item| item["id"] }
  record(exception_ids.uniq.length == exception_ids.length, "exception IDs are unique")
  exceptions.each do |exception|
    id = exception["id"].to_s
    record(id.match?(/\AUAES-EXC-\d{4,}\z/), "exception ID format: #{id}")
    record(%w[REQUESTED RISK_ASSESSED IN_REVIEW NEEDS_REVISION APPROVED ACTIVE REJECTED EXPIRED REVOKED CLOSED].include?(exception["status"]), "#{id} exception status is valid")
    record(%w[E0 E1 E2 E3 E4].include?(exception["exception_class"]), "#{id} exception class is valid")
    %w[requester reason business_justification technical_constraints risk_assessment security_impact data_impact financial_impact expires_at rollback_plan verification_plan].each do |key|
      record(!exception[key].to_s.empty?, "#{id} exception request includes #{key}")
    end
    record(Array(exception["affected_components"]).any?, "#{id} exception has affected components")
    record(Array(exception["compensating_controls"]).any?, "#{id} exception has compensating controls")
    record(exception["exception_class"] != "E0" || !%w[APPROVED ACTIVE].include?(exception["status"]),
           "#{id} E0 exceptions cannot be approved or active")
    Array(exception["related_rule_ids"]).each do |rule_id|
      record(ids.include?(rule_id) || rule_occurrences.key?(rule_id), "#{id} references a known rule: #{rule_id}")
    end
    if %w[APPROVED ACTIVE].include?(exception["status"])
      %w[requester reason approver approved_at approval_evidence expires_at risk_assessment rollback_plan verification_plan].each do |key|
        record(!exception[key].to_s.empty?, "#{id} approved exception includes #{key}")
      end
      record(Array(exception["compensating_controls"]).any?, "#{id} approved exception has compensating controls")
      begin
        expiry = DateTime.iso8601(exception["expires_at"].to_s)
        record(expiry.to_date >= Date.today, "#{id} approved exception has not expired")
      rescue ArgumentError
        record(false, "#{id} approved exception expiry is a valid ISO-8601 timestamp")
      end
    end
  end


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
