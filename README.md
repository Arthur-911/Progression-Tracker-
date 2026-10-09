# Progression Matrix

A focused, effort-weighted monthly habit dashboard designed around realistic pacing, guilt-free rest days, and complete local privacy.

---

## Why This Exists

Most habit trackers treat every checkmark the same way. Drinking a glass of water counts just as much as completing two hours of deep work or running five miles. 

When life gets busy, that binary all-or-nothing approach tends to break down. Missing one minor task breaks your streak, guilt sets in, and you end up abandoning the tracker altogether.

Progression Matrix takes a more grounded approach:

- Effort-weighted progress: Habits carry effort points from 1 to 5. Quick wins feel good, but heavier commitments carry the weight they deserve.
- Pacing over perfection: Instead of demanding an unbroken streak every day, the dashboard compares your earned effort against where you currently are in the month.
- Rest days without guilt: You get up to three rest shields per month. Taking a sick day, traveling, or resting preserves your streaks without penalty.
- Holistic life pillars: Group habits across five areas of your life (Health, Career, Learning, Finance, and Personal) so one area does not crowd out everything else.
- Full habit management: Add new habits, tweak existing ones on the fly (title, pillar, effort, target days, or time of day), or remove habits you have outgrown.
- Privacy first: Everything stays inside your browser localStorage. No account creation, no analytics, no third-party telemetry.

---

## Features

### Flexible Habit Management and Tweaks
- In-place adjustments: Click any habit name or its edit button directly in the frozen table column to tweak its title, category pillar, preferred time of day, effort points, or target days.
- Safe habit removal: Remove habits you no longer practice directly from the row or from inside the edit dialog with confirmation.
- Mid-month reset: Clear monthly checkmarks for an individual habit if you want a clean slate without losing your configuration or past journal reflections.

### Effort-Weighted Progress and Pacing
- Weighted scores: High-effort habits contribute proportionally more to your monthly progress bar and stats.
- Calendar velocity: Compares your earned points with elapsed calendar days to show whether you are on track, ahead of pace, or falling behind.
- Consistency meter: A daily consistency bar charts your completion percentage for every day of the month.

### Micro-Journaling and Reflections
- Contextual day notes: Right-click or long-press any day tile to log a quick reflection and choose a mood indicator.
- Visual indicators: Marked days show a subtle indicator on the grid, with hover tooltips displaying your note.

### Rest Shields
- Guilt-free recovery: Activate up to three rest shields each month.
- Streak preservation: Rest days mark all habits as protected, ensuring you can recharge without breaking streaks.

### Daily Briefing and Quick Log
- Daily overview: Shows remaining tasks for today, categorized by time of day (morning, focus, or night).
- Quick check-ins: Tap habit chips or use the natural language search bar to mark tasks complete in seconds.

### Monthly Wrapped Summary
- Performance review: Generate a monthly recap displaying your top-performing habit, longest streak, total effort score, and completion grade.
- Easy sharing: Copy a clean text breakdown to your clipboard.

### Aesthetic Theme Gallery
- Seven visual environments: Choose from Sakura Zen, Matcha Garden, Celestial Nebula, Rainy Lo-Fi Cafe, Cyberpunk Horizon, Nordic Aurora, or Sunset Mirage.
- Custom particle effects: Dynamic canvas animations complement each theme with rain, floating petals, stars, or embers.

### Embedded Habit Coach
- Dual-mode coach: Runs completely offline using built-in diagnostic heuristics to analyze your pacing, pillar balance, and streaks.
- Optional AI connection: Optionally connect your own Google Gemini API key for personalized conversational advice.

### Offline PWA Support
- Install anywhere: Built with standard Service Workers and a Web App Manifest.
- Native feel: Add to home screen on iOS and Android or install as a desktop app in Chrome and Edge.

---

## The Effort Weighting System

Habits are graded by their required investment:

- 1 Point: Quick win (under 15 minutes, e.g. drink water, take vitamins)
- 2 Points: Light routine (15 to 30 minutes, e.g. read 15 pages, short walk)
- 3 Points: Standard commitment (30 to 60 minutes, e.g. workout, focused practice)
- 4 Points: Heavy focus block (60 to 120 minutes, e.g. uninterrupted writing, deep work)
- 5 Points: High-stakes milestone (major deliverable, intensive sprint)

Your overall monthly progress is calculated as:

$$\text{Month Progress} = \left( \frac{\sum (\text{Completion Ratio} \times \text{Effort Weight})}{\sum \text{Total Possible Effort}} \right) \times 100$$

---

## Life Pillars

Habits are categorized into five balanced pillars:

| Pillar | Category | Typical Activities |
| :--- | :--- | :--- |
| Health | Physical Vitality | Sleep, hydration, gym sessions, stretching, nutrition |
| Career | Professional Focus | Deep work sprints, writing, client deliverables, coding |
| Learning | Knowledge and Growth | Reading books, courses, languages, technical skills |
| Finance | Financial Wellness | Expense tracking, budget reviews, investments, savings |
| Personal | Mental Peace | Meditation, breathwork, gratitude, journaling, unplugging |

---

## Project Structure

This project uses vanilla web standards with no build step, bundler, or heavy dependencies:

```text
progression_tracker/
|-- index.html                  # Main application markup and component layout
|-- manifest.json               # Progressive Web App manifest
|-- sw.js                       # Service Worker for offline asset caching
|-- assets/                     # Icons and background artwork
|-- css/
|   `-- styles.css              # Custom styling, frosted glass effects, themes
|-- js/
|   |-- components/             # Custom HTML web components
|   |   |-- header.js           # Top navigation, theme picker, month selector
|   |   |-- briefing.js         # Daily overview, quick chips, natural search
|   |   |-- bonsai.js           # Avatar companion and rest day shields
|   |   |-- metrics.js          # Bento summary metrics and pacing diagnostics
|   |   |-- matrix.js           # Tabular progression grid
|   |   |-- modal.js            # Goal creation, tweak, and removal modal
|   |   |-- note-modal.js       # Micro-journaling and mood reflection modal
|   |   |-- wrapped.js          # Monthly summary modal
|   |   |-- ai-coach.js         # Habit coach drawer and settings modal
|   |   `-- footer.js           # Storage status, data backup, and import controls
|   |-- ai.js                   # Diagnostic analysis engine and Gemini API client
|   |-- app.js                  # Central application state, calculations, and events
|   |-- sakura.js               # Canvas ambient particle engine
|   `-- fx.js                   # Web Audio synthesizers and celebratory effects
|-- SPECIFICATION.md            # Technical formulas and data model specifications
`-- README.md                   # Project documentation
```

---

## Getting Started

No build tooling, package manager, or compilation required.

### Quick Start
Open `index.html` in any modern web browser (Chrome, Edge, Firefox, or Safari).

### Local Server (Recommended for PWA Features)
To test offline caching and Service Worker functionality:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve .
```

Open `http://localhost:8000` in your browser.

---

## Data Privacy and Storage

- Completely local: All data is saved directly in your browser using `localStorage`.
- No trackers: No analytics, cookies, third-party trackers, or cloud sync.
- Backup anytime: Export your complete matrix history as a clean JSON file and import it on any device from the footer.

---

## License

Distributed under the MIT License. Feel free to fork, adapt, and customize this for your own daily workflow.
