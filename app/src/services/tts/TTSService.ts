// ─────────────────────────────────────────────────────────────
// PlayPal — TTS Service abstraction
// Text-to-Speech for reading AI answers aloud on TV.
//
// PLATFORM ADAPTERS:
// - Fire OS: Use @react-native-tts or Alexa TTS
// - Vega OS: Use Vega TTS API
// - Fallback: No-op (text is shown on screen)
// ─────────────────────────────────────────────────────────────

export interface TTSServiceInterface {
  /** Speak the given text aloud */
  speak(text: string): Promise<void>;

  /** Stop any current speech */
  stop(): void;

  /** Check if TTS is currently speaking */
  isSpeaking(): boolean;

  /** Set speech rate (0.5 = slow, 1.0 = normal, 1.5 = fast) */
  setRate(rate: number): void;
}

/**
 * MockTTSService — no-op fallback.
 * On platforms without TTS, the answer is shown on screen.
 * For demo purposes, we log to console.
 */
class MockTTSService implements TTSServiceInterface {
  private speaking = false;
  private rate = 1.0;

  async speak(text: string): Promise<void> {
    this.speaking = true;
    console.log(`[TTS] Speaking: "${text.substring(0, 80)}..."`);

    // Simulate speech duration based on text length and rate
    const wordsPerMinute = 150 * this.rate;
    const words = text.split(' ').length;
    const durationMs = (words / wordsPerMinute) * 60 * 1000;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.speaking = false;
        resolve();
      }, Math.min(durationMs, 5000)); // Cap at 5s for demo
    });
  }

  stop(): void {
    this.speaking = false;
  }

  isSpeaking(): boolean {
    return this.speaking;
  }

  setRate(rate: number): void {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
  }
}

export const ttsService: TTSServiceInterface = new MockTTSService();
