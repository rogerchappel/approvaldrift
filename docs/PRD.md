# approvaldrift PRD

## Problem

Agent transcripts and action plans often mix local analysis, file edits, external messages, GitHub writes, package operations, and destructive commands. Reviewers need a fast way to see whether a proposed run drifted outside its approval boundary.

## Goals

- Read a Markdown transcript or action plan.
- Read a JSON policy that maps action kinds to `allow`, `approval`, or `forbid`.
- Extract evidence lines for commands and external actions.
- Classify each action conservatively.
- Emit Markdown and JSON reports for review or CI.

## Non-Goals

- Executing commands.
- Sending messages.
- Calling external services.
- Enforcing policy outside the report.

## Acceptance Criteria

- Safe local work is classified as allowed by default.
- Message sends, GitHub writes, and network calls can require approval.
- Destructive shell commands can be forbidden.
- Tests cover safe, approval-needed, and forbidden examples.
