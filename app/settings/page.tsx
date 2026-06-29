'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Moon, Sun, Bell, Lock, User, 
  Globe, Shield, Palette, Volume2 
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    soundEffects: true,
    autoplay: false,
    showTyping: true,
    compactMode: false,
    language: 'en',
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-white/60">Customize your SyncPlay experience</p>
          </div>

          <div className="space-y-6">
            {/* Appearance */}
            <Card hover={false}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-white/60">Use dark theme</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('darkMode')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.darkMode ? 'bg-purple-500' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={settings.darkMode}
                    aria-label="Toggle dark mode"
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-white/60">Reduce spacing and size</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('compactMode')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.compactMode ? 'bg-purple-500' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={settings.compactMode}
                    aria-label="Toggle compact mode"
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.compactMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Notifications */}
            <Card hover={false}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-400" />
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-white/60">Get notified when friends join</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('notifications')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications ? 'bg-purple-500' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={settings.notifications}
                    aria-label="Toggle notifications"
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sound Effects</p>
                    <p className="text-sm text-white/60">Play sounds for events</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('soundEffects')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.soundEffects ? 'bg-purple-500' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={settings.soundEffects}
                    aria-label="Toggle sound effects"
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Privacy */}
            <Card hover={false}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Privacy
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Online Status</p>
                    <p className="text-sm text-white/60">Let friends see when you're online</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('showTyping')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.showTyping ? 'bg-purple-500' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={settings.showTyping}
                    aria-label="Toggle online status"
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.showTyping ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Account */}
            <Card hover={false}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Account
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Display Name"
                  defaultValue="User"
                  leftIcon={<User className="w-4 h-4" />}
                />
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button variant="danger" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button size="lg">
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
