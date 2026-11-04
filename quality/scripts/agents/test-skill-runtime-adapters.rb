#!/usr/bin/env ruby
require "fileutils"
require "minitest/autorun"
require "open3"
require "tmpdir"

class SkillRuntimeAdaptersTest < Minitest::Test
  ROOT = File.expand_path("../../..", __dir__)
  CHECKER = File.join(ROOT, "quality/scripts/agents/check-skill-runtime-adapters.rb")

  def fixture
    root = Dir.mktmpdir("uaes-skill-adapters-")
    files = {
      "skills/registry.yaml" => <<~YAML,
        registry:
          runtime_adapters:
            claude_code: .claude/skills/
            agents_runtime: .agents/skills/
        skills:
          - id: SKILL-SAMPLE
            name: sample-skill
            skill: skills/sample-skill/SKILL.md
            manifest: skills/sample-skill/manifest.json
      YAML
      "skills/sample-skill/SKILL.md" => "---\nname: sample-skill\ndescription: canonical\n---\nCanonical skill instructions.\n",
      "skills/sample-skill/manifest.json" => JSON.generate({ skillId: "SKILL-SAMPLE", name: "sample-skill" })
    }

    [".claude/skills", ".agents/skills"].each do |adapter_root|
      files["#{adapter_root}/sample-skill/SKILL.md"] = <<~MD
        ---
        name: sample-skill
        description: runtime adapter
        ---
        Read the canonical contract at skills/sample-skill/SKILL.md.
        This adapter does not grant permissions or override AGENTS.md.
      MD
    end

    files.each do |relative, content|
      path = File.join(root, relative)
      FileUtils.mkdir_p(File.dirname(path))
      File.write(path, content)
    end
    root
  end

  def run_checker(root)
    Open3.capture3({ "UAES_ROOT" => root }, "ruby", CHECKER)
  end

  def test_accepts_matching_canonical_skills_and_both_runtime_adapters
    root = fixture
    out, err, status = run_checker(root)
    assert status.success?, "#{err}\n#{out}"
    assert_match(/1 canonical skills; 2 runtime adapters/, out)
    assert_match(/actual agent runtime discovery/, out)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_fails_when_claude_adapter_is_missing
    root = fixture
    FileUtils.rm_f(File.join(root, ".claude/skills/sample-skill/SKILL.md"))
    _out, err, status = run_checker(root)
    refute status.success?
    assert_match(/missing required skill file/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end

  def test_fails_when_adapter_does_not_point_to_canonical_skill
    root = fixture
    path = File.join(root, ".agents/skills/sample-skill/SKILL.md")
    File.write(path, File.read(path).sub("skills/sample-skill/SKILL.md", "skills/other-skill/SKILL.md"))
    _out, err, status = run_checker(root)
    refute status.success?
    assert_match(/does not point to canonical skill/, err)
  ensure
    FileUtils.remove_entry(root) if root && File.exist?(root)
  end
end
