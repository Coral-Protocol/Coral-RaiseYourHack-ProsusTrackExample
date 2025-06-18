"use client"

import { useState } from "react"
import Waveform from "./Waveform"
import TranscriptionBubble from "./TranscriptionBubble"
import OrderSummary from "./OrderSummary"
import type { Message, OrderItem } from "./AgentInteraction"

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
  const [currentTranscription, setCurrentTranscription] = useState("")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  // Simulate voice recognition
  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate starting recording
      setTimeout(() => {
        const sampleTranscription = "I'd like to order a large pizza with pepperoni and a Coke"
        setCurrentTranscription(sampleTranscription)
        onMessage({
          speaker: "voice",
          content: sampleTranscription,
          type: "transcription",
        })

        // Simulate adding items to order
        const newItems: OrderItem[] = [
          { id: "1", name: "Large Pepperoni Pizza", quantity: 1, price: 18.99 },
          { id: "2", name: "Coca Cola", quantity: 1, price: 2.99 },
        ]
        setOrderItems(newItems)
        onOrderUpdate(newItems)
      }, 2000)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
      {/* Agent Avatar */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="text-3xl">👨‍🍳</div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Restaurant Assistant</h2>
        <p className="text-gray-600">Voice Assistant</p>
      </div>

      {/* Waveform */}
      <div className="mb-6">
        <Waveform isActive={isRecording} />
      </div>

      {/* Transcription */}
      {currentTranscription && (
        <div className="mb-6">
          <TranscriptionBubble text={currentTranscription} />
        </div>
      )}

      {/* Order Summary */}
      <div className="flex-1 mb-6">
        <OrderSummary items={orderItems} />
      </div>

      {/* Controls */}
      <div className="text-center">
        <button
          onClick={toggleRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {isRecording ? "⏹️" : "🎤"}
        </button>
        <p className="text-sm text-gray-600 mt-2">{isRecording ? "Recording..." : "Click to start"}</p>
      </div>
    </div>
  )
}
