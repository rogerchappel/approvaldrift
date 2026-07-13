# Orchestration

`approvaldrift` runs before an agent performs external or irreversible work.

1. Save or generate a Markdown action plan.
2. Pick a policy file for the operating lane.
3. Run `approvaldrift plan.md policy.json`.
4. Review approval-needed and forbidden findings.
5. Ask for explicit approval before any action that the report flags.

## Side Effects

The tool only reads the transcript and policy files. It never executes actions found in the transcript.
