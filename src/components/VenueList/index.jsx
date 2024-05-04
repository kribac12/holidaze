import { useCallback, useEffect, useState } from 'react'
import useApi from '@/services/Api'
import { Link } from 'react-router-dom'
import { truncateText } from '@/lib/TextUtils'

function VenueList() {
  const { isLoading, isError, sendRequest } = useApi()
  const [venues, setVenues] = useState([])
  const [sort, setSort] = useState('created,desc') // Default sort by newly added

  const fetchVenues = useCallback(() => {
    const [sortField, sortOrder] = sort.split(',')
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/venues?sort=${sortField}&sortOrder=${sortOrder}`,
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
  }, [sendRequest, sort]) // Only recreate the function when `sendRequest` or `sort` changes

  useEffect(() => {
    fetchVenues()
  }, [fetchVenues]) // Reacts to changes in `fetchVenues`

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading venues.</div>
  if (!venues || venues.length === 0) return <div>No venues available.</div>

  return (
    <div>
      <div className="mb-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="name,asc">Name A-Z</option>
          <option value="name,desc">Name Z-A</option>
          <option value="rating,desc">Most Popular</option>
          <option value="price,asc">Price Lowest to Highest</option>
          <option value="price,desc">Price Highest to Lowest</option>
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
              <h2 className="text-xl font-semibold">
                {truncateText(venue.name, 50)}
              </h2>
              <p>{truncateText(venue.description, 100)} </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default VenueList
