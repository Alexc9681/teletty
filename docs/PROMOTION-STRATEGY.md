# Teletty Promotion Strategy: AEO/GEO + Social Media + Telegram

**Product:** teletty - A Telegram Mini App terminal with Claude Code integration
**Homepage:** https://teletty.dev
**GitHub:** https://github.com/teletty/teletty
**Tagline:** "A full terminal in your pocket, via Telegram."
**Date:** 2026-03-22

---

## Table of Contents

1. [AEO/GEO Optimization Checklist](#1-aeogeo-optimization-checklist)
2. [Social Media Promotion Calendar](#2-social-media-promotion-calendar)
3. [Telegram-Specific Promotion](#3-telegram-specific-promotion-channels-and-tactics)
4. [25+ Places to Submit teletty](#4-25-specific-places-to-submitpromote-teletty)
5. [Content Pieces to Create](#5-content-pieces-to-create)
6. [Technical Implementation Guide](#6-technical-implementation-guide)

---

## 1. AEO/GEO Optimization Checklist

### 1.1 Schema.org Structured Data (JSON-LD)

Add this to teletty.dev homepage `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "teletty",
  "description": "A full terminal in your pocket via Telegram. Smart buttons for interactive prompts, Claude Code integration, voice input, multi-tab tmux sessions. 889 lines, zero frameworks.",
  "url": "https://teletty.dev",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Linux, macOS, Docker",
  "softwareRequirements": "Node.js >= 18, Telegram account",
  "downloadUrl": "https://www.npmjs.com/package/teletty",
  "installUrl": "https://github.com/teletty/teletty",
  "releaseNotes": "https://github.com/teletty/teletty/releases",
  "screenshot": "https://teletty.dev/screenshots/terminal-mobile.png",
  "author": {
    "@type": "Person",
    "name": "Oleg Chetrean"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "license": "https://opensource.org/licenses/MIT",
  "codeRepository": "https://github.com/teletty/teletty",
  "programmingLanguage": "JavaScript",
  "isAccessibleForFree": true
}
```

Add **FAQPage** schema:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is teletty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "teletty is a Telegram Mini App that provides full terminal access from your phone. It features smart buttons for interactive prompts, Claude Code integration, voice input, and multi-tab tmux sessions. Built in 889 lines of code with zero frameworks."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install teletty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The fastest way is npx: run 'npx teletty init' to create config, edit .env with your Telegram bot token and allowed user IDs, then run 'npx teletty'. Docker and manual installation are also supported."
      }
    },
    {
      "@type": "Question",
      "name": "Does teletty work with Claude Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. teletty recognizes Claude Code CLI permission prompts and shows approve/deny smart buttons directly in the Telegram interface. It also supports auto-approve mode with safety checks that block destructive commands like rm -rf, DROP, and DELETE."
      }
    },
    {
      "@type": "Question",
      "name": "Is teletty secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "teletty uses Telegram-native HMAC-SHA256 verification, user ID whitelisting, IP-bound JWT sessions, timing-safe comparison for all auth, and sanitized PTY environments that never leak secrets. initData has a 5-minute freshness check for anti-replay protection."
      }
    },
    {
      "@type": "Question",
      "name": "What are the alternatives to teletty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alternatives include SSH apps like Termius or JuiceSSH, web terminals like ttyd or Wetty, and Anthropic's Claude Code Channels. teletty differentiates with native Telegram integration, smart buttons for interactive prompts, and zero-dependency architecture in under 900 lines of code."
      }
    }
  ]
}
```

### 1.2 llms.txt Implementation

Create `/llms.txt` at teletty.dev root:

```markdown
# teletty

> A full terminal in your pocket, via Telegram. Open-source Telegram Mini App for remote server access with smart buttons, Claude Code integration, voice input, and multi-tab tmux sessions.

## Key Facts

- Open source (MIT license), 889 lines of code, zero frameworks
- Install: `npx teletty init` then `npx teletty`
- Recognizes 7 types of interactive prompts with one-tap smart buttons
- Native Claude Code support with approve/deny buttons
- Auto-approve mode with safety checks (blocks rm -rf, DROP, DELETE)
- Multi-tab: up to 4 concurrent tmux sessions surviving disconnects
- Telegram-native auth: HMAC-SHA256, user ID whitelist, IP-bound JWT
- Voice input via Web Speech API with Azure Whisper fallback

