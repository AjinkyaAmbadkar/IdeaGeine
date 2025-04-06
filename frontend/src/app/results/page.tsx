"use client";

import { useEffect } from "react";
// pages/ResultsPage.tsx or wherever your ResultsPage component lives
import { useFeatureRequestStore } from "../stores/featureRequestStore";
import { usePrioritizedFeatureStore } from "../stores/prioritizedFeatureStore";
import FeatureAnalysis from "./components/FeatureAnalysis";

const prePrioritizedFeatures = [
  {
    title: "Introducing an optional dark mode",
    description: "Introducing an optional dark mode",
    compositeScore: 8,
    costEfficiency: 9,
    userSatisfaction: 9,
    devComplexity: 3,
    justification:
      "The idea of introducing an optional dark mode is feasible within the given constraints and has potential benefits. It aligns well with user experience goals, especially for nighttime use, and can help reduce eye strain. The engineering hours required are likely to fall within the available range, and it does not seem overly resource-intensive.",
    resourceUtilization: {
      totalBudget: 100,
      lockedBudget: 30,
      featureBudget: 10,
    },
    radarData: {
      relative_score: 8,
      value_created: 7,
      overall_roi: 9,
      business_impact: 6,
      user_demand: 9,
    },
  },
  {
    title: "Implementing a product comparison feature",
    description: "Implementing a product comparison feature",
    compositeScore: 8,
    costEfficiency: 7,
    userSatisfaction: 8,
    devComplexity: 6,
    justification:
      "The product comparison feature has significant potential for improving user experience and driving revenue uplift, especially in an e-commerce context where informed decisions are crucial. Given the available engineering hours and budget constraints, it is feasible but tight. The estimated impact on retention could be substantial if implemented well, aligning closely with strategic business goals.",
    resourceUtilization: {
      totalBudget: 100,
      lockedBudget: 40,
      featureBudget: 20,
    },
    radarData: {
      relative_score: 8,
      value_created: 9,
      overall_roi: 8,
      business_impact: 8,
      user_demand: 7,
    },
  },
  {
    title: "Improving localization support",
    description: "Improving localization support",
    compositeScore: 8,
    costEfficiency: 8,
    userSatisfaction: 8,
    devComplexity: 5,
    justification:
      "The idea has strong potential to improve customer experience by addressing localization needs. It aligns well with user constraints regarding engineering hours, budget, and timeline. However, there are uncertainties around implementation risk, such as cross-team dependencies and integration challenges, which could affect the final score.",
    resourceUtilization: {
      totalBudget: 100,
      lockedBudget: 35,
      featureBudget: 15,
    },
    radarData: {
      relative_score: 7,
      value_created: 8,
      overall_roi: 7,
      business_impact: 7,
      user_demand: 8,
    },
  },
];

const ResultsPage = () => {
  const {
    setPrioritizedFeatures,
    prioritizedFeatures,
    selectedPrioritizedFeature,
    setSelectedPrioritizedFeature,
  } = usePrioritizedFeatureStore();

  const { topFeatureRequest } = useFeatureRequestStore();

  for (let i = 0; i < topFeatureRequest.length; i++) {
    prePrioritizedFeatures[i].compositeScore = topFeatureRequest[i].composite_score;
    prePrioritizedFeatures[i].justification = topFeatureRequest[i].justification;
    prePrioritizedFeatures[i].title = topFeatureRequest[i].idea_summary;
    prePrioritizedFeatures[i].description = topFeatureRequest[i].idea_summary;
    console.log("Top Feature Request:", prePrioritizedFeatures[i]);
  }

  useEffect(() => {
    setPrioritizedFeatures(prePrioritizedFeatures);
    setSelectedPrioritizedFeature(prePrioritizedFeatures[0]);
    console.log("Prioritized Features:", prioritizedFeatures);
    console.log("Selected Prioritized Feature:", selectedPrioritizedFeature);
  }, []);

  console.log("Top Feature Requests:", topFeatureRequest);


  const featureData = {
    title: "Improved Search Algorithm",
    description:
      "This feature improves the speed and accuracy of search results in the application.",
    compositeScore: 8,
    justification:
      "The LLM determined this feature to be important because it directly addresses user pain points and delivers significant business value.",
    radarData: {
      relative_score: 9,
      value_created: 8,
      overall_roi: 7,
      business_impact: 8,
      user_demand: 10,
    },
  };

  return (
    <div className="flex-[1_1_0px] flex flex-col items-center py-8  md:py-8 space-y-4 md:space-y-8">
      <section className="px-4 sm:px-6 lg:px-8 md:w-7xl max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold">Prioritization Results</h1>
          <p className="text-lg">here are your analyzed and prioritized user-submitted feature request</p>
        </div>
      </section>
      <div className="flex-[1_1_0px] overflow-hidden grid grid-cols-6 gap-4 md:w-7xl max-w-7xl px-8">
        <div className="flex flex-col col-span-2 space-y-4">
          <div className="sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold">Top 3 Ideas</h2>
          </div>
          {/* {requests.length === 0 && (
              <div className="flex-1 items-center justify-center flex">
                <p>Loading...</p>
              </div>
            )} */}
          {prioritizedFeatures && (
            <div className="flex flex-col gap-4 flex-[1_1_0px] overflow-auto">
              {prioritizedFeatures.map((request, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg border-stone-300 hover:bg-stone-100 transition cursor-pointer"
                  onClick={() => {
                    setSelectedPrioritizedFeature(request);
                    console.log("Selected Feature:", request);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div>
                      <p className="text-5xl font-extrabold">#{index + 1}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {request.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <div className="bg-white z-10">
            <button
              className="bg-indigo-600 text-white p-4 w-full rounded-lg"
              // onClick={handlePrioritizeClick}
            >
              Prioritize Ideas ⚡
            </button>
          </div> */}
        </div>
        <div className="col-span-4 flex flex-col overflow-auto">
          <div className="flex-[1_1_0px] overflow-auto">
            {selectedPrioritizedFeature && <FeatureAnalysis />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
