"use client";

import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useFeatureRequestStore } from "../stores/featureRequestStore";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a29bfe"];

const alignmentData = [
  { name: "Dark Mode", score: 85 },
  { name: "Analytics Dashboard", score: 60 },
  { name: "Slack Integration", score: 92 },
];

const costEffortData = [
  { name: "Dark Mode", time: 30, cost: 1500 },
  { name: "Analytics Dashboard", time: 80, cost: 5000 },
  { name: "Slack Integration", time: 45, cost: 2500 },
];

const audienceData = [
  { name: "Small Biz", value: 12 },
  { name: "Enterprise", value: 8 },
  { name: "Freelancers", value: 5 },
];

const priorityData = [
  { name: "Dark Mode", reach: 8, impact: 9, effort: 3 },
  { name: "Analytics Dashboard", reach: 6, impact: 8, effort: 7 },
  { name: "Slack Integration", reach: 7, impact: 7, effort: 4 },
];

const DashboardGrid = () => {

  return (
    <div className="space-y-4">
      <div>
        <p>Analysis report for user submitted feqture requests</p>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {/* Alignment Score */}
        <div className="col-span-3 row-span-1 border border-stone-300 p-4 rounded-lg bg-white">
          <h2 className="font-semibold text-lg mb-2">
            Feature Alignment Score
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alignmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost & Effort */}
        <div className="col-span-3 row-span-1 border border-stone-300 p-4 rounded-lg bg-white">
          <h2 className="font-semibold text-lg mb-2">
            Estimated Cost & Effort
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={costEffortData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="#82ca9d" name="Time (hrs)" />
              <Bar dataKey="cost" fill="#ffc658" name="Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Audience Fit */}
        <div className="col-span-2 row-span-1 border border-stone-300 p-4 rounded-lg bg-white">
          <h2 className="font-semibold text-lg mb-2">Target Audience Fit</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => name}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Smart Prioritization */}
        <div className="col-span-4 row-span-1 border border-stone-300  p-4 rounded-lg bg-white">
          <h2 className="font-semibold text-lg mb-2">
            Smart Prioritization (ICE)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="reach" name="Reach" />
              <YAxis dataKey="impact" name="Impact" />
              <ZAxis dataKey="effort" range={[60, 300]} name="Effort" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Features" data={priorityData} fill="#ff7f50" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
