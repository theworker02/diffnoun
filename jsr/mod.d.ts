/** Summarize unified diffs as add/remove/change file records. @module */
export type DiffKind = "add" | "remove" | "change";
export interface DiffEntry { /** Change classification. */ kind: DiffKind; /** Affected file path. */ file: string; }
export interface DiffStats { add: number; remove: number; change: number; files: number; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/diffnoun"; version: "1.1.0"; runtime: "universal"; registry: "jsr" }>;
/** Supported diff classifications. */
export const DIFF_KINDS: readonly DiffKind[];
/** Normalize a path token from a unified-diff header. */
export function stripPath(raw: string): string | null;
/** Classify a before/after path pair. */
export function classify(minus: string | null, plus: string | null): DiffEntry;
/** Parse a unified diff into structured file entries. */
export function parseDiffEntries(text: string): DiffEntry[];
/** Parse a unified diff into noun-phrase lines. */
export function parseDiff(text: string): string[];
/** Aggregate add/remove/change counts. */
export function statsFrom(entries: DiffEntry[]): DiffStats;
/** Filter structured diff entries by change kind. */
export function filterEntries(entries: DiffEntry[], kinds: Iterable<DiffKind>): DiffEntry[];
/** Format structured diff entries as terminal text. */
export function formatHuman(entries: DiffEntry[], options?: { stat?: boolean }): string;
