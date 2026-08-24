const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { parseDiff } = require("../src/index.js");

describe("diffnoun", () => {
  it("classifies add, remove, and change from unified headers", () => {
    const diff = [
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
    assert.deepEqual(parseDiff(diff), [
      "add new.js",
      "remove gone.js",
      "change keep.js",
    ]);
  });
});
