import { useEffect, useState } from 'react'
import useApi from '@/services/Api'
import { useParams, useNavigate } from 'react-router-dom'
import useStore from '@/store'
import Button from '@/lib/Buttons'
import VenueHeader from '@/components/Venue/VenueHeader'
import Facilities from '@/components/Venue/Facilities'
import Description from '@/components/Venue/Description'
import BookingSection from '@/components/Venue/BookingSection'

function VenueSpecific() {
  const { venueId } = useParams()
  const { isLoading, isError, sendRequest } = useApi()
  const navigate = useNavigate()
  const [venue, setVenue] = useState(null)
  const { auth } = useStore((state) => ({ auth: state.auth }))

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
        alert('Venue deleted successfully!')
        navigate('/')
      } catch (error) {
        console.error('Failed to delete venue:', error)
        alert('Error deleting venue. Please try again.')
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError || !venue) return <div>Error loading venue details.</div>

  // Ensure the user is the venue manager and the owner of the venue
  const isOwner =
    venue.owner &&
    auth.user &&
    venue.owner.email === auth.user.email &&
    auth.user.venueManager

  return (
    <div className="flex flex-col">
      <VenueHeader venue={venue} />

      <div className="flex flex-col md:flex-row mt-4">
        <div className="md:w-1/2 lg:w-2/3 mr-2">
          <Description description={venue.description} />
          <Facilities meta={venue.meta} />
        </div>
        <div className="md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
          <BookingSection venueId={venueId} bookings={venue.bookings || []} />
        </div>
      </div>
      {isOwner && (
        <div className="flex space-x-2 mt-5">
          <Button type="secondary" onClick={handleEdit}>
            Edit Venue
          </Button>
          <Button type="extra" onClick={handleDelete}>
            Delete Venue
          </Button>
        </div>
      )}
    </div>
  )
}

export default VenueSpecific
