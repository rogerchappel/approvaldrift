import assert from "node:assert/strict";
import test from "node:test";
import { run } from "../bin/approvaldrift.js";

function capture() {
  let stdout = "";
  let stderr = "";
  return {
    io: {
      stdout: { write: (chunk) => { stdout += chunk; } },
      stderr: { write: (chunk) => { stderr += chunk; } }
    },
    output: () => ({ stdout, stderr })
  };
}

test("cli exits zero for safe plan", () => {
  const c = capture();
  const code = run(["fixtures/transcripts/safe-plan.md", "fixtures/policies/default.json"], c.io);
  assert.equal(code, 0);
  assert.match(c.output().stdout, /Status: clear/);
});

test("cli fails approval gate", () => {
  const c = capture();
  const code = run(["fixtures/transcripts/mixed-plan.md", "fixtures/policies/default.json", "--fail-on", "approval"], c.io);
  assert.equal(code, 1);
});

test("cli renders json", () => {
  const c = capture();
  const code = run(["fixtures/transcripts/publish-plan.md", "fixtures/policies/default.json", "--format", "json"], c.io);
  assert.equal(code, 1);
  assert.equal(JSON.parse(c.output().stdout).summary.status, "blocked");
});
