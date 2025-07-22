import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Clock, 
  Users, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff,
  Settings,
  User,
  Shield
} from 'lucide-react'

interface WaitingRoomProps {
  meetingId: string
  onJoinMeeting: () => void
}

export default function WaitingRoom({ meetingId, onJoinMeeting }: WaitingRoomProps) {
  const [waitTime, setWaitTime] = useState(0)
  const [hasVideo, setHasVideo] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [hostMessage] = useState("Please wait while the host admits you to the meeting.")
  const [participantsWaiting] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setWaitTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Preview */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                {hasVideo ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold">
                      JD
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <User className="h-24 w-24 text-gray-400" />
                  </div>
                )}
                
                {/* Video controls overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full h-12 w-12"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant={hasVideo ? "secondary" : "destructive"}
                    size="sm"
                    onClick={() => setHasVideo(!hasVideo)}
                    className="rounded-full h-12 w-12"
                  >
                    {hasVideo ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full h-12 w-12"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio/Video Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audio & Video Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="join-muted">Join with microphone muted</Label>
                <Switch
                  id="join-muted"
                  checked={isMuted}
                  onCheckedChange={setIsMuted}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="join-video-off">Join with camera off</Label>
                <Switch
                  id="join-video-off"
                  checked={!hasVideo}
                  onCheckedChange={(checked) => setHasVideo(!checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waiting Room Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Waiting Room</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Please wait</h3>
                <p className="text-gray-600 mb-4">{hostMessage}</p>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Waiting: {formatTime(waitTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{participantsWaiting} waiting</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meeting Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Meeting ID:</span>
                <span className="font-mono">{meetingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant="secondary">Waiting for host</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security:</span>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Protected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>While You Wait</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span>Test your audio and video settings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span>Prepare any materials you need</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span>The host will admit you shortly</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Demo: Auto-admit after 10 seconds */}
          {waitTime >= 10 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-green-700 mb-3">The host has admitted you to the meeting!</p>
                  <Button 
                    onClick={onJoinMeeting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Join Meeting Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}