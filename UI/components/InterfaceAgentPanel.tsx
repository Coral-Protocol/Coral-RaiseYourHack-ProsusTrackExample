"use client"

import { useState, useEffect, useRef } from "react"
import type { Message, OrderItem } from "./AgentInteraction"

interface InterfaceAgentPanelProps {
  messages: Message[]
  orderItems: OrderItem[]
  onMessage: (message: Omit<Message, "id" | "timestamp">) => void
}

// API endpoint configuration
const API_ENDPOINT = "http://localhost:8000"

export default function InterfaceAgentPanel({ messages, orderItems, onMessage }: InterfaceAgentPanelProps) {
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Poll for agent questions
  useEffect(() => {
    let isPolling = true;

    const pollForQuestions = async () => {
      while (isPolling) {
        try {
          const response = await fetch(`${API_ENDPOINT}/agent/question`)
          
          if (response.status === 200) {
            const data = await response.json()
            // Add agent's question to chat
            onMessage({
              speaker: "interface",
              content: data.question,
              type: "response",
            })
          } else if (response.status !== 204) {
            console.error("Error polling for questions:", response.statusText)
          }
        } catch (error) {
          console.error("Error polling for questions:", error)
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    pollForQuestions()
    return () => {
      isPolling = false
    }
  }, [onMessage])

  const sendToAPI = async (text: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_ENDPOINT}/agent/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending message to API:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = inputMessage.trim()
      
      // Add user message to chat
      onMessage({
        speaker: "user",
        content: userMessage,
        type: "response",
      })
      
      setInputMessage("")

      try {
        // Send to API
        await sendToAPI(userMessage)
      } catch (error) {
        onMessage({
          speaker: "interface",
          content: "Error: Could not send response to the agent. Please try again.",
          type: "response",
        })
      }
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
        {isLoading && (
          <div className="mt-2">
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Processing...</span>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 mb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-96 min-h-0 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="space-y-4">
          {messages
            .filter((m) => m.speaker === "interface" || m.speaker === "user")
            .map((message) => (
              <div 
                key={message.id} 
                className={`rounded-lg p-4 ${
                  message.speaker === "user" 
                    ? "bg-white ml-8 shadow-sm" 
                    : "bg-blue-50 mr-8 shadow-sm"
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
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
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
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}
