import { useEffect, useState } from 'react'
import useApi from '@/services/Api'

import { Link } from 'react-router-dom'

function VenueList() {
  const { isLoading, isError, sendRequest } = useApi()
  const [venues, setVenues] = useState([]) // State to hold the venues

  useEffect(() => {
    sendRequest({
      url: 'https://v2.api.noroff.dev/holidaze/venues',
      method: 'get',
    })
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          console.error('No venues data received', response)
        } else {
          setVenues(response.data) // Update state with the fetched venues
        }
      })
      .catch((error) => {
        console.error('Error fetching venues:', error)
      })
  }, [sendRequest])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading venues.</div>
  }

  if (!venues || venues.length === 0) {
    return <div>No venues available.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {venues.map((venue) => (
        <Link
          to={`/venues/${venue.id}`}
          key={venue.id}
          className="p-4 shadow rounded-lg bg-cardBg"
        >
          {venue.media && venue.media.length > 0 && (
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || 'Venue image'}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <p>{venue.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default VenueList
