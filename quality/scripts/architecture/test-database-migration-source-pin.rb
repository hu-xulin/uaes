#!/usr/bin/env ruby
require "fileutils"
require "open3"
require "tmpdir"

def assert(condition, message)
  abort("DATABASE MIGRATION SOURCE PIN TEST: FAIL — #{message}") unless condition
end

checker = File.expand_path("check-database-migrations", __dir__)
uter_root = ENV["UTER_REPO_ROOT"]
abort("UTER_REPO_ROOT is required for the positive control") if uter_root.nil? || uter_root.empty?

stdout, stderr, status = Open3.capture3(
  { "UTER_REPO_ROOT" => uter_root },
  "ruby", checker
)
assert(status.success?, "matching checked-out source should pass; stdout=#{stdout.inspect}; stderr=#{stderr.inspect}")
assert(stdout.include?("DATABASE MIGRATION INVENTORY: PASS"), "positive control did not reach inventory PASS")

Dir.mktmpdir("uaes-wrong-uter-source-") do |root|
  _out, err, init_status = Open3.capture3("git", "init", "-q", root)
  assert(init_status.success?, "could not initialize temporary Git repository: #{err}")
  File.write(File.join(root, "README.md"), "negative control\n")
  _out, err, config_status = Open3.capture3("git", "-C", root, "config", "user.name", "UAES Test")
  assert(config_status.success?, "could not configure temporary Git identity: #{err}")
  _out, err, config_status = Open3.capture3("git", "-C", root, "config", "user.email", "uaes-test@example.invalid")
  assert(config_status.success?, "could not configure temporary Git email: #{err}")
  _out, err, commit_status = Open3.capture3("git", "-C", root, "add", "README.md")
  assert(commit_status.success?, "could not stage temporary Git fixture: #{err}")
  _out, err, commit_status = Open3.capture3("git", "-C", root, "commit", "-q", "-m", "fixture")
  assert(commit_status.success?, "could not commit temporary Git fixture: #{err}")

  _out, mismatch_stderr, mismatch_status = Open3.capture3(
    { "UTER_REPO_ROOT" => root },
    "ruby", checker
  )
  assert(!mismatch_status.success?, "mismatched source commit must fail")
  assert(
    mismatch_stderr.include?("does not match checked-out Uter HEAD"),
    "negative control failed for an unexpected reason: #{mismatch_stderr.inspect}"
  )
end

puts "DATABASE MIGRATION SOURCE PIN TEST: PASS (1 positive, 1 negative control)"
