import { FeatureRequest } from "@/app/stores/featureRequestStore";
import { motion, AnimatePresence } from "framer-motion"; // Make sure this type exists

interface Props {
  isOpen: boolean;
  request: FeatureRequest | null;
  onClose: () => void;
}

export const FeatureRequestDetailPopup = ({
  isOpen,
  request,
  onClose,
}: Props) => (
  <AnimatePresence>
    {isOpen && request && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#00000030] backdrop-blur-md flex justify-center items-center z-30"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white p-4 rounded-lg shadow-lg md:w-96 w-[28rem] max-h-[90vh] overflow-y-auto"
        >
          <h2 className="mb-2">Feature Request Details</h2>
          <div className="mt-4 text-gray-800">
            <p className="text-xl">
              <strong>{request.title}</strong>
            </p>
            <p className="leading-5">{request.description}</p>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
