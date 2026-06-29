import { io, Socket } from 'socket.io-client'

// This is a placeholder for future backend integration
// Currently configured for static export compatibility
class SocketManager {
  private socket: Socket | null = null
  private serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

  connect() {
    if (this.socket?.connected) return this.socket
    
    try {
      this.socket = io(this.serverUrl, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })
      
      this.socket.connect()
      return this.socket
    } catch (error) {
      console.warn('Socket connection failed - running in offline mode:', error)
      return null
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getSocket(): Socket | null {
    return this.socket
  }
}

export const socketManager = new SocketManager()
