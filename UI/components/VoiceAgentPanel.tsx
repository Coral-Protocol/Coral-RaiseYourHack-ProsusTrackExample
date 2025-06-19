"use client"

import { RestaurantVoiceAgent } from "./RestaurantVoiceAgent"
import type { Message, OrderItem } from "./AgentInteraction"
import "@livekit/components-styles"

interface VoiceAgentPanelProps {
  onMessage: (message: Omit<Message, "id" | "timestamp">) => void
  onOrderUpdate: (items: OrderItem[]) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void
}

export default function VoiceAgentPanel({
  onMessage,
  onOrderUpdate,
  isRecording,
  setIsRecording,
}: VoiceAgentPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      {/* Header */}
      <div className="text-center p-6 border-b border-gray-200">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="text-3xl">👨‍🍳</div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Restaurant Assistant</h2>
        <p className="text-gray-600">Voice Assistant</p>
      </div>

      {/* Restaurant Voice Agent */}
      <div className="flex-1 h-[calc(100%-140px)]">
        <RestaurantVoiceAgent />
      </div>
    </div>
  )
}
