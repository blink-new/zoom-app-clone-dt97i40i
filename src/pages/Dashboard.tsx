import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import MeetingNotifications from '@/components/MeetingNotifications'
import MeetingSettings from '@/components/MeetingSettings'
import { 
  Video, 
  Calendar, 
  Users, 
  Settings, 
  Plus, 
  Clock,
  Search,
  Monitor,
  Phone,
  History,
  Star,
  Zap
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [meetingId, setMeetingId] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const handleJoinMeeting = () => {
    if (meetingId.trim()) {
      navigate(`/meeting/${meetingId}`)
    }
  }

  const handleStartInstantMeeting = () => {
    const instantMeetingId = Math.random().toString(36).substring(2, 12)
    navigate(`/meeting/${instantMeetingId}`)
  }

  const recentMeetings = [
    {
      id: '123-456-789',
      title: 'Team Standup',
      time: '10:00 AM',
      date: 'Today',
      participants: 8,
      status: 'upcoming'
    },
    {
      id: '987-654-321',
      title: 'Client Presentation',
      time: '2:00 PM',
      date: 'Today',
      participants: 12,
      status: 'upcoming'
    },
    {
      id: '456-789-123',
      title: 'Project Review',
      time: '9:00 AM',
      date: 'Yesterday',
      participants: 6,
      status: 'completed'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Zoom</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search meetings, contacts..." 
                className="pl-10 w-64"
              />
            </div>
            <MeetingNotifications />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Start or Join a Meeting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleStartInstantMeeting}
                    className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Video className="h-5 w-5 mr-2" />
                    New Meeting
                  </Button>
                  <Link to="/schedule">
                    <Button variant="outline" className="h-12 w-full">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule
                    </Button>
                  </Link>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Meeting ID"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleJoinMeeting}
                    variant="outline"
                    disabled={!meetingId.trim()}
                  >
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeetings.map((meeting) => (
                    <div 
                      key={meeting.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/meeting/${meeting.id}`)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Video className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                          <p className="text-sm text-gray-500">
                            {meeting.date} • {meeting.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{meeting.participants}</span>
                        </div>
                        <Badge 
                          variant={meeting.status === 'upcoming' ? 'default' : 'secondary'}
                        >
                          {meeting.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Meeting Room */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Meeting Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Your personal meeting room is always available
                  </p>
                  <Button 
                    onClick={() => navigate('/meeting/personal-room')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Start Personal Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Meeting time</span>
                  </div>
                  <span className="font-medium">4h 32m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Meetings</span>
                  </div>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Screen shares</span>
                  </div>
                  <span className="font-medium">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  Whiteboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <History className="h-4 w-4 mr-2" />
                  Recordings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <MeetingSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  )
}