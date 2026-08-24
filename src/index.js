function stripPath(raw) {
  const token = String(raw).split("\t")[0].trim();
  if (token === "/dev/null") return null;
  return token.replace(/^[ab]\//, "");
}

function classify(minus, plus) {
  if (minus == null && plus) return `add ${plus}`;
  if (plus == null && minus) return `remove ${minus}`;
  return `change ${plus || minus}`;
}

function parseDiff(text) {
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

module.exports = { parseDiff, stripPath, classify };
