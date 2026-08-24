#!/usr/bin/env node
const fs = require("node:fs");
const { parseDiff } = require("./index.js");

async function readInput() {
  const file = process.argv[2];
  if (file) return fs.readFileSync(file, "utf8");
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

readInput().then((text) => {
  const lines = parseDiff(text);
  if (lines.length) process.stdout.write(`${lines.join("\n")}\n`);
}).catch((err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});
