# Release Candidate

## Classification

ship

## Verification

Verified locally against `main` at `4470dadef54d0a92f5030b264af07f81f38eb9d6` on 2026-10-02:

- `npm run release:check` - pass (exit 0). This runs all checks below.
- `npm run check` - pass; safe and mixed fixtures classify as expected.
- `npm test` - pass; 8 tests passed, 0 failed.
- `npm run smoke` - pass; safe fixture reports `Status: clear`.
- `npm run package:smoke` - pass; package smoke reports `approvaldrift-0.1.0.tgz` includes 25 files.

## Notes

Initial public build includes a read-only action extractor, JSON policy classifier, Markdown/JSON reports, fixtures, tests, CLI, library API, and agent-facing `SKILL.md`. The ship classification is based on the complete `release:check` suite, including the package smoke check.
