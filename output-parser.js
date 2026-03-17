/**
 * Smart output parser for terminal prompts.
 * Detects interactive prompts (Y/n, numbered options, Allow/Deny)
 * and returns structured data for the frontend to render clickable buttons.
 *
 * Includes special support for Claude Code CLI prompts.
 */

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').replace(/\x1b\][^\x07]*\x07/g, '');
}

const DANGEROUS_PATTERNS = [
  /rm\s+-rf/i, /\bDROP\b/i, /\bDELETE\b/i, /\bshutdown\b/i,
  /\breboot\b/i, /\bmkfs\b/i, /\bTRUNCATE\b/i,
];

function parseOutput(rawOutput) {
  const clean = stripAnsi(rawOutput);
  const lines = clean.split('\n').filter(l => l.trim());
  if (lines.length === 0) return null;
  const tail = lines.slice(-10).join('\n');

  // Numbered options: 1) Option A  2) Option B
  const numberedOptions = [];
  const numRegex = /^\s*(\d+)\)\s+(.+)$/gm;
  let match;
  while ((match = numRegex.exec(tail)) !== null) {
    numberedOptions.push({ key: match[1], label: match[2].trim() });
  }
  if (numberedOptions.length >= 2) {
    return { type: 'options', items: numberedOptions, dangerous: false };
  }

  // Letter options: a) Option A  b) Option B
  const letterOptions = [];
  const letterRegex = /^\s*([a-z])\)\s+(.+)$/gm;
  while ((match = letterRegex.exec(tail)) !== null) {
    letterOptions.push({ key: match[1], label: match[2].trim() });
  }
  if (letterOptions.length >= 2) {
    return { type: 'options', items: letterOptions, dangerous: false };
  }

  const lastLine = lines[lines.length - 1];

  // Y/n or yes/no confirmation
  if (/\[Y\/n\]/i.test(lastLine) || /\(yes\/no\)/i.test(lastLine) || /\[y\/N\]/i.test(lastLine)) {
    const isDangerous = DANGEROUS_PATTERNS.some(p => p.test(tail));
    return { type: 'confirm', items: [{ key: 'Y', label: 'Yes' }, { key: 'n', label: 'No' }], dangerous: isDangerous };
  }

  // Allow/Deny (Claude Code permission prompts)
  if (/\bAllow\b/.test(lastLine) && /\bDeny\b/.test(lastLine)) {
    const isDangerous = DANGEROUS_PATTERNS.some(p => p.test(tail));
    return { type: 'permission', items: [{ key: 'Allow', label: 'Allow' }, { key: 'Deny', label: 'Deny' }], dangerous: isDangerous };
  }

  // Claude Code: "Do you want to proceed?"
  if (/Do you want to proceed/i.test(tail) || /proceed\?/i.test(lastLine)) {
    const isDangerous = DANGEROUS_PATTERNS.some(p => p.test(tail));
    return { type: 'confirm', items: [{ key: '1', label: 'Yes' }, { key: '2', label: 'No' }], dangerous: isDangerous };
  }

  // Claude Code: tool permission prompts (Bash, Read, Edit, Write)
  if (/Bash command|Read tool|Edit tool|Write tool|Bash tool/i.test(tail) && /proceed|allow|approve/i.test(tail)) {
    const isDangerous = DANGEROUS_PATTERNS.some(p => p.test(tail));
    return { type: 'permission', items: [
      { key: '1', label: 'Yes' },
      { key: '2', label: 'No' },
    ], dangerous: isDangerous };
  }

  // "Press Enter to continue"
  if (/press enter/i.test(lastLine) || /continue\?/i.test(lastLine)) {
    return { type: 'confirm', items: [{ key: '\n', label: 'Enter' }], dangerous: false };
  }

  // Generic: "do you want to" / "would you like to"
  if (/do you want to/i.test(lastLine) || /would you like to/i.test(lastLine)) {
    const isDangerous = DANGEROUS_PATTERNS.some(p => p.test(tail));
    return { type: 'confirm', items: [{ key: 'y', label: 'Yes' }, { key: 'n', label: 'No' }], dangerous: isDangerous };
  }

  return null;
}

module.exports = { parseOutput, stripAnsi, DANGEROUS_PATTERNS };
