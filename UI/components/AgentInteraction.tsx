"use client"

import { useState } from "react"
import VoiceAgentPanel from "./VoiceAgentPanel"
import InterfaceAgentPanel from "./InterfaceAgentPanel"
import Link from "next/link"

export interface Message {
  id: string
  speaker: "voice" | "interface" | "user"
  content: string
  timestamp: Date
  type: "transcription" | "response" | "tool-call"
  metadata?: any
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

export default function AgentInteraction() {
  const [messages, setMessages] = useState<Message[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [messageCounter, setMessageCounter] = useState(0)

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${messageCounter}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setMessageCounter(prev => prev + 1)
  }

  const updateOrder = (items: OrderItem[]) => {
    setOrderItems(items)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Agent Interaction</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Agents Active</span>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid lg:grid-cols-2 gap-6 p-6 h-[calc(100vh-80px)]">
        {/* Left Panel - Voice Agent */}
        <VoiceAgentPanel
          onMessage={addMessage}
          onOrderUpdate={updateOrder}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />

        {/* Right Panel - Interface Agent */}
        <InterfaceAgentPanel messages={messages} orderItems={orderItems} onMessage={addMessage} />
      </div>
    </div>
  )
}
