#!/usr/bin/env ruby
require "fileutils"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class FrontendModuleInventoryTest < Minitest::Test
  UAES_ROOT = File.expand_path("../../..", __dir__)
  CHECKER = File.join(UAES_ROOT, "quality/scripts/architecture/check-frontend-module-inventory")

  def fixture
    root = Dir.mktmpdir("uaes-frontend-boundary-")
    src = File.join(root, "web/src")
    FileUtils.mkdir_p(File.join(src, "routes"))
    FileUtils.mkdir_p(File.join(src, "features", "auth"))
    FileUtils.mkdir_p(File.join(src, "lib"))
    File.write(File.join(src, "main.tsx"), "import '@/lib/shared'\nimport './routes/root'\n")
    File.write(File.join(src, "lib/shared.ts"), "export const shared = true\n")
    File.write(File.join(src, "routes/root.tsx"), "import '@/features/auth/sign-in'\n")
    File.write(File.join(src, "features/auth/sign-in.tsx"), "import '@/lib/shared'\n")
    root
  end

  def test_resolves_alias_and_relative_imports_and_reports_edges
    root = fixture
    out, err, status = Open3.capture3({ "UTER_REPO_ROOT" => root }, RbConfig.ruby, CHECKER)
    assert status.success?, err
    assert_match(/FRONTEND MODULE INVENTORY: PASS/, out)
    assert_match(/main.tsx -> routes: 1/, out)
    assert_match(/routes -> features: 1/, out)
    assert_match(/features -> lib: 1/, out)
    assert_match(/FRONTEND MODULE BOUNDARIES: NOT_VERIFIED/, out)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_fails_closed_on_unresolved_local_import
    root = fixture
    File.write(File.join(root, "web/src/lib/shared.ts"), "import '@/missing/module'\n")
    _out, err, status = Open3.capture3({ "UTER_REPO_ROOT" => root }, RbConfig.ruby, CHECKER)
    refute status.success?
    assert_match(/unresolved local imports/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end
end
