import { useState, useEffect } from 'react'
import useApi from '@/services/Api'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import VenueInfoCard from '../Venue/VenueInfoCard' // Import the VenueInfoCard

function SearchForm() {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, sendRequest } = useApi()
  const [debouncedSearch, setDebouncedSearch] = useState(() =>
    debounce(() => {}, 300)
  )

  useEffect(() => {
    // Create a debounced function that only changes when sendRequest changes
    const newDebouncedSearch = debounce((query) => {
      if (query.trim()) {
        sendRequest({
          url: `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(query)}`,
          method: 'get',
        })
      }
    }, 300)

    setDebouncedSearch(() => newDebouncedSearch)

    // Cleanup function to cancel the debounce on component unmount or dependency change
    return () => {
      newDebouncedSearch.cancel()
    }
  }, [sendRequest]) // Dependency array for useEffect

  const handleChange = (e) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto p-0 md:p-4">
      <form onSubmit={handleChange} className="flex items-center space-x-0   ">
        <div className="flex w-full shadow-lg">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Find your stay"
            className="flex-grow px-4 py-6 border rounded-l-full text-primaryText placeholder-primaryText focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white font-semibold px-4 py-3 md:px-6 lg:px-10 border border-primary rounded-r-full hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Error occurred</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data &&
            Array.isArray(data.data) &&
            (data.data.length > 0 ? (
              data.data.map((venue) => (
                <Link
                  to={`/venues/${venue.id}`}
                  key={venue.id}
                  className="h-full"
                >
                  <VenueInfoCard venue={venue} titleLevel={3} />
                </Link>
              ))
            ) : (
              <div>No venues found.</div>
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchForm
