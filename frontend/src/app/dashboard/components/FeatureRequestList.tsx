import { FeatureRequest } from "@/app/stores/featureRequestStore";

interface Props {
  requests: FeatureRequest[];
  onSelect: (request: FeatureRequest) => void;
  onPrioritize: () => void;
}

export const FeatureRequestList = ({ requests, onSelect, onPrioritize }: Props) => {
  return (
    <div className="flex flex-col col-span-2 space-y-4">
      <div className="sticky top-0 bg-white z-10">
        <p>Showing {requests.length} user submitted Ideas</p>
      </div>
      {requests.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid gap-4 flex-[1_1_0px] overflow-auto">
          {requests.map((request, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg border-stone-300 hover:bg-stone-100 transition cursor-pointer space-y-1"
              onClick={() => onSelect(request)}
            >
              <h3 className="font-semibold text-gray-800">{request.title}</h3>
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="bg-white z-10">
        <button
          className="bg-indigo-600 text-white p-4 w-full rounded-lg"
          onClick={onPrioritize}
        >
          Prioritize Ideas ⚡
        </button>
      </div>
    </div>
  );
};
