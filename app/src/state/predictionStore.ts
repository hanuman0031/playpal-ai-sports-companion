// ─────────────────────────────────────────────────────────────
// PlayPal — Prediction mini-game store (Zustand)
// Family members, predictions, and leaderboard.
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand';
import {
  FamilyMember,
  Prediction,
  PredictionOption,
  MemberPrediction,
  LeaderboardEntry,
} from '../types';

// ── Default family members ──────────────────────────────────

const DEFAULT_FAMILY: FamilyMember[] = [
  { id: 'p1', name: 'Dad', avatar: '👨', color: '#3B82F6' },
  { id: 'p2', name: 'Mom', avatar: '👩', color: '#EC4899' },
  { id: 'p3', name: 'Kid 1', avatar: '👦', color: '#10B981' },
  { id: 'p4', name: 'Kid 2', avatar: '👧', color: '#F59E0B' },
];

// ── Prediction templates ────────────────────────────────────

const CRICKET_PREDICTIONS: PredictionOption[] = [
  { id: 'dot', label: 'Dot Ball', emoji: '⭕' },
  { id: 'single', label: '1-2 Runs', emoji: '🏃' },
  { id: 'boundary', label: 'Boundary (4)', emoji: '4️⃣' },
  { id: 'six', label: 'SIX!', emoji: '6️⃣' },
  { id: 'wicket', label: 'Wicket!', emoji: '🔴' },
];

const FOOTBALL_PREDICTIONS: PredictionOption[] = [
  { id: 'goal', label: 'Goal!', emoji: '⚽' },
  { id: 'save', label: 'Save', emoji: '🧤' },
  { id: 'foul', label: 'Foul', emoji: '🟨' },
  { id: 'miss', label: 'Miss', emoji: '❌' },
  { id: 'corner', label: 'Corner', emoji: '🚩' },
];

interface PredictionStore {
  // ── State ─────────────────────────────────────────────────
  familyMembers: FamilyMember[];
  currentPrediction: Prediction | null;
  memberPredictions: MemberPrediction[];
  allPredictions: MemberPrediction[];
  leaderboard: LeaderboardEntry[];
  activeMemberIndex: number;
  isPredictionOpen: boolean;

  // ── Actions ───────────────────────────────────────────────
  setFamilyMembers: (members: FamilyMember[]) => void;
  createPrediction: (sport: 'cricket' | 'football', context: string) => void;
  submitPrediction: (memberId: string, optionId: string) => void;
  resolvePrediction: (correctOptionId: string) => void;
  nextMember: () => void;
  previousMember: () => void;
  closePrediction: () => void;
  resetLeaderboard: () => void;
}

let predictionSeq = 0;

export const usePredictionStore = create<PredictionStore>((set, get) => ({
  familyMembers: DEFAULT_FAMILY,
  currentPrediction: null,
  memberPredictions: [],
  allPredictions: [],
  leaderboard: DEFAULT_FAMILY.map((m) => ({
    member: m,
    score: 0,
    streak: 0,
    totalPredictions: 0,
    correctPredictions: 0,
  })),
  activeMemberIndex: 0,
  isPredictionOpen: false,

  setFamilyMembers: (members) =>
    set({
      familyMembers: members,
      leaderboard: members.map((m) => ({
        member: m,
        score: 0,
        streak: 0,
        totalPredictions: 0,
        correctPredictions: 0,
      })),
    }),

  createPrediction: (sport, context) => {
    const options = sport === 'cricket' ? CRICKET_PREDICTIONS : FOOTBALL_PREDICTIONS;
    const prediction: Prediction = {
      id: `pred-${++predictionSeq}`,
      matchEventContext: context,
      question: sport === 'cricket'
        ? 'What happens on the next ball?'
        : 'What happens next in the match?',
      options,
      deadline: Date.now() + 15000, // 15 seconds to decide
    };
    set({
      currentPrediction: prediction,
      memberPredictions: [],
      activeMemberIndex: 0,
      isPredictionOpen: true,
    });
  },

  submitPrediction: (memberId, optionId) => {
    const mp: MemberPrediction = {
      memberId,
      predictionId: get().currentPrediction?.id ?? '',
      selectedOptionId: optionId,
      timestamp: Date.now(),
    };
    set((state) => ({
      memberPredictions: [...state.memberPredictions, mp],
    }));
  },

  nextMember: () =>
    set((state) => ({
      activeMemberIndex: Math.min(
        state.activeMemberIndex + 1,
        state.familyMembers.length - 1,
      ),
    })),

  previousMember: () =>
    set((state) => ({
      activeMemberIndex: Math.max(state.activeMemberIndex - 1, 0),
    })),

  resolvePrediction: (correctOptionId) => {
    const { memberPredictions, leaderboard, currentPrediction } = get();
    if (!currentPrediction) return;

    const updatedLeaderboard = leaderboard.map((entry) => {
      const memberPred = memberPredictions.find(
        (mp) => mp.memberId === entry.member.id,
      );
      if (!memberPred) return entry;

      const isCorrect = memberPred.selectedOptionId === correctOptionId;
      return {
        ...entry,
        totalPredictions: entry.totalPredictions + 1,
        correctPredictions: entry.correctPredictions + (isCorrect ? 1 : 0),
        score: entry.score + (isCorrect ? (entry.streak + 1) * 10 : 0),
        streak: isCorrect ? entry.streak + 1 : 0,
      };
    });

    set({
      leaderboard: updatedLeaderboard.sort((a, b) => b.score - a.score),
      currentPrediction: { ...currentPrediction, correctOptionId },
      allPredictions: [...get().allPredictions, ...memberPredictions],
    });
  },

  closePrediction: () => set({ isPredictionOpen: false }),

  resetLeaderboard: () =>
    set((state) => ({
      leaderboard: state.familyMembers.map((m) => ({
        member: m,
        score: 0,
        streak: 0,
        totalPredictions: 0,
        correctPredictions: 0,
      })),
      allPredictions: [],
    })),
}));
