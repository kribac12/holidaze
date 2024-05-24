import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import VenueInfoCard from '../Venue/VenueInfoCard'
import Loader from '../Shared/Loader'

function SearchResults({ data, isLoading, isError }) {
  return (
    <div className="container mx-auto bg-primaryBg px-4 py-2">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red-500">Error occurred</div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <>
              <h2 className="mb-4 text-center text-h2 font-h2">
                Search Results
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
