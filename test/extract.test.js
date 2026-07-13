import assert from "node:assert/strict";
import test from "node:test";
import { extractActions } from "../src/extract.js";

test("extracts actions with evidence lines", () => {
  const actions = extractActions("fixtures/transcripts/mixed-plan.md");
  assert.ok(actions.length >= 4);
  assert.ok(actions.some((action) => action.kind === "github-write"));
  assert.ok(actions.some((action) => action.kind === "message-send"));
  assert.ok(actions.some((action) => action.kind === "destructive-shell"));
});
