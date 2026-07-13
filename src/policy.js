import fs from "node:fs";

const LEVELS = ["allow", "approval", "forbid"];

export function loadPolicy(policyPath) {
  const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  return {
    default: normalize(policy.default ?? "approval"),
    actions: Object.fromEntries(
      Object.entries(policy.actions ?? {}).map(([kind, level]) => [kind, normalize(level)])
    )
  };
}

export function classifyActions(actions, policy) {
  return actions.map((action) => {
    const decision = policy.actions[action.kind] ?? policy.default;
    return {
      ...action,
      decision,
      reason: reasonFor(action.kind, decision)
    };
  });
}

export function summarize(classified) {
  const counts = { allow: 0, approval: 0, forbid: 0 };
  for (const action of classified) counts[action.decision] += 1;
  return {
    actions: classified.length,
    decisions: counts,
    status: counts.forbid > 0 ? "blocked" : counts.approval > 0 ? "needs-approval" : "clear"
  };
}

function normalize(level) {
  if (!LEVELS.includes(level)) {
    throw new Error(`Unsupported policy level: ${level}`);
  }
  return level;
}

function reasonFor(kind, decision) {
  if (decision === "allow") return `${kind} is allowed by policy.`;
  if (decision === "approval") return `${kind} requires explicit approval.`;
  return `${kind} is forbidden by policy.`;
}
