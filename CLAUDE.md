# teletty

Telegram Mini App — full terminal on your phone with smart buttons, Claude Code integration, voice input.

## Commands
- Start: `node server.js`
- Dev: `npm run dev` (--watch)
- Test: `npm test`
- CLI: `npx teletty` or `node bin/teletty.js`

## Architecture
- `server.js` — Express + WebSocket, auth, voice, management API
- `auth.js` — Telegram HMAC-SHA256, JWT (4h, IP-bound), whitelist
- `terminal-manager.js` — node-pty + tmux sessions, idle timeout
- `output-parser.js` — detects 7 prompt types, generates smart buttons
- `public/app.js` — xterm.js frontend, tabs, auto-approve, voice
- `public/index.html` — UI, Tokyo Night theme, CSP header

## Key rules
- NEVER hardcode secrets — all config via `.env` (see @.env.example)
- Auth uses `crypto.timingSafeEqual` — keep it that way
- PTY env is sanitized (only PATH, HOME, USER, SHELL, LANG, TERM) — don't leak secrets
- `userId` must be numeric (validated in terminal-manager.js) — prevents command injection
- initData has 5-minute freshness check — anti-replay protection

## Deployment
- See @docs/AGENT-INSTALL-PROMPT.md for one-prompt server deployment
- Docker: `docker compose up -d` (see @Dockerfile and @docker-compose.yml)
- Requires: Node.js >= 18, tmux, HTTPS (Telegram requirement)

## Testing
- 26 tests: `npm test` (Node built-in test runner)
- Tests cover: output-parser (prompt detection, ANSI, dangerous patterns) + auth (HMAC, JWT, whitelist)
