// ─────────────────────────────────────────────────────────────
// PlayPal — Typography scale for 10-foot UI
// Minimum body text 28px; headings large enough for couch distance
// ─────────────────────────────────────────────────────────────

import { TextStyle } from 'react-native';

export const typography = {
  /** Match score — enormous, attention-grabbing */
  score: {
    fontSize: 72,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 84,
  } as TextStyle,

  /** Screen titles */
  h1: {
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 52,
  } as TextStyle,

  /** Section headers */
  h2: {
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 44,
  } as TextStyle,

  /** Subsection headers */
  h3: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 38,
  } as TextStyle,

  /** Body text — the 28px minimum for 10-foot */
  body: {
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 38,
  } as TextStyle,

  /** Slightly larger body for emphasis */
  bodyLarge: {
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 42,
  } as TextStyle,

  /** Smaller supporting text (still readable at distance) */
  caption: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  } as TextStyle,

  /** Tiny labels, timestamps */
  label: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 28,
  } as TextStyle,

  /** Button text */
  button: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 36,
  } as TextStyle,

  /** Stat numbers */
  stat: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
  } as TextStyle,
} as const;

export type TypographyToken = typeof typography;
