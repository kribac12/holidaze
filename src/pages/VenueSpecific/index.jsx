import { useEffect } from 'react'
import useApi from '@/services/Api'
import { useParams } from 'react-router-dom'
import VenueHeader from '@/components/Venue/VenueHeader'
import BookingCalendar from '@/components/Venue/BookingCalendar'
import Facilities from '@/components/Venue/Facilities'
import Description from '@/components/Venue/Description'
import BookingSection from '@/components/Venue/BookingSection'

function VenueSpecific() {
  const { venueId } = useParams()
  const { data: venue, isLoading, isError, sendRequest } = useApi()

  useEffect(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`,
      method: 'get',
    })
  }, [venueId, sendRequest])

  if (isLoading) return <div>Loading...</div>
  if (isError || !venue) return <div>Error loading venue details.</div>

  return (
    <div>
      <VenueHeader venue={venue} />
      <Description description={venue.description} />
      <BookingSection />
      <Facilities meta={venue.meta} />
      <BookingCalendar bookings={venue.bookings || []} />
    </div>
  )
}

export default VenueSpecific
