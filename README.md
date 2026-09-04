# 🌸 Progression Matrix — Sakura Zen Edition

> **A calm, effort-weighted monthly habit dashboard with an embedded AI coach, evolving bonsai tree, guilt-free rest days, and offline PWA support.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-Web_Components-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Offline_Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-pink?style=flat-square)

---

## 🍃 Why This Exists

Most habit trackers treat every checkmark the same: drinking a glass of water counts just as much as completing a 3-hour deep work session. When life gets busy, ordinary trackers lead to burnout, broken streaks, and guilt.

**Progression Matrix** takes a different, mindful approach:
* **Effort-Weighted Progress**: You assign an effort score (1–5) to each habit. Quick wins feel good, but deep focus moves the needle.
* **Pacing Over Perfection**: It compares your current effort against where you are in the calendar month, giving you clear, compassionate feedback (`Ahead of Pace`, `On Track`, or `Action Needed`).
* **Holistic Balance**: Groups your habits across 5 core life pillars so you never sacrifice mental peace or physical health just to hit career goals.

---

## ✨ Standout Features

### 🤖 1. Sakura Sensei (Embedded AI Habit Coach)
Your personal pocket mentor living in the bottom-right corner:
* **Real-time Diagnostic**: Reads your live completion %, current streaks, velocity, and today's remaining tasks.
* **1-Click Insights**:
  * 📊 *Analyze My Rhythm*: Comprehensive checkup on your monthly consistency.
  * 🎯 *Pacing Tips*: Actionable adjustments whether you’re ahead or falling behind.
  * 🧘 *Beat Procrastination*: Micro-steps and the 2-minute rule when you feel stuck.
  * ⚖️ *Pillar Balance*: Spots neglected areas of your life before burnout hits.
* **Dual-Mode Engine**: Runs **100% offline** with built-in heuristic rules, or you can plug in an optional **Google Gemini API key** for deep conversational coaching.

### 🌱 2. Evolving Bonsai Tree
Watch your discipline take physical form:
* As you complete tasks and earn effort points (XP), your Bonsai grows through 4 stages:
  * `Winter Branch 🌱` ➔ `Budding Sprout 🌿` ➔ `Half Bloom 🌸` ➔ `Radiant Bloom 🌺✨`
* Unlocks Zen Mastery titles as you stay consistent.

### 🛡️ 3. Petal Shields (Guilt-Free Rest Days)
Rest is part of the work. You receive **3 Petal Shields** every month:
* Activate a shield when you are sick, traveling, or need a mental health day.
* It marks the day as a protected **Zen Rest Day** without breaking any active streaks.

### 📓 4. Micro-Journaling & Mood Logging
* Right-click (or long-press on mobile) any day cell in the matrix to write a 1-sentence note and pick a mood emoji (`🌸`, `⚡`, `🔥`, `🧘`, `😊`, `🌧️`).
* Displays a subtle glowing dot with hover tooltips so you can look back and spot patterns in how your habits affect your mood.

### ☀️ 5. Zen Morning Briefing & 1-Tap Chips
* Opens with a dynamic morning greeting, daily quote, and one-tap chips for today's tasks.
* Features a natural-language quick bar: just type a keyword to tick off habits instantly.

### 🎁 6. "Monthly Wrapped" Summary Card
* Inspired by Spotify Wrapped: click **"Wrapped 🎁"** in the top bar to generate a shareable aesthetic summary card showcasing your MVP habit, best streak, total effort score, and completion grade.

### 📱 7. Installable Mobile PWA (Offline Ready)
* Equipped with a Service Worker and web app manifest.
* Open it in Chrome or iOS Safari and tap **"Add to Home Screen"** to run it fullscreen like a native app—no internet connection required.

### 🎨 8. Sensory Zen Experience
* Interactive fullscreen canvas rendering fluttering **3D sakura petals**.
* Soothing Web Audio synthesizer chimes (gentle marimba chords) on task completions, paired with celebratory confetti cannons for big milestones.

