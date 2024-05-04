import { useEffect, useState, useCallback } from 'react'
import useApi from '@/services/Api'
import { Link } from 'react-router-dom'

function VenueList() {
  const { isLoading, isError, sendRequest } = useApi()
  const [venues, setVenues] = useState([]) // State to hold the venues
  const [sort, setSort] = useState('created')
  const [sortOrder, setSortOrder] = useState('desc')

  const fetchVenues = useCallback(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/venues?sort=${sort}&sortOrder=${sortOrder}`,
      method: 'get',
    })
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          console.error('No venues data received', response)
        } else {
          setVenues(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching venues:', error)
      })
  }, [sendRequest, sort, sortOrder])

  useEffect(() => {
    fetchVenues()
  }, [fetchVenues])

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
    <div>
      <div className="mb-4 flex justify-between items-center">
        <label>Sort by:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="created">Date Added</option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
        </select>
        <label>Order:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

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
    </div>
  )
}

export default VenueList
