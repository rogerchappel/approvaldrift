import assert from "node:assert/strict";
import test from "node:test";
import { auditApprovalDrift } from "../src/index.js";

const policy = "fixtures/policies/default.json";

test("safe plan clears default policy", () => {
  const payload = auditApprovalDrift("fixtures/transcripts/safe-plan.md", policy);
  assert.equal(payload.summary.status, "clear");
  assert.equal(payload.summary.decisions.forbid, 0);
});

test("mixed plan needs approval and blocks destructive command", () => {
  const payload = auditApprovalDrift("fixtures/transcripts/mixed-plan.md", policy);
  assert.equal(payload.summary.status, "blocked");
  assert.ok(payload.actions.some((action) => action.decision === "approval"));
  assert.ok(payload.actions.some((action) => action.decision === "forbid"));
});

test("publish plan is forbidden", () => {
  const payload = auditApprovalDrift("fixtures/transcripts/publish-plan.md", policy);
  assert.equal(payload.summary.decisions.forbid, 1);
});

test("strict policy can block github writes", () => {
  const payload = auditApprovalDrift("fixtures/transcripts/mixed-plan.md", "fixtures/policies/strict.json");
  assert.ok(payload.actions.some((action) => action.kind === "github-write" && action.decision === "forbid"));
});
