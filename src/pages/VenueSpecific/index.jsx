import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useApi from '@/services/Api'
import useStore from '@/store'
import Button from '@/lib/Buttons'
import VenueHeader from '@/components/Venue/VenueHeader'
import Facilities from '@/components/Venue/Facilities'
import Description from '@/components/Venue/Description'
import BookingSection from '@/components/Venue/BookingSection'
import VenueBookings from '@/components/Venue/VenueBookings'
import VenueDetails from '@/components/Venue/Details'
import Notification from '@/components/Notifications'

function VenueSpecific() {
  const { venueId } = useParams()
  const { isLoading, isError, sendRequest } = useApi()
  const navigate = useNavigate()
  const location = useLocation()
  const [venue, setVenue] = useState(null)
  const { auth } = useStore((state) => ({ auth: state.auth }))
  const { notification, clearNotification, setNotification } = useStore(
    (state) => ({
      notification: state.notification,
      clearNotification: state.clearNotification,
      setNotification: state.setNotification,
    })
  )

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type,
      })
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate, setNotification])

  useEffect(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true&_owner=true`,
      method: 'get',
    })
      .then((response) => {
        if (response && response.data) {
          setVenue(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching venue details:', error)
      })
  }, [venueId, sendRequest])

  const handleEdit = () => {
    navigate(`/edit-venue/${venueId}`)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        await sendRequest({
          url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
          method: 'delete',
        })
        setNotification({
          message: 'Venue deleted successfully!',
          type: 'success',
        })
        navigate('/')
      } catch (error) {
        console.error('Failed to delete venue:', error)
        setNotification({
          message: 'Error deleting venue. Please try again.',
          type: 'error',
        })
      }
    }
  }

  const clearNotificationHandler = useCallback(() => {
    clearNotification()
  }, [clearNotification])

  if (isLoading) return <div>Loading...</div>
  if (isError || !venue) return <div>Error loading venue details.</div>

  const isOwner =
    venue.owner &&
    auth.user &&
    venue.owner.email === auth.user.email &&
    auth.user.venueManager

  const venueDetails = {
    maxGuests: venue.maxGuests,
    location: venue.location,
  }

  return (
    <div className="flex flex-col ">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={clearNotificationHandler}
        />
      )}
      <VenueHeader venue={venue} />

      <div className="flex flex-col md:flex-row mt-4">
        <div className="md:w-1/2 lg:w-2/3 mr-2">
          <Description description={venue.description} />
          <Facilities meta={venue.meta} />
          <VenueDetails details={venueDetails} />
        </div>
        <div className="md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
          <BookingSection venueId={venueId} bookings={venue.bookings || []} />
        </div>
      </div>
      {isOwner && (
        <div>
          <VenueBookings bookings={venue.bookings || []} />
          <div className="flex space-x-2 mt-5">
            <Button type="secondary" onClick={handleEdit}>
              Edit Venue
            </Button>
            <Button type="extra" onClick={handleDelete}>
              Delete Venue
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VenueSpecific
