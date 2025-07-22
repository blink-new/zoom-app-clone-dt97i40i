import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import MeetingRoom from './pages/MeetingRoom'
import JoinMeeting from './pages/JoinMeeting'
import ScheduleMeeting from './pages/ScheduleMeeting'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
          <Route path="/join" element={<JoinMeeting />} />
          <Route path="/schedule" element={<ScheduleMeeting />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App