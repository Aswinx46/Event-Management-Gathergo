"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCheck } from "lucide-react"
import type { MessageTypeFromBackend as Message } from "@/types/MessageTypeFromBackend"

interface ChatProps {
  messages: Message[]
  sendMessage: (message: string) => void
  currentUserId: string // to know if the message is sent by this user
  topMessageRef?: (node: HTMLDivElement | null) => void
}

const Chat = ({ messages, sendMessage, currentUserId, topMessageRef }: ChatProps) => {
  const [message, setMessage] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" })
    }, 0) // delay ensures the DOM is rendered before scrolling

    return () => clearTimeout(timeout) // cleanup just in case
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      sendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
      className="max-w-2xl mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-black to-zinc-900 border border-white/10 backdrop-blur-sm"
    >
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
          Chat
        </h2>
      </div>

      <div className="h-[500px] overflow-y-auto mb-6 p-4 bg-black/50 rounded-xl shadow-inner relative backdrop-blur-sm">
        <AnimatePresence>
          {messages.map((msg, index) => {
            const isUser = msg.senderId === currentUserId
            const isFirstMessage = index === 0
            const formattedTime = new Date(msg.sendedTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
                className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
                ref={isFirstMessage ? topMessageRef : null}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`
                    max-w-[70%] rounded-2xl px-4 py-3 shadow-lg
                    ${
                      isUser
                        ? "bg-gradient-to-r from-zinc-800 to-zinc-700 text-white rounded-br-none"
                        : "bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-bl-none"
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed">{msg.messageContent}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 ${
                      isUser ? "text-zinc-300" : "text-zinc-400"
                    }`}
                  >
                    <span className="text-xs">{formattedTime}</span>
                    {isUser && msg.seen && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCheck size={12} className="text-zinc-300" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div ref={bottomRef} className="h-0" /> {/* Invisible element for scrolling */}
        {messages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
      >
        <div className="flex items-center gap-2 bg-zinc-900/50 p-2 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-black/50 border border-zinc-800 focus:outline-none focus:border-white/20 text-zinc-100 placeholder-zinc-500"
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#27272a" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-white p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-white/5"
          >
            <Send size={20} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default Chat
