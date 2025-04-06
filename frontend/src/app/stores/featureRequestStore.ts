// stores/featureRequestStore.ts
import { create } from "zustand";

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  // status: string;
  // submittedBy: string;
  // date: string;
}

interface FeatureRequestDiff {
  idea_id: number;
  idea_summary: string;
  composite_score: number;
  justification: string;
  // status: string;
  // submittedBy: string;
  // date: string;
}

interface FeatureRequestStore {
  requests: FeatureRequest[];
  topFeatureRequest: FeatureRequestDiff[];
  selectedRequest: FeatureRequest | null;
  setRequests: (requests: FeatureRequest[]) => void;
  setTopFeatureRequests: (requests: FeatureRequestDiff[]) => void;
  selectRequest: (request: FeatureRequest) => void;
  clearSelectedRequest: () => void;
}

export const useFeatureRequestStore = create<FeatureRequestStore>((set) => ({
  requests: [],
  topFeatureRequest: [],
  selectedRequest: null,
  setRequests: (requests) => set({ requests }),
  setTopFeatureRequests: (requests) => set({ topFeatureRequest: requests }),
  selectRequest: (request) => set({ selectedRequest: request }),
  clearSelectedRequest: () => set({ selectedRequest: null }),
}));

export type { FeatureRequest };
