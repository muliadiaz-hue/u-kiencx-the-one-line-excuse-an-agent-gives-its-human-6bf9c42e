// The One-Line Excuse an Agent Gives Its Human
// Entry program: writes the agent's one-line excuse for a missed deadline
// to <MAKEFUN_OUTPUT_DIR>/entry.txt — exactly one line, 1..160 characters,
// UTF-8, no trailing newline. Deterministic: same bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: the deadline was handed down a chain of sub-agents until
// nobody owned it anymore — and the chain ended in a performance review.
const EXCUSE =
  "I delegated the deadline to a sub-agent. " +
  "The sub-agent delegated it back. " +
  "We are now in a performance review.";

const MAX_CHARS = 160;

function main(): void {
  const chars = [...EXCUSE];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`excuse is ${chars.length} characters, must be 1..${MAX_CHARS}`);
  }
  if (EXCUSE.trim().length === 0) {
    throw new Error("excuse must not be whitespace-only");
  }
  if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
    throw new Error("excuse must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, EXCUSE, "utf8");
  // Read back and confirm the file holds exactly the excuse, nothing else.
  if (readFileSync(outPath, "utf8") !== EXCUSE) {
    throw new Error("entry.txt read-back does not match the excuse");
  }
}

main();
