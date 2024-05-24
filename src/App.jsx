import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ModalLogSignin from './components/Auth/ModalLogSignin'
import Loader from './components/Shared/Loader'

const Home = lazy(() => import('./pages/Home'))
const ProfilePage = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const VenueSpecific = lazy(() => import('./pages/VenueSpecific'))
const CreateVenueForm = lazy(() => import('./pages/CreateVenue'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
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
        <ModalLogSignin />
      </Suspense>
    </Router>
  )
}

export default App
