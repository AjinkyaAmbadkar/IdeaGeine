import Image from "next/image";
import Link from "next/link";
import FAQSection from "./sections/faq";

export default function Home() {
  return (
    <div>
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-full flex justify-center ">
            <img
              src="https://em-content.zobj.net/source/microsoft-teams/337/genie_1f9de.png"
              alt=""
              className="h-[10rem]"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Turn Feedback into Features with <br />
            <span className=" text-indigo-600">IdeaGenie</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            IdeaGenie uses LLMs to identify the top 3 product ideas from your
            user-submitted feature requests—so you can build what truly matters.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Features built for Product Teams
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Everything you need to extract valuable insights from user feedback
            and drive roadmap decisions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
            <div>
              <h3 className="text-xl font-semibold text-indigo-600">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 mt-2">
                Automatically rank and summarize user requests using
                state-of-the-art large language models.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-600">
                Top 3 Idea Generator
              </h3>
              <p className="text-gray-600 mt-2">
                Focus your roadmap by seeing the 3 most impactful ideas your
                users are asking for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-600">
                Team Collaboration
              </h3>
              <p className="text-gray-600 mt-2">
                Invite team members, leave notes, and vote on top ideas to make
                informed product decisions together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            IdeaGenie simplifies your feature request process into 3 easy steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
            <div>
              <div className="text-indigo-600 font-bold text-2xl">1.</div>
              <h3 className="text-xl font-semibold mt-2">Collect Feedback</h3>
              <p className="text-gray-600 mt-2">
                Import or connect your existing feedback sources—emails, forms,
                support tickets.
              </p>
            </div>
            <div>
              <div className="text-indigo-600 font-bold text-2xl">2.</div>
              <h3 className="text-xl font-semibold mt-2">Let AI Analyze</h3>
              <p className="text-gray-600 mt-2">
                Our LLM-powered engine analyzes and identifies common themes &
                top ideas.
              </p>
            </div>
            <div>
              <div className="text-indigo-600 font-bold text-2xl">3.</div>
              <h3 className="text-xl font-semibold mt-2">Build What Matters</h3>
              <p className="text-gray-600 mt-2">
                Use the insights to prioritize and ship features your users
                truly want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
