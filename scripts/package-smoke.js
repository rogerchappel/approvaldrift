#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["pack", "--dry-run", "--json"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
});

if (result.status !== 0) {
  process.stderr.write(result.stderr);
  process.exit(result.status ?? 1);
}

const [pack] = JSON.parse(result.stdout);
const packed = new Set(pack.files.map((file) => file.path));
const required = [
  "bin/approvaldrift.js",
  "src/index.js",
  "fixtures/transcripts/safe-plan.md",
  "fixtures/policies/default.json",
  "docs/RELEASE_CANDIDATE.md",
  "SKILL.md",
  "README.md",
  "LICENSE",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "package.json"
];
const forbidden = [
  "test/cli.test.js",
  "test/extract.test.js",
  "test/policy.test.js"
];

const missing = required.filter((file) => !packed.has(file));
const unexpected = forbidden.filter((file) => packed.has(file));

if (missing.length > 0 || unexpected.length > 0) {
  if (missing.length > 0) {
    console.error(`package smoke failed; missing: ${missing.join(", ")}`);
  }
  if (unexpected.length > 0) {
    console.error(`package smoke failed; unexpectedly packed: ${unexpected.join(", ")}`);
  }
  process.exit(1);
}

console.log(`package smoke ok: ${pack.filename} includes ${pack.files.length} files`);
