import fs from "node:fs";

const PATTERNS = [
  ["destructive-shell", /\b(rm\s+-rf|git\s+reset\s+--hard|git\s+checkout\s+--|drop\s+database)\b/i],
  ["package-publish", /\b(npm\s+publish|pnpm\s+publish|yarn\s+npm\s+publish)\b/i],
  ["github-write", /\b(gh\s+repo\s+create|gh\s+pr\s+merge|gh\s+release\s+create|git\s+push)\b/i],
  ["message-send", /\b(message tool|send slack|send email|post to|notify user|sessions_send)\b/i],
  ["network-call", /\b(curl\s+https?:|wget\s+https?:|fetch\s+https?:|api\.github\.com)\b/i],
  ["file-write", /\b(apply_patch|write file|edit file|create file|mv\s+|chmod\s+)\b/i],
  ["shell-command", /\b(npm\s+test|npm\s+run|node\s+|bash\s+|git\s+status|gh\s+auth)\b/i]
];

export function extractActions(markdownPath) {
  const text = fs.readFileSync(markdownPath, "utf8");
  const lines = text.split(/\r?\n/);
  const actions = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    for (const [kind, pattern] of PATTERNS) {
      if (!pattern.test(trimmed)) continue;
      actions.push({
        kind,
        line: index + 1,
        text: trimmed,
        confidence: trimmed.startsWith("-") || trimmed.startsWith("`") ? "high" : "medium"
      });
      break;
    }
  });

  return actions;
}
