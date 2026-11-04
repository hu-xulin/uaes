#!/usr/bin/env ruby
require "fileutils"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class DependencyRulesTest < Minitest::Test
  UAES_ROOT = File.expand_path("../../..", __dir__)
  CHECKER = File.join(UAES_ROOT, "quality/scripts/architecture/check-dependency-rules")

  def fixture(allow_relay)
    root = Dir.mktmpdir("uaes-deps-")
    relay = File.join(root, "relaykit", "pkg")
    FileUtils.mkdir_p(relay)
    File.write(File.join(root, "go.mod"), <<~MOD)
      module example.com/uter
      go 1.23
      require example.com/uter/relaykit v0.0.0
      replace example.com/uter/relaykit => ./relaykit
    MOD
    File.write(File.join(root, "main.go"), <<~GO)
      package main
      import "example.com/uter/relaykit/pkg"
      var _ = pkg.Value
    GO
    File.write(File.join(root, "relaykit", "go.mod"), "module example.com/uter/relaykit\n\ngo 1.23\n")
    File.write(File.join(relay, "pkg.go"), "package pkg\nconst Value = 1\n")

    registry = File.join(root, "modules.yaml")
    rules = File.join(root, "rules.yaml")
    File.write(registry, <<~YAML)
      modules:
        - id: MOD-ROOT
          type: go-module
          path: "."
          manifest: "go.mod"
          module_name: "example.com/uter"
        - id: MOD-RELAY
          type: go-module
          path: "relaykit"
          manifest: "relaykit/go.mod"
          module_name: "example.com/uter/relaykit"
    YAML
    allowed = allow_relay ? "[MOD-RELAY]" : "[]"
    File.write(rules, <<~YAML)
      modules:
        MOD-ROOT:
          allowed_internal_dependencies: #{allowed}
        MOD-RELAY:
          allowed_internal_dependencies: []
    YAML
    [root, registry, rules]
  end

  def run_checker(root, registry, rules)
    env = {
      "UTER_REPO_ROOT" => root,
      "UAES_MODULE_REGISTRY" => registry,
      "UAES_MODULE_DEPENDENCY_RULES" => rules
    }
    Open3.capture3(env, RbConfig.ruby, CHECKER)
  end

  def test_accepts_explicitly_allowed_internal_dependency
    root, registry, rules = fixture(true)
    _out, err, status = run_checker(root, registry, rules)
    assert status.success?, err
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_rejects_unlisted_internal_dependency
    root, registry, rules = fixture(false)
    _out, err, status = run_checker(root, registry, rules)
    refute status.success?
    assert_match(/not allowed/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end
end
