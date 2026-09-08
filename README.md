# SP. — Sreekanth Pinnaka · Personal Portfolio

A personal portfolio engineered for **Sreekanth Pinnaka (Software Developer & AI Systems Engineer)**, designed with an editorial aesthetic, interactive 3D canvas visuals, and zero unnecessary scrolling.

Built as a **100% static multi-page web application** ready for instant deployment on **GitHub Pages** with **zero build steps, zero bundlers, and zero framework overhead**.

---

## 🧭 Multi-Page Architecture

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](index.html) | Two-column editorial hero with an interactive 3D canvas rotating globe on the right (zero text overlap), concise bio, quick navigation, and curated spotlight previews. |
| **Experience** | [`experience.html`](experience.html) | Interactive split-view career timeline at Infosoft Inc. (2023–2026) alongside graduate academics (M.S. Computer Science from Missouri S&T, GPA 3.61; M.S. AI at Indiana Wesleyan). |
| **Projects** | [`projects.html`](projects.html) | Case studies with interactive architecture specification modals and direct GitHub repo links, plus the streamlined additional work archive. |
| **Skills** | [`skills.html`](skills.html) | Systems toolbox categorized with live "Where I've used it" context, engineering principles, and active research areas. |
| **About** | [`about.html`](about.html) | Personal background narrative, beyond-code pillars, and contact section with 1-click email copy. |

---

## 🌟 Featured Projects

1. **[LangGraph-Observe (Agent APM Tool)](https://github.com/sreekanthpinnaka/langgraph_observability_tool)**
   - Decoupled, lightweight tracing library and visualizer for stateful LangGraph agents.
   - Python `ContextVars` async tree tracing, microsecond state deltas, in-memory PII scrubbing, SQLite WAL, and standalone 49MB binary footprint.
   - 101 / 101 passing unit tests.

2. **[AI Operations Agent](https://github.com/sreekanthpinnaka/AI-operations-Agent)**
   - Human-in-the-Loop operational assistant enabling autonomous exploration over a 24-table relational database across 7 functional enterprise domains.
   - `sqlglot` AST SQL guardrails (blocking destructive statements with HTTP 403, enforcing table whitelists, auto-clamping `LIMIT 100`).
   - Safety interception holding consequential writes (emails, purchase orders, escalations) at a human approval gate with inline modal editing and UUID idempotency.

3. **[AI Debate Arena](https://github.com/sreekanthpinnaka/Ai_debate)**
   - Adversarial multi-agent platform where PRO and CON models debate an issue while an impartial judge scores rounds.
   - Concurrent token multiplexing over Server-Sent Events via `asyncio.Queue` (50% turn latency cut) and 5-axis Recharts radar analytics.

---

## 📁 Repository Structure

```
portfolio/
├── .gitignore          # Ignores local logs, temp files, and node_modules
├── .nojekyll           # Bypasses Jekyll processing on GitHub Pages
├── index.html          # Home page & 3D rotating globe
├── experience.html     # Career journey & academic history
├── projects.html       # Case studies, architecture modals & archive
├── skills.html         # Technical toolbox & engineering principles
├── about.html          # Personal story & contact methods
├── styles.css          # Burgundy palette & design system styling
├── data.js             # Single source of truth for all content
├── app.js              # Interactive UI logic & canvas rendering
├── server.js           # Lightweight zero-dependency local preview server
└── README.md           # Documentation and deployment guide
```

---

## 🚀 Local Development

### Option 1: Native Node.js Server (Recommended)
```powershell
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Python HTTP Server
```powershell
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000).

### Option 3: Direct File Opening
Double-click `index.html` to open it directly in any browser.

---

## 🚢 Deploying to GitHub Pages (60 Seconds)

1. **Initialize and Push to GitHub**:
   ```powershell
   git init
   git add .
   git commit -m "feat: Sreekanth Pinnaka personal portfolio"
   git branch -M main
   git remote add origin https://github.com/sreekanthpinnaka/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment** ➔ **Source**, select **Deploy from a branch**.
   - Select Branch: **`main`** and Folder: **`/ (root)`**.
   - Click **Save**.

Your portfolio will be live at `https://sreekanthpinnaka.github.io/<YOUR-REPO-NAME>/` in under a minute!
