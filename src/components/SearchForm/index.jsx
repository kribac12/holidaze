import { useState } from 'react'
import useApi from '@/services/Api'
import { Link } from 'react-router-dom'

function SearchForm() {
  const [query, setQuery] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false) // State to track if search has been performed

  const { data, isLoading, isError, sendRequest } = useApi()

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query.trim()) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(query)}`,
        method: 'get',
      })
      setSearchSubmitted(true)
    }
  }

  return (
    <div className="p-6 bg-primaryBg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by name or description"
          className="px-4 py-2 border rounded-md text-primaryText border-secondaryText focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-red-700"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Error occurred</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchSubmitted &&
            (data && Array.isArray(data.data) && data.data.length > 0 ? (
              data.data.map((venue) => (
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
              ))
            ) : searchSubmitted ? (
              <div>No venues found.</div>
            ) : null)}
        </div>
      )}
    </div>
  )
}

export default SearchForm
