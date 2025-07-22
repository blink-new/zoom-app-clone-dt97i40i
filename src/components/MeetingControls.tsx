import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Phone, 
  MessageSquare,
  Users,
  Hand,
  Grid3X3,
  Volume2,
  VolumeX,
  ChevronUp,
  Settings,
  Circle,
  Pause,
  Play,
  Square,
  Wifi,
  WifiOff,
  Shield,
  UserCheck
} from 'lucide-react'

interface MeetingControlsProps {
  isMuted: boolean
  hasVideo: boolean
  isScreenSharing: boolean
  showChat: boolean
  showParticipants: boolean
  viewMode: 'gallery' | 'speaker'
  isHandRaised: boolean
  isSpeakerMuted: boolean
  isRecording: boolean
  connectionQuality: 'good' | 'fair' | 'poor'
  onMuteToggle: () => void
  onVideoToggle: () => void
  onScreenShareToggle: () => void
  onChatToggle: () => void
  onParticipantsToggle: () => void
  onViewModeToggle: () => void
  onHandRaiseToggle: () => void
  onSpeakerToggle: () => void
  onRecordingToggle: () => void
  onLeaveMeeting: () => void
}

export default function MeetingControls({
  isMuted,
  hasVideo,
  isScreenSharing,
  showChat,
  showParticipants,
  viewMode,
  isHandRaised,
  isSpeakerMuted,
  isRecording,
  connectionQuality,
  onMuteToggle,
  onVideoToggle,
  onScreenShareToggle,
  onChatToggle,
  onParticipantsToggle,
  onViewModeToggle,
  onHandRaiseToggle,
  onSpeakerToggle,
  onRecordingToggle,
  onLeaveMeeting
}: MeetingControlsProps) {
  const [showAdvancedControls, setShowAdvancedControls] = useState(false)

  const getConnectionIcon = () => {
    switch (connectionQuality) {
      case 'good': return <Wifi className="h-4 w-4 text-green-500" />
      case 'fair': return <Wifi className="h-4 w-4 text-yellow-500" />
      case 'poor': return <WifiOff className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="bg-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Controls - Audio/Video */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="sm"
                className="flex items-center space-x-2"
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                <ChevronUp className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onMuteToggle}>
                {isMuted ? 'Unmute' : 'Mute'} Microphone
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Audio Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Test Speaker & Microphone
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={hasVideo ? "secondary" : "destructive"}
                size="sm"
                className="flex items-center space-x-2"
              >
                {hasVideo ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                <span>{hasVideo ? 'Stop Video' : 'Start Video'}</span>
                <ChevronUp className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onVideoToggle}>
                {hasVideo ? 'Stop' : 'Start'} Video
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Video Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Choose Virtual Background
              </DropdownMenuItem>
              <DropdownMenuItem>
                Touch Up My Appearance
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center Controls - Meeting Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="sm"
            onClick={onScreenShareToggle}
          >
            <Monitor className="h-4 w-4 mr-2" />
            {isScreenSharing ? 'Stop Share' : 'Share Screen'}
          </Button>
          
          <Button
            variant={showParticipants ? "default" : "secondary"}
            size="sm"
            onClick={onParticipantsToggle}
          >
            <Users className="h-4 w-4 mr-2" />
            Participants
          </Button>
          
          <Button
            variant={showChat ? "default" : "secondary"}
            size="sm"
            onClick={onChatToggle}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
          
          <Button
            variant={viewMode === 'gallery' ? "default" : "secondary"}
            size="sm"
            onClick={onViewModeToggle}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            {viewMode === 'gallery' ? 'Speaker' : 'Gallery'}
          </Button>

          {/* Advanced Controls Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedControls(!showAdvancedControls)}
            className="text-white hover:bg-gray-700"
          >
            More
          </Button>
        </div>

        {/* Right Controls - Meeting Management */}
        <div className="flex items-center space-x-2">
          {/* Connection Quality Indicator */}
          <div className="flex items-center space-x-1 px-2">
            {getConnectionIcon()}
            <span className="text-xs text-gray-300 capitalize">{connectionQuality}</span>
          </div>

          <Button
            variant={isHandRaised ? "default" : "secondary"}
            size="sm"
            onClick={onHandRaiseToggle}
          >
            <Hand className="h-4 w-4 mr-2" />
            {isHandRaised ? 'Lower Hand' : 'Raise Hand'}
          </Button>
          
          <Button
            variant={isSpeakerMuted ? "destructive" : "secondary"}
            size="sm"
            onClick={onSpeakerToggle}
          >
            {isSpeakerMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <Button
            variant="destructive"
            onClick={onLeaveMeeting}
            className="flex items-center space-x-2"
          >
            <Phone className="h-4 w-4" />
            <span>Leave Meeting</span>
          </Button>
        </div>
      </div>

      {/* Advanced Controls Panel */}
      {showAdvancedControls && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="sm"
              onClick={onRecordingToggle}
              className="flex items-center space-x-2"
            >
              {isRecording ? (
                <>
                  <Square className="h-4 w-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" />
                  <span>Record</span>
                </>
              )}
            </Button>

            <Button variant="secondary" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </Button>

            <Button variant="secondary" size="sm">
              <UserCheck className="h-4 w-4 mr-2" />
              Breakout Rooms
            </Button>

            <Button variant="secondary" size="sm">
              <Pause className="h-4 w-4 mr-2" />
              Reactions
            </Button>

            <Button variant="secondary" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}