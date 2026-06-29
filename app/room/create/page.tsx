'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Play, Users, Lock, Globe, Copy, Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { generateRoomId } from '@/lib/utils'

export default function CreateRoomPage() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [maxParticipants, setMaxParticipants] = useState(10)
  const [isCreating, setIsCreating] = useState(false)
  const [copied, setCopied] = useState(false)

  const roomId = generateRoomId()

  const handleCreateRoom = async () => {
    setIsCreating(true)
    
    // Simulate room creation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, this would connect to backend
    router.push(`/room/${roomId}`)
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
              <Play className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Create a <span className="gradient-text">Watch Room</span>
            </h1>
            <p className="text-lg text-white/60">
              Set up your room and invite friends to watch together
            </p>
          </div>

          <Card hover={false} className="space-y-6">
            {/* Room Name */}
            <Input
              label="Room Name"
              placeholder="Enter room name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              leftIcon={<Play className="w-4 h-4" />}
            />

            {/* Room ID */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Room ID
              </label>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60">
                  {roomId}
                </div>
                <Button
                  variant="secondary"
                  onClick={copyRoomId}
                  leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Privacy Setting */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">
                Room Privacy
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsPrivate(false)}
                  className={`p-4 rounded-xl border transition-all ${
                    !isPrivate
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Globe className={`w-6 h-6 mb-2 ${!isPrivate ? 'text-purple-400' : 'text-white/40'}`} />
                  <div className="text-sm font-medium">Public</div>
                  <div className="text-xs text-white/40 mt-1">Anyone can join</div>
                </button>
                <button
                  onClick={() => setIsPrivate(true)}
                  className={`p-4 rounded-xl border transition-all ${
                    isPrivate
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Lock className={`w-6 h-6 mb-2 ${isPrivate ? 'text-purple-400' : 'text-white/40'}`} />
                  <div className="text-sm font-medium">Private</div>
                  <div className="text-xs text-white/40 mt-1">Invite only</div>
                </button>
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Max Participants
              </label>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white/40" />
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-white/60 min-w-[3rem] text-center">
                  {maxParticipants}
                </span>
              </div>
            </div>

            {/* Create Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleCreateRoom}
              isLoading={isCreating}
              disabled={!roomName}
            >
              Create Room
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
