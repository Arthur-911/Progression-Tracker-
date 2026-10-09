# Progression Matrix: Architecture & Mathematical Model Specification

## 1. Executive Summary
The **Progression Matrix** is an effort-weighted habit execution dashboard organized on a monthly cadence. It combines daily habit tracking with effort-based weighting (XP points), real-time calendar pacing diagnostics, streak protection rest shields, micro-journaling, evolving companion avatars across 7 aesthetic themes, and an embedded offline/online AI coach.

---

## 2. Core Mathematical Model

### A. Habit Completion Ratio ($R_g$)
For each habit goal $g$ within a month of $D$ days (where $D \in \{28, 29, 30, 31\}$):
- $C_g$: Number of days marked as completed ($\text{checks}[d] = \text{true}$) plus protected rest days ($\text{shieldsUsed}[d] = \text{true}$).
- $T_g$: Target days committed for the month ($1 \le T_g \le D$, defaulting to $D$).

$$R_g = \min\left(1.0, \frac{C_g}{T_g}\right)$$

### B. Effort Weighting & Overall Month Progress
Each habit is assigned an effort level $W_g \in \{1, 2, 3, 4, 5\}$:
- **1 Point**: Quick win (< 15 mins, micro-habits, hydration)
- **2 Points**: Light routine (~20–30 mins, reading, quick walk)
- **3 Points**: Standard daily commitment (~45–60 mins, gym session)
- **4 Points**: Substantial focus block (~90–120 mins deep work)
- **5 Points**: High-stakes milestone (core deliverable, intensive study)

The **Overall Month Completion Percentage** is:
$$\text{Month Progress \%} = \left( \frac{\sum_{g \in \text{Goals}} (R_g \times W_g)}{\sum_{g \in \text{Goals}} W_g} \right) \times 100$$

### C. Calendar Pacing & Velocity Metric
Let $E$ be the number of elapsed days in the active month:
- If viewing the actual current calendar month: $E = \text{currentDay}$.
- If viewing a past month: $E = D$ (month has concluded).
- If viewing a future month: $E = 0$.

$$\text{Expected Progress \%} = \left( \frac{E}{D} \right) \times 100$$
$$\Delta = \text{Month Progress \%} - \text{Expected Progress \%}$$

- **Ahead of Pace**: $\Delta \ge +5\%$
- **Behind**: $\Delta < -10\%$
- **On Track**: $-10\% \le \Delta < +5\%$

### D. Streak Models
1. **Trailing Active Streak**: Unbroken consecutive days ending at the current evaluation day (skipping today if not yet checked).
2. **Longest Peak Streak**: Maximum consecutive unbroken checkmarks throughout days $1 \dots D$, protected by active Rest Day shields.

---

## 3. Data Schema

```typescript
export type PillarId = 'health' | 'career' | 'learning' | 'finance' | 'personal';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'any';
export type EffortLevel = 1 | 2 | 3 | 4 | 5;

export interface CellNote {
  mood: string;  // e.g. "blossom", "energetic", "focused", "calm", "happy", "cloudy"
  text: string;
}

export interface Goal {
  id: string;
  title: string;
  pillarId: PillarId;
  timeOfDay: TimeOfDay;
  effort: EffortLevel;
  targetDays: number;
  checks: Record<number, boolean>;      // Day number (1..31) -> completed
  notes: Record<number, CellNote>;      // Day number (1..31) -> micro-journal
}

export interface MonthData {
  id: string;                           // Format: "YYYY-MM", e.g. "2026-10"
  title: string;                        // e.g. "October 2026"
  shieldsUsed: Record<number, boolean>; // Protected Rest Days (max 3/month)
  goals: Goal[];
}

export interface AppState {
  activeMonthId: string;
  months: Record<string, MonthData>;
}
```

---

## 4. Pillar & Theme System
- **5 Life Pillars**: Health (`health`), Focus/Career (`career`), Grow/Learning (`learning`), Save/Finance (`finance`), Mind/Peace (`personal`).
- **7 Aesthetic Themes**: Sakura Zen, Matcha Garden, Celestial Nebula, Rainy Lo-Fi Café, Cyberpunk Horizon, Nordic Aurora, Sunset Mirage. Each provides unique particle physics, procedural mascot SVGs, color gradients, and coach personas.

---

## 5. Habit Goal Lifecycle & Management
- **Creation**: Habits are initialized with Title, Life Pillar, Preferred Time of Day, Effort Weight ($W_g \in [1..5]$), and Monthly Target Days ($T_g \in [1..D]$).
- **Tweaks / Editing**: Existing habits can be updated anytime from the frozen table column or Actions column. Modifying attributes immediately recalculates effort-weighted completion ratios and pacing diagnostics while preserving recorded checkmarks and micro-journal notes.
- **Removal / Deletion**: Habits can be removed directly via row quick actions or inside the tweak modal with confirmation prompts.
- **Checkmark Resets**: Mid-month resets allow clearing logged checkmarks for an individual habit while preserving configuration settings and micro-journal notes.

