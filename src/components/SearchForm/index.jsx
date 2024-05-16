import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import useApi from '@/services/Api'
import PropTypes from 'prop-types'

function SearchForm({ onResults }) {
  const [query, setQuery] = useState('')
  const { sendRequest } = useApi()

  // Create a debounced function that only changes if `sendRequest` changes.
  const debouncedSearch = useCallback(
    debounce((nextQuery) => {
      if (nextQuery.trim()) {
        sendRequest({
          url: `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(nextQuery)}`,
          method: 'get',
        })
          .then((data) => {
            if (onResults) {
              onResults(data.data, false, false) // Update based on received data
            }
          })
          .catch((error) => {
            console.error('Search API error:', error)
            if (onResults) {
              onResults([], false, true) // Update to reflect error state
            }
          })
      }
    }, 300),
    [sendRequest, onResults]
  )

  useEffect(() => {
    // Cleanup function to cancel the debounce when the component unmounts
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  const handleChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    if (!newQuery.trim()) {
      onResults([], false, false) // Clear results when query is empty
    } else {
      debouncedSearch(newQuery)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      debouncedSearch(query)
    }
  }

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto p-0 md:p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-0">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Find your stay"
          className="flex-grow px-4 py-3 border rounded-l-full text-primaryText placeholder-primaryText focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white font-semibold px-4 py-3 md:px-6 lg:px-10 border border-primary rounded-r-full hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Search
        </button>
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  onResults: PropTypes.func.isRequired,
}

export default SearchForm
