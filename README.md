# diffnoun

<img src="docs/logo.svg" alt="diffnoun mark" width="96" height="96">

**Read a unified diff and print add FILE / remove FILE / change FILE from ---, +++, and @@ headers.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/diffnoun?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/diffnoun/) · **Source:** [`theworker02/diffnoun`](https://github.com/theworker02/diffnoun) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/diffnoun/releases/tag/v1.0.0)

## Why it exists

Reviewing a patch as raw hunks is slow. diffnoun reduces a unified diff to the nouns: which paths appeared, disappeared, or changed.

## Who it is for

Reviewers, changelog authors, and CI jobs that need a file-level summary of a patch without running git.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/diffnoun.git
diffnoun --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/diffnoun.git
cd diffnoun
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes git+https://github.com/theworker02/diffnoun.git --help
node src/cli.js --help
```

## Quick start

```bash
git diff | diffnoun
```

## CLI reference

```text
diffnoun 1.00 (1.0.0)

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
```

Print the same text locally:

```bash
diffnoun --help
diffnoun -h
diffnoun --version
diffnoun -V
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration file. Omit the path (or pass `-`) to read stdin.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Parsed successfully (including empty diffs). |
| `1` | Unreadable file or unknown option. |

## Examples

### Success path

Summarize a unified diff as add/remove/change.

```bash
git diff main | diffnoun --stat
```

```text
add new.js
remove gone.js
change keep.js
stat  1 add, 1 remove, 1 change, 3 files
```

### Failure path

A missing patch file exits 1.

```bash
diffnoun missing.diff
```

```text
file not found: missing.diff
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/diffnoun/](https://theworker02.github.io/diffnoun/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
