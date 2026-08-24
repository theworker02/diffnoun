const HELP = `diffnoun 1.00 (1.0.0)

Usage:
  diffnoun [options] [file|-]
  git diff | diffnoun
  git diff main | diffnoun --stat --json

Summarize a unified diff as noun phrases:
  add FILE
  remove FILE
  change FILE

A file is emitted only after a --- line, a +++ line, and an @@ hunk header.

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             {"entries":[{"kind","file"}],"stats":{...}}
  --stat             Append counts: add / remove / change / files
  --add              Only print additions
  --remove           Only print removals
  --change           Only print changes

Arguments:
  file               Patch file to read. Omit or pass "-" to read stdin.

Exit codes:
  0  parsed successfully (including empty diffs)
  1  unreadable file or unknown option

Examples:
  diffnoun patch.diff
  git diff main | diffnoun --stat
  diffnoun --json --add patch.diff
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
