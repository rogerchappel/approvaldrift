# Security Policy

## Supported Versions

`approvaldrift` is pre-1.0. Security fixes target the latest `main` branch until a tagged release line exists.

## Reporting a Vulnerability

Please report vulnerabilities through GitHub private vulnerability reporting when available, or by opening a minimal public issue that avoids secrets, credentials, private transcripts, and exploit details.

## Scope

The CLI reads local transcript and policy files, classifies detected action kinds, and prints a report. It should not execute commands, send messages, call APIs, publish packages, or mutate repositories. Treat any behavior outside that scope as security-sensitive.
