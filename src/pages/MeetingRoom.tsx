import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Phone, 
  MessageSquare,
  Users,
  Settings,
  MoreHorizontal,
  Hand,
  Grid3X3,
  User,
  Send,
  X,
  Volume2,
  VolumeX
} from 'lucide-react'

interface Participant {
  id: string
  name: string
  isHost: boolean
  isMuted: boolean
  hasVideo: boolean
  isHandRaised: boolean
}

interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: string
}

export default function MeetingRoom() {
  const { meetingId } = useParams()
  const navigate = useNavigate()
  
  const [isMuted, setIsMuted] = useState(false)
  const [hasVideo, setHasVideo] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [viewMode, setViewMode] = useState<'gallery' | 'speaker'>('gallery')
  const [chatMessage, setChatMessage] = useState('')
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false)

  const [participants] = useState<Participant[]>([
    { id: '1', name: 'You', isHost: true, isMuted: false, hasVideo: true, isHandRaised: false },
    { id: '2', name: 'Alice Johnson', isHost: false, isMuted: false, hasVideo: true, isHandRaised: false },
    { id: '3', name: 'Bob Smith', isHost: false, isMuted: true, hasVideo: false, isHandRaised: true },
    { id: '4', name: 'Carol Davis', isHost: false, isMuted: false, hasVideo: true, isHandRaised: false },
    { id: '5', name: 'David Wilson', isHost: false, isMuted: true, hasVideo: true, isHandRaised: false },
    { id: '6', name: 'Emma Brown', isHost: false, isMuted: false, hasVideo: false, isHandRaised: false },
  ])

  const [chatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Alice Johnson', message: 'Hello everyone!', timestamp: '10:30 AM' },
    { id: '2', sender: 'Bob Smith', message: 'Can you hear me clearly?', timestamp: '10:31 AM' },
    { id: '3', sender: 'You', message: 'Yes, audio is good', timestamp: '10:31 AM' },
    { id: '4', sender: 'Carol Davis', message: 'Great presentation so far', timestamp: '10:35 AM' },
  ])

  const handleLeaveMeeting = () => {
    navigate('/')
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message to other participants
      setChatMessage('')
    }
  }

  const ParticipantVideo = ({ participant, isLarge = false }: { participant: Participant, isLarge?: boolean }) => (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${isLarge ? 'aspect-video' : 'aspect-square'}`}>
      {participant.hasVideo ? (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <div className="text-white text-4xl font-bold">
            {participant.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <User className="h-12 w-12 text-gray-400" />
        </div>
      )}
      
      {/* Participant info overlay */}
      <div className="absolute bottom-2 left-2 flex items-center space-x-2">
        <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
          <span>{participant.name}</span>
          {participant.isHost && <Badge variant="secondary" className="text-xs">Host</Badge>}
        </div>
        {participant.isMuted && (
          <div className="bg-red-500 p-1 rounded">
            <MicOff className="h-3 w-3 text-white" />
          </div>
        )}
        {participant.isHandRaised && (
          <div className="bg-yellow-500 p-1 rounded">
            <Hand className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-medium">Meeting ID: {meetingId}</h1>
          <Badge variant="secondary">Live</Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 p-4">
          {viewMode === 'gallery' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 h-full">
              {participants.map((participant) => (
                <ParticipantVideo key={participant.id} participant={participant} />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Main speaker */}
              <div className="flex-1 mb-4">
                <ParticipantVideo participant={participants[1]} isLarge />
              </div>
              {/* Thumbnail strip */}
              <div className="flex space-x-2 overflow-x-auto">
                {participants.slice(0, 6).map((participant) => (
                  <div key={participant.id} className="flex-shrink-0 w-24 h-16">
                    <ParticipantVideo participant={participant} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Chat</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChat(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Participants ({participants.length})</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowParticipants(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{participant.name}</p>
                        {participant.isHost && (
                          <Badge variant="secondary" className="text-xs">Host</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {participant.isHandRaised && (
                        <Hand className="h-4 w-4 text-yellow-500" />
                      )}
                      {participant.isMuted ? (
                        <MicOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Mic className="h-4 w-4 text-green-500" />
                      )}
                      {participant.hasVideo ? (
                        <Video className="h-4 w-4 text-green-500" />
                      ) : (
                        <VideoOff className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center space-x-2"
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </Button>
            
            <Button
              variant={hasVideo ? "secondary" : "destructive"}
              size="sm"
              onClick={() => setHasVideo(!hasVideo)}
              className="flex items-center space-x-2"
            >
              {hasVideo ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              <span>{hasVideo ? 'Stop Video' : 'Start Video'}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="sm"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Monitor className="h-4 w-4 mr-2" />
              {isScreenSharing ? 'Stop Share' : 'Share Screen'}
            </Button>
            
            <Button
              variant={showParticipants ? "default" : "secondary"}
              size="sm"
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <Users className="h-4 w-4 mr-2" />
              Participants
            </Button>
            
            <Button
              variant={showChat ? "default" : "secondary"}
              size="sm"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
            
            <Button
              variant={viewMode === 'gallery' ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode(viewMode === 'gallery' ? 'speaker' : 'gallery')}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              {viewMode === 'gallery' ? 'Speaker' : 'Gallery'}
            </Button>
            
            <Button
              variant={isHandRaised ? "default" : "secondary"}
              size="sm"
              onClick={() => setIsHandRaised(!isHandRaised)}
            >
              <Hand className="h-4 w-4 mr-2" />
              {isHandRaised ? 'Lower Hand' : 'Raise Hand'}
            </Button>
            
            <Button
              variant={isSpeakerMuted ? "destructive" : "secondary"}
              size="sm"
              onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
            >
              {isSpeakerMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          <Button
            variant="destructive"
            onClick={handleLeaveMeeting}
            className="flex items-center space-x-2"
          >
            <Phone className="h-4 w-4" />
            <span>Leave Meeting</span>
          </Button>
        </div>
      </div>
    </div>
  )
}