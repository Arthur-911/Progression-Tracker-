# Monthly Progression Tracker: Architecture & Data Model Specification

## 1. Executive Summary
The **Monthly Progression Tracker** is a goal-execution dashboard organized on a 30-day horizon. Unlike standard to-do lists, it calculates progress using **effort-weighted tasks**, supports **milestone counters** and **subtask checklists**, tracks **time pacing vs. actual progress**, and groups goals into **life pillars**.

---

## 2. Core Mathematical Model

### A. Task Completion Ratio ($R_t$)
Each task $t$ has a completion ratio $R_t \in [0, 1]$ depending on its type:

1. **Binary Checkbox (`binary`)**:
   - $R_t = 1$ if completed, $0$ otherwise.

2. **Numeric Counter (`counter`)**:
   - $R_t = \min(1.0, \text{current} / \text{target})$

3. **Milestone Checklist (`checklist`)**:
   - $R_t = \text{completed subtasks} / \text{total subtasks}$

### B. Effort Weighting & Progress Percentage
Each task is assigned an effort level $W_t \in \{1, 2, 3, 4, 5\}$:
- **1 Point**: Quick win (< 1-2 hours or simple habit)
- **2 Points**: Minor project / multi-day errand
- **3 Points**: Standard monthly commitment (~10-15 hours)
- **4 Points**: Substantial focus project
- **5 Points**: High-stakes / core monthly milestone

The **Overall Month Completion Percentage** is:
$$\text{Month Progress} = \left( \frac{\sum_{t \in \text{Tasks}} (R_t \times W_t)}{\sum_{t \in \text{Tasks}} W_t} \right) \times 100$$

### C. Calendar Pacing & Velocity Metric
- Target Pacing % = (Day of Month / Total Days in Month) * 100
- Delta = Month Progress % - Target Pacing %
- Ahead of Pace (Green): Delta >= +5%
- On Track (Blue): -5% <= Delta < +5%
- Slightly Behind (Amber): -15% <= Delta < -5%
- Action Needed (Red): Delta < -15%

---

## 3. Data Schema

```typescript
export type TaskType = 'binary' | 'counter' | 'checklist';
export type EffortLevel = 1 | 2 | 3 | 4 | 5;

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  pillarId: string;
  title: string;
  description?: string;
  type: TaskType;
  effort: EffortLevel; // 1 to 5 points
  completed?: boolean;
  current?: number;
  target?: number;
  unit?: string;
  subtasks?: Subtask[];
  createdAt: string;
}

export interface Pillar {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface MonthRecord {
  id: string; // e.g. "2026-09"
  title: string;
  tasks: Task[];
}
```
