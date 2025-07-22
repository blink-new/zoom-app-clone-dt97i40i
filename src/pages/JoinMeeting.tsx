import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import WaitingRoom from '@/components/WaitingRoom'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings,
  ArrowLeft
} from 'lucide-react'

export default function JoinMeeting() {
  const navigate = useNavigate()
  const [meetingId, setMeetingId] = useState('')
  const [displayName, setDisplayName] = useState('John Doe')
  const [hasVideo, setHasVideo] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [rememberName, setRememberName] = useState(true)
  const [showWaitingRoom, setShowWaitingRoom] = useState(false)

  const handleJoinMeeting = () => {
    if (meetingId.trim() && displayName.trim()) {
      // Simulate waiting room for certain meeting IDs
      if (meetingId.includes('wait') || meetingId.includes('secure')) {
        setShowWaitingRoom(true)
      } else {
        navigate(`/meeting/${meetingId}`)
      }
    }
  }

  const handleAdmittedToMeeting = () => {
    navigate(`/meeting/${meetingId}`)
  }

  if (showWaitingRoom) {
    return (
      <WaitingRoom 
        meetingId={meetingId} 
        onJoinMeeting={handleAdmittedToMeeting}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Preview */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden mb-4">
                {hasVideo ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold">
                      {displayName.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <VideoOff className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                
                {/* Controls overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <Button
                    variant={hasVideo ? "secondary" : "destructive"}
                    size="sm"
                    onClick={() => setHasVideo(!hasVideo)}
                    className="bg-black bg-opacity-50 hover:bg-opacity-70"
                  >
                    {hasVideo ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black bg-opacity-50 hover:bg-opacity-70"
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-black bg-opacity-50 hover:bg-opacity-70"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {hasVideo ? 'Camera is on' : 'Camera is off'}
                </p>
                <p className="text-sm text-gray-600">
                  {isMuted ? 'Microphone is muted' : 'Microphone is on'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Form */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Join Meeting</h1>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meetingId">Meeting ID</Label>
                <Input
                  id="meetingId"
                  placeholder="Enter Meeting ID (e.g., 123-456-789)"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  💡 Try entering "secure-meeting" or "wait-room" to experience the waiting room feature
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayName">Your Name</Label>
                <Input
                  id="displayName"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberName"
                  checked={rememberName}
                  onCheckedChange={(checked) => setRememberName(checked as boolean)}
                />
                <Label htmlFor="rememberName" className="text-sm">
                  Remember my name for future meetings
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audio & Video Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Camera</p>
                  <p className="text-sm text-gray-600">
                    {hasVideo ? 'Your camera will be on when you join' : 'Your camera will be off when you join'}
                  </p>
                </div>
                <Button
                  variant={hasVideo ? "default" : "outline"}
                  onClick={() => setHasVideo(!hasVideo)}
                >
                  {hasVideo ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Microphone</p>
                  <p className="text-sm text-gray-600">
                    {isMuted ? 'Your microphone will be muted when you join' : 'Your microphone will be on when you join'}
                  </p>
                </div>
                <Button
                  variant={isMuted ? "outline" : "default"}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={handleJoinMeeting}
              disabled={!meetingId.trim() || !displayName.trim()}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg"
            >
              Join Meeting
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              By joining this meeting, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}