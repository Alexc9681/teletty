# Teletty — Rebrand, Polish & Launch Preparation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform "telegram-terminal-miniapp" into "teletty" — a polished, launch-ready open-source product with security fixes, Docker support, tests, npm package, and a landing page.

**Architecture:** The project stays vanilla JS (no build step, no transpilation). We add: security hardening on existing endpoints, Dockerfile for easy deployment, unit tests via Node's built-in test runner (zero new deps), a static landing page in `docs/landing/`, and full rebranding across all files.

**Tech Stack:** Node.js 18+, Express, ws, node-pty, xterm.js 5.5.0, tmux, Docker, Node test runner

---

## File Structure

### Files to MODIFY (rebranding + fixes)
- `package.json` — name, description, repository, homepage, bin
- `server.js` — auth on voice endpoint, rate limiting, console branding
- `auth.js` — no changes needed (clean)
- `terminal-manager.js` — no changes needed (clean)
- `output-parser.js` — export for testing
- `public/index.html` — title, branding, i18n (en), CSP meta tag
- `public/app.js` — voice language from config, XSS fix, error logging
- `.env.example` — add VOICE_LANGUAGE note for frontend, rate limit config
- `nginx.conf.template` — generic domain placeholder
- `README.md` — full rewrite for teletty branding
- `LICENSE` — keep MIT, update copyright holder
- `.gitignore` — add docs/landing/node_modules if applicable

### Files to CREATE
- `Dockerfile` — multi-stage, production-ready
- `docker-compose.yml` — one-command deployment
- `.dockerignore` — exclude dev files
- `test/output-parser.test.js` — unit tests for the smart parser
- `test/auth.test.js` — unit tests for auth module
- `docs/landing/index.html` — static landing page (single file, no build)
- `bin/teletty.js` — CLI entry point for npx teletty (optional, nice-to-have)
- `CONTRIBUTING.md` — contributor guide
- `.github/FUNDING.yml` — sponsorship links (optional)

---

## Task 1: Rebranding — package.json + core files

**Files:**
- Modify: `package.json`
- Modify: `server.js:210-217`
- Modify: `LICENSE`
- Modify: `.env.example`
- Modify: `nginx.conf.template`

- [ ] **Step 1: Update package.json**

```json
{
  "name": "teletty",
  "version": "1.0.0",
  "description": "A full terminal in your pocket, via Telegram. Smart buttons, Claude Code integration, voice input, multi-tab.",
  "main": "server.js",
  "bin": {
    "teletty": "./bin/teletty.js"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "node --test test/"
  },
  "keywords": [
    "telegram", "mini-app", "terminal", "web-terminal", "xterm",
    "claude-code", "remote-shell", "tmux", "ssh", "teletty",
    "smart-buttons", "voice-terminal", "mobile-terminal"
  ],
  "author": "Oleg Chetrean",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/olegchetrean/teletty"
  },
  "homepage": "https://teletty.dev",
  "engines": { "node": ">=18.0.0" },
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "form-data": "^4.0.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "node-pty": "^1.0.0",
    "ws": "^8.18.0"
  }
}
```

- [ ] **Step 2: Update server.js startup banner**

Replace lines 210-217 with:
```javascript
server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  ⚡ teletty v1.0.0`);
  console.log(`  → http://127.0.0.1:${PORT}`);
  console.log(`  → ${ALLOWED_ORIGINS.length > 0 ? `Origins: ${ALLOWED_ORIGINS.join(', ')}` : 'WARNING: No ALLOWED_ORIGINS set'}\n`);
});
```

- [ ] **Step 3: Update LICENSE copyright**

```
MIT License

Copyright (c) 2026 Oleg Chetrean

