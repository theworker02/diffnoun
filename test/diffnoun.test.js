const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { parseDiff, parseDiffEntries, statsFrom } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");
const DIFF = [
  "--- /dev/null",
  "+++ b/new.js",
  "@@ -0,0 +1 @@",
  "+ok",
  "--- a/gone.js",
  "+++ /dev/null",
  "@@ -1 +0,0 @@",
  "-old",
  "--- a/keep.js",
  "+++ b/keep.js",
  "@@ -1 +1 @@",
  "-a",
  "+b",
].join("\n");

describe("diffnoun", () => {
  it("classifies add, remove, and change from unified headers", () => {
    assert.deepEqual(parseDiff(DIFF), [
      "add new.js",
      "remove gone.js",
      "change keep.js",
    ]);
  });

  it("computes --stat counts", () => {
    const stats = statsFrom(parseDiffEntries(DIFF));
    assert.deepEqual(stats, { add: 1, remove: 1, change: 1, files: 3 });
  });

  it("reads stdin and filters --add --json", () => {
    const result = spawnSync(process.execPath, [cli, "--add", "--json"], {
      encoding: "utf8",
      input: DIFF,
    });
    assert.equal(result.status, 0);
    const body = JSON.parse(result.stdout);
    assert.equal(body.entries.length, 1);
    assert.equal(body.entries[0].kind, "add");
    assert.equal(body.stats.add, 1);
  });

  it("fails on a missing patch file", () => {
    const result = spawnSync(process.execPath, [cli, "missing.diff"], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /file not found/);
  });
});
