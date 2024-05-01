import { useEffect, useState } from 'react'
import useApi from '@/services/Api'
import { useParams } from 'react-router-dom'
import VenueHeader from '@/components/Venue/VenueHeader'

import Facilities from '@/components/Venue/Facilities'
import Description from '@/components/Venue/Description'
import BookingSection from '@/components/Venue/BookingSection'

function VenueSpecific() {
  const { venueId } = useParams()
  const { isLoading, isError, sendRequest } = useApi()
  const [venue, setVenue] = useState(null)

  useEffect(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`,
      method: 'get',
    })
      .then((response) => {
        if (response && response.data) {
          // Setting the venue state to the data object within the response
          setVenue(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching venue details:', error)
      })
  }, [venueId, sendRequest])

  if (isLoading) return <div>Loading...</div>
  if (isError || !venue) return <div>Error loading venue details.</div>
  if (!venue || !venue.bookings) {
    return <div>Loading venue and booking details...</div> // This ensures you don't try to render components that depend on these data being loaded
  }
  return (
    <div>
      <VenueHeader venue={venue} />
      <Description description={venue.description} />
      <BookingSection venueId={venueId} bookings={venue.bookings || []} />
      <Facilities meta={venue.meta} />
    </div>
  )
}

export default VenueSpecific