Permission is hereby granted...
```

- [ ] **Step 4: Update nginx.conf.template**

Replace `server_name terminal.aichat.md;` with `server_name terminal.yourdomain.com;`

- [ ] **Step 5: Commit**

```bash
git add package.json server.js LICENSE nginx.conf.template
git commit -m "rebrand: rename to teletty, update metadata and startup banner"
```

---

## Task 2: Security Fixes

**Files:**
- Modify: `server.js:88-128` (voice auth)
- Modify: `server.js:58-78` (rate limiting)
- Modify: `public/app.js:49-51` (XSS fix)
- Modify: `public/app.js:245` (voice language)
- Modify: `.env.example`

- [ ] **Step 1: Add auth check to /voice/transcribe**

In `server.js`, inside the voice endpoint (line 89), add session token verification:

```javascript
if (AZURE_OPENAI_ENDPOINT && AZURE_OPENAI_KEY) {
  app.post('/voice/transcribe', upload.single('audio'), async (req, res) => {
    // Verify session token
    const sessionToken = req.headers['x-session-token'];
    const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
    if (!sessionToken || !auth.verifySessionToken(sessionToken, clientIp)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!req.file) return res.status(400).json({ error: 'No audio file' });
    // ... rest stays the same
```

- [ ] **Step 2: Add session token to voice fetch in app.js**

In `public/app.js`, update `sendToWhisper` function to include session token:

```javascript
const resp = await fetch('/voice/transcribe', {
  method: 'POST',
  headers: { 'X-Session-Token': state.sessionToken },
  body: formData,
});
```

- [ ] **Step 3: Add simple rate limiting to /auth**

In `server.js`, add before the /auth endpoint:

```javascript
// Simple rate limiter for /auth (max 10 attempts per minute per IP)
const authAttempts = new Map();
setInterval(() => authAttempts.clear(), 60000);

function rateLimitAuth(req, res, next) {
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
  const count = (authAttempts.get(ip) || 0) + 1;
  authAttempts.set(ip, count);
  if (count > 10) return res.status(429).json({ error: 'Too many attempts' });
  next();
}
```

Then add `rateLimitAuth` middleware to the /auth route:
```javascript
app.post('/auth', rateLimitAuth, (req, res) => {
```

- [ ] **Step 4: Fix XSS in showAuthError**

In `public/app.js`, change innerHTML to textContent:
```javascript
function showAuthError(msg) {
  const el = document.getElementById('authOverlay');
  el.textContent = '';
  const div = document.createElement('div');
  div.className = 'auth-error';
  div.textContent = msg;
  el.appendChild(div);
}
```

- [ ] **Step 5: Make voice language configurable from server**

In `public/app.js`, change hardcoded `'ro-RO'` to a data attribute approach.

In `public/index.html`, add to body tag:
```html
<body data-voice-lang="en">
```

In `server.js`, serve the voice language via a config endpoint:
```javascript
app.get('/config', (req, res) => {
  res.json({ voiceLanguage: VOICE_LANGUAGE });
});
```

In `public/app.js`, in `setupVoice`, fetch config:
```javascript
recognition.lang = document.body.dataset.voiceLang || 'en';
```

Actually simpler: inject the language in the HTML served by Express. But since we serve static files, best approach is the /config endpoint. Update init() to fetch /config first.

- [ ] **Step 6: Commit**

```bash
git add server.js public/app.js
git commit -m "security: add auth to voice endpoint, rate limit /auth, fix XSS"
```

---

## Task 3: Unit Tests

**Files:**
- Create: `test/output-parser.test.js`
- Create: `test/auth.test.js`

- [ ] **Step 1: Write output-parser tests**

```javascript
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
    const result = parseOutput('Do you want to continue?');
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
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
node --test test/output-parser.test.js
```
Expected: All tests PASS

- [ ] **Step 3: Write auth tests**

```javascript
const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const crypto = require('crypto');

// We need to test auth with controlled env vars
// Set env before requiring auth
process.env.BOT_TOKEN = 'test_bot_token_123';
process.env.SESSION_SECRET = 'test_secret_for_jwt_signing_32chars';
process.env.ALLOWED_USER_IDS = '12345,67890';

const auth = require('../auth');

describe('isAllowed', () => {
  it('allows whitelisted user', () => {
    assert.strictEqual(auth.isAllowed('12345'), true);
  });
  it('rejects non-whitelisted user', () => {
    assert.strictEqual(auth.isAllowed('99999'), false);
  });
  it('handles string coercion', () => {
    assert.strictEqual(auth.isAllowed(12345), false); // number vs string
  });
});

describe('createSessionToken + verifySessionToken', () => {
  it('creates and verifies a valid token', () => {
    const token = auth.createSessionToken('12345', '192.168.1.1');
    const payload = auth.verifySessionToken(token, '192.168.1.1');
    assert.ok(payload);
    assert.strictEqual(payload.telegramId, '12345');
  });

  it('rejects token with wrong IP', () => {
    const token = auth.createSessionToken('12345', '192.168.1.1');
    const payload = auth.verifySessionToken(token, '10.0.0.1');
    assert.strictEqual(payload, null);
  });

  it('rejects token for non-whitelisted user', () => {
    const token = auth.createSessionToken('99999', '192.168.1.1');
    const payload = auth.verifySessionToken(token, '192.168.1.1');
    assert.strictEqual(payload, null);
  });

  it('rejects garbage token', () => {
    const payload = auth.verifySessionToken('invalid.token.here', '192.168.1.1');
    assert.strictEqual(payload, null);
  });
});

describe('verifyTelegramInitData', () => {
  it('verifies valid initData', () => {
    // Build valid initData with HMAC
    const user = JSON.stringify({ id: 12345, first_name: 'Test' });
    const authDate = Math.floor(Date.now() / 1000);
    const params = new URLSearchParams();
    params.set('user', user);
    params.set('auth_date', String(authDate));

    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');

    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update('test_bot_token_123').digest();
    const hash = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString).digest('hex');

    params.set('hash', hash);

    const result = auth.verifyTelegramInitData(params.toString());
    assert.ok(result);
    assert.strictEqual(result.telegramId, '12345');
  });

  it('rejects invalid hash', () => {
    const params = new URLSearchParams();
    params.set('user', JSON.stringify({ id: 12345 }));
    params.set('auth_date', '1234567890');
    params.set('hash', 'invalid_hash');
    assert.strictEqual(auth.verifyTelegramInitData(params.toString()), null);
  });

  it('rejects empty input', () => {
    assert.strictEqual(auth.verifyTelegramInitData(''), null);
    assert.strictEqual(auth.verifyTelegramInitData(null), null);
  });
});
```

- [ ] **Step 4: Run all tests**

```bash
node --test test/
```
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add test/
git commit -m "test: add unit tests for output-parser and auth modules"
```

---

## Task 4: Docker Support

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `.dockerignore`

- [ ] **Step 1: Create .dockerignore**

```
node_modules/
.env
.env.local
keys/
*.log
.git/
.DS_Store
docs/
test/
```

- [ ] **Step 2: Create Dockerfile**

```dockerfile
FROM node:20-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends tmux python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /var/log/terminal-sessions

EXPOSE 7681

USER node

CMD ["node", "server.js"]
```

Note: node-pty requires python3/make/g++ to compile native bindings.
We keep USER node for security but the terminal sessions run as whatever tmux spawns.
Actually, node-pty needs to run as a user that can spawn tmux, so we may need to run as root or configure properly. Let's use root for now since this is a terminal server by nature.

Updated:
```dockerfile
FROM node:20-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends tmux python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /var/log/terminal-sessions

EXPOSE 7681

CMD ["node", "server.js"]
```

- [ ] **Step 3: Create docker-compose.yml**

```yaml
services:
  teletty:
    build: .
    container_name: teletty
    restart: unless-stopped
    ports:
      - "7681:7681"
    env_file:
      - .env
    volumes:
      - terminal-logs:/var/log/terminal-sessions
    environment:
      - NODE_ENV=production

volumes:
  terminal-logs:
```

- [ ] **Step 4: Verify Docker build works**

```bash
docker build -t teletty .
```
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "docker: add Dockerfile and docker-compose for easy deployment"
```

---

## Task 5: CLI Entry Point (npx teletty)

**Files:**
- Create: `bin/teletty.js`

- [ ] **Step 1: Create bin/teletty.js**

```javascript
#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
  teletty - A full terminal in your pocket, via Telegram

  Usage:
    teletty              Start the server
    teletty init         Create .env from template
    teletty --help       Show this help

  Environment:
    BOT_TOKEN            Telegram bot token (required)
    ALLOWED_USER_IDS     Comma-separated Telegram user IDs (required)
    SESSION_SECRET       JWT signing secret (required)
    PORT                 Server port (default: 7681)

  Docs: https://github.com/olegchetrean/teletty
`);
  process.exit(0);
}

if (args[0] === 'init') {
  const src = path.join(__dirname, '..', '.env.example');
  const dest = path.join(process.cwd(), '.env');
  if (fs.existsSync(dest)) {
    console.log('  .env already exists. Skipping.');
  } else {
    fs.copyFileSync(src, dest);
    console.log('  Created .env from template. Edit it with your config.');
  }
  process.exit(0);
}

// Default: start server
require('../server.js');
```

- [ ] **Step 2: Make executable**

```bash
chmod +x bin/teletty.js
```

- [ ] **Step 3: Commit**

```bash
git add bin/
git commit -m "feat: add CLI entry point for npx teletty"
```

---

## Task 6: README Rewrite

**Files:**
- Modify: `README.md` (full rewrite)

- [ ] **Step 1: Write new README**

The README should have:
- Hero one-liner + badges (npm version, license, node version)
- Screenshot/GIF placeholder
- Feature list with icons (using unicode, not emoji)
- Quick Start (3 methods: npx, docker, manual)
- Architecture diagram (ASCII)
- Configuration table
- Smart Buttons explanation
- Security section
- Contributing link
- License

Key changes from current:
- Remove all "aichat.md" / "MEGA PROMOTING" / "OpenClaw" references
- Use English throughout
- Add badges
- Add Docker quick start
- Cleaner formatting

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for teletty launch"
```

---

## Task 7: Landing Page

**Files:**
- Create: `docs/landing/index.html`

- [ ] **Step 1: Create single-file landing page**

Requirements:
- Dark theme matching Tokyo Night
- Hero: headline + subheadline + 2 CTAs (Open in Telegram, View on GitHub)
- Feature cards (6 features): Smart Buttons, Claude Code, Multi-Tab, Voice, Tmux Persistence, Mobile Controls
- "How it Works" 3-step section
- Quick Start code block with copy button
- Comparison section (vs SSH apps, vs web terminals)
- Footer with links

Design:
- Single HTML file, no external dependencies (inline CSS)
- Mobile-first responsive
- Font: system font stack + monospace for code
- Colors: Tokyo Night palette (#1a1b26 bg, #c0caf5 text, #7aa2f7 accent, #9ece6a green, #f7768e red)
- Max-width: 900px centered

This is the biggest creative task. The page must look professional and distinctive.

- [ ] **Step 2: Commit**

```bash
git add docs/landing/
git commit -m "feat: add landing page for teletty.dev"
```

---

## Task 8: Contributing Guide + Misc

**Files:**
- Create: `CONTRIBUTING.md`
- Modify: `.gitignore`

- [ ] **Step 1: Create CONTRIBUTING.md**

```markdown
# Contributing to teletty

Thanks for your interest in contributing!

## Development Setup

1. Fork and clone the repo
2. `cp .env.example .env` and configure
3. `npm install`
4. `npm run dev` (starts with --watch)

## Running Tests

```bash
npm test
```

## Project Structure

| File | Purpose |
|------|---------|
| `server.js` | Express + WebSocket server |
| `auth.js` | Telegram auth + JWT sessions |
| `terminal-manager.js` | tmux session management |
| `output-parser.js` | Smart prompt detection |
| `public/` | Frontend (vanilla JS, no build step) |

## Guidelines

- Keep it simple — no build tools, no frameworks, no transpilation
- Test your changes: `npm test`
- One feature per PR
- Write clear commit messages

## Adding Smart Button Patterns

To add a new prompt pattern, edit `output-parser.js`:
1. Add your regex pattern in the `parseOutput` function
2. Return `{ type, items, dangerous }` matching existing format
3. Add tests in `test/output-parser.test.js`
```

- [ ] **Step 2: Update .gitignore**

Add:
```
docs/landing/node_modules/
dist/
```

- [ ] **Step 3: Commit**

```bash
git add CONTRIBUTING.md .gitignore
git commit -m "docs: add contributing guide"
```

---

## Task 9: Final Polish — index.html i18n + title

**Files:**
- Modify: `public/index.html:3` (title)
- Modify: `public/app.js:296-297` (status text in English)
- Modify: `public/app.js:23` (auth error in English)
- Modify: `public/app.js:122` (reconnect text in English)

- [ ] **Step 1: Update title**

```html
<title>teletty</title>
```

- [ ] **Step 2: Change all Romanian text to English**

In `app.js`:
- `'Acces interzis. Deschide din Telegram.'` → `'Access denied. Open from Telegram.'`
- `'Eroare autentificare'` → `'Authentication error'`
- `'Eroare conexiune server'` → `'Server connection error'`
- `'Conectat'` → `'Connected'`
- `'Deconectat...'` → `'Disconnected...'`
- `'Reconectare esuata. Apasa pe terminal pentru retry.'` → `'Reconnect failed. Tap terminal to retry.'`

- [ ] **Step 3: Commit**

```bash
git add public/index.html public/app.js
git commit -m "i18n: switch all UI text to English for international audience"
```

---

## Execution Order

Tasks 1-2 are sequential (rebranding first, then security fixes on renamed code).
Tasks 3-5 are independent and can run in parallel.
Task 6 (README) depends on Tasks 1-5 being done (references Docker, tests, etc.).
Task 7 (Landing) is independent, can run in parallel with everything.
Task 8-9 are small, run last.

```
Task 1 (rebrand) → Task 2 (security) → ┐
                                         ├→ Task 6 (README) → Task 8 (contrib) → Task 9 (polish)
Task 3 (tests)  ─────────────────────── ┤
Task 4 (docker) ─────────────────────── ┤
Task 5 (CLI)    ─────────────────────── ┘
Task 7 (landing) ── independent, parallel ──
```
