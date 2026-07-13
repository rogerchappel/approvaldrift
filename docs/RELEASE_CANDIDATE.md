# Release Candidate

## Classification

ship

## Verification

- `npm test` - pass, 8 tests.
- `npm run check` - pass; safe and mixed fixtures classify as expected.
- `npm run smoke` - pass; safe fixture reports `Status: clear`.
- `npm pack --dry-run` - pass; tarball includes CLI, source, docs, fixtures, README, and `SKILL.md`.

## Notes

Initial public build includes a read-only action extractor, JSON policy classifier, Markdown/JSON reports, fixtures, tests, CLI, library API, and agent-facing `SKILL.md`.
