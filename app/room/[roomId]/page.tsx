'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, 
  Minimize, SkipBack, SkipForward, Settings,
  PictureInPicture2, Subtitles, Clock
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chat from '@/components/Chat'
import Participants from '@/components/Participants'
import VideoUploader from '@/components/VideoUploader'
import { formatTime } from '@/lib/utils'

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const [videoSrc, setVideoSrc] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat')

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleVideoSelect = (file: File) => {
    const url = URL.createObjectURL(file)
    setVideoSrc(url)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = vol
      setVolume(vol)
      if (vol === 0) {
        setIsMuted(true)
        videoRef.current.muted = true
      } else {
        setIsMuted(false)
        videoRef.current.muted = false
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handlePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const currentIndex = speeds.indexOf(playbackSpeed)
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length]
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed
      setPlaybackSpeed(nextSpeed)
    }
  }

  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture()
      }
    } catch (error) {
      console.error('PiP failed:', error)
    }
  }

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card hover={false} className="overflow-hidden">
              <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden">
                {videoSrc ? (
                  <>
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      className="w-full aspect-video"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onClick={togglePlay}
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <input
                          type="range"
                          min="0"
                          max={duration || 0}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          aria-label="Video progress"
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Skip Back */}
                          <button
                            onClick={() => skipTime(-10)}
                            className="text-white/80 hover:text-white transition-colors"
                            aria-label="Skip back 10 seconds"
                          >
                            <SkipBack className="w-4 h-4" />
                          </button>

                          {/* Play/Pause */}
                          <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? (
                              <Pause className="w-5 h-5" fill="currentColor" />
                            ) : (
                              <Play className="w-5 h-5" fill="currentColor" />
                            )}
                          </button>

                          {/* Skip Forward */}
                          <button
                            onClick={() => skipTime(10)}
                            className="text-white/80 hover:text-white transition-colors"
                            aria-label="Skip forward 10 seconds"
                          >
                            <SkipForward className="w-4 h-4" />
                          </button>

                          {/* Volume */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={toggleMute}
                              className="text-white/80 hover:text-white transition-colors"
                              aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                              {isMuted || volume === 0 ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
                              aria-label="Volume"
                            />
                          </div>

                          {/* Time Display */}
                          <span className="text-sm text-white/60">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Subtitles */}
                          <button
                            onClick={() => setShowSubtitles(!showSubtitles)}
                            className={`p-2 rounded-lg transition-colors ${
                              showSubtitles ? 'bg-purple-500/20 text-purple-400' : 'text-white/80 hover:text-white'
                            }`}
                            aria-label="Toggle subtitles"
                          >
                            <Subtitles className="w-4 h-4" />
                          </button>

                          {/* Playback Speed */}
                          <button
                            onClick={handlePlaybackSpeed}
                            className="px-2 py-1 rounded text-sm text-white/80 hover:text-white transition-colors"
                            aria-label="Change playback speed"
                          >
                            {playbackSpeed}x
                          </button>

                          {/* Settings */}
                          <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                            aria-label="Settings"
                          >
                            <Settings className="w-4 h-4" />
                          </button>

                          {/* Picture in Picture */}
                          <button
                            onClick={togglePiP}
                            className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                            aria-label="Picture in picture"
                          >
                            <PictureInPicture2 className="w-4 h-4" />
                          </button>

                          {/* Fullscreen */}
                          <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                          >
                            {isFullscreen ? (
                              <Minimize className="w-4 h-4" />
                            ) : (
                              <Maximize className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <VideoUploader onVideoSelect={handleVideoSelect} />
                  </div>
                )}
              </div>
            </Card>

            {/* Room Info */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Room: {params.roomId}</h1>
                <p className="text-sm text-white/60">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Created just now
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full gradient-bg border-2 border-background flex items-center justify-center text-xs font-medium"
                    >
                      U{i}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center text-xs">
                    +2
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Tabs */}
            <Card hover={false} className="p-1">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'chat'
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('participants')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'participants'
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Participants (5)
                </button>
              </div>
            </Card>

            {/* Content */}
            <Card hover={false} className="h-[500px] overflow-hidden">
              {activeTab === 'chat' ? <Chat /> : <Participants />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
