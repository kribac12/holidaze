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
      url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true&_owner=true`,
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
    </div>
  )
}

export default VenueSpecific
