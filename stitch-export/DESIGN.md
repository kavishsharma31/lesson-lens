---
name: Vibrant Pedagogy
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#8127cf'
  on-secondary: '#ffffff'
  secondary-container: '#9c48ea'
  on-secondary-container: '#fffbff'
  tertiary: '#00628d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007cb1'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Nunito Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-lg:
    fontFamily: Nunito Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered to transform the analytical process of classroom observation into an encouraging, gamified experience. Targeting government school teachers and hackathon judges, the aesthetic balances high-level professional utility with a warm, approachable personality.

The style is **Modern Playful**, utilizing vibrant warm gradients, generous white space, and soft elevation to move away from traditional, intimidating administrative software. It evokes an emotional response of support and optimism, ensuring that AI-driven feedback feels like a helpful coach rather than a critical overseer.

## Colors

This design system employs a wide, vibrant palette to categorize different classroom metrics and insights. 

- **Primary & Secondary:** Indigo and Violet form the core professional base, used for primary navigation and main actions.
- **Supportive Accents:** Sky Blue (Focus), Emerald (Success), Amber (Attention), and Coral/Pink (Energy) are used to color-code AI insights and gamified progress trackers.
- **Gradients:** Use "Warm-Hero" for primary buttons and headers. Use "Energy-Boost" for high-impact call-to-actions and "Calm-Focus" for positive reinforcement modules.
- **Surface:** A very light, tinted off-white (#FAFAFF) is used for the background to keep the interface feeling soft and less clinical than pure white.

## Typography

The typographic scale prioritizes friendliness and extreme legibility.

- **Headings:** Nunito Sans provides a rounded, organic feel that reduces the "standard corporate" look. Bold weights (700-800) should be used for all headers to maintain a strong hierarchy.
- **Body:** Inter is used for data-heavy sections and AI descriptions to ensure clarity at smaller sizes.
- **Scale:** High contrast between Heading and Body sizes is encouraged to guide the teacher’s eye through long observation reports quickly.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to prevent the interface from feeling "cramped" or "stressful."

- **Desktop:** 12-column grid, 24px gutters, 80px side margins.
- **Mobile:** 4-column grid, 16px gutters, 20px side margins.
- **Philosophy:** Use "Stack" spacing (multiples of 8px) to group related AI insights together. Use large `stack-lg` gaps between different observation sessions to provide visual "breathing room."
- **Content Max-Width:** Dashboard content should be capped at 1200px to maintain readability of text-based feedback.

## Elevation & Depth

This design system uses **Multi-layered Ambient Shadows** to create a sense of softness and physical presence.

- **Low Elevation (Level 1):** Used for cards and secondary buttons. A soft, wide-spread shadow: `0 4px 20px rgba(99, 102, 241, 0.05)`.
- **High Elevation (Level 2):** Used for active AI modals and hovering state of cards. A more pronounced, tinted shadow: `0 12px 32px rgba(99, 102, 241, 0.12)`.
- **Depth Technique:** Surfaces are not just white; they utilize subtle 1px inner strokes in a lighter shade of the primary color (20% opacity) to define edges without using harsh borders.

## Shapes

The shape language is extremely approachable, utilizing **2xl (1rem/16px)** as the standard for all containers and cards.

- **Cards:** Use `rounded-2xl` (16px) for main content areas.
- **Badges/Chips:** Must always be **Pill-shaped** (full radius) to reinforce the gamified, friendly aesthetic.
- **Interactive Elements:** Buttons utilize a slightly smaller radius (12px) than cards to appear more "clickable" and contained.

## Components

### Buttons & CTAs
- **Primary:** Gradient fill (Warm-Hero) with white text and a subtle Level 1 shadow. On hover, the shadow deepens to Level 2.
- **Secondary:** Transparent background with a 2px Indigo border and Indigo text.
- **High-Contrast CTA:** Use the "Energy-Boost" (Amber to Pink) gradient for "Start Observation" or "View Critical Insight" actions.

### Progress & Gamification
- **Observation Rings:** Use thick, rounded strokes for circular progress indicators.
- **Badges:** Pill-shaped with low-opacity background tints (e.g., Emerald text on 10% Emerald background) for status updates like "Excellent Student Engagement."

### Input Fields
- **Styling:** Large 16px padding, 12px border-radius, and a very light gray border (#E2E8F0).
- **Focus State:** The border transitions to Indigo with a soft outer glow (4px spread, 10% Indigo).

### Cards
- **Insight Cards:** Should have a colored "accent tab" (4px thick) on the left side indicating the category (e.g., Blue for "Voice Modulation," Amber for "Pacing").
- **Shadows:** Always apply Level 1 shadows to cards to make them pop against the #FAFAFF background.

### Lists
- **Observation Feed:** Items should be separated by whitespace and light shadows rather than horizontal lines to keep the UI clean and airy.