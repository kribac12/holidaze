import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useApi from '@/services/Api/UseApi'
import useStore from '@/store'
import Button from '@/components/Shared/Buttons'
import {
  VenueHeader,
  Facilities,
  Description,
  BookingSection,
  VenueBookings,
  VenueDetails,
  OwnerDetails,
} from '@/components/Venue'
import Notification from '@/components/Shared/Notifications'
import Loader from '@/components/Shared/Loader'
import Modal from 'react-modal'
import Head from '@/components/HeadMeta'

function VenueSpecific() {
  const { venueId } = useParams()
  const { isLoading, isError, sendRequest } = useApi()
  const navigate = useNavigate()
  const location = useLocation()
  const [venue, setVenue] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { auth, setNotification } = useStore((state) => ({
    auth: state.auth,
    setNotification: state.setNotification,
  }))
  const [notification, setNotificationState] = useState({
    title: location.state?.title || '',
    message: location.state?.message || '',
    type: location.state?.type || '',
  })

  useEffect(() => {
    if (location.state && location.state.message) {
      setNotification(location.state)
      setNotificationState(location.state)
      navigate(location.pathname, { replace: true })
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
  }, [
    venueId,
    sendRequest,
    location.state,
    setNotification,
    navigate,
    location.pathname,
  ])

  const handleEdit = () => {
    navigate(`/edit-venue/${venueId}`, {
      state: {
        title: 'Venue Edited',
        message: 'Venue edited successfully!',
        type: 'success',
      },
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
        state: {
          title: 'Venue Deleted',
          message: 'Venue deleted successfully!',
          type: 'success',
        },
      })
    } catch (error) {
      console.error('Failed to delete venue:', error)
      setNotification({
        title: 'Delete Failed',
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
      <Head title="Holidaze Venue" description="Specific Venue" />
      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onDismiss={() =>
            setNotificationState({ title: '', message: '', type: '' })
          }
        />
      )}
      <VenueHeader venue={venue} />

      <div className="mt-4 flex flex-col md:flex-row">
        <div className="mr-2 md:mr-20 md:w-1/2 lg:w-2/3">
          <Description description={venue.description} />
          <Facilities meta={venue.meta} />
          <VenueDetails details={venueDetails} />
          {auth.token && <OwnerDetails owner={venue.owner} />}
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 lg:w-1/3">
          {!isOwner && (
            <BookingSection venueId={venueId} bookings={venue.bookings || []} />
          )}
          {isOwner && (
            <div>
              <VenueBookings bookings={venue.bookings || []} />
              <div className="mt-8 flex space-x-2">
                <Button type="secondary" onClick={handleEdit}>
                  Edit Venue
                </Button>
                <Button type="red" onClick={() => setShowDeleteModal(true)}>
                  Delete Venue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Confirm Delete"
        className="rounded bg-white p-6 shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="mb-4 text-xl">
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
