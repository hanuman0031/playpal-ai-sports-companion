// ─────────────────────────────────────────────────────────────
// PlayPal — AI Service
// Calls the backend proxy for Claude API, with demo mode fallback.
// Every call has a timeout and never throws — returns AIResult.
// ─────────────────────────────────────────────────────────────

import {
  AIRequest,
  AIResult,
  ExplainResponse,
  QAResponse,
  HighlightsResponse,
  StatInsight,
  MatchContext,
} from '../../types';
import { getBackendUrl } from '../platform';
import {
  buildExplainPrompt,
  buildQAPrompt,
  buildHighlightsPrompt,
  buildInsightPrompt,
} from './prompts';
import {
  demoExplainResponses,
  findDemoQAResponse,
  demoCricketHighlights,
  demoFootballHighlights,
  demoStatInsights,
} from './demoResponses';

const API_TIMEOUT_MS = 8000;

class AIService {
  private demoMode: boolean;
  private backendUrl: string;

  constructor() {
    this.demoMode = true; // Default to demo mode for hackathon
    this.backendUrl = getBackendUrl();
  }

  setDemoMode(enabled: boolean): void {
    this.demoMode = enabled;
  }

  isDemoMode(): boolean {
    return this.demoMode;
  }

  setBackendUrl(url: string): void {
    this.backendUrl = url;
  }

  // ── Public API ──────────────────────────────────────────────

  async explain(ctx: MatchContext, lastEventType?: string): Promise<AIResult<ExplainResponse>> {
    if (this.demoMode) {
      return this.demoExplain(ctx, lastEventType);
    }
    return this.callBackend<ExplainResponse>({
      type: 'explain',
      context: ctx,
    });
  }

  async ask(ctx: MatchContext, question: string): Promise<AIResult<QAResponse>> {
    if (this.demoMode) {
      return this.demoAsk(question);
    }
    return this.callBackend<QAResponse>({
      type: 'ask',
      context: ctx,
      question,
    });
  }

  async highlights(ctx: MatchContext): Promise<AIResult<HighlightsResponse>> {
    if (this.demoMode) {
      return this.demoHighlights(ctx);
    }
    return this.callBackend<HighlightsResponse>({
      type: 'highlights',
      context: ctx,
    });
  }

  async playerInsight(
    ctx: MatchContext,
    playerId: string,
    playerName: string,
    playerStats: string,
  ): Promise<AIResult<StatInsight>> {
    if (this.demoMode) {
      return this.demoInsight(playerId, playerName);
    }
    return this.callBackend<StatInsight>({
      type: 'insight',
      context: ctx,
      playerId,
      playerStats,
    });
  }

  // ── Backend communication ───────────────────────────────────

  private async callBackend<T>(request: AIRequest): Promise<AIResult<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      const response = await fetch(`${this.backendUrl}/api/${request.type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as T;
      return { success: true, data, fromCache: false };
    } catch (error) {
      clearTimeout(timeoutId);
      const message = error instanceof Error ? error.message : 'Unknown error';

      // Auto-fallback to demo mode on network failure
      console.warn(`[AIService] Backend call failed, falling back to demo: ${message}`);

      if (request.type === 'explain') {
        return this.demoExplain(request.context) as unknown as AIResult<T>;
      }
      if (request.type === 'ask') {
        return this.demoAsk(request.question ?? '') as unknown as AIResult<T>;
      }
      if (request.type === 'highlights') {
        return this.demoHighlights(request.context) as unknown as AIResult<T>;
      }
      return {
        success: false,
        error: `AI unavailable: ${message}`,
        fromCache: false,
      };
    }
  }

  // ── Demo mode handlers ──────────────────────────────────────

  private demoExplain(ctx: MatchContext, lastEventType?: string): AIResult<ExplainResponse> {
    const sportResponses = demoExplainResponses[ctx.sport] ?? demoExplainResponses.cricket;
    const response = sportResponses[lastEventType ?? 'default'] ?? sportResponses.default;
    return { success: true, data: response, fromCache: true };
  }

  private demoAsk(question: string): AIResult<QAResponse> {
    const response = findDemoQAResponse(question);
    return { success: true, data: response, fromCache: true };
  }

  private demoHighlights(ctx: MatchContext): AIResult<HighlightsResponse> {
    const data = ctx.sport === 'cricket' ? demoCricketHighlights : demoFootballHighlights;
    return { success: true, data, fromCache: true };
  }

  private demoInsight(playerId: string, playerName: string): AIResult<StatInsight> {
    const cached = demoStatInsights[playerId];
    if (cached) {
      return { success: true, data: cached, fromCache: true };
    }
    return {
      success: true,
      data: {
        playerId,
        playerName,
        insight: `${playerName} is putting in a solid performance today and contributing to the team effort.`,
        statLine: 'Stats updating...',
      },
      fromCache: true,
    };
  }
}

// Singleton
export const aiService = new AIService();
