# LessonLens Developer Handoff Guide

This document outlines the component architecture, design tokens, and implementation details for the **LessonLens** hackathon prototype.

---

## 1. Design System Tokens (Tailwind CSS)

### Color Palette
- **Primary:** `{{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_4}}.colors.primary` (#6366f1 - Indigo)
- **Secondary:** `{{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_4}}.colors.secondary` (#ec4899 - Pink/Coral)
- **Surface:** `{{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_4}}.colors.surface` (#f8f9ff - Off-white)
- **Accents:** 
  - Emerald (Success): `#10b981`
  - Amber (Warning/Metric): `#f59e0b`
  - Sky Blue (Info): `#0ea5e9`

### Typography
- **Headings (Poppins/Nunito):** `font-bold tracking-tight text-on-surface`
- **Body (Inter/System):** `font-normal text-on-surface-variant`
- **Labels:** `font-medium uppercase tracking-wider text-xs`

### UI primitives
- **Card Radius:** `rounded-3xl` (24px)
- **Shadows:** `shadow-xl shadow-indigo-500/5` (Soft, colored shadows)
- **Button Radius:** `rounded-2xl` (16px)
- **Spacing:** Standard Tailwind scale (`gap-4`, `p-6`, `mb-8`)

---

## 2. Component Architecture

### `Layout`
- **Wrapper:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Navigation:** Sticky `TopAppBar` with glassmorphism (`backdrop-blur-md bg-white/80`).

### `Hero`
- **Structure:** 2-column grid on desktop, single column on mobile.
- **Visuals:** Floating cards with `animate-float` (custom CSS keyframes).
- **Primary CTA:** Gradient button (`bg-gradient-to-r from-indigo-600 to-violet-600`).

### `HowItWorks`
- **Structure:** 3-column flex/grid.
- **Visuals:** Numbered badges with connecting dashed lines (visible on desktop).

### `TranscriptInput`
- **Components:** `Textarea`, `CharacterCount`, `ActionButtons`.
- **States:** 
  - `Empty`: Show helper icon and text.
  - `Filled`: Handle `onChange` to update character count and button visibility.

### `LoadingState`
- **Animation:** Multi-stage sequence using a simple state array or `useEffect` interval.
- **Visuals:** Progress bar + dynamic status text labels.

### `FeedbackCard` (The "Scorecard")
- **Header:** `ClassroomSnapshot` (Full-width card).
- **Grid:** 2x2 grid for `FeedbackMetricCard` elements.
- **Highlight:** `TryThisTomorrow` (Distinct color/border to emphasize importance).
- **Footer:** `OneThingYouDidWell` and `EncouragementBadge`.

### `FeedbackMetricCard`
- **Props:** `title`, `badgeLabel`, `evidence`, `coachingNote`, `variant` (color-coded).

---

## 3. Interaction & Mobile Behavior

- **Mobile:** All grids stack vertically (`grid-cols-1`).
- **Touch:** Buttons feature `active:scale-95` transitions.
- **Responsiveness:** Maintain `px-4` margins on small screens to preserve card breathing room.

---

## 4. Implementation Notes (Next.js/TypeScript)

```typescript
interface FeedbackMetric {
  title: string;
  rating: 'Clear' | 'Medium' | 'Recall-based';
  evidence: string;
  coachingNote: string;
}

interface FeedbackData {
  snapshot: string;
  metrics: FeedbackMetric[];
  strength: string;
  tomorrowTip: {
    title: string;
    tip: string;
    example: string;
  };
}
```

*Ensure all gradients use Tailwind's `from-x`, `via-y`, `to-z` utilities for consistency.*