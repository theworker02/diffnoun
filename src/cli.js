#!/usr/bin/env node
const fs = require("node:fs");
const { parseDiff } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

async function readInput() {
  const file = args.find((a) => !a.startsWith("-"));
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
