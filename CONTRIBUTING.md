# Contributing

Thanks for helping improve `approvaldrift`.

## Local Checks

Run the release gate before opening a pull request:

```sh
npm run release:check
```

For focused changes, the individual checks are:

```sh
npm run check
npm test
npm run smoke
npm run package:smoke
```

## Change Guidelines

- Keep checks deterministic and local-first.
- Add or update fixtures when action extraction, policy decisions, or report output changes.
- Do not add network calls, credential reads, or live connector/API actions.
- Document new action kinds in `docs/ACTION_KINDS.md` and policy behavior in `docs/POLICY_SCHEMA.md`.
