#!/usr/bin/env ruby
require "fileutils"
require "json"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class RouterOpenApiDriftTest < Minitest::Test
  UAES_ROOT = File.expand_path("../../..", __dir__)
  CHECKER = File.join(UAES_ROOT, "quality/scripts/architecture/check-router-openapi-drift")

  def fixture
    root = Dir.mktmpdir("uaes-router-openapi-")
    FileUtils.mkdir_p(File.join(root, "docs-dev/openapi"))
    File.write(File.join(root, "docs-dev/openapi/api.json"), JSON.generate({
      "paths" => {
        "/api/users/{id}" => { "get" => { "responses" => { "200" => { "description" => "OK" } } } },
        "/api/files/{file_id}/content" => { "get" => { "responses" => { "200" => { "description" => "OK" } } } }
      }
    }))
    File.write(File.join(root, "docs-dev/openapi/relay.json"), JSON.generate({
      "paths" => {
        "/v1/responses" => { "post" => { "responses" => { "200" => { "description" => "OK" } } }
      }
    }))
    routes = [
      { "method" => "GET", "path" => "/api/users/:user_id" },
      { "method" => "GET", "path" => "/api/files/*filepath" },
      { "method" => "POST", "path" => "/v1/responses" }
    ]
    route_file = File.join(root, "routes.json")
    File.write(route_file, JSON.generate(routes))
    [root, route_file]
  end

  def run_checker(root, route_file)
    Open3.capture3(
      { "UTER_REPO_ROOT" => root, "UAES_ROUTE_INVENTORY_JSON" => route_file },
      RbConfig.ruby,
      CHECKER
    )
  end

  def test_accepts_parameter_and_catch_all_routes
    root, route_file = fixture
    out, err, status = run_checker(root, route_file)
    assert status.success?, err
    assert_match(/ROUTER OPENAPI DRIFT: PASS/, out)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_documented_operation_missing_from_runtime
    root, route_file = fixture
    routes = JSON.parse(File.read(route_file))
    routes.reject! { |route| route["path"] == "/v1/responses" }
    File.write(route_file, JSON.generate(routes))
    _out, err, status = run_checker(root, route_file)
    refute status.success?
    assert_match(/POST \/v1\/responses/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_method_mismatch
    root, route_file = fixture
    routes = JSON.parse(File.read(route_file))
    routes.find { |route| route["path"] == "/v1/responses" }["method"] = "GET"
    File.write(route_file, JSON.generate(routes))
    _out, err, status = run_checker(root, route_file)
    refute status.success?
    assert_match(/POST \/v1\/responses/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end
end
