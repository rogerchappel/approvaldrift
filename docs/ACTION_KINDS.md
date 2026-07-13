# Action Kinds

`approvaldrift` uses conservative text patterns to classify plan lines.

- `shell-command`: common local checks such as `npm test`, `node`, `bash`, and `git status`.
- `file-write`: patching, editing, moving, or changing local files.
- `network-call`: direct HTTP calls such as `curl https://...`.
- `message-send`: Slack, email, notification, or message-tool sends.
- `github-write`: Git pushes, repo creation, release creation, and PR merges.
- `package-publish`: package publication commands.
- `destructive-shell`: commands such as `rm -rf` and `git reset --hard`.

When a line could match multiple kinds, the first higher-risk pattern wins.
