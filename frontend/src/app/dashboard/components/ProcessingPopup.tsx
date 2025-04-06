"use client";
import { useFeatureRequestStore } from "@/app/stores/featureRequestStore";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const engHoursOptions = ["50-100", "150-300", "300-450", "450-600", "600+"];
const budgetOptions = [
  "<10000",
  "10000-20000",
  "20000-30000",
  "30000-40000",
  ">40000",
];
const teamsOptions = ["2", "3", "4", "5", ">5"];
const timelineOptions = ["1-2", "2-4", "4-6", "6-8", "8-12"];
const focusAreaOptions = [
  "Customer Experience",
  "Operational Efficiency",
  "Risk Reduction",
  "Innovation",
];

export const ProcessingPopup = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  const [stage, setStage] = useState<"form" | "processing">("form");
  const [messages, setMessages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    available_eng_hrs: "",
    available_budget: "",
    teams_available: "",
    expected_timeline: "",
    priority_focus: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { setTopFeatureRequests } = useFeatureRequestStore();

  const fakeMessages = [
    "Processing feature requests...",
    "Analyzing each use case...",
    "Determining ROI for each feature...",
    "Assessing user impact...",
    "Ranking based on relevance...",
    "Finalizing prioritization...",
    "Updating dashboard...",
    "Prioritization inprogress!",
  ];

  const handleSubmit = async () => {
    setStage("processing");

    fakeMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages([message]);
      }, index * 1000);
    });

    try {
      console.log("Form data:", formData);
      const res = await axios.post(
        "http://10.0.0.252:4600/get_top_ideas",
        formData
      );
      console.log("Response received:", res.data);
      setTopFeatureRequests(res.data);
      console.log("Top ideas:", res.data);
      onClose();
      router.push("/results");
      // optionally update messages based on response
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#00000030] backdrop-blur-md flex justify-center items-center z-30"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-8 rounded-lg shadow-lg md:w-96 w-[20rem]"
          >
            {stage === "form" ? (
              <>
                <h2 className="text-xl font-semibold text-center mb-4">
                  Provide Input
                </h2>
                <div className="space-y-3">
                  <SelectField
                    label="Available Engineering Hours"
                    value={formData.available_eng_hrs}
                    options={engHoursOptions}
                    onChange={(val) => handleChange("available_eng_hrs", val)}
                  />
                  <SelectField
                    label="Available Budget"
                    value={formData.available_budget}
                    options={budgetOptions}
                    onChange={(val) => handleChange("available_budget", val)}
                  />
                  <SelectField
                    label="Number of Available Teams"
                    value={formData.teams_available}
                    options={teamsOptions}
                    onChange={(val) => handleChange("teams_available", val)}
                  />
                  <SelectField
                    label="Expected Timeline"
                    value={formData.expected_timeline}
                    options={timelineOptions}
                    onChange={(val) => handleChange("expected_timeline", val)}
                  />
                  <SelectField
                    label="Priority Focus Area"
                    value={formData.priority_focus}
                    options={focusAreaOptions}
                    onChange={(val) => handleChange("priority_focus", val)}
                  />
                </div>
                <div className="mt-6 text-center space-x-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full"
                  >
                    Submit
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-600 border border-gray-300 px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-center">
                  Processing...
                </h2>
                <div className="mt-4 space-y-2 flex items-center space-x-2">
                  <div className="w-6 h-6 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                  <div>
                    {messages.map((message, index) => (
                      <p key={index} className="text-gray-700 text-center">
                        {message}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={onClose}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
