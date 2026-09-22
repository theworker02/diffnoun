# Asset inventory â€” diffnoun

## Repository surfaces

| Asset | Location / notes |
|-------|------------------|
| Source tree | Repository root / language packages |
| Tests | `test/`, `tests/`, CI workflows if present |
| Docs | `README.md`, `docs/` |
| Diligence room | `docs/acquisition/` |
| License / notices | `LICENSE`, transition notices if present |
| Funding | `.github/FUNDING.yml` |
| CI | `.github/workflows/` if present |
| Branding | logos/assets folders if present |

## Capability highlights

- `parseDiffEntries(text)` Ã¢â‚¬â€ structured file changes.
- `parseDiff(text)` Ã¢â‚¬â€ noun-phrase summary lines.
- `classify(before, after)` Ã¢â‚¬â€ classify a path pair.
- `stripPath(raw)` Ã¢â‚¬â€ normalize diff-header paths.
- `statsFrom(entries)` Ã¢â‚¬â€ aggregate change counts.
- `filterEntries(entries, kinds)` Ã¢â‚¬â€ filter by change class.
- `formatHuman(entries, options)` Ã¢â‚¬â€ terminal output.
- `DIFF_KINDS`, `PACKAGE`, `DiffKind`, `DiffEntry`, `DiffStats` Ã¢â‚¬â€ documented metadata and types.

## Usually excluded

Seller personal accounts, unrelated repos, and unreissued registry tokens â€” unless listed in the definitive agreement.

*Updated: 2026-09-22*
