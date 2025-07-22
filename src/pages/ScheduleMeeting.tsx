import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Video, 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Lock,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react'
import { format } from 'date-fns'

export default function ScheduleMeeting() {
  const navigate = useNavigate()
  const [meetingTitle, setMeetingTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('60')
  const [timezone, setTimezone] = useState('America/New_York')
  const [requirePassword, setRequirePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [waitingRoom, setWaitingRoom] = useState(true)
  const [muteParticipants, setMuteParticipants] = useState(true)
  const [allowRecording, setAllowRecording] = useState(false)
  const [inviteEmails, setInviteEmails] = useState('')
  const [isScheduled, setIsScheduled] = useState(false)
  const [meetingLink, setMeetingLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleScheduleMeeting = () => {
    if (meetingTitle.trim() && date && startTime) {
      const generatedMeetingId = Math.random().toString(36).substring(2, 12)
      const link = `${window.location.origin}/meeting/${generatedMeetingId}`
      setMeetingLink(link)
      setIsScheduled(true)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ]

  const durationOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' }
  ]

  if (isScheduled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Meeting Scheduled Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">{meetingTitle}</h3>
              <p className="text-blue-700 text-sm">
                {date && format(date, 'EEEE, MMMM d, yyyy')} at {startTime} ({timezone})
              </p>
              <p className="text-blue-700 text-sm">Duration: {duration} minutes</p>
            </div>

            <div className="space-y-2">
              <Label>Meeting Link</Label>
              <div className="flex space-x-2">
                <Input value={meetingLink} readOnly className="flex-1" />
                <Button onClick={copyToClipboard} variant="outline">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => navigate('/')} className="flex-1">
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => navigate(meetingLink.replace(window.location.origin, ''))}
                variant="outline" 
                className="flex-1"
              >
                Start Meeting Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-semibold text-gray-900">Schedule Meeting</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meeting Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter meeting title"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add meeting description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Date & Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time *</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings & Security */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Meeting Password</p>
                    <p className="text-sm text-gray-600">Require password to join</p>
                  </div>
                  <Checkbox 
                    checked={requirePassword}
                    onCheckedChange={(checked) => setRequirePassword(checked as boolean)}
                  />
                </div>

                {requirePassword && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter meeting password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Waiting Room</p>
                    <p className="text-sm text-gray-600">Host admits participants</p>
                  </div>
                  <Checkbox 
                    checked={waitingRoom}
                    onCheckedChange={(checked) => setWaitingRoom(checked as boolean)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Participant Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mute participants on entry</p>
                    <p className="text-sm text-gray-600">Participants join muted</p>
                  </div>
                  <Checkbox 
                    checked={muteParticipants}
                    onCheckedChange={(checked) => setMuteParticipants(checked as boolean)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow recording</p>
                    <p className="text-sm text-gray-600">Participants can record</p>
                  </div>
                  <Checkbox 
                    checked={allowRecording}
                    onCheckedChange={(checked) => setAllowRecording(checked as boolean)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invite Participants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invites">Email Addresses</Label>
                  <Textarea
                    id="invites"
                    placeholder="Enter email addresses separated by commas"
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Invitations will be sent automatically when the meeting is scheduled
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleScheduleMeeting}
              disabled={!meetingTitle.trim() || !date || !startTime}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Clock className="h-5 w-5 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}