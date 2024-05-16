import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import VenueInfoCard from '../Venue/VenueInfoCard'

function SearchResults({ data, isLoading, isError }) {
  return (
    <div className="bg-primaryBg container mx-auto px-4 py-2">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Error occurred</div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <>
              <h2 className="font-h2 text-h2 text-center mb-4">
                Search Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((venue) => (
                  <Link
                    to={`/venues/${venue.id}`}
                    key={venue.id}
                    className="h-full"
                  >
                    <VenueInfoCard venue={venue} titleLevel={3} />
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

SearchResults.propTypes = {
  data: PropTypes.array.isRequired, // Ensure data is an array
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
}

export default SearchResults
