// ─────────────────────────────────────────────────────────────
// PlayPal — Color palette (dark theme, 10-foot UI optimized)
// High contrast ratios for viewing at 8-12 feet distance
// ─────────────────────────────────────────────────────────────

export const colors = {
  // ── Backgrounds ───────────────────────────────────────────
  bg: {
    primary: '#0A0E1A',        // deep navy — main background
    secondary: '#111827',      // slightly lighter panels
    tertiary: '#1F2937',       // cards, overlays
    overlay: 'rgba(10, 14, 26, 0.92)',  // modal backdrop
  },

  // ── Text ──────────────────────────────────────────────────
  text: {
    primary: '#F9FAFB',        // white — headings, scores
    secondary: '#D1D5DB',      // light gray — body text
    tertiary: '#9CA3AF',       // muted — timestamps, labels
    inverse: '#0A0E1A',        // dark text on light bg
  },

  // ── Accent / Brand ────────────────────────────────────────
  accent: {
    primary: '#3B82F6',        // electric blue — primary actions
    secondary: '#8B5CF6',      // violet — secondary actions
    success: '#10B981',        // green — positive events
    warning: '#F59E0B',        // amber — caution
    danger: '#EF4444',         // red — wickets, red cards
    info: '#06B6D4',           // cyan — info, stats
  },

  // ── Sport-specific accents ────────────────────────────────
  cricket: {
    boundary: '#10B981',       // green for 4s and 6s
    wicket: '#EF4444',         // red for wickets
    dot: '#6B7280',            // gray for dot balls
  },

  football: {
    goal: '#10B981',           // green for goals
    card: '#F59E0B',           // yellow for cards
    redCard: '#EF4444',        // red card
  },

  // ── Focus states ──────────────────────────────────────────
  focus: {
    ring: '#3B82F6',           // blue focus ring
    glow: 'rgba(59, 130, 246, 0.4)',  // soft glow behind focused item
    activeRing: '#8B5CF6',     // violet when pressed/selected
  },

  // ── Gradients (as arrays for LinearGradient) ──────────────
  gradients: {
    header: ['#1E3A5F', '#0A0E1A'],
    card: ['#1F2937', '#111827'],
    scoreBar: ['#1E40AF', '#7C3AED'],
    highlight: ['#064E3B', '#0A0E1A'],
    danger: ['#991B1B', '#0A0E1A'],
  },
} as const;

export type ColorToken = typeof colors;
