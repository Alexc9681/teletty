# Telegram Terminal Mini App

Full web terminal accessible from Telegram as a Mini App. Get shell access to your server directly from your phone — with smart buttons, voice input, multi-tab, and Claude Code integration.

## Features

- **Full terminal** — xterm.js + WebSocket + tmux (sessions survive disconnects)
- **Telegram auth** — HMAC-SHA256 verification of Telegram initData (impossible to forge)
- **User whitelist** — only specified Telegram user IDs can access
- **Multi-tab** — up to 4 concurrent terminal sessions
- **Smart buttons** — auto-detects interactive prompts (Y/n, numbered options, Allow/Deny) and shows clickable buttons
- **Claude Code support** — recognizes Claude Code permission prompts and renders approve/deny buttons
- **Auto-approve mode** — automatically accepts Claude Code prompts (with safety checks for dangerous commands)
- **Voice input** — Web Speech API (browser-native) with optional Azure OpenAI Whisper server-side fallback
- **Management API** — execute commands via HTTPS when SSH is down
- **Idle timeout** — sessions killed after 30 min inactivity (configurable)
- **Audit logging** — all terminal output logged via tmux pipe-pane
- **IP binding** — session tokens bound to client IP
- **Mobile-optimized** — control buttons for arrow keys, Tab, Esc, Ctrl+C
- **Tokyo Night theme** — dark theme, easy on the eyes

## Quick Start

### 1. Clone and configure

```bash
git clone https://github.com/olegchetrean/mini-terminal.git
cd mini-terminal
cp .env.example .env
nano .env  # Set BOT_TOKEN, ALLOWED_USER_IDS, SESSION_SECRET
```

### 2. Generate keys (optional, for /terminal bot command)

```bash
mkdir -p keys
openssl genrsa -out keys/private.pem 2048
openssl rsa -in keys/private.pem -pubout -out keys/public.pem
```

### 3. Install

```bash
npm install
sudo apt install tmux  # if not installed
```

### 4. Run

```bash
node server.js
# or with PM2:
pm2 start server.js --name terminal-server
```

### 5. HTTPS (required for Telegram Mini Apps)

Copy `nginx.conf.template` to `/etc/nginx/sites-enabled/terminal.conf`, edit `server_name`, then:

```bash
sudo nginx -t && sudo nginx -s reload
sudo certbot --nginx -d terminal.yourdomain.com
```

### 6. DNS

Add an A record: `terminal.yourdomain.com` → your server IP

### 7. BotFather

1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. `/mybots` → select your bot → Bot Settings → Menu Button
3. Set URL: `https://terminal.yourdomain.com/`
4. Set text: `Terminal`

### 8. Find your Telegram user ID

Send any message to your bot and check the logs:

```bash
pm2 logs terminal-server
```

Look for `[ws] Connected: user=XXXXXXX` — that's your Telegram ID. Add it to `ALLOWED_USER_IDS` in `.env`.

## Architecture

```
Telegram (tap Menu Button → Terminal)
    → https://terminal.yourdomain.com/  (Telegram WebView)
    → POST /auth (initData HMAC verification + whitelist)
    → WebSocket wss://terminal.yourdomain.com/ws
    → node-pty → tmux (persistent shell)
    → xterm.js renders output
    → output-parser detects prompts → smart buttons appear
```

## Files

| File | Purpose |
|------|---------|
| `server.js` | Express + WebSocket server, auth endpoint, voice transcription, management API |
| `auth.js` | Telegram initData HMAC-SHA256 verification, JWT sessions (4h), user whitelist |
| `terminal-manager.js` | tmux session management, idle timeout, audit logging, resize |
| `output-parser.js` | Detects Y/n, numbered options, Allow/Deny prompts from terminal output |
| `public/index.html` | UI: tab bar, terminal, smart buttons, control bar, status bar |
| `public/app.js` | Frontend: xterm.js, WebSocket, tabs, auto-approve, voice input |
| `public/vendor/` | xterm.js 5.5.0 + FitAddon + WebGL addon (vendored, no CDN needed) |
| `nginx.conf.template` | Nginx reverse proxy config with WebSocket support |
| `.env.example` | All configuration options documented |

## Configuration

