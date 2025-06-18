interface TranscriptionBubbleProps {
  text: string
}

export default function TranscriptionBubble({ text }: TranscriptionBubbleProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
        <span className="text-sm font-medium text-blue-800">Live Transcription</span>
      </div>
      <p className="text-gray-800">{text}</p>
    </div>
  )
}
