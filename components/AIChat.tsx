// components/AIChat.tsx
"use client"

import React, { useState } from "react"

interface Teacher {
  id: string
  name: string
  subject: string
  bio: string
  avatar: string
}

interface Props {
  teachers: Teacher[]
}

interface Message {
  type: "user" | "ai"
  text: string
}

export default function AIChat({ teachers }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage: Message = { type: "user", text: input }
    setMessages(prev => [...prev, userMessage])

    // Simulated AI response
    const aiMessage: Message = {
      type: "ai",
      text: `AI suggests: For "${input}", consider reviewing materials from ${teachers
        .map(t => t.name)
        .join(", ")}.`,
    }

    setTimeout(() => {
      setMessages(prev => [...prev, aiMessage])
    }, 700)

    setInput("")
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="max-h-64 overflow-y-auto p-4 bg-white rounded-lg border border-gray-200">
        {messages.length === 0 && <p className="text-gray-400 text-sm">Ask a question to the AI...</p>}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              msg.type === "user" ? "bg-orange-100 self-end text-right" : "bg-gray-100 self-start text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:brightness-110 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}