// ─────────────────────────────────────────────────────────────
// PlayPal — Spacing, layout, and safe-area tokens
// ─────────────────────────────────────────────────────────────

export const spacing = {
  /** Safe area inset from screen edges (TV overscan compensation) */
  safeArea: {
    horizontal: 48,
    vertical: 27,
  },

  /** Base spacing unit = 8px */
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  /** Focus ring dimensions */
  focusRing: {
    width: 4,
    offset: 4,
    radius: 12,
  },

  /** Card dimensions */
  card: {
    padding: 24,
    radius: 16,
    gap: 16,
  },

  /** Screen layout */
  screen: {
    width: 1920,
    height: 1080,
    maxContentWidth: 1824,  // 1920 - 2*48
  },
} as const;

export const animation = {
  /** Focus transition duration (ms) */
  focusDuration: 150,

  /** Content slide-in duration (ms) */
  slideDuration: 300,

  /** Score update pulse duration (ms) */
  pulseDuration: 600,

  /** Scale factor when focused */
  focusScale: 1.05,

  /** Scale factor when pressed */
  pressScale: 0.98,
} as const;

export type SpacingToken = typeof spacing;
export type AnimationToken = typeof animation;
