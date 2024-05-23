import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useApi from '@/services/Api/UseApi'
import useStore from '@/store'
import Button from '@/components/Shared/Buttons'
import VenueHeader from '@/components/Venue/VenueHeader'
import Facilities from '@/components/Venue/Facilities'
import Description from '@/components/Venue/Description'
import BookingSection from '@/components/Venue/BookingSection'
import VenueBookings from '@/components/Venue/VenueBookings'
import VenueDetails from '@/components/Venue/Details'
import Notification from '@/components/Shared/Notifications'
import Loader from '@/components/Shared/Loader'
import Modal from 'react-modal'

function VenueSpecific() {
  const { venueId } = useParams()
  const { isLoading, isError, sendRequest } = useApi()
  const navigate = useNavigate()
  const location = useLocation()
  const [venue, setVenue] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { auth, notification, setNotification, clearNotification } = useStore(
    (state) => ({
      auth: state.auth,
      notification: state.notification,
      setNotification: state.setNotification,
      clearNotification: state.clearNotification,
    })
  )

  useEffect(() => {
    if (location.state && location.state.message) {
      setNotification(location.state)
    }

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

    return () => {
      clearNotification()
    }
  }, [venueId, sendRequest, location.state, setNotification, clearNotification])

  const handleEdit = () => {
    navigate(`/edit-venue/${venueId}`, {
      state: { message: 'Venue edited successfully!', type: 'success' },
    })
  }

  const handleDelete = async () => {
    setShowDeleteModal(false)
    try {
      await sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        method: 'delete',
      })
      navigate(`/profile/${auth.user.name}`, {
        state: { message: 'Venue deleted successfully!', type: 'success' },
      })
    } catch (error) {
      console.error('Failed to delete venue:', error)
      setNotification({
        message: 'Error deleting venue. Please try again.',
        type: 'error',
      })
    }
  }

  if (isLoading) return <Loader />
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
          onDismiss={clearNotification}
        />
      )}
      <VenueHeader venue={venue} />

      <div className="flex flex-col md:flex-row mt-4">
        <div className="md:w-1/2 lg:w-2/3 mr-2 md:mr-20">
          <Description description={venue.description} />
          <Facilities meta={venue.meta} />
          <VenueDetails details={venueDetails} />
        </div>
        {!isOwner && (
          <div className="md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
            <BookingSection venueId={venueId} bookings={venue.bookings || []} />
          </div>
        )}
      </div>
      {isOwner && (
        <div>
          <VenueBookings bookings={venue.bookings || []} />
          <div className="flex space-x-2 mt-8">
            <Button type="secondary" onClick={handleEdit}>
              Edit Venue
            </Button>
            <Button type="red" onClick={() => setShowDeleteModal(true)}>
              Delete Venue
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Confirm Delete"
        className="bg-white p-6 rounded shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl mb-4">
          Are you sure you want to delete this venue?
        </h2>
        <div className="flex justify-end space-x-4">
          <Button type="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button type="red" onClick={handleDelete}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default VenueSpecific
