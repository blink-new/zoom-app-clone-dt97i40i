import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  Camera, 
  Mic, 
  Speaker, 
  Monitor,
  Palette,
  Shield,
  Bell,
  X
} from 'lucide-react'

interface MeetingSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function MeetingSettings({ isOpen, onClose }: MeetingSettingsProps) {
  const [settings, setSettings] = useState({
    // Audio settings
    microphoneEnabled: true,
    speakerVolume: [75],
    noiseCancellation: true,
    echoCancellation: true,
    
    // Video settings
    cameraEnabled: true,
    videoQuality: 'hd',
    virtualBackground: 'none',
    mirrorVideo: true,
    
    // General settings
    joinWithMicMuted: false,
    joinWithCameraOff: false,
    showParticipantNames: true,
    enableReactions: true,
    
    // Privacy settings
    waitingRoom: true,
    requirePassword: false,
    allowScreenShare: true,
    recordingConsent: true,
    
    // Notifications
    soundNotifications: true,
    chatNotifications: true,
    participantNotifications: false
  })

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Meeting Settings</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Audio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="h-5 w-5" />
                  <span>Audio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mic-enabled">Microphone</Label>
                  <Switch
                    id="mic-enabled"
                    checked={settings.microphoneEnabled}
                    onCheckedChange={(checked) => updateSetting('microphoneEnabled', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Speaker Volume</Label>
                  <Slider
                    value={settings.speakerVolume}
                    onValueChange={(value) => updateSetting('speakerVolume', value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>{settings.speakerVolume[0]}%</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="noise-cancellation">Noise Cancellation</Label>
                  <Switch
                    id="noise-cancellation"
                    checked={settings.noiseCancellation}
                    onCheckedChange={(checked) => updateSetting('noiseCancellation', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="echo-cancellation">Echo Cancellation</Label>
                  <Switch
                    id="echo-cancellation"
                    checked={settings.echoCancellation}
                    onCheckedChange={(checked) => updateSetting('echoCancellation', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Video Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Video</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="camera-enabled">Camera</Label>
                  <Switch
                    id="camera-enabled"
                    checked={settings.cameraEnabled}
                    onCheckedChange={(checked) => updateSetting('cameraEnabled', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Video Quality</Label>
                  <Select 
                    value={settings.videoQuality} 
                    onValueChange={(value) => updateSetting('videoQuality', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sd">Standard Definition (480p)</SelectItem>
                      <SelectItem value="hd">High Definition (720p)</SelectItem>
                      <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Virtual Background</Label>
                  <Select 
                    value={settings.virtualBackground} 
                    onValueChange={(value) => updateSetting('virtualBackground', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="blur">Blur Background</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="home">Home Office</SelectItem>
                      <SelectItem value="nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="mirror-video">Mirror My Video</Label>
                  <Switch
                    id="mirror-video"
                    checked={settings.mirrorVideo}
                    onCheckedChange={(checked) => updateSetting('mirrorVideo', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span>General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="join-muted">Join with microphone muted</Label>
                  <Switch
                    id="join-muted"
                    checked={settings.joinWithMicMuted}
                    onCheckedChange={(checked) => updateSetting('joinWithMicMuted', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="join-camera-off">Join with camera off</Label>
                  <Switch
                    id="join-camera-off"
                    checked={settings.joinWithCameraOff}
                    onCheckedChange={(checked) => updateSetting('joinWithCameraOff', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-names">Show participant names</Label>
                  <Switch
                    id="show-names"
                    checked={settings.showParticipantNames}
                    onCheckedChange={(checked) => updateSetting('showParticipantNames', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-reactions">Enable reactions</Label>
                  <Switch
                    id="enable-reactions"
                    checked={settings.enableReactions}
                    onCheckedChange={(checked) => updateSetting('enableReactions', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="waiting-room">Enable waiting room</Label>
                  <Switch
                    id="waiting-room"
                    checked={settings.waitingRoom}
                    onCheckedChange={(checked) => updateSetting('waitingRoom', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-password">Require meeting password</Label>
                  <Switch
                    id="require-password"
                    checked={settings.requirePassword}
                    onCheckedChange={(checked) => updateSetting('requirePassword', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-screen-share">Allow screen sharing</Label>
                  <Switch
                    id="allow-screen-share"
                    checked={settings.allowScreenShare}
                    onCheckedChange={(checked) => updateSetting('allowScreenShare', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="recording-consent">Require recording consent</Label>
                  <Switch
                    id="recording-consent"
                    checked={settings.recordingConsent}
                    onCheckedChange={(checked) => updateSetting('recordingConsent', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-notifications">Sound notifications</Label>
                  <Switch
                    id="sound-notifications"
                    checked={settings.soundNotifications}
                    onCheckedChange={(checked) => updateSetting('soundNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="chat-notifications">Chat notifications</Label>
                  <Switch
                    id="chat-notifications"
                    checked={settings.chatNotifications}
                    onCheckedChange={(checked) => updateSetting('chatNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="participant-notifications">Participant join/leave notifications</Label>
                  <Switch
                    id="participant-notifications"
                    checked={settings.participantNotifications}
                    onCheckedChange={(checked) => updateSetting('participantNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}