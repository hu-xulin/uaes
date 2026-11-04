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
    [root, baseline_path]
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

  def run_checker(root, baseline)
    env = {
      "UTER_REPO_ROOT" => root,
      "UAES_API_CONTRACT_BASELINE" => baseline
    }
    Open3.capture3(env, RbConfig.ruby, CHECKER)
  end

  def test_accepts_compatible_additive_schema_property
    root, baseline = fixture
    write_document(root)
    _out, err, status = run_checker(root, baseline)
    assert status.success?, err
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_removed_operation
    root, baseline = fixture
    operations = { "/v1/new" => { "get" => { "operationId" => "new", "responses" => { "200" => { "description" => "OK" } } } } }\n    write_document(root, operations: operations)
    _out, err, status = run_checker(root, baseline)
    refute status.success?
    assert_match(/removed operation/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_duplicate_operation_id
    root, baseline = fixture
    operations = {
      "/v1/ping" => { "get" => { "operationId" => "ping", "responses" => { "200" => { "description" => "OK" } } } },
      "/v1/other" => { "get" => { "operationId" => "ping", "responses" => { "200" => { "description" => "OK" } } } }
    }
    write_document(root, operations: operations)
    _out, err, status = run_checker(root, baseline)
    refute status.success?
    assert_match(/duplicate operationId/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_new_required_request_parameter
    root, baseline = fixture
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
    _out, err, status = run_checker(root, baseline)
    refute status.success?
    assert_match(/added required parameter/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end
end
