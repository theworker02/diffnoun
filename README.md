# diffnoun

<img src="docs/logo.svg" alt="diffnoun mark" width="96" height="96">

**Summarize unified diffs as structured add, remove, and change records without needing a Git repository.**

[![JSR](https://jsr.io/badges/@theworker02/diffnoun)](https://jsr.io/@theworker02/diffnoun)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/diffnoun`](https://jsr.io/@theworker02/diffnoun) · **Site:** [GitHub Pages](https://theworker02.github.io/diffnoun/) · **Source:** [`theworker02/diffnoun`](https://github.com/theworker02/diffnoun)

## Add from JSR

```bash
deno add jsr:@theworker02/diffnoun
```

```ts
import { filterEntries, parseDiffEntries, statsFrom } from "@theworker02/diffnoun";

const entries = parseDiffEntries(patchText);
console.log(statsFrom(entries));
console.log(filterEntries(entries, ["add", "change"]));
```

## Public API

- `parseDiffEntries(text)` — structured file changes.
- `parseDiff(text)` — noun-phrase summary lines.
- `classify(before, after)` — classify a path pair.
- `stripPath(raw)` — normalize diff-header paths.
- `statsFrom(entries)` — aggregate change counts.
- `filterEntries(entries, kinds)` — filter by change class.
- `formatHuman(entries, options)` — terminal output.
- `DIFF_KINDS`, `PACKAGE`, `DiffKind`, `DiffEntry`, `DiffStats` — documented metadata and types.

## CLI from source

```bash
git clone https://github.com/theworker02/diffnoun.git
cd diffnoun
git diff | node src/cli.js
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/diffnoun`, published through GitHub Actions trusted publishing.

## License

[MIT](LICENSE) © 2026 theworker02
