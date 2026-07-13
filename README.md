# approvaldrift

`approvaldrift` checks an agent action plan or transcript against a local approval policy. It is designed for dry runs, preflight reviews, and CI checks where the tool should report risk without executing anything it reads.

## Quickstart

```bash
npm install
npm test
node bin/approvaldrift.js fixtures/transcripts/safe-plan.md fixtures/policies/default.json
```

Check a plan and fail when approval is needed:

```bash
approvaldrift plan.md policy.json --format markdown --fail-on approval
```

## Policy Format

Policies are JSON:

```json
{
  "default": "approval",
  "actions": {
    "shell-command": "allow",
    "github-write": "approval",
    "destructive-shell": "forbid"
  }
}
```

Levels are `allow`, `approval`, and `forbid`.

## Detected Action Kinds

- `shell-command`
- `file-write`
- `network-call`
- `message-send`
- `github-write`
- `package-publish`
- `destructive-shell`

## Safety Notes

The checker never runs commands, sends messages, publishes packages, or calls APIs. It only reads the transcript and policy file.

## Verification

```bash
npm test
npm run check
npm run smoke
```
