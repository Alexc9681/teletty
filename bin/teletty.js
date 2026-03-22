#!/usr/bin/env node

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

  Docs: https://github.com/teletty/teletty
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
