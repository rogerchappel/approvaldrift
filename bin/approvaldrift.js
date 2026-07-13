#!/usr/bin/env node
import { auditApprovalDrift } from "../src/index.js";
import { renderJson, renderMarkdown } from "../src/report.js";

const GATE = { approval: 1, forbid: 2 };
const DECISION = { allow: 0, approval: 1, forbid: 2 };

function parseArgs(argv) {
  const args = { format: "markdown", failOn: "forbid", positional: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--format") args.format = argv[++index];
    else if (value === "--fail-on") args.failOn = argv[++index];
    else if (value === "--help" || value === "-h") args.help = true;
    else args.positional.push(value);
  }
  return args;
}

function usage() {
  return `approvaldrift <plan.md> <policy.json> [--format markdown|json] [--fail-on approval|forbid]

Classify planned agent actions against an approval policy.

Examples:
  approvaldrift plan.md policy.json
  approvaldrift plan.md policy.json --format json --fail-on approval
`;
}

export function run(argv = process.argv.slice(2), io = process) {
  const args = parseArgs(argv);
  if (args.help || args.positional.length !== 2) {
    io.stdout.write(usage());
    return args.help ? 0 : 2;
  }
  if (!["markdown", "json"].includes(args.format)) {
    io.stderr.write(`Unsupported format: ${args.format}\n`);
    return 2;
  }
  if (!(args.failOn in GATE)) {
    io.stderr.write(`Unsupported gate: ${args.failOn}\n`);
    return 2;
  }

  try {
    const payload = auditApprovalDrift(args.positional[0], args.positional[1]);
    io.stdout.write(args.format === "json" ? renderJson(payload) : renderMarkdown(payload));
    const maxDecision = Math.max(0, ...payload.actions.map((action) => DECISION[action.decision]));
    return maxDecision >= GATE[args.failOn] ? 1 : 0;
  } catch (error) {
    io.stderr.write(`${error.message}\n`);
    return 2;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exitCode = run();
}
