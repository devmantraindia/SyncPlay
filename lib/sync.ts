// Synchronization utilities for video playback
// Ready for real-time integration with backend

export interface SyncState {
  isPlaying: boolean
  currentTime: number
  timestamp: number
}

export class VideoSync {
  private latency: number = 0
  private syncThreshold: number = 0.5 // seconds

  calculateOffset(serverTime: number, clientTime: number): number {
    this.latency = serverTime - clientTime
    return this.latency
  }

  shouldSync(serverState: SyncState, clientState: SyncState): boolean {
    const timeDiff = Math.abs(serverState.currentTime - clientState.currentTime)
    const playStateChanged = serverState.isPlaying !== clientState.isPlaying
    
    return timeDiff > this.syncThreshold || playStateChanged
  }

  getAdjustedTime(serverTime: number): number {
    return serverTime + (Date.now() - serverTime) / 1000
  }
}

export const videoSync = new VideoSync()
