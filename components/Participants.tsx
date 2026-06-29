'use client'

import { motion } from 'framer-motion'
import { Crown, Mic, MicOff, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Participant {
  id: string
  name: string
  avatar: string
  isHost: boolean
  isSpeaking: boolean
  isMuted: boolean
  joinTime: string
}

const participants: Participant[] = [
  {
    id: '1',
    name: 'Host User',
    avatar: 'HU',
    isHost: true,
    isSpeaking: true,
    isMuted: false,
    joinTime: '5 min ago',
  },
  {
    id: '2',
    name: 'Alice',
    avatar: 'AL',
    isHost: false,
    isSpeaking: false,
    isMuted: true,
    joinTime: '3 min ago',
  },
  {
    id: '3',
    name: 'Bob',
    avatar: 'BO',
    isHost: false,
    isSpeaking: true,
    isMuted: false,
    joinTime: '2 min ago',
  },
  {
    id: '4',
    name: 'Charlie',
    avatar: 'CH',
    isHost: false,
    isSpeaking: false,
    isMuted: false,
    joinTime: '1 min ago',
  },
  {
    id: '5',
    name: 'Diana',
    avatar: 'DI',
    isHost: false,
    isSpeaking: false,
    isMuted: true,
    joinTime: 'Just now',
  },
]

export default function Participants() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-1">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5',
              participant.isSpeaking && 'bg-purple-500/10 border border-purple-500/20'
            )}
          >
            {/* Avatar */}
            <div className="relative">
              <div className={cn(
                'w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-sm font-medium',
                participant.isSpeaking && 'ring-2 ring-purple-500 animate-glow'
              )}>
                {participant.avatar}
              </div>
              {participant.isHost && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {participant.name}
                </span>
                {participant.isHost && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                    Host
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {participant.isMuted ? (
                  <MicOff className="w-3 h-3 text-red-400" />
                ) : (
                  <Mic className="w-3 h-3 text-green-400" />
                )}
                <span className="text-xs text-white/40">
                  {participant.joinTime}
                </span>
              </div>
            </div>

            {/* Speaking Indicator */}
            {participant.isSpeaking && (
              <div className="flex gap-1 items-end h-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="w-0.5 bg-purple-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
            )}

            <button
              className="p-1 text-white/40 hover:text-white transition-colors"
              aria-label="Participant options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
