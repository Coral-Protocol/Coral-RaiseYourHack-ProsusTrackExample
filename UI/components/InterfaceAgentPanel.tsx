"use client"

import { useState, useEffect } from "react"
import type { Message, OrderItem } from "./AgentInteraction"

interface InterfaceAgentPanelProps {
  messages: Message[]
  orderItems: OrderItem[]
  onMessage: (message: Omit<Message, "id" | "timestamp">) => void
}

export default function InterfaceAgentPanel({ messages, orderItems, onMessage }: InterfaceAgentPanelProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState("")

  useEffect(() => {
    // Generate suggestions based on current order
    if (orderItems.length > 0) {
      setSuggestions(["Add garlic bread for $3.99?", "Upgrade to combo meal?", "Try our new dessert special!"])
    }
  }, [orderItems])

  const handleSuggestionClick = (suggestion: string) => {
    onMessage({
      speaker: "interface",
      content: `Suggested: ${suggestion}`,
      type: "response",
    })
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onMessage({
        speaker: "user",
        content: inputMessage.trim(),
        type: "response",
      })
      setInputMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
      {/* Agent Avatar */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="text-3xl">🤖</div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Interface Agent</h2>
        <p className="text-gray-600">Text based Agent</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 mb-6 overflow-y-auto">
        <div className="space-y-4">
          {messages
            .filter((m) => m.speaker === "interface" || m.speaker === "user")
            .map((message) => (
              <div 
                key={message.id} 
                className={`rounded-lg p-4 ${
                  message.speaker === "user" 
                    ? "bg-gray-50 ml-8" 
                    : "bg-blue-50 mr-8"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    message.speaker === "user" 
                      ? "text-gray-800" 
                      : "text-blue-800"
                  }`}>
                    {message.speaker === "user" ? "User" : "Interface Agent"}
                  </span>
                  {message.speaker === "interface" && (
                    <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">Coral Protocol</span>
                  )}
                </div>
                <p className="text-gray-800">{message.content}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>

      {/* Order Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Smart Suggestions</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors cursor-pointer"
              >
                <span className="text-yellow-800">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
