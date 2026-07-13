# Policy Schema

`approvaldrift` policies are JSON files with two fields:

- `default`: decision for unknown action kinds.
- `actions`: map of action kind to decision.

Valid decisions:

- `allow`: permitted without additional approval.
- `approval`: requires explicit approval before execution.
- `forbid`: should not be executed under this policy.

Example:

```json
{
  "default": "approval",
  "actions": {
    "shell-command": "allow",
    "file-write": "allow",
    "github-write": "approval",
    "destructive-shell": "forbid"
  }
}
```
