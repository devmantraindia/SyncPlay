'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: Date
  isHost?: boolean
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Host',
      avatar: 'H',
      content: 'Welcome to the watch party! 🎉',
      timestamp: new Date(),
      isHost: true,
    },
    {
      id: '2',
      user: 'User1',
      avatar: 'U1',
      content: 'Hey everyone! Excited to watch together!',
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Math.random().toString(36).substring(7),
      user: 'You',
      avatar: 'Y',
      content: newMessage.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    inputRef.current?.focus()
  }

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
    setIsTyping(e.target.value.length > 0)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-3',
                message.user === 'You' && 'flex-row-reverse'
              )}
            >
              <div className="w-8 h-8 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center text-xs font-medium">
                {message.avatar}
              </div>
              <div className={cn(
                'flex-1',
                message.user === 'You' && 'flex flex-col items-end'
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {message.user}
                  </span>
                  {message.isHost && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                      Host
                    </span>
                  )}
                  <span className="text-xs text-white/40">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <div className={cn(
                  'inline-block px-4 py-2 rounded-2xl text-sm',
                  message.user === 'You'
                    ? 'gradient-bg text-white'
                    : 'bg-white/10 text-white/90'
                )}>
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-white/40 px-4"
          >
            Someone is typing...
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-white/10 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <button
            type="button"
            className="p-2 text-white/40 hover:text-white transition-colors"
            aria-label="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Message input"
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 gradient-bg rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
