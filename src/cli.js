#!/usr/bin/env node
const fs = require("node:fs");
const { parseDiffEntries, statsFrom, formatHuman } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (const arg of argv) {
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--stat") flags.stat = true;
    else if (arg === "--add") flags.add = true;
    else if (arg === "--remove") flags.remove = true;
    else if (arg === "--change") flags.change = true;
    else if (arg.startsWith("-") && arg !== "-") throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

async function readInput(file) {
  if (file && file !== "-") {
    if (!fs.existsSync(file)) throw new Error(`file not found: ${file}`);
    return fs.readFileSync(file, "utf8");
  }
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

async function main() {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    return;
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    return;
  }
  const file = positional[0];
  const entries = parseDiffEntries(await readInput(file));
  const kinds = [];
  if (flags.add) kinds.push("add");
  if (flags.remove) kinds.push("remove");
  if (flags.change) kinds.push("change");
  const filtered = kinds.length ? entries.filter((e) => kinds.includes(e.kind)) : entries;
  const stats = statsFrom(filtered);
  if (flags.json) {
    process.stdout.write(`${JSON.stringify({ entries: filtered, stats }, null, 2)}\n`);
    return;
  }
  process.stdout.write(formatHuman(filtered, { stat: flags.stat }));
}

main().catch((err) => fail(err.message));