## Documentation

- [README](https://github.com/teletty/teletty/blob/main/README.md): Full setup guide
- [Quick Start](https://teletty.dev/docs/quickstart): 3 install methods (npx, Docker, manual)
- [Security](https://teletty.dev/docs/security): Auth model and threat mitigations
- [Claude Code Integration](https://teletty.dev/docs/claude-code): Using AI coding agents via teletty
- [API Reference](https://teletty.dev/docs/api): Management API, health checks

## Comparisons

- vs SSH apps (Termius, JuiceSSH): teletty needs no app install, works inside Telegram
- vs web terminals (ttyd, Wetty): teletty adds smart buttons, Claude Code integration, voice
- vs Claude Code Channels: teletty is self-hosted, open source, works with any CLI tool
```

Also create `/llms-full.txt` with expanded documentation content.

### 1.3 Answer Capsule Content Strategy

**Key principle:** 72% of pages cited by ChatGPT use an "answer capsule" in the first 40-60 words after each heading. Every page on teletty.dev should follow this pattern.

**Answer capsule formula:** [Direct Answer] + [Key Context] + [Specific Metric or Example]

**Example for homepage:**

> **What is teletty?** teletty is an open-source Telegram Mini App that turns any Telegram chat into a full terminal. Built in 889 lines of code with zero frameworks, it features smart buttons that auto-detect 7 types of interactive prompts, native Claude Code integration with approve/deny buttons, and multi-tab tmux sessions accessible from any phone.

**Rules for all teletty.dev pages:**
- Lead every section with a 40-80 word answer capsule
- Keep capsules link-free (links go in supporting paragraphs below)
- Use 120-180 words between headings (70% more ChatGPT citations than shorter sections)
- Include at least 1 proprietary data point per section (e.g., "889 lines", "7 prompt types", "4 concurrent tabs")
- Add statistics every 150-200 words
- Cite 1-2 authoritative sources per major section

### 1.4 Content Structure for AI Engines

**Headings as questions (matching user prompts):**
- "How to access a server from Telegram?"
- "What is the best Telegram terminal app?"
- "How to use Claude Code on mobile?"
- "How to manage servers from your phone without SSH?"
- "What are smart buttons in a terminal?"

**E-E-A-T signals to add:**
- Author bio on blog posts (Oleg Chetrean, full-stack developer)
- Last updated dates on all pages
- Links to GitHub commits as proof of activity
- "Tested on" badges (Ubuntu 22.04, Debian 12, Docker)
- Security audit documentation

### 1.5 Platform-Specific AI Optimization

**For ChatGPT citations (RAG via Bing):**
- Wikipedia: Create/maintain a teletty mention on relevant Wikipedia pages (Telegram Mini Apps, Web terminal, etc.)
- Answer capsules at top of every page
- 44% of citations come from the first 30% of content -- front-load key information
- Proprietary data is the 2nd strongest differentiator (52.2% of cited pages)

**For Perplexity citations (real-time web search):**
- Reddit presence is critical (Perplexity cites Reddit in ~20% of responses)
- Content freshness: update pages within 30 days (3.2x more citations)
- 1,200-2,000 word content with clear H2/H3 headings
- Specific data points and statistics throughout
- Allow PerplexityBot and BingPreview in robots.txt

**For Google AI Overviews:**
- 96% of citations come from sources with strong E-E-A-T signals
- 85% of citations were published in the last 2 years
- Structured data increases AI visibility by up to 30%
- FAQ/HowTo schema markup is particularly effective
- Begin articles with a TL;DR that answers the primary query in 50-70 words

### 1.6 robots.txt Configuration

```
User-agent: *
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: BingPreview
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://teletty.dev/sitemap.xml
```

---

## 2. Social Media Promotion Calendar

### Phase 1: Pre-Launch Foundation (Weeks 1-2)

| Day | Platform | Action |
|-----|----------|--------|
| 1 | GitHub | Polish README with GIF demos, add all badges, optimize topics/description |
| 1 | GitHub | Add to relevant GitHub Topics: telegram-mini-app, web-terminal, claude-code, terminal |
| 2 | Reddit | Create account, start commenting helpfully in r/selfhosted, r/commandline, r/homelab |
| 3 | Dev.to | Create account, write first "building in public" post |
| 4 | Twitter/X | Set up @teletty_dev account, start following dev tool makers |
| 5 | Telegram | Set up @teletty_news channel for updates |
| 6-7 | HN | Engage in discussions about terminal tools, AI coding, Telegram |
| 8-14 | Reddit | Continue building karma (15-25 helpful comments in target subreddits) |

### Phase 2: Soft Launch (Weeks 3-4)

| Day | Platform | Action |
|-----|----------|--------|
| 15 | Dev.to | Publish "I built a terminal inside Telegram in 889 lines of code" article |
| 16 | Reddit | Post to r/selfhosted: "I built a self-hosted terminal that runs inside Telegram" |
| 17 | Reddit | Post to r/commandline: technical deep-dive on smart prompt detection |
| 18 | HN | Post "Show HN: teletty -- full terminal in Telegram, 889 lines, Claude Code ready" |
| 19 | Twitter/X | Thread: "I replaced SSH apps on my phone with a Telegram Mini App" |
| 20 | Telegram | Post in developer groups (The Devs Network, etc.) |
| 21 | YouTube | Upload 2-minute demo video |

### Phase 3: Directory Blitz (Weeks 5-6)

| Day | Platform | Action |
|-----|----------|--------|
| 22 | Product Hunt | Submit (Tuesday or Wednesday, 12:01 AM PST) |
| 23 | DevHunt | Submit via GitHub PR |
| 24 | Awesome Lists | Submit PRs to awesome-telegram-mini-apps, awesome-selfhosted |
| 25 | Directories | Submit to 10+ directories (see Section 4) |
| 26 | Newsletters | Pitch to TLDR, Console, Bytes |
| 27 | Dev.to | Publish comparison article: "teletty vs SSH apps vs Claude Code Channels" |
| 28 | Indie Hackers | Post launch story with metrics |

### Phase 4: Sustained Growth (Weeks 7-12)

| Week | Focus | Actions |
|------|-------|---------|
| 7 | Content | Blog: "How I use Claude Code from my phone" tutorial |
| 8 | Video | YouTube: detailed setup walkthrough (10 min) |
| 9 | Community | Answer questions on Reddit/HN, engage with issues on GitHub |
| 10 | Content | Blog: "Smart buttons: detecting 7 types of terminal prompts" |
| 11 | Outreach | Pitch tech bloggers, newsletter curators |
| 12 | Refresh | Update all listings with new features, re-engage communities |

### Phase 5: Ongoing (Monthly)

- 2 blog posts/month on teletty.dev (AEO-optimized)
- 1 dev.to cross-post/month
- Weekly Reddit engagement in target subreddits
- Monthly newsletter pitch cycle
- Quarterly Product Hunt re-launch with major features
- Update all directory listings with new metrics

---

## 3. Telegram-Specific Promotion Channels and Tactics

### 3.1 Official Telegram Discovery

**Telegram Apps Center (@tapps)**
- Primary marketplace with 100k-1M daily visitors
- Can bring up to 150k unique monthly visitors to listed apps
- Submission: Free, moderation takes 3-8 days
- Requirements: bot must reply to /start in English, Terms of Use + Privacy Policy required
- Non-crypto apps do NOT need TON Connect
- Prepare: catchy name, 1-line tagline, 6 screenshot slots (make them look like ads), human-readable description
- URL: https://builders.ton.org/opportunities/tapps-listing

**Telegram Search Optimization**
- Both bot name and @username are indexed by Telegram search
- Use keywords people search for: "terminal", "server", "code"
- Ideal @username: @teletty_bot (or @teletty if available)
- Ranking factors: number of active users, interaction frequency, mini-app activity, Premium user ratio
- Telegram Premium users in your audience boost search ranking significantly

**BotFather Configuration**
- Set up Main Mini App via @BotFather
- Upload media preview demos to highlight features
- Ensure "Launch app" button appears on bot profile
- Configure /start command with clear welcome message

### 3.2 Third-Party Directories

| Directory | URL | Type | Est. Traffic |
|-----------|-----|------|--------------|
| FindMini.app | findmini.app | Catalog (11,200+ apps) | High |
| tApps Center | tapps.center | TON-focused catalog | High |
| Telegram Mini Apps Store | telegraminiapps.com | General catalog | Medium |
| awesome-telegram-mini-apps | github.com/telegram-mini-apps-dev/awesome-telegram-mini-apps | GitHub awesome list | Medium |
| awesome-telegram-bots | github.com/erkcet/awesome-telegram-bots | GitHub awesome list | Medium |
| Telegram Mini Apps List | github.com/telesearch/Telegram-Mini-Apps-List | GitHub catalog | Low-Medium |
| StoreBot | storebot.me | Bot directory | Medium |
| selfh.st/apps | selfh.st/apps | Self-hosted app list | Medium |

### 3.3 Telegram Developer Communities

**Channels to engage (organically, not spam):**

| Community | Focus | Strategy |
|-----------|-------|----------|
| The Devs Network (@thedevs) | General dev | Help answer terminal/CLI questions |
| Telegram Bot Developers (@BotDevelopers) | Bot dev | Share technical insights about mini apps |
| Telegram Mini Apps Community | TMA dev | Share teletty as an example/case study |
| Node.js Developers (@NodejsDevs) | Node.js | Contribute to discussions about node-pty, xterm.js |
| Self-hosted community channels | Infra | Share deployment guides |
| Claude Code / AI Coding channels | AI tools | Demo Claude Code via teletty |

**Cross-promotion strategy:**
- Partner with complementary TMA developers (code editors, note-taking apps)
- Offer mutual promotion in each other's channels/bots
- Target utility-focused communities, not crypto/gaming

### 3.4 Telegram-Native Advertising (Paid)

| Platform | Format | Min Budget | Notes |
|----------|--------|------------|-------|
| Telegram Ads (@ads) | Text/image in channels | ~$2 CPM | Official, highest quality |
| Adsgram | In-app ads in other TMAs | Varies | Good for TMA-to-TMA promotion |
| FindMini.app Newsletter | Featured listing | Contact | Reaches active TMA users |
| Telega.io | Channel posts | From $10/post | 6,700+ curated channels |

### 3.5 Referral Program

Implement a referral system within teletty:
- Users share a referral link to their friends
- When a friend deploys teletty, the referrer gets featured in a "Community" section
- Gamify: "Deployed on X servers" badge

---

## 4. 25+ Specific Places to Submit/Promote teletty

### Developer Tool Directories

| # | Platform | URL | Type | Priority |
|---|----------|-----|------|----------|
| 1 | Product Hunt | producthunt.com | Launch platform | HIGH |
| 2 | DevHunt | devhunt.org | Dev tool launch (via GitHub PR) | HIGH |
| 3 | Hacker News (Show HN) | news.ycombinator.com | Tech community | HIGH |
| 4 | Dev.to | dev.to | Article + listing | HIGH |
| 5 | Indie Hackers | indiehackers.com | Product showcase | HIGH |
| 6 | Open Launch | openlaunch.io | Startup directory | MEDIUM |
| 7 | SyntaxHut | syntaxhut.tech | Dev tools directory | MEDIUM |
| 8 | SubmitAITools.org | submitaitools.org | AI tools directory | MEDIUM |
| 9 | NextGen Tools | nxgntools.com | AI tools directory | MEDIUM |
| 10 | daily.dev | daily.dev | Dev content platform | MEDIUM |

### GitHub Awesome Lists (submit PR)

| # | List | URL | Relevance |
|---|------|-----|-----------|
| 11 | awesome-telegram-mini-apps | github.com/telegram-mini-apps-dev/awesome-telegram-mini-apps | Direct fit |
| 12 | awesome-selfhosted | github.com/awesome-selfhosted/awesome-selfhosted | Self-hosted terminal |
| 13 | awesome-telegram-bots | github.com/erkcet/awesome-telegram-bots | Bot/mini app |
| 14 | Telegram-Mini-Apps-List | github.com/telesearch/Telegram-Mini-Apps-List | Catalog |
| 15 | awesome-cli-apps | github.com/agarrharr/awesome-cli-apps | CLI tool |
| 16 | terminals-are-sexy | github.com/k4m4/terminals-are-sexy | Terminal tools |

### Telegram-Specific Directories

| # | Directory | URL | Priority |
|---|-----------|-----|----------|
| 17 | Telegram Apps Center | Submit via @tapps_bot | HIGH |
| 18 | FindMini.app | findmini.app | HIGH |
| 19 | StoreBot | storebot.me | MEDIUM |
| 20 | Telegram Mini Apps Store | telegraminiapps.com | MEDIUM |
| 21 | tApps Center | tapps.center | MEDIUM |

### Reddit Subreddits

| # | Subreddit | Members | Post Type |
|---|-----------|---------|-----------|
| 22 | r/selfhosted | 300k+ | "I built a self-hosted terminal in Telegram" |
| 23 | r/commandline | 200k+ | Technical deep-dive on prompt detection |
| 24 | r/homelab | 1M+ | "Access your homelab from Telegram" |
| 25 | r/opensource | 50k+ | Project showcase |
| 26 | r/webdev | 2M+ | Technical architecture post |
| 27 | r/programming | 6M+ | Article link |
| 28 | r/node | 100k+ | Technical implementation details |
| 29 | r/telegram | 200k+ | Mini app showcase |
| 30 | r/ClaudeAI | 100k+ | Claude Code integration demo |

### Newsletters to Pitch

| # | Newsletter | Subscribers | Contact Method |
|---|-----------|-------------|----------------|
| 31 | TLDR | 7M+ | Sponsorship/submission |
| 32 | Console | 30k+ | Submit at console.dev |
| 33 | Bytes | 200k+ | Submit tools |
| 34 | Node Weekly | 60k+ | Submit at cooperpress.com |
| 35 | Changelog | 500k+ | Submit news |

---

## 5. Content Pieces to Create

### 5.1 Blog Posts (on teletty.dev/blog, AEO-optimized)

| # | Title | Target Keywords | Priority |
|---|-------|----------------|----------|
| 1 | "What is teletty? A full terminal in your Telegram" | teletty, telegram terminal | HIGH |
| 2 | "How to Access Your Server from a Phone Without SSH Apps" | access server from phone, mobile terminal | HIGH |
| 3 | "teletty vs Termius vs JuiceSSH: Mobile Terminal Comparison" | telegram terminal vs ssh app | HIGH |
| 4 | "Using Claude Code on Mobile with teletty" | claude code mobile, ai coding on phone | HIGH |
| 5 | "How teletty Detects 7 Types of Interactive Terminal Prompts" | smart terminal buttons, prompt detection | MEDIUM |
| 6 | "Self-Hosting teletty: Docker, npx, and Manual Setup Guide" | self-hosted terminal, telegram mini app setup | MEDIUM |
| 7 | "teletty vs Claude Code Channels: Self-Hosted vs Official" | claude code telegram, code from phone | MEDIUM |
| 8 | "Building a Telegram Mini App in 889 Lines with Zero Frameworks" | telegram mini app tutorial, no framework web app | MEDIUM |
| 9 | "Voice-Controlled Terminal: Push-to-Talk with teletty" | voice terminal, speech to command | LOW |
| 10 | "Security Architecture of teletty: HMAC, JWT, and PTY Isolation" | telegram mini app security, secure web terminal | LOW |

**Blog post structure (every post):**
1. Answer capsule (40-80 words, no links)
2. Quick comparison table (if applicable)
3. Step-by-step tutorial or explanation
4. FAQ section with 3-5 questions (+ FAQ schema markup)
5. "Try it now" CTA with npx command

### 5.2 Dev.to Articles (cross-posts + originals)

| # | Title | Approach |
|---|-------|----------|
| 1 | "I Built a Terminal Inside Telegram in 889 Lines of Code" | Building-in-public story |
| 2 | "How I Replaced SSH Apps With a Telegram Mini App" | Personal workflow story |
| 3 | "Smart Buttons in Terminal: Detecting Y/n, 1/2/3, and Claude Code Prompts" | Technical tutorial |
| 4 | "From npx to Production: Deploying teletty on a VPS in 5 Minutes" | Step-by-step tutorial |
| 5 | "The Architecture of a Zero-Framework Telegram Mini App" | Architecture deep-dive |

### 5.3 Video Content

| # | Title | Length | Platform | Priority |
|---|-------|--------|----------|----------|
| 1 | "teletty: Terminal in Telegram (60s Demo)" | 60s | YouTube Shorts, TikTok, Reels | HIGH |
| 2 | "teletty Setup: npx to Working Terminal in 2 Minutes" | 2 min | YouTube | HIGH |
| 3 | "Using Claude Code from Your Phone via teletty" | 3 min | YouTube | HIGH |
| 4 | "teletty Full Setup Guide: Domain, HTTPS, BotFather" | 10 min | YouTube | MEDIUM |
| 5 | "How Smart Buttons Work in teletty" | 5 min | YouTube | MEDIUM |

**Video production tips:**
- Keep the first 60-90 seconds tight (value proposition + demo)
- Show real terminal usage on a phone (screen recording)
- Include the `npx teletty init` flow
- Show Claude Code approve/deny buttons in action
- Add chapters and timestamps for YouTube SEO

### 5.4 Comparison and Landing Pages

Create dedicated pages on teletty.dev for high-intent search queries:

| Page | Target Query |
|------|-------------|
| /compare/termius | "teletty vs termius" |
| /compare/ssh-apps | "telegram terminal vs ssh app" |
| /compare/ttyd | "teletty vs ttyd vs wetty" |
| /compare/claude-channels | "teletty vs claude code channels" |
| /use-cases/homelab | "access homelab from telegram" |
| /use-cases/claude-code | "claude code on mobile" |
| /use-cases/devops | "server management from phone" |

### 5.5 Interactive Demo

Create an interactive playground at teletty.dev/demo that:
- Shows a simulated terminal with smart buttons
- Demonstrates prompt detection without requiring setup
- Includes a "Deploy your own" CTA
- Embeddable in blog posts and dev.to articles

---

## 6. Technical Implementation Guide

### 6.1 Website SEO Essentials for teletty.dev

```html
<!-- Meta tags for every page -->
<meta name="description" content="teletty - Open-source Telegram Mini App for full terminal access. Smart buttons, Claude Code integration, voice input, multi-tab tmux. 889 lines, zero frameworks." />
<meta property="og:title" content="teletty - Terminal in Your Telegram" />
<meta property="og:description" content="Access any server from your phone using a Telegram Mini App. Smart buttons, Claude Code integration, voice input, multi-tab tmux sessions." />
<meta property="og:image" content="https://teletty.dev/og-image.png" />
<meta property="og:url" content="https://teletty.dev" />
<meta name="twitter:card" content="summary_large_image" />
```

### 6.2 Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://teletty.dev/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://teletty.dev/docs/quickstart</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://teletty.dev/docs/claude-code</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://teletty.dev/docs/security</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://teletty.dev/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://teletty.dev/compare/termius</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://teletty.dev/compare/ssh-apps</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://teletty.dev/llms.txt</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>
```

### 6.3 GitHub README Optimization

GitHub is heavily indexed by AI engines. Optimize the README:

- First paragraph must be an answer capsule (40-80 words, self-contained)
- Include comparison table (vs alternatives)
- Add GIF/video demo at the top
- Badges: npm version, GitHub stars, license, Node.js version
- FAQ section at the bottom
- Topics: telegram-mini-app, web-terminal, claude-code, terminal, ssh-alternative, tmux, smart-buttons, voice-terminal, mobile-terminal, self-hosted

### 6.4 NPM Package Optimization

```json
{
  "keywords": [
    "telegram", "mini-app", "terminal", "web-terminal", "xterm",
    "claude-code", "remote-shell", "tmux", "ssh-alternative",
    "smart-buttons", "voice-terminal", "mobile-terminal",
    "self-hosted", "telegram-bot", "server-management",
    "devops-tool", "ai-coding", "teletty"
  ]
}
```

### 6.5 Monitoring AI Visibility

**Free methods:**
- Regularly query ChatGPT, Perplexity, Gemini, Google AI Overview for "telegram terminal app", "mobile terminal for servers", "claude code on phone"
- Track referral traffic from perplexity.ai in analytics
- Monitor GitHub traffic sources
- Use F5Bot (free) for Reddit keyword monitoring: "telegram terminal", "mobile ssh", "claude code mobile"

**Paid tools (when budget allows):**
- AI Peekaboo ($50/mo): Track across 5 AI engines
- Scrunch: Enterprise-grade AI visibility
- Semrush AI Visibility Toolkit

---

## Key Statistics That Inform This Strategy

| Insight | Data Point | Source |
|---------|-----------|--------|
| Answer capsules are the #1 factor for ChatGPT citations | 72% of cited pages use one | Search Engine Land |
| ChatGPT cites Wikipedia most | 12.1% of citations | Profound study |
| Perplexity cites Reddit most | 6.6%-20% of citations | Semrush / EverTune |
| Content freshness matters for Perplexity | 3.2x more citations for content updated within 30 days | Multiple studies |
| Google AI Overview favors E-E-A-T | 96% of citations from strong E-E-A-T sources | Seer Interactive |
| Structured data boosts AI visibility | Up to 30% increase | Multiple studies |
| Section length sweet spot | 120-180 words between headings = 70% more ChatGPT citations | Search Engine Land |
| First 30% of content gets 44% of citations | Front-load key information | ALM Corp study |
| Proprietary data is 2nd strongest differentiator | Present in 52.2% of cited pages | Search Engine Land |
| GEO techniques boost visibility | 30-40% improvement | GEO research paper |
| Telegram Apps Center daily traffic | 100k-1M visitors | TON ecosystem data |
| DA correlation with Perplexity citations is low | Only 0.31 | RankWeave study |
| Multi-site mentions outperform high-DA | Brand on 8 sites = 2.1x more citations than 2 high-DA sites | RankWeave |

---

## Sources

### AEO/GEO for Developer Tools
- [Best Answer Engine Optimization Tools for AI Search (2026)](https://visible.seranking.com/blog/best-answer-engine-optimization-tools-2026/)
- [AEO: The Complete Guide for 2026 - LLMrefs](https://llmrefs.com/answer-engine-optimization)
- [GEO for Open Source Projects](https://geneo.app/blog/geo-generative-engine-optimization-open-source/)
- [How to get cited by ChatGPT: Content traits LLMs quote most](https://searchengineland.com/how-to-get-cited-by-chatgpt-the-content-traits-llms-quote-most-464868)
- [ChatGPT Citations: 44% Come From First Third](https://almcorp.com/blog/chatgpt-citations-study-44-percent-first-third-content/)
- [The Capsule Content Method](https://www.airankingskool.com/post/capsule-content-method-ai-citations)
- [How ChatGPT sources the web](https://www.tryprofound.com/blog/chatgpt-citation-sources)
- [AI Platform Citation Patterns](https://www.tryprofound.com/blog/ai-platform-citation-patterns)
- [The Most-Cited Domains in AI (Semrush)](https://www.semrush.com/blog/most-cited-domains-ai/)
- [Perplexity Loves Reddit](https://www.evertune.ai/resources/insights-on-ai/perplexity-loves-reddit-exploring-llms-top-sources)
- [How to Get Cited by Perplexity AI](https://bestaeotools.com/learn/how-to-get-cited-by-perplexity)
- [Perplexity AI Optimization Guide 2026](https://www.trysight.ai/blog/perplexity-ai-optimization-guide)
- [Google AI Overviews Optimization 2026](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026)
- [The /llms.txt file specification](https://llmstxt.org/)
- [What Is LLMs.txt (Semrush)](https://www.semrush.com/blog/llms-txt/)
- [7 Companies Using llms.txt](https://llms-txt.io/blog/companies-using-llms-txt-examples)
- [SoftwareApplication - Schema.org](https://schema.org/SoftwareApplication)
- [Google Software App Structured Data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [FAQ Schema for AI Search (Frase.io)](https://www.frase.io/blog/faq-schema-ai-search-geo-aeo)
- [AIVO Standard - 9-stage framework](https://github.com/pjsheals/AIVO-Standard)
- [AI Visibility for SaaS (Visiblie)](https://www.visiblie.com/blog/ai-visibility-for-saas)
- [SEO Strategy for Developer Tools 2026](https://levelup.gitconnected.com/the-seo-strategy-that-actually-works-for-developer-tools-in-2026-f4c73f0b89e0)
- [Developer Documentation SEO (Nakora)](https://nakora.ai/blog/developer-documentation-seo)
- [GEO Optimization Checklist (PageOptimizer Pro)](https://www.pageoptimizer.pro/blog/generative-engine-optimization-geo-checklist)
- [Mastering GEO in 2026 (Search Engine Land)](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142)

### Social Media Promotion for Dev Tools
- [How to Market Developer Tools on Reddit (daily.dev)](https://business.daily.dev/resources/how-to-market-developer-tools-on-reddit-practical-guide)
- [4 Steps To Promote Side Project On Reddit](https://shipwithai.substack.com/p/4-steps-to-promote-your-side-project)
- [Composio's Reddit Marketing Strategy](https://startupspells.com/p/composio-reddit-ai-b2b-saas-content-marketing-strategy)
- [11 Subreddits to Promote Tech (2026)](https://www.subredditsignals.com/blog/best-subreddits-to-promote-a-tech-product-in-2026-rules-real-examples-and-outreach-tips-that-don-t-get-you-banned)
- [How to launch a dev tool on Hacker News](https://www.markepear.dev/blog/dev-tool-hacker-news-launch)
- [How to crush your Hacker News launch (Dev.to)](https://dev.to/dfarrell/how-to-crush-your-hacker-news-launch-10jk)
- [Show HN Guidelines](https://news.ycombinator.com/showhn.html)
- [How I promoted my open source repo to 6k stars](https://dev.to/wasp/how-i-promoted-my-open-source-repo-to-6k-stars-in-6-months-3li9)
- [How to Get Your First 1,000 GitHub Stars](https://dev.to/iris1031/how-to-get-your-first-1000-github-stars-the-complete-open-source-growth-guide-4367)
- [Product Hunt Launch Guide 2026 (Hackmamba)](https://hackmamba.io/developer-marketing/how-to-launch-on-product-hunt/)
- [Product Hunt Launch Guide 2026 (Calmops)](https://calmops.com/indie-hackers/product-hunt-launch-guide/)
- [DevHunt submission (GitHub)](https://github.com/MarsX-dev/devhunt)
- [GitHub developer-newsletters list](https://github.com/jackbridger/developer-newsletters)
- [Top Developer Newsletters 2026 (Paved)](https://www.paved.com/developers-newsletters)
- [Developer Marketing Playbook (Decibel VC)](https://www.decibel.vc/articles/developer-marketing-and-community-an-early-stage-playbook-from-a-devtools-and-open-source-marketer)
- [Marketing Open Source Projects (TODO Group)](https://todogroup.org/resources/guides/marketing-open-source-projects/)
- [Open Source to PLG Strategy](https://www.productmarketingalliance.com/open-source-to-plg/)
- [DevRel: Six Shifts in 2026](https://blog.stateshift.com/future-of-devrel-2026/)
- [Complete Developer Marketing Guide 2026](https://www.strategicnerds.com/blog/the-complete-developer-marketing-guide-2026)

### Telegram Mini App Promotion
- [How to Promote Your Telegram Mini App (Monetag)](https://monetag.com/blog/how-to-promote-your-telegram-mini-app/)
- [Top 10 Ways To Promote Your Telegram Mini App (Magnetto)](https://magnetto.com/blog/top-ways-to-promote-your-telegram-mini-app)
- [Top 7 Ways To Promote Telegram Mini Apps (PropellerAds)](https://propellerads.com/blog/adv-how-to-promote-telegram-mini-apps/)
- [Telegram Apps Center Listing Guide](https://builders.ton.org/opportunities/tapps-listing)
- [Getting Listed on Apps Center (Medium)](https://medium.com/@paybot.tech/just-got-my-telegram-mini-app-listed-on-apps-center-heres-what-worked-and-what-to-avoid-72aba4841a0e)
- [Telegram Mini App SEO Tips (Medium)](https://medium.com/@TGREF/how-to-get-a-telegram-bot-or-mini-app-to-the-top-of-search-results-seo-guiding-tips-176fa6784806)
- [SEO for Telegram Mini App (tma-ads.pro)](https://tma-ads.pro/blog/seo-for-telegram-mini-app/)
- [FindMini.app](https://www.findmini.app/)
- [awesome-telegram-mini-apps (GitHub)](https://github.com/telegram-mini-apps-dev/awesome-telegram-mini-apps)
- [Telegram Mini Apps Official Docs](https://core.telegram.org/bots/webapps)
- [Telegram Mini Apps 2026 Guide (Magnetto)](https://magnetto.com/blog/everything-you-need-to-know-about-telegram-mini-apps)
- [Telegram Marketing Ultimate Guide 2026](https://magnetto.com/blog/telegram-marketing-ultimate-guide)
- [Best Telegram Channels for Developers (Dev.to)](https://dev.to/presentslide/best-telegram-channels-for-developers-560l)
- [Claude Code Channels vs teletty context (VentureBeat)](https://venturebeat.com/orchestration/anthropic-just-shipped-an-openclaw-killer-called-claude-code-channels)
