const HELP = "diffnoun 1.00 (1.0.0)\n\nUsage:\n  diffnoun [options] [file]\n  git diff | diffnoun\n\nSummarize a unified diff as:\n  add FILE\n  remove FILE\n  change FILE\n\nA file is emitted only after a --- line, a +++ line, and an @@ hunk header.\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nArguments:\n  file             Patch file to read. Omit to read stdin.\n\nExamples:\n  diffnoun patch.diff\n  git diff main | diffnoun\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
