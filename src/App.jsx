import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProfilePage from './pages/Profile'
import NotFound from './pages/NotFound'
import VenueSpecific from './pages/VenueSpecific'
import CreateVenueForm from './pages/CreateVenue'

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="venues/:venueId" element={<VenueSpecific />} />
            <Route path="/create-venue" element={<CreateVenueForm />} />
            <Route path="/edit-venue/:venueId" element={<CreateVenueForm />} />
            <Route path="/profile/:name" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
