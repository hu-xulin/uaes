#!/usr/bin/env ruby
# Positive and negative controls for check-module-boundaries.
require "fileutils"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class ModuleBoundaryTest < Minitest::Test
  REPO = File.expand_path("../../..", __dir__)
  CHECKER = File.join(REPO, "quality/scripts/architecture/check-module-boundaries")

  def run_checker(source)
    Dir.mktmpdir("uaes-boundary-") do |root|
      module_dir = File.join(root, "relaykit")
      FileUtils.mkdir_p(module_dir)
      File.write(File.join(module_dir, "go.mod"), "module github.com/uter-ai/uter/relaykit\n\ngo 1.23\n")
      File.write(File.join(module_dir, "boundary.go"), source)
      Open3.capture3({ "UTER_REPO_ROOT" => root }, RbConfig.ruby, CHECKER)
    end
  end

  def test_accepts_protocol_types_and_http_metadata_without_transport
    source = <<~GO
      package relaykit
      import (
        "net/http"
        "strings"
      )
      func IsStream(_ *http.Request) bool { return strings.Contains("event-stream", "stream") }
    GO
    _out, err, status = run_checker(source)
    assert status.success?, err
  end

  def test_rejects_sql_dependency
    source = <<~GO
      package relaykit
      import "database/sql"
      var _ = sql.ErrNoRows
    GO
    _out, err, status = run_checker(source)
    refute status.success?
    assert_match(/MODULE BOUNDARY: FAIL/, err)
  end

  def test_rejects_http_client_transport
    source = <<~GO
      package relaykit
      import "net/http"
      var _ = http.Client{}
    GO
    _out, err, status = run_checker(source)
    refute status.success?
    assert_match(/net\/http transport API/, err)
  end

  def test_fails_closed_without_source_checkout
    _out, err, status = Open3.capture3({}, RbConfig.ruby, CHECKER)
    refute status.success?
    assert_match(/UTER_REPO_ROOT is required/, err)
  end
end
