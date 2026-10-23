// ─────────────────────────────────────────────────────────────
// PlayPal — Platform abstraction barrel
// ─────────────────────────────────────────────────────────────

import { Platform } from 'react-native';

export { getKeyMap, resolveKey, isTVPlatform } from './keyMap';

export type PlatformType = 'fire_os' | 'vega_os' | 'development';

/**
 * Detect which platform we're running on.
 * In production, Fire OS reports as 'android'.
 * Vega OS will need its own detection — for now, any non-android TV is Vega.
 */
export function detectPlatform(): PlatformType {
  if (Platform.OS === 'android') {
    return 'fire_os';
  }
  if (Platform.isTV) {
    return 'vega_os';
  }
  return 'development';
}

/**
 * Get the backend proxy URL.
 * On device, this should point to the dev machine's LAN IP.
 * In development, localhost works.
 */
export function getBackendUrl(): string {
  if (Platform.OS === 'android') {
    // Android emulator uses 10.0.2.2 for host loopback
    return 'http://10.0.2.2:3001';
  }
  return 'http://localhost:3001';
}
