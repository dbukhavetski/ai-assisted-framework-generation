const fs = require('fs');
const path = require('path');

const reportDir = path.join(process.cwd(), 'playwright-report');
const historyOutputPath = path.join(reportDir, 'history.json');
const historyCandidates = [
  path.join(process.cwd(), 'pages-history', 'history.json'),
  path.join(process.cwd(), 'pages-history', 'playwright-report', 'history.json'),
];

const reportSummaryCandidates = [
  path.join(reportDir, 'data', 'testResult.json'),
  path.join(reportDir, 'data', 'test-result.json'),
  path.join(reportDir, 'data', 'report.json'),
  path.join(reportDir, 'report.json'),
];

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function findStats(value, depth = 0) {
  if (!value || depth > 6) {
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const stats = findStats(item, depth + 1);
      if (stats) {
        return stats;
      }
    }
    return null;
  }

  if (typeof value !== 'object') {
    return null;
  }

  const keys = Object.keys(value);
  const hasInterestingKeys = ['passed', 'failed', 'skipped', 'flaky', 'expected', 'unexpected'].some((key) => keys.includes(key));
  if (hasInterestingKeys) {
    return value;
  }

  for (const nestedValue of Object.values(value)) {
    const stats = findStats(nestedValue, depth + 1);
    if (stats) {
      return stats;
    }
  }

  return null;
}

let history = [];
for (const candidate of historyCandidates) {
  const parsed = readJsonIfExists(candidate);
  if (Array.isArray(parsed)) {
    history = parsed;
    break;
  }
}

let counts = null;
for (const candidate of reportSummaryCandidates) {
  const parsed = readJsonIfExists(candidate);
  const stats = findStats(parsed);
  if (stats) {
    counts = {
      passed: stats.passed ?? stats.expected ?? null,
      failed: stats.failed ?? stats.unexpected ?? null,
      skipped: stats.skipped ?? null,
      flaky: stats.flaky ?? null,
    };
    break;
  }
}

const entry = {
  timestamp: new Date().toISOString(),
  runUrl: process.env.RUN_URL,
  commitSha: process.env.GITHUB_SHA,
  ref: process.env.GITHUB_REF,
  branch: process.env.GITHUB_REF_NAME,
  jobConclusion: process.env.JOB_CONCLUSION,
  testOutcome: process.env.TEST_STEP_OUTCOME,
};

if (counts && Object.values(counts).some((value) => value !== null)) {
  entry.counts = counts;
}

history.push(entry);
fs.writeFileSync(historyOutputPath, JSON.stringify(history, null, 2) + '\n');