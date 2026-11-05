#!/usr/bin/env ruby
require "fileutils"
require "json"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class ApiContractTest < Minitest::Test
  UAES_ROOT = File.expand_path("../../..", __dir__)
  CHECKER = File.join(UAES_ROOT, "quality/scripts/architecture/check-api-contracts")
  RELATIVE = "docs-dev/openapi/api.json"

  def fixture
    root = Dir.mktmpdir("uaes-api-contract-")
    FileUtils.mkdir_p(File.join(root, "docs-dev/openapi"))
    baseline = {
      "version" => "1.0.0",
      "documents" => {
        RELATIVE => {
          "operations" => {
            "GET /v1/ping" => {
              "operationId" => "ping",
              "requiredParameters" => [],
              "requiredBodyProperties" => [],
              "responseCodes" => ["200"],
              "responseSchemaRefs" => ["#/components/schemas/Widget"]
            }
          },
          "schemas" => {
            "Widget" => {
              "type" => "object",
              "required" => ["id"],
              "properties" => ["id", "name"],
              "enum" => nil
            }
          }
        }
      }
    }
    baseline_path = File.join(root, "baseline.json")
    File.write(baseline_path, JSON.pretty_generate(baseline))
    approvals_path = File.join(root, "approvals.json")
    File.write(approvals_path, JSON.pretty_generate({ "approvals" => [] }))
    [root, baseline_path, approvals_path]
  end

  def write_document(root, operations: nil)
    operations ||= {
      "/v1/ping" => {
        "get" => {
          "operationId" => "ping",
          "responses" => {
            "200" => {
              "description" => "OK",
              "content" => {
                "application/json" => {
                  "schema" => { "$ref" => "#/components/schemas/Widget" }
                }
              }
            }
          }
        }
      }
    }
    document = {
      "openapi" => "3.0.1",
      "paths" => operations,
      "components" => {
        "schemas" => {
          "Widget" => {
            "type" => "object",
            "required" => ["id"],
            "properties" => {
              "id" => { "type" => "string" },
              "name" => { "type" => "string" },
              "description" => { "type" => "string" }
            }
          }
        },
        "securitySchemes" => {}
      }
    }
    File.write(File.join(root, RELATIVE), JSON.pretty_generate(document))
  end

  def run_checker(root, baseline, approvals)
    env = {
      "UTER_REPO_ROOT" => root,
      "UAES_API_CONTRACT_BASELINE" => baseline,
      "UAES_API_BREAKING_CHANGE_APPROVALS" => approvals
    }
    Open3.capture3(env, RbConfig.ruby, CHECKER)
  end

  def test_accepts_compatible_additive_schema_property
    root, baseline, approvals = fixture
    write_document(root)
    _out, err, status = run_checker(root, baseline, approvals)
    assert status.success?, err
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_removed_operation
    root, baseline, approvals = fixture
    operations = { "/v1/new" => { "get" => { "operationId" => "new", "responses" => { "200" => { "description" => "OK" } } } } }
    write_document(root, operations: operations)
    _out, err, status = run_checker(root, baseline, approvals)
    refute status.success?
    assert_match(/removed operation/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_duplicate_operation_id
    root, baseline, approvals = fixture
    operations = {
      "/v1/ping" => { "get" => { "operationId" => "ping", "responses" => { "200" => { "description" => "OK" } } } },
      "/v1/other" => { "get" => { "operationId" => "ping", "responses" => { "200" => { "description" => "OK" } } } }
    }
    write_document(root, operations: operations)
    _out, err, status = run_checker(root, baseline, approvals)
    refute status.success?
    assert_match(/duplicate operationId/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_new_required_request_parameter
    root, baseline, approvals = fixture
    operations = {
      "/v1/ping" => {
        "get" => {
          "operationId" => "ping",
          "parameters" => [{ "in" => "query", "name" => "tenant", "required" => true }],
          "responses" => { "200" => { "description" => "OK", "content" => { "application/json" => { "schema" => { "$ref" => "#/components/schemas/Widget" } } } } }
        }
      }
    }
    write_document(root, operations: operations)
    _out, err, status = run_checker(root, baseline, approvals)
    refute status.success?
    assert_match(/added required parameter/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_accepts_exact_owner_approved_operation_removal
    root, baseline, approvals = fixture
    operations = { "/v1/new" => { "get" => { "operationId" => "new", "responses" => { "200" => { "description" => "OK" } } } } }
    write_document(root, operations: operations)
    approval = {
      "id" => "API-BREAK-TEST-001",
      "document" => RELATIVE,
      "operation" => "GET /v1/ping",
      "decision" => "OPTION_B_APPROVED",
      "approved_at" => "2026-11-05",
      "approved_by" => "API contract owner",
      "reason" => "Obsolete fixture operation",
      "consumer_audit" => "audit.md",
      "baseline_source_commit" => "a" * 40,
      "implementation_source_commit" => "b" * 40
    }
    File.write(approvals, JSON.pretty_generate({ "approvals" => [approval] }))
    out, err, status = run_checker(root, baseline, approvals)
    assert status.success?, err
    assert_match(/approved breaking change API-BREAK-TEST-001/, out)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_stale_approval_when_operation_is_still_present
    root, baseline, approvals = fixture
    write_document(root)
    approval = {
      "id" => "API-BREAK-TEST-002",
      "document" => RELATIVE,
      "operation" => "GET /v1/ping",
      "decision" => "OPTION_B_APPROVED",
      "approved_at" => "2026-11-05",
      "approved_by" => "API contract owner",
      "reason" => "Obsolete fixture operation",
      "consumer_audit" => "audit.md",
      "baseline_source_commit" => "a" * 40,
      "implementation_source_commit" => "b" * 40
    }
    File.write(approvals, JSON.pretty_generate({ "approvals" => [approval] }))
    _out, err, status = run_checker(root, baseline, approvals)
    refute status.success?
    assert_match(/approved removal .* is stale/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

end
