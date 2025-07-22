import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { 
  Video, 
  Mic, 
  Monitor, 
  Bell, 
  Shield, 
  Palette,
  ArrowLeft,
  Camera,
  Volume2,
  Keyboard,
  Globe,
  User
} from 'lucide-react'

export default function Settings() {
  const [displayName, setDisplayName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [autoJoinAudio, setAutoJoinAudio] = useState(true)
  const [autoJoinVideo, setAutoJoinVideo] = useState(false)
  const [muteOnJoin, setMuteOnJoin] = useState(true)
  const [enableHD, setEnableHD] = useState(true)
  const [mirrorVideo, setMirrorVideo] = useState(true)
  const [touchUpAppearance, setTouchUpAppearance] = useState(false)
  const [enableVirtualBackground, setEnableVirtualBackground] = useState(false)
  const [microphoneVolume, setMicrophoneVolume] = useState([75])
  const [speakerVolume, setSpeakerVolume] = useState([80])
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [notificationSound, setNotificationSound] = useState(true)
  const [showChatNotifications, setShowChatNotifications] = useState(true)
  const [enableWaitingRoom, setEnableWaitingRoom] = useState(true)
  const [requirePassword, setRequirePassword] = useState(false)
  const [allowScreenShare, setAllowScreenShare] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center space-x-2">
              <Mic className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="sharing" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Sharing</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meeting Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-join audio when joining a meeting</Label>
                    <p className="text-sm text-gray-500">Automatically connect to audio when you join</p>
                  </div>
                  <Switch
                    checked={autoJoinAudio}
                    onCheckedChange={setAutoJoinAudio}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-join video when joining a meeting</Label>
                    <p className="text-sm text-gray-500">Turn on camera automatically when joining</p>
                  </div>
                  <Switch
                    checked={autoJoinVideo}
                    onCheckedChange={setAutoJoinVideo}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mute microphone when joining a meeting</Label>
                    <p className="text-sm text-gray-500">Start meetings with microphone muted</p>
                  </div>
                  <Switch
                    checked={muteOnJoin}
                    onCheckedChange={setMuteOnJoin}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Settings */}
          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Camera</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Camera</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Camera</SelectItem>
                      <SelectItem value="external">External Camera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Camera Preview</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable HD video</Label>
                    <p className="text-sm text-gray-500">Use high definition video quality</p>
                  </div>
                  <Switch
                    checked={enableHD}
                    onCheckedChange={setEnableHD}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mirror my video</Label>
                    <p className="text-sm text-gray-500">Show mirrored view of your video</p>
                  </div>
                  <Switch
                    checked={mirrorVideo}
                    onCheckedChange={setMirrorVideo}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Touch up my appearance</Label>
                    <p className="text-sm text-gray-500">Apply light smoothing filter</p>
                  </div>
                  <Switch
                    checked={touchUpAppearance}
                    onCheckedChange={setTouchUpAppearance}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable virtual background</Label>
                    <p className="text-sm text-gray-500">Use virtual backgrounds in meetings</p>
                  </div>
                  <Switch
                    checked={enableVirtualBackground}
                    onCheckedChange={setEnableVirtualBackground}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Microphone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Microphone</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Microphone</SelectItem>
                      <SelectItem value="external">External Microphone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Microphone Volume</Label>
                  <Slider
                    value={microphoneVolume}
                    onValueChange={setMicrophoneVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span>
                    <span>{microphoneVolume[0]}%</span>
                    <span>100</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  Test Microphone
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Speaker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Speaker</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Speaker</SelectItem>
                      <SelectItem value="headphones">Headphones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Speaker Volume</Label>
                  <Slider
                    value={speakerVolume}
                    onValueChange={setSpeakerVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span>
                    <span>{speakerVolume[0]}%</span>
                    <span>100</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  Test Speaker
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Screen Sharing Settings */}
          <TabsContent value="sharing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Screen Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow participants to share screen</Label>
                    <p className="text-sm text-gray-500">Let meeting participants share their screen</p>
                  </div>
                  <Switch
                    checked={allowScreenShare}
                    onCheckedChange={setAllowScreenShare}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Screen sharing quality</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="high">High Quality</SelectItem>
                      <SelectItem value="standard">Standard Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable notifications</Label>
                    <p className="text-sm text-gray-500">Show meeting and system notifications</p>
                  </div>
                  <Switch
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Play notification sound</Label>
                    <p className="text-sm text-gray-500">Play sound for notifications</p>
                  </div>
                  <Switch
                    checked={notificationSound}
                    onCheckedChange={setNotificationSound}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show chat notifications</Label>
                    <p className="text-sm text-gray-500">Get notified of new chat messages</p>
                  </div>
                  <Switch
                    checked={showChatNotifications}
                    onCheckedChange={setShowChatNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable waiting room</Label>
                    <p className="text-sm text-gray-500">Require host approval before joining</p>
                  </div>
                  <Switch
                    checked={enableWaitingRoom}
                    onCheckedChange={setEnableWaitingRoom}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require meeting password</Label>
                    <p className="text-sm text-gray-500">Protect meetings with a password</p>
                  </div>
                  <Switch
                    checked={requirePassword}
                    onCheckedChange={setRequirePassword}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  View Privacy Policy
                </Button>
                <Button variant="outline" className="w-full">
                  Manage Data & Privacy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}