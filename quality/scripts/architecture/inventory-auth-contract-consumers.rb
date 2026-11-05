#!/usr/bin/env ruby
# Exhaustive lexical occurrence inventory for the auth/system contracts under review.
# This is deliberately a discovery report, not a semantic TypeScript analyzer.
require "json"

def stop(message)
  warn "AUTH CONTRACT CONSUMER INVENTORY: FAIL: #{message}"
  exit 2
end

root = ENV.fetch("UTER_REPO_ROOT") { stop("UTER_REPO_ROOT is required") }
expected = "422caafffb7a64370700ddd4859a057911f5f9e0"
actual = `git -C #{Shellwords.escape(root)} rev-parse HEAD 2>/dev/null`.strip
stop("source pin mismatch: expected #{expected}, got #{actual.empty? ? "(unavailable)" : actual}") unless actual == expected

web = File.join(root, "web")
stop("web directory missing") unless File.directory?(web)
extensions = %w[.ts .tsx .js .jsx .mts .cts .mjs .cjs]
files = Dir.glob(File.join(web, "**", "*"), File::FNM_DOTMATCH).select do |path|
  File.file?(path) && extensions.include?(File.extname(path))
end.sort
stop("no TypeScript/JavaScript source files found") if files.empty?

symbols = %w[
  AuthBundle AuthUser LoginSession AuthBootstrapState PendingLoginVerification
  LoginChallenge SystemStatus CustomOAuthProviderInfo
]
inventory = Hash.new { |hash, key| hash[key] = [] }

files.each do |path|
  relative = path.delete_prefix(root + File::SEPARATOR)
  File.foreach(path).with_index(1) do |line, number|
    symbols.each do |symbol|
      next unless line.match?(/(?<![A-Za-z0-9_$])#{Regexp.escape(symbol)}(?![A-Za-z0-9_$])/)
      inventory[symbol] << {
        path: relative,
        line: number,
        text: line.strip[0, 240]
      }
    end
  end
end

missing = symbols.reject { |symbol| inventory.key?(symbol) }
stop("expected symbols absent from scanned source: #{missing.join(", ")}") unless missing.empty?

puts "AUTH CONTRACT CONSUMER INVENTORY: PASS"
puts "Source commit: #{actual}"
puts "Scanned files: #{files.length} (web tree; production, tests, stories, generated files and package entrypoints included when source extensions match)"
puts "Method: exhaustive lexical identifier occurrence scan; not semantic symbol resolution"
symbols.each do |symbol|
  rows = inventory[symbol]
  puts "#{symbol}: #{rows.length} occurrences"
  rows.each { |row| puts "  #{row[:path]}:#{row[:line]}: #{row[:text]}" }
end
puts "AUTH CONTRACT CONSUMER INVENTORY LIMITATION: lexical matches may include declarations, comments and fixtures; every occurrence requires human classification."
