import { useCallback, useEffect, useState } from 'react'
import useApi from '@/services/Api'
import { Link } from 'react-router-dom'
import VenueInfoCard from '../Venue/VenueInfoCard'

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {venues.map((venue) => (
          <Link to={`/venues/${venue.id}`} key={venue.id}>
            <VenueInfoCard
              venue={venue}
              titleLevel={2}
              className="venue-list-item"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default VenueList
