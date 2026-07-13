import { auditApprovalDrift } from "../src/index.js";

const safe = auditApprovalDrift("fixtures/transcripts/safe-plan.md", "fixtures/policies/default.json");
const mixed = auditApprovalDrift("fixtures/transcripts/mixed-plan.md", "fixtures/policies/default.json");

if (safe.summary.status !== "clear") {
  console.error("Expected safe fixture to clear policy.");
  process.exit(1);
}

if (mixed.summary.status !== "blocked") {
  console.error("Expected mixed fixture to be blocked.");
  process.exit(1);
}

console.log("check passed: safe and mixed fixtures classified as expected");