---

## 🏛️ The Five Life Pillars

Every habit is color-coded and organized into a pillar:
| Pillar | Focus | What It Covers |
| :--- | :---: | :--- |
| 🌱 **Health** | Vitality | Sleep, hydration, gym, mobility, nutrition |
| ⚡ **Focus** | Career | Deep work sprints, writing, deliverables, projects |
| 📚 **Grow** | Learning | Reading, online courses, languages, skill acquisition |
| ✨ **Save** | Wealth | Expense tracking, investing, budgeting, cash flow |
| 🌸 **Mind** | Peace | Meditation, breathwork, gratitude, micro-journaling |

---

## 🧮 The Effort Weighting System

Each habit has an effort level from 1 to 5:
* **1 Point**: Quick win (< 15 mins, e.g., take vitamins, drink 2L water).
* **2 Points**: Light routine (~20–30 mins, e.g., read 15 pages, quick walk).
* **3 Points**: Standard daily commitment (e.g., gym session, focused study).
* **4 Points**: Heavy focus block (e.g., 90-minute deep work block).
* **5 Points**: High-stakes milestone (e.g., major project deliverable, marathon prep).

$$\text{Month Progress} = \left( \frac{\sum (\text{Completion Ratio} \times \text{Effort Weight})}{\sum \text{Total Possible Effort}} \right) \times 100$$

---

## 📁 Architecture & File Layout

Zero complicated tooling. Pure, lightweight Web Components and modular JavaScript:

```text
progession_tracker/
├── index.html                  # HTML entry point with web component layout
├── manifest.json               # PWA mobile installation manifest
├── sw.js                       # Service Worker for offline caching
├── assets/                     # Background artwork and vector app icons
├── css/
│   └── styles.css              # Glassmorphism, animations, dark theme styling
├── js/
│   ├── components/             # Declarative Custom Web Components
│   │   ├── ai-coach.js         # <app-ai-coach> Sakura Sensei chat drawer
│   │   ├── header.js           # <app-header> Top navigation and audio toggle
│   │   ├── briefing.js         # <app-briefing> Morning greeting & quick chips
│   │   ├── bonsai.js           # <app-bonsai> Bonsai avatar & Petal Shields
│   │   ├── metrics.js          # <app-metrics> Bento cards (streak, velocity, etc.)
│   │   ├── matrix.js           # <app-matrix> The 30-day progression grid
│   │   ├── modal.js            # <app-modal> New habit creation dialog
│   │   ├── note-modal.js       # <app-note-modal> Micro-journaling popup
│   │   ├── wrapped.js          # <app-wrapped> Spotify-style monthly summary
│   │   └── footer.js           # <app-footer> Backup, restore, and clear storage
│   ├── ai.js                   # Rule-based diagnostic engine + Gemini API connector
│   ├── app.js                  # Central reactive state store and event bus
│   ├── sakura.js               # Canvas 3D fluttering petals animation
│   └── fx.js                   # Web Audio API synthesizers and confetti triggers
├── SPECIFICATION.md            # Technical formulas and data model specs
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

No `npm install`, Node.js, or build pipeline is needed.

### Option 1: Direct in Browser
Double-click [`index.html`](index.html) to open it in Chrome, Edge, Safari, or Firefox.

### Option 2: Local HTTP Server (Recommended for PWA testing)
```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```
Then visit `http://localhost:8000` in your browser.

---

## 🔒 Privacy & Data Ownership

* **100% Local**: All your habits, streaks, and journal notes remain exclusively in your browser’s `localStorage`.
* **Zero Telemetry**: No third-party tracking scripts, cookies, or remote databases.
* **Easy Backups**: Export your entire history as a single clean JSON file or restore from a previous backup directly from the footer.

---

## 📜 License

Distributed under the **MIT License**. Feel free to customize, fork, and adapt it for your own personal rituals.
