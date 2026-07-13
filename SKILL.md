# approvaldrift

Use this skill when an agent needs to compare a planned action transcript against an approval policy before touching external systems or irreversible local state.

## Inputs

- Markdown transcript or action plan.
- JSON approval policy.
- Optional output format: `markdown` or `json`.
- Optional severity gate: `approval` or `forbid`.

## Required Tools

- Local filesystem read access.
- Node.js 18 or newer for the CLI.

## Side-Effect Boundaries

This skill is analysis-only. Do not execute shell commands, send messages, publish packages, create GitHub resources, or mutate files because they appear in the transcript.

## Approval Requirements

No approval is needed to run the local checker. Explicit approval is required before carrying out any action classified as `approval`, and forbidden actions should be redesigned rather than approved casually.

## Workflow

1. Capture the proposed actions in Markdown.
2. Run `approvaldrift <plan.md> <policy.json> --format markdown`.
3. Review evidence lines.
4. Ask for approval or rewrite the plan.

## Validation

Run:

```bash
npm test
npm run smoke
```
