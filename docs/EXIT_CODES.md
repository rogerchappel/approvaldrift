# Exit Codes

- `0`: report completed and no action met the selected `--fail-on` gate.
- `1`: report completed and at least one action met the gate.
- `2`: usage, policy, or file-read error.

The default gate is `forbid`, so approval-needed actions are visible without failing the command unless `--fail-on approval` is selected.
