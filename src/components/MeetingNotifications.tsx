import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Bell, UserPlus, UserMinus, Hand, Mic, MicOff } from 'lucide-react'

interface NotificationData {
  id: string
  type: 'user_joined' | 'user_left' | 'hand_raised' | 'mute_changed' | 'recording_started'
  message: string
  timestamp: Date
  user?: string
}

export default function MeetingNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  // Simulate real-time notifications
  useEffect(() => {
    const simulateNotifications = () => {
      const notificationTypes = [
        { type: 'user_joined', message: 'Alice Johnson joined the meeting', user: 'Alice Johnson' },
        { type: 'user_left', message: 'Bob Smith left the meeting', user: 'Bob Smith' },
        { type: 'hand_raised', message: 'Carol Davis raised their hand', user: 'Carol Davis' },
        { type: 'mute_changed', message: 'David Wilson muted their microphone', user: 'David Wilson' },
        { type: 'recording_started', message: 'Recording started', user: 'Host' },
      ] as const

      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      
      const newNotification: NotificationData = {
        id: Date.now().toString(),
        type: randomNotification.type,
        message: randomNotification.message,
        timestamp: new Date(),
        user: randomNotification.user
      }

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep last 10 notifications

      // Show toast notification
      const getIcon = () => {
        switch (randomNotification.type) {
          case 'user_joined': return <UserPlus className="h-4 w-4" />
          case 'user_left': return <UserMinus className="h-4 w-4" />
          case 'hand_raised': return <Hand className="h-4 w-4" />
          case 'mute_changed': return <MicOff className="h-4 w-4" />
          case 'recording_started': return <Bell className="h-4 w-4" />
          default: return <Bell className="h-4 w-4" />
        }
      }

      toast(randomNotification.message, {
        icon: getIcon(),
        duration: 3000,
      })
    }

    // Simulate notifications every 10-15 seconds
    const interval = setInterval(simulateNotifications, Math.random() * 5000 + 10000)
    
    return () => clearInterval(interval)
  }, [])

  return null // This component only handles notifications, no UI
}