export function renderJson(payload) {
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function renderMarkdown(payload) {
  const lines = [
    "# approvaldrift report",
    "",
    `Status: ${payload.summary.status}`,
    `Actions found: ${payload.summary.actions}`,
    `Decisions: ${payload.summary.decisions.allow} allow, ${payload.summary.decisions.approval} approval, ${payload.summary.decisions.forbid} forbid`,
    "",
    "## Actions",
    ""
  ];

  if (payload.actions.length === 0) {
    lines.push("- No action-like lines detected.");
  } else {
    for (const action of payload.actions) {
      lines.push(`- ${action.decision.toUpperCase()} line ${action.line} ${action.kind}: ${action.text}`);
      lines.push(`  Reason: ${action.reason}`);
    }
  }

  return `${lines.join("\n")}\n`;
}
