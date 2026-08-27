/* @ts-self-types="./mod.d.ts" */

export const PACKAGE = Object.freeze({ name: "@theworker02/diffnoun", version: "1.1.0", runtime: "universal", registry: "jsr" });
export const DIFF_KINDS = Object.freeze(["add", "remove", "change"]);

export function stripPath(raw) {
  const token = String(raw).split("\t")[0].trim();
  if (token === "/dev/null") return null;
  return token.replace(/^[ab]\//, "");
}

export function classify(minus, plus) {
  if (minus == null && plus) return { kind: "add", file: plus };
  if (plus == null && minus) return { kind: "remove", file: minus };
  return { kind: "change", file: plus || minus };
}

export function parseDiffEntries(text) {
  const out = [];
  let minus = null;
  let plus = null;
  let pending = false;
  for (const line of String(text).split(/\r?\n/)) {
    if (line.startsWith("--- ")) { minus = stripPath(line.slice(4)); plus = null; pending = true; continue; }
    if (line.startsWith("+++ ") && pending) { plus = stripPath(line.slice(4)); continue; }
    if (line.startsWith("@@") && pending) { out.push(classify(minus, plus)); pending = false; minus = null; plus = null; }
  }
  return out;
}

export function parseDiff(text) { return parseDiffEntries(text).map((entry) => `${entry.kind} ${entry.file}`); }

export function statsFrom(entries) {
  const stats = { add: 0, remove: 0, change: 0, files: entries.length };
  for (const entry of entries) stats[entry.kind] += 1;
  return stats;
}

export function filterEntries(entries, kinds) {
  const allowed = new Set(kinds);
  return entries.filter((entry) => allowed.has(entry.kind));
}

export function formatHuman(entries, { stat = false } = {}) {
  const lines = entries.map((entry) => `${entry.kind} ${entry.file}`);
  if (stat) {
    const stats = statsFrom(entries);
    lines.push(`stat  ${stats.add} add, ${stats.remove} remove, ${stats.change} change, ${stats.files} files`);
  }
  return lines.length ? `${lines.join("\n")}\n` : "";
}
