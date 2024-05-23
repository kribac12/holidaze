import { useCallback, useEffect, useState } from 'react'
import useApi from '@/services/Api/UseApi'
import { Link } from 'react-router-dom'
import VenueInfoCard from '../Venue/VenueInfoCard'
import Button from '@/components/Shared/Buttons'
import Loader from '../Shared/Loader'

function VenueList() {
  const { isLoading, isError, sendRequest } = useApi()
  const [venues, setVenues] = useState([])
  const [sort, setSort] = useState('created,desc') // Default sort by newly added
  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [totalVenues, setTotalVenues] = useState(0)

  const fetchVenues = useCallback(() => {
    const [sortField, sortOrder] = sort.split(',')
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/venues?sort=${sortField}&sortOrder=${sortOrder}&limit=${limit}&page=${page}`,
      method: 'get',
    })
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          console.error('No venues data received', response)
        } else {
          setVenues((prevVenues) =>
            page === 1 ? response.data : [...prevVenues, ...response.data]
          ) // Update state with the fetched venues
          setTotalVenues(response.meta.totalCount) // Update the total number of venues
        }
      })
      .catch((error) => {
        console.error('Error fetching venues:', error)
      })
  }, [sendRequest, sort, limit, page]) // Only recreate the function when dependencies change

  useEffect(() => {
    fetchVenues()
  }, [fetchVenues]) // Reacts to changes in `fetchVenues`

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (isLoading && page === 1) return <Loader />
  if (isError) return <div>Error loading venues.</div>
  if (!venues || venues.length === 0) return <div>No venues available.</div>

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value)
            setPage(1) // Reset to first page on sort change
          }}
          className="text-lg p-3 md:px-6 md:py-4 border-2 border-accent rounded-lg"
        >
          <option value="created,desc">Newest destinations</option>
          <option value="name,asc">Name A-Z</option>
          <option value="name,desc">Name Z-A</option>
          <option value="rating,desc">Most Popular</option>
          <option value="price,asc">Price Lowest to Highest</option>
          <option value="price,desc">Price Highest to Lowest</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <Link to={`/venues/${venue.id}`} key={venue.id} className="h-full">
            <VenueInfoCard
              venue={venue}
              titleLevel={2}
              className="venue-list-item"
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {totalVenues > venues.length && (
          <Button type="primary" onClick={handleShowMore}>
            Show More
          </Button>
        )}
      </div>
    </div>
  )
}

export default VenueList
