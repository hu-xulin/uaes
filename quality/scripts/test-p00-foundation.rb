#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "yaml"
require "fileutils"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class P00FoundationAuditTest < Minitest::Test
  STATUSES = %w[DRAFT PROPOSED IN_REVIEW APPROVED IMPLEMENTED VERIFIED DEPRECATED SUPERSEDED].freeze
  SCRIPT = File.expand_path("validate-p00-foundation.rb", __dir__)

  def fixture
    root = Dir.mktmpdir("uaes-p00-")
    %w[.uaes/schemas standards/00-foundation].each { |path| FileUtils.mkdir_p(File.join(root, path)) }
    File.write(File.join(root, ".uaes/VERSION"), "1.0.0\n")
    File.write(File.join(root, "standards/00-foundation/UAES-00.md"), "# UAES-00\n")
    File.write(File.join(root, "standards/00-foundation/UAES-01.md"), "# UAES-01\n")

    registry_schema = {
      "$schema" => "https://json-schema.org/draft/2020-12/schema",
      "$defs" => { "lifecycleStatus" => { "enum" => STATUSES } }
    }
    metadata_schema = {
      "$schema" => "https://json-schema.org/draft/2020-12/schema",
      "properties" => { "status" => { "enum" => STATUSES } }
    }
    File.write(File.join(root, ".uaes/schemas/standard-registry.schema.json"), JSON.pretty_generate(registry_schema))
    File.write(File.join(root, ".uaes/schemas/standard-metadata.schema.json"), JSON.pretty_generate(metadata_schema))

    entries = [
      { "id" => "UAES-00", "file" => "standards/00-foundation/UAES-00.md", "status" => "DRAFT" },
      { "id" => "UAES-01", "file" => "standards/00-foundation/UAES-01.md", "status" => "DRAFT" }
    ]
    schema_entries = [
      { "id" => "UAES-SCHEMA-00-001", "file" => ".uaes/schemas/standard-registry.schema.json", "status" => "DRAFT" },
      { "id" => "UAES-SCHEMA-00-002", "file" => ".uaes/schemas/standard-metadata.schema.json", "status" => "DRAFT" }
    ]
    phases = (0..12).to_h { |n| [format("P%02d", n), { "name" => "Phase #{n}", "status" => "DRAFT" }] }
    registry = {
      "registry" => {
        "id" => "UAES-GLOBAL-REGISTRY", "version" => "1.0.0",
        "status" => "DRAFT", "lifecycle_status" => STATUSES
      },
      "phases" => phases, "standards" => entries, "schemas" => schema_entries,
      "gates" => [], "acceptance" => [], "system_files" => [], "tool_adapters" => [],
      "dependencies" => [
        { "standard" => "UAES-00", "depends_on" => [] },
        { "standard" => "UAES-01", "depends_on" => ["UAES-00"] }
      ],
      "validation" => {}, "history" => [{ "version" => "1.0.0", "date" => "2026-01-01", "change" => "Fixture" }]
    }
    write_registry(root, registry)
    root
  end

  def write_registry(root, registry)
    File.write(File.join(root, ".uaes/STANDARD-REGISTRY.yaml"), YAML.dump(registry))
  end

  def run_audit(root)
    Open3.capture3({ "UAES_ROOT" => root }, RbConfig.ruby, SCRIPT)
  end

  def assert_audit_fails(root, expected)
    _out, err, status = run_audit(root)
    refute status.success?, "expected audit failure containing #{expected.inspect}"
    assert_includes err, expected
  end

  def test_accepts_consistent_registry
    root = fixture
    out, err, status = run_audit(root)
    assert status.success?, "#{err}\n#{out}"
    assert_includes out, "P00 registry, references, IDs, schemas, dependencies, statuses, and versions"
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_duplicate_ids
    root = fixture
    registry = YAML.safe_load_file(File.join(root, ".uaes/STANDARD-REGISTRY.yaml"))
    registry["schemas"] << registry["schemas"].first
    write_registry(root, registry)
    assert_audit_fails(root, "registered IDs are globally unique")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_missing_registered_file
    root = fixture
    registry = YAML.safe_load_file(File.join(root, ".uaes/STANDARD-REGISTRY.yaml"))
    registry["standards"][0]["file"] = "standards/missing.md"
    write_registry(root, registry)
    assert_audit_fails(root, "file exists and is non-empty")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_dangling_dependency
    root = fixture
    registry = YAML.safe_load_file(File.join(root, ".uaes/STANDARD-REGISTRY.yaml"))
    registry["dependencies"][1]["depends_on"] = ["UAES-MISSING"]
    write_registry(root, registry)
    assert_audit_fails(root, "required dependency exists")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_dependency_cycle
    root = fixture
    registry = YAML.safe_load_file(File.join(root, ".uaes/STANDARD-REGISTRY.yaml"))
    registry["dependencies"][0]["depends_on"] = ["UAES-01"]
    write_registry(root, registry)
    assert_audit_fails(root, "required dependency graph has no cycles")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_invalid_local_schema_reference
    root = fixture
    path = File.join(root, ".uaes/schemas/standard-metadata.schema.json")
    schema = JSON.parse(File.read(path))
    schema["$ref"] = "#/$defs/not-present"
    File.write(path, JSON.pretty_generate(schema))
    assert_audit_fails(root, "local root schema ref resolves")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_status_enum_drift
    root = fixture
    path = File.join(root, ".uaes/schemas/standard-metadata.schema.json")
    schema = JSON.parse(File.read(path))
    schema["properties"]["status"]["enum"].delete("VERIFIED")
    File.write(path, JSON.pretty_generate(schema))
    assert_audit_fails(root, "lifecycle enum matches registry.lifecycle_status")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_history_version_mismatch
    root = fixture
    registry = YAML.safe_load_file(File.join(root, ".uaes/STANDARD-REGISTRY.yaml"))
    registry["history"][-1]["version"] = "0.9.0"
    write_registry(root, registry)
    assert_audit_fails(root, "latest history version matches registry.version")
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end
end
