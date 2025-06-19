import { useTextStream } from "@livekit/components-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TranscriptionBubble() {
  const { textStreams } = useTextStream("agent");
  const latestTranscription = textStreams[textStreams.length - 1];

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <AnimatePresence mode="popLayout">
        {latestTranscription && (
          <motion.div
            key={latestTranscription.timestamp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg mb-4 ${
              latestTranscription.from === "agent"
                ? "bg-blue-100 text-blue-900 ml-auto"
                : "bg-gray-100 text-gray-900 mr-auto"
            } max-w-[80%]`}
          >
            <p className="text-sm font-medium">
              {latestTranscription.from === "agent" ? "Restaurant Assistant" : "You"}
            </p>
            <p className="mt-1">{latestTranscription.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
