"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardGrid from "../sections/dashboard-panel";
import {
  FeatureRequest,
  useFeatureRequestStore,
} from "../stores/featureRequestStore";
import { useRouter } from "next/navigation";
import { FeatureRequestDetailPopup } from "./components/FeatureRequestDetailPopup";
import { ProcessingPopup } from "./components/ProcessingPopup";
import axios from "axios";

const featureRequests: FeatureRequest[] = [
  {
    id: 1,
    title: "Introduce Optional Dark Mode",
    description:
      "Introduce an optional dark mode in the mobile app to reduce eye strain during night-time use.",
  },
  {
    id: 2,
    title: "Allow Customers Checkout",
    description:
      "Allow customers to checkout without creating an account.",
  },
  {
    id: 31,
    title: "Show Prices",
    description:
      "Show prices in the user's local currency and support popular local payment methods.",
  },
  {
    id: 32,
    title: "Implement Product Comparison",
    description:
      "Implement a product comparison feature where users can select multiple products and see their specifications side by side.",
  },
  {
    id: 30,
    title: "Improve App Performance",
    description:
      "Optimize the mobile application for faster loading times and smoother scrolling. Improving app performance, especially for users on older devices or slower networks, would decrease bounce rates and enhance user satisfaction.",
  },
  {
    id: 35,
    title: "Enable Pre Order",
    description:
      "Enable a pre-order option for popular items that are currently out of stock, allowing customers to reserve the product to be delivered once it’s available again.",
  },
  {
    id: 36,
    title: "Allow Users Follow",
    description:
      "Allow users to follow their favorite brands or sellers on the platform and receive notifications or a feed of new product releases or deals from those brands.",
  },
  {
    id: 37,
    title: "Allow Mobile App",
    description:
      "Allow the mobile app to cache key pages or the user's wishlist/cart for offline access.",
  },
  {
    id: 38,
    title: "Integrate Buy Now",
    description:
      "Integrate a Buy Now, Pay Later (BNPL) payment option at checkout.",
  },
  {
    id: 39,
    title: "Introduce Gamified Badge",
    description:
      "Introduce a gamified badge system where users earn badges or titles for achieving certain milestones.",
  },
  {
    id: 40,
    title: "Add Feature Product",
    description:
      "Add a feature on product pages where customers can provide feedback on how an item fits.",
  },
  {
    id: 44,
    title: "Offer Personalized Shopping Assistant",
    description:
      "Offer a personalized shopping assistant via chat that helps users find products based on their preferences.",
  }
];


const Dashboard = () => {
  const router = useRouter();

  const {
    requests,
    selectRequest,
    setRequests,
    selectedRequest,
  } = useFeatureRequestStore();

  useEffect(() => {
    setRequests(featureRequests);
    selectRequest(featureRequests[0]);
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeatureRequestDetail, setShowFeatureRequestDetail] =
    useState(false);

  const handlePrioritizeClick = async () => {
    setIsProcessing(true);
  };

  return (
    <>
      <div className="flex-[1_1_0px] flex flex-col items-center py-8  md:py-8 space-y-4 md:space-y-8">
        <section className="px-4 sm:px-6 lg:px-8 md:w-7xl max-w-7xl">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="">
              Welcome to your IdeaGenie dashboard. Below, you'll find the list
              of feature requests submitted by users. Prioritize the most
              impactful ones!
            </p>
          </div>
        </section>
        <div className="flex-[1_1_0px] overflow-hidden grid grid-cols-6 gap-4 md:w-7xl max-w-7xl px-8">
          <div className="flex flex-col col-span-2 space-y-4">
            <div className="sticky top-0 bg-white z-10">
              <p>Showing {requests.length} user submitted Ideas</p>
            </div>
            {requests.length === 0 && (
              <div className="flex-1 items-center justify-center flex">
                <p>Loading...</p>
              </div>
            )}
            {requests && (
              <div className="grid gap-4 flex-[1_1_0px] overflow-auto">
                {requests.map((request, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg border-stone-300 hover:bg-stone-100 transition cursor-pointer space-y-1"
                    onClick={() => {
                      selectRequest(request);
                      setShowFeatureRequestDetail(true);
                    }}
                  >
                    <h3 className="font-semibold text-gray-800">
                      {request.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {request.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-white z-10">
              <button
                className="bg-indigo-600 text-white p-4 w-full rounded-lg"
                onClick={handlePrioritizeClick}
              >
                Prioritize Ideas ⚡
              </button>
            </div>
          </div>
          <div className="col-span-4 overflow-auto">
            <DashboardGrid />
          </div>
        </div>
      </div>

      {/* Popups */}
      <ProcessingPopup
        isOpen={isProcessing}
        onClose={() => setIsProcessing(false)}
      />

      <FeatureRequestDetailPopup
        isOpen={showFeatureRequestDetail}
        request={selectedRequest}
        onClose={() => {
          setShowFeatureRequestDetail(false);
          // clearSelectedRequest?.();
        }}
      />
    </>
  );
};

export default Dashboard;
