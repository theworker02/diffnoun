# diffnoun


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="diffnoun mark" width="96" height="96">

**Summarize unified diffs as structured add, remove, and change records without needing a Git repository.**

[![JSR](https://jsr.io/badges/@theworker02/diffnoun)](https://jsr.io/@theworker02/diffnoun)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/diffnoun`](https://jsr.io/@theworker02/diffnoun)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/diffnoun/)  ·  **Source:** [`theworker02/diffnoun`](https://github.com/theworker02/diffnoun)

## Purpose

Turn unified diff text into short noun phrases (`add`, `remove`, `change`) and aggregate stats without requiring a Git repository. Handy for summarizing patch files, PR diffs, or CI artifacts.

## Highlights

- Parses standard unified diff headers and hunk markers.
- Filters by change kind and emits JSON stats for automation.
- Pipe-friendly CLI (`git diff | node src/cli.js`).
- Pure parsing utilities exposed for tests and custom formatters.


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

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/diffnoun`, published through GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/diffnoun.git
cd diffnoun
node src/cli.js patch.diff
git diff main | node src/cli.js --stat
node src/cli.js --json --add patch.diff
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Emits a file entry only after `---`, `+++`, and an `@@` hunk header are seen.
- Binary diffs and non-unified formats are not interpreted.
- Rename detection follows path pairs in headers; complex rename/copy metadata may classify as `change`.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/diffnoun)
- [Project site](https://theworker02.github.io/diffnoun/)
- [Source repository](https://github.com/theworker02/diffnoun)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

diffnoun is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

