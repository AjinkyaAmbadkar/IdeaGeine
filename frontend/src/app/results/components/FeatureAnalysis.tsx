import { usePrioritizedFeatureStore } from "@/app/stores/prioritizedFeatureStore";
import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

// Interface for the feature analysis props
interface FeatureAnalysisProps {
  title: string;
  description: string;
  compositeScore: number;
  justification: string;
  radarData: {
    relative_score: number;
    value_created: number;
    overall_roi: number;
    business_impact: number;
    user_demand: number;
  };
}

const FeatureAnalysis = () => {
  const { selectedPrioritizedFeature } = usePrioritizedFeatureStore();
  // Data for the radar chart

  const radarDataArray = [
    { attribute: "Relative Score", score: selectedPrioritizedFeature?.radarData.relative_score },
    { attribute: "Value Created", score: selectedPrioritizedFeature?.radarData.value_created },
    { attribute: "Overall ROI", score: selectedPrioritizedFeature?.radarData.overall_roi },
    { attribute: "Business Impact", score: selectedPrioritizedFeature?.radarData.business_impact },
    { attribute: "User Demand", score: selectedPrioritizedFeature?.radarData.user_demand },
  ];

  
  const budgetData = [
    {
      name: "Budget Overview",
      Available: selectedPrioritizedFeature?.resourceUtilization.totalBudget! - selectedPrioritizedFeature?.resourceUtilization.lockedBudget! - selectedPrioritizedFeature?.resourceUtilization.featureBudget!,
      Locked: selectedPrioritizedFeature?.resourceUtilization.lockedBudget!,
      "This Feature": selectedPrioritizedFeature?.resourceUtilization.featureBudget!,
    },
  ];

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-2xl font-bold sticky top-0 bg-white">Analysis</h2>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl">#{selectedPrioritizedFeature!.title}</h2>
          <p className="text-lg">{selectedPrioritizedFeature!.description}</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-indigo-100">
            <p className="font-bold">Composite Score</p>
            <p className="text-xl font-extrabold">{selectedPrioritizedFeature!.compositeScore}/10</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-100">
            <p className="font-bold">Cost Efficency</p>
            <p className="text-xl font-extrabold">{selectedPrioritizedFeature!.costEfficiency}/10</p>
          </div>
          <div className="p-4 rounded-lg bg-green-100">
            <p className="font-bold">User Satisfaction</p>
            <p className="text-xl font-extrabold">{selectedPrioritizedFeature!.userSatisfaction}/10</p>
          </div>
          <div className="p-4 rounded-lg bg-pink-100">
            <p className="font-bold">Dev. Complexity</p>
            <p className="text-xl font-extrabold">{selectedPrioritizedFeature!.devComplexity}/10</p>
          </div>
        </div>
        <div className="justification">
          <h4 className="text-xl font-bold">Justification</h4>
          <p className="">{selectedPrioritizedFeature!.justification}</p>
        </div>

        {/* Radar Chart */}
        <div className="grid">
          <div className="col-span-3">
            <div>
              <p className="text-xl font-bold">Relevency Score</p>
            </div>
            <RadarChart
              outerRadius={90}
              width={400}
              height={300}
              data={radarDataArray}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="attribute" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar
                name="Feature Attributes"
                dataKey="score"
                stroke="#4f39f6"
                fill="#7c86ff"
                fillOpacity={0.6}
              />
              <Tooltip />
              {/* <Legend /> */}
            </RadarChart>
          </div>
          <div className="col-span-3">
            <div>
              <p className="text-xl font-bold">Resource Utilization</p>
            </div>
          </div>
        </div>

        {/* Horizontal Bar Chart - Budget */}
        <div className="mb-6">
          <BarChart
            layout="vertical"
            width={600}
            height={100}
            data={budgetData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Locked" fill="#ec003f" stackId="a">
              <LabelList
                dataKey="Locked"
                position="insideRight"
                style={{ fill: "#ffffff" }}
              />
            </Bar>
            <Bar dataKey="This Feature" fill="#fd9a00" stackId="a">
              <LabelList
                dataKey="This Feature"
                position="insideRight"
                style={{ fill: "#ffffff" }}
              />
            </Bar>
            <Bar dataKey="Available" fill="#00c951" stackId="a">
              <LabelList
                dataKey="Available"
                position="insideRight"
                style={{ fill: "#ffffff" }}
              />
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default FeatureAnalysis;
