"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does IdeaGenie identify the top 3 ideas?",
    answer:
      "We use advanced LLMs (Large Language Models) that analyze user feedback to find patterns, rank themes, and extract the 3 most recurring, impactful suggestions.",
  },
  {
    question: "Can I import my existing feedback?",
    answer:
      "Yes! We support CSV uploads and integrations with popular tools like Intercom, Slack, Notion, and more.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Absolutely. We offer a 14-day free trial with full access—no credit card required.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100%. We take data privacy seriously and follow industry-standard encryption and access control practices.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                className="w-full text-left px-4 py-4 flex justify-between items-center"
              >
                <h4 className="font-semibold text-gray-800">{faq.question}</h4>
                <span className="text-indigo-600 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
