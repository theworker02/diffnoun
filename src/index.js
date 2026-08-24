function stripPath(raw) {
  const token = String(raw).split("\t")[0].trim();
  if (token === "/dev/null") return null;
  return token.replace(/^[ab]\//, "");
}

function classify(minus, plus) {
  if (minus == null && plus) return { kind: "add", file: plus };
  if (plus == null && minus) return { kind: "remove", file: minus };
  return { kind: "change", file: plus || minus };
}

function parseDiffEntries(text) {
  const lines = String(text).split(/\r?\n/);
  const out = [];
  let minus = null;
  let plus = null;
  let pending = false;
  for (const line of lines) {
    if (line.startsWith("--- ")) {
      minus = stripPath(line.slice(4));
      plus = null;
      pending = true;
      continue;
    }
    if (line.startsWith("+++ ") && pending) {
      plus = stripPath(line.slice(4));
      continue;
    }
    if (line.startsWith("@@") && pending) {
      out.push(classify(minus, plus));
      pending = false;
      minus = null;
      plus = null;
    }
  }
  return out;
}

function parseDiff(text) {
  return parseDiffEntries(text).map((entry) => `${entry.kind} ${entry.file}`);
}

function statsFrom(entries) {
  const stats = { add: 0, remove: 0, change: 0, files: entries.length };
  for (const entry of entries) stats[entry.kind] += 1;
  return stats;
}

function formatHuman(entries, { stat = false } = {}) {
  const lines = entries.map((entry) => `${entry.kind} ${entry.file}`);
  if (stat) {
    const stats = statsFrom(entries);
    lines.push(`stat  ${stats.add} add, ${stats.remove} remove, ${stats.change} change, ${stats.files} files`);
  }
  return lines.length ? `${lines.join("\n")}\n` : "";
}

module.exports = {
  stripPath,
  classify,
  parseDiff,
  parseDiffEntries,
  statsFrom,
  formatHuman,
};
