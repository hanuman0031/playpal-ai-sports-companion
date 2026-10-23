// ─────────────────────────────────────────────────────────────
// PlayPal — Platform key map adapter
// Maps remote-control key codes to logical actions.
// Fire OS uses Android KeyEvent codes; Vega OS uses its own.
// ─────────────────────────────────────────────────────────────

import { Platform } from 'react-native';

export type LogicalKey =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'select'
  | 'back'
  | 'menu'
  | 'play_pause'
  | 'voice'
  | 'rewind'
  | 'fast_forward';

/**
 * Android TV / Fire OS key codes (from Android KeyEvent)
 * These are the values that come through in React Native's onKeyDown.
 */
const FIRE_OS_KEY_MAP: Record<number, LogicalKey> = {
  19: 'up',           // KEYCODE_DPAD_UP
  20: 'down',         // KEYCODE_DPAD_DOWN
  21: 'left',         // KEYCODE_DPAD_LEFT
  22: 'right',        // KEYCODE_DPAD_RIGHT
  23: 'select',       // KEYCODE_DPAD_CENTER
  66: 'select',       // KEYCODE_ENTER
  4: 'back',          // KEYCODE_BACK
  82: 'menu',         // KEYCODE_MENU
  85: 'play_pause',   // KEYCODE_MEDIA_PLAY_PAUSE
  // Fire TV voice button triggers Alexa, not a key event
  89: 'rewind',       // KEYCODE_MEDIA_REWIND
  90: 'fast_forward', // KEYCODE_MEDIA_FAST_FORWARD
};

/**
 * Vega OS key codes (placeholder — update with actual Vega SDK values)
 * Structured identically so the rest of the app doesn't care.
 */
const VEGA_OS_KEY_MAP: Record<number, LogicalKey> = {
  38: 'up',           // Arrow Up
  40: 'down',         // Arrow Down
  37: 'left',         // Arrow Left
  39: 'right',        // Arrow Right
  13: 'select',       // Enter
  27: 'back',         // Escape
  77: 'menu',         // M key
  32: 'play_pause',   // Space
  86: 'voice',        // V key — keyboard fallback for voice
  188: 'rewind',      // < key
  190: 'fast_forward', // > key
};

/**
 * Returns the platform-appropriate key map.
 * On development (web/desktop), uses the Vega map which maps to keyboard keys.
 */
export function getKeyMap(): Record<number, LogicalKey> {
  if (Platform.OS === 'android') {
    return FIRE_OS_KEY_MAP;
  }
  // Vega OS, iOS dev, or web — use keyboard-friendly map
  return VEGA_OS_KEY_MAP;
}

/**
 * Resolve a raw keyCode to a LogicalKey, or undefined if unmapped.
 */
export function resolveKey(keyCode: number): LogicalKey | undefined {
  return getKeyMap()[keyCode];
}

/**
 * Check if the current platform is a TV platform.
 */
export function isTVPlatform(): boolean {
  return Platform.isTV || Platform.OS === 'android';
}
