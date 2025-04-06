import { create } from "zustand";

interface RadarData {
  relative_score: number;
  value_created: number;
  overall_roi: number;
  business_impact: number;
  user_demand: number;
}

interface ResourceUtilization {
  totalBudget: number;
  lockedBudget: number;
  featureBudget: number;
}

export interface PrioritizedFeature {
  title: string;
  description: string;
  compositeScore: number;
  costEfficiency: number;
  userSatisfaction: number;
  devComplexity: number;
  justification: string;
  resourceUtilization: ResourceUtilization;
  radarData: RadarData;
}

interface PrioritizedFeatureStore {
  prioritizedFeatures: PrioritizedFeature[];
  selectedPrioritizedFeature: PrioritizedFeature | null;
  setPrioritizedFeatures: (features: PrioritizedFeature[]) => void;
  addPrioritizedFeature: (feature: PrioritizedFeature) => void;
  clearPrioritizedFeatures: () => void;
  setSelectedPrioritizedFeature: (feature: PrioritizedFeature | null) => void;
}

export const usePrioritizedFeatureStore = create<PrioritizedFeatureStore>((set) => ({
  prioritizedFeatures: [],
  selectedPrioritizedFeature: null,
  setPrioritizedFeatures: (features) => set({ prioritizedFeatures: features }),
  addPrioritizedFeature: (feature) =>
    set((state) => ({
      prioritizedFeatures: [...state.prioritizedFeatures, feature],
    })),
  clearPrioritizedFeatures: () => set({ prioritizedFeatures: [], selectedPrioritizedFeature: null }),
  setSelectedPrioritizedFeature: (feature) => set({ selectedPrioritizedFeature: feature }),
}));
