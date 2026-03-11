#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import {execFileSync} from "node:child_process";

const ROOT = process.cwd();
const IGNORE_FILES = new Set([
  ".env.example",
  "AUDIT_REPORT.md",
  "SECURITY_AUDIT_REPORT.md",
  "package-lock.json",
  "functions/package-lock.json",
  "bun.lockb",
]);

const PATTERNS = [
  {name: "Google API key", severity: "high", regex: /\bAIza[0-9A-Za-z\-_]{20,}\b/g},
  {name: "OpenAI-style secret", severity: "high", regex: /\bsk-[A-Za-z0-9]{20,}\b/g},
  {name: "Private key block", severity: "critical", regex: /-----BEGIN [A-Z ]+PRIVATE KEY-----/g},
  {name: "Supabase JWT/service token", severity: "high", regex: /\beyJ[A-Za-z0-9_\-=]+?\.[A-Za-z0-9_\-=]+\.?[A-Za-z0-9_\-=]*\b/g},
  {name: "AWS access key", severity: "high", regex: /\bAKIA[0-9A-Z]{16}\b/g},
  {name: "GitHub token", severity: "high", regex: /\bghp_[A-Za-z0-9]{20,}\b/g},
  {name: "SendGrid token", severity: "high", regex: /\bSG\.[A-Za-z0-9_\-.]{20,}\b/g},
];

function listCandidateFiles() {
  const output = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    {cwd: ROOT, encoding: "utf8"},
  );

  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((relPath) => !IGNORE_FILES.has(relPath) && !IGNORE_FILES.has(path.basename(relPath)))
    .filter((relPath) => !relPath.startsWith("node_modules/"))
    .filter((relPath) => !relPath.startsWith(".git/"))
    .filter((relPath) => !relPath.startsWith(".firebase/"))
    .filter((relPath) => !relPath.startsWith("dist/"))
    .filter((relPath) => !relPath.startsWith("dist-ssr/"))
    .filter((relPath) => !relPath.startsWith("functions/lib/"));
}

function isBinary(buffer) {
  return buffer.includes(0);
}

const files = listCandidateFiles();
const findings = [];

for (const relPath of files) {
  const fullPath = path.join(ROOT, relPath);
  let raw;
  try {
    raw = await fs.readFile(fullPath);
  } catch (error) {
    if (error && error.code === "ENOENT") continue;
    throw error;
  }
  if (isBinary(raw)) continue;

  const text = raw.toString("utf8");
  const lines = text.split("\n");

  for (const pattern of PATTERNS) {
    for (const match of text.matchAll(pattern.regex)) {
      const offset = match.index ?? 0;
      const line = text.slice(0, offset).split("\n").length;
      findings.push({
        file: relPath,
        line,
        type: pattern.name,
        severity: pattern.severity,
        preview: lines[line - 1].replace(/=.*/, "=***"),
      });
    }
  }
}

if (findings.length === 0) {
  console.log("No high-confidence secret patterns found.");
  process.exit(0);
}

console.log("Potential secrets detected:");
for (const finding of findings) {
  console.log(
    `${finding.severity.toUpperCase()} ${finding.type} ${finding.file}:${finding.line} ${finding.preview}`,
  );
}

process.exit(1);
