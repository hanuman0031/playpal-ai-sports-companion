// ─────────────────────────────────────────────────────────────
// PlayPal — AI response state store (Zustand)
// Tracks loading states, responses, and history for AI features.
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand';
import { ExplainResponse, QAResponse, HighlightsResponse, StatInsight } from '../types';

interface AIStore {
  // ── Explain This ──────────────────────────────────────────
  explainLoading: boolean;
  explainResponse: ExplainResponse | null;
  explainError: string | null;

  // ── Voice Q&A ─────────────────────────────────────────────
  qaLoading: boolean;
  qaResponse: QAResponse | null;
  qaError: string | null;
  qaHistory: Array<{ question: string; answer: string; timestamp: number }>;

  // ── Highlights ────────────────────────────────────────────
  highlightsLoading: boolean;
  highlightsResponse: HighlightsResponse | null;
  highlightsError: string | null;

  // ── Stat Insights ─────────────────────────────────────────
  insightLoading: boolean;
  currentInsight: StatInsight | null;
  insightError: string | null;

  // ── Actions ───────────────────────────────────────────────
  setExplainLoading: (loading: boolean) => void;
  setExplainResponse: (response: ExplainResponse | null, error?: string) => void;
  setQALoading: (loading: boolean) => void;
  setQAResponse: (question: string, response: QAResponse | null, error?: string) => void;
  setHighlightsLoading: (loading: boolean) => void;
  setHighlightsResponse: (response: HighlightsResponse | null, error?: string) => void;
  setInsightLoading: (loading: boolean) => void;
  setInsightResponse: (insight: StatInsight | null, error?: string) => void;
  clearAll: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  explainLoading: false,
  explainResponse: null,
  explainError: null,

  qaLoading: false,
  qaResponse: null,
  qaError: null,
  qaHistory: [],

  highlightsLoading: false,
  highlightsResponse: null,
  highlightsError: null,

  insightLoading: false,
  currentInsight: null,
  insightError: null,

  setExplainLoading: (loading) =>
    set({ explainLoading: loading, explainError: null }),

  setExplainResponse: (response, error) =>
    set({
      explainResponse: response,
      explainLoading: false,
      explainError: error ?? null,
    }),

  setQALoading: (loading) =>
    set({ qaLoading: loading, qaError: null }),

  setQAResponse: (question, response, error) =>
    set((state) => ({
      qaResponse: response,
      qaLoading: false,
      qaError: error ?? null,
      qaHistory: response
        ? [
            ...state.qaHistory,
            {
              question,
              answer: response.answer,
              timestamp: Date.now(),
            },
          ]
        : state.qaHistory,
    })),

  setHighlightsLoading: (loading) =>
    set({ highlightsLoading: loading, highlightsError: null }),

  setHighlightsResponse: (response, error) =>
    set({
      highlightsResponse: response,
      highlightsLoading: false,
      highlightsError: error ?? null,
    }),

  setInsightLoading: (loading) =>
    set({ insightLoading: loading, insightError: null }),

  setInsightResponse: (insight, error) =>
    set({
      currentInsight: insight,
      insightLoading: false,
      insightError: error ?? null,
    }),

  clearAll: () =>
    set({
      explainResponse: null,
      explainError: null,
      qaResponse: null,
      qaError: null,
      highlightsResponse: null,
      highlightsError: null,
      currentInsight: null,
      insightError: null,
    }),
}));
