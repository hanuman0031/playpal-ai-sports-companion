// ─────────────────────────────────────────────────────────────
// PlayPal — Voice Service abstraction
// Provides a unified interface for voice input.
// Ships with a mock/keyboard fallback.
//
// PLATFORM ADAPTERS:
// - Fire OS: Replace with Alexa Voice Service SDK integration
// - Vega OS: Replace with Vega voice SDK
// ─────────────────────────────────────────────────────────────

export type VoiceState = 'idle' | 'listening' | 'processing' | 'error';

export interface VoiceResult {
  transcript: string;
  confidence: number;
}

export interface VoiceServiceInterface {
  /** Start listening for voice input */
  startListening(): Promise<void>;

  /** Stop listening */
  stopListening(): void;

  /** Get the current state */
  getState(): VoiceState;

  /** Register callback for when speech is recognized */
  onResult(callback: (result: VoiceResult) => void): void;

  /** Register callback for state changes */
  onStateChange(callback: (state: VoiceState) => void): void;

  /** Register callback for errors */
  onError(callback: (error: string) => void): void;

  /** Clean up */
  destroy(): void;
}

/**
 * MockVoiceService — keyboard-driven fallback for demos.
 * When "voice" is triggered, it prompts for text input.
 * In the real app UI, this shows an on-screen text field.
 */
export class MockVoiceService implements VoiceServiceInterface {
  private state: VoiceState = 'idle';
  private resultCallbacks: ((result: VoiceResult) => void)[] = [];
  private stateCallbacks: ((state: VoiceState) => void)[] = [];
  private errorCallbacks: ((error: string) => void)[] = [];
  private pendingInput: string | null = null;

  async startListening(): Promise<void> {
    this.setState('listening');
    // In mock mode, listening state is managed by the UI.
    // The UI shows a text input; when submitted, call submitText().
  }

  stopListening(): void {
    this.setState('idle');
  }

  /**
   * Submit text as if it were spoken.
   * Called by the UI when the user types a question.
   */
  submitText(text: string): void {
    if (!text.trim()) return;

    this.setState('processing');
    this.pendingInput = text.trim();

    // Simulate a brief processing delay
    setTimeout(() => {
      if (this.pendingInput) {
        const result: VoiceResult = {
          transcript: this.pendingInput,
          confidence: 1.0, // Mock always has perfect confidence
        };
        this.resultCallbacks.forEach((cb) => cb(result));
        this.pendingInput = null;
      }
      this.setState('idle');
    }, 300);
  }

  getState(): VoiceState {
    return this.state;
  }

  onResult(callback: (result: VoiceResult) => void): void {
    this.resultCallbacks.push(callback);
  }

  onStateChange(callback: (state: VoiceState) => void): void {
    this.stateCallbacks.push(callback);
  }

  onError(callback: (error: string) => void): void {
    this.errorCallbacks.push(callback);
  }

  destroy(): void {
    this.resultCallbacks = [];
    this.stateCallbacks = [];
    this.errorCallbacks = [];
    this.state = 'idle';
  }

  private setState(newState: VoiceState): void {
    this.state = newState;
    this.stateCallbacks.forEach((cb) => cb(newState));
  }
}

// ┌──────────────────────────────────────────────────────────┐
// │ PLUG IN REAL VOICE HERE:                                  │
// │                                                            │
// │ Fire OS — Alexa Voice Service:                             │
// │   export class AlexaVoiceService                           │
// │     implements VoiceServiceInterface { ... }               │
// │                                                            │
// │ Vega OS — Vega Voice SDK:                                  │
// │   export class VegaVoiceService                            │
// │     implements VoiceServiceInterface { ... }               │
// └──────────────────────────────────────────────────────────┘

// Default export — always safe to use
export const voiceService = new MockVoiceService();