All configuration is via `.env` file. See [.env.example](.env.example) for all options.

### Required

| Variable | Description |
|----------|-------------|
| `BOT_TOKEN` | Telegram bot token from @BotFather |
| `ALLOWED_USER_IDS` | Comma-separated Telegram user IDs |
| `SESSION_SECRET` | Random string for JWT signing |

### Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 7681 | Server port |
| `ALLOWED_ORIGINS` | (all) | Comma-separated HTTPS origins for WebSocket |
| `MAX_SESSIONS` | 4 | Max terminal tabs per user |
| `IDLE_TIMEOUT_MINUTES` | 30 | Kill idle sessions after N minutes |
| `SHELL_COMMAND` | tmux | Shell to spawn |
| `SHELL_CWD` | /root | Working directory |
| `MGMT_TOKEN` | (disabled) | Token for POST /api/exec management API |
| `AZURE_OPENAI_ENDPOINT` | (disabled) | Azure endpoint for server-side voice transcription |
| `AZURE_OPENAI_API_KEY` | (disabled) | Azure API key for Whisper |
| `VOICE_LANGUAGE` | en | Default voice recognition language |

## Security

- **Authentication**: Telegram initData HMAC-SHA256 — cryptographically verified by Telegram
- **Whitelist**: Only specified Telegram user IDs can access
- **Session JWT**: 4h expiry, bound to client IP
- **Origin check**: WebSocket accepts only configured domains
- **Idle kill**: Inactive sessions terminated automatically
- **Max sessions**: Limit concurrent terminals per user
- **Audit log**: All terminal I/O logged via tmux pipe-pane
- **Management API**: Disabled by default, requires token when enabled

## Smart Buttons

The output parser detects interactive prompts and shows clickable buttons:

| Prompt Type | Example | Buttons |
|------------|---------|---------|
| Y/n confirmation | `Continue? [Y/n]` | Yes / No |
| Numbered options | `1) Option A  2) Option B` | 1: Option A / 2: Option B |
| Allow/Deny | `Allow this action? Allow / Deny` | Allow / Deny |
| Claude Code | `Do you want to proceed?` | Yes / No |
| Press Enter | `Press Enter to continue` | Enter |

**Safety**: Buttons for dangerous commands (rm -rf, DROP, DELETE, shutdown) are highlighted in red.

## Auto-Approve Mode

Click the lightning bolt button to enable auto-approve:
1. First click: "Confirm?" (yellow)
2. Second click: Active (red, pulsing)
3. Auto-accepts all Y/n and Allow prompts
4. **Safety**: Does NOT auto-approve dangerous commands
5. Auto-disables after 10 minutes

## Voice Input

Two modes:
1. **Browser Speech API** (default): Uses Chrome/Safari built-in speech recognition. No server config needed.
2. **Azure Whisper** (optional): Server-side transcription via Azure OpenAI Whisper Large v3. Set `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_API_KEY` in `.env`.

The client tries browser speech first. If unavailable (Firefox, some mobile browsers), falls back to server-side Whisper.

## Use Cases

- **Server management from phone** — restart services, check logs, deploy
- **Claude Code on the go** — run Claude Code CLI with smart approve buttons
- **OpenClaw agents** — manage your OpenClaw bot directly from Telegram
- **Emergency access** — when SSH is down, use the management API via HTTPS
- **Teaching/demos** — show terminal to students via Telegram screen share

## Customization

### Change theme
Edit `public/index.html` CSS variables. Default is Tokyo Night dark.

### Add control buttons
In `public/index.html`, add to `.control-bar`:
```html
<button class="ctrl-btn" id="btnCustom">Cmd</button>
```
In `public/app.js`, add event listener:
```javascript
document.getElementById('btnCustom').addEventListener('click', () => send('your command\n'));
```

### Change shell
Set in `.env`:
```env
SHELL_COMMAND=bash
SHELL_ARGS=--login
```

### Multiple users
```env
ALLOWED_USER_IDS=621545666,123456789,987654321
```

## Requirements

- Node.js >= 18
- tmux (for persistent sessions)
- Nginx + SSL certificate (Telegram requires HTTPS)
- A Telegram bot (create via @BotFather)

## License

MIT
