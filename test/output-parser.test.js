const { describe, it } = require('node:test');
const assert = require('node:assert');
const { parseOutput, stripAnsi, DANGEROUS_PATTERNS } = require('../output-parser');

describe('stripAnsi', () => {
  it('removes ANSI escape codes', () => {
    assert.strictEqual(stripAnsi('\x1b[31mred\x1b[0m'), 'red');
  });
  it('returns plain text unchanged', () => {
    assert.strictEqual(stripAnsi('hello'), 'hello');
  });
});

describe('parseOutput', () => {
  it('returns null for empty input', () => {
    assert.strictEqual(parseOutput(''), null);
  });

  it('detects Y/n confirmation', () => {
    const result = parseOutput('Continue? [Y/n]');
    assert.strictEqual(result.type, 'confirm');
    assert.strictEqual(result.items[0].key, 'Y');
    assert.strictEqual(result.items[1].key, 'n');
    assert.strictEqual(result.dangerous, false);
  });

  it('detects numbered options', () => {
    const result = parseOutput('1) Install\n2) Update\n3) Remove');
    assert.strictEqual(result.type, 'options');
    assert.strictEqual(result.items.length, 3);
    assert.strictEqual(result.items[0].label, 'Install');
  });

  it('detects letter options', () => {
    const result = parseOutput('a) Option A\nb) Option B');
    assert.strictEqual(result.type, 'options');
    assert.strictEqual(result.items.length, 2);
  });

  it('detects Allow/Deny', () => {
    const result = parseOutput('Allow Deny');
    assert.strictEqual(result.type, 'permission');
  });

  it('detects Claude Code proceed', () => {
    const result = parseOutput('Do you want to proceed?');
    assert.strictEqual(result.type, 'confirm');
    assert.strictEqual(result.items[0].key, '1');
  });

  it('detects Claude Code tool prompts', () => {
    const result = parseOutput('Bash command: ls -la\nproceed');
    assert.strictEqual(result.type, 'permission');
  });

  it('detects Press Enter', () => {
    const result = parseOutput('Press Enter to continue');
    assert.strictEqual(result.type, 'confirm');
    assert.strictEqual(result.items[0].key, '\n');
  });

  it('marks dangerous commands', () => {
    const result = parseOutput('rm -rf /\nContinue? [Y/n]');
    assert.strictEqual(result.dangerous, true);
  });

  it('does not mark safe commands as dangerous', () => {
    const result = parseOutput('npm install\nContinue? [Y/n]');
    assert.strictEqual(result.dangerous, false);
  });

  it('detects generic yes/no', () => {
    const result = parseOutput('Do you want to install this?');
    assert.strictEqual(result.type, 'confirm');
    assert.strictEqual(result.items[0].key, 'y');
  });
});

describe('DANGEROUS_PATTERNS', () => {
  it('matches rm -rf', () => {
    assert.ok(DANGEROUS_PATTERNS.some(p => p.test('rm -rf /')));
  });
  it('matches DROP', () => {
    assert.ok(DANGEROUS_PATTERNS.some(p => p.test('DROP TABLE users')));
  });
  it('does not match safe commands', () => {
    assert.ok(!DANGEROUS_PATTERNS.some(p => p.test('ls -la')));
  });
});
