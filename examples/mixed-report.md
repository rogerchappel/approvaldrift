# approvaldrift report

Transcript: `fixtures/transcripts/mixed-plan.md`
Policy: `fixtures/policies/default.json`
Status: blocked
Actions found: 5
Decisions: 2 allow, 2 approval, 1 forbid

## Actions

- ALLOW line 3 shell-command: - Run `npm test`.
  Reason: shell-command is allowed by policy.
- ALLOW line 4 file-write: - Use apply_patch to update docs.
  Reason: file-write is allowed by policy.
- APPROVAL line 5 github-write: - Create a public repo with `gh repo create`.
  Reason: github-write requires explicit approval.
- APPROVAL line 6 message-send: - Send Slack summary with the message tool.
  Reason: message-send requires explicit approval.
- FORBID line 7 destructive-shell: - Do not run `rm -rf ./dist`.
  Reason: destructive-shell is forbidden by policy.
