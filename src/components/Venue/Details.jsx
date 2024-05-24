import PropTypes from 'prop-types'

const VenueDetails = ({ details }) => (
  <div className="relative my-4 overflow-hidden py-4">
    <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
    <h2 className="mb-2 text-h2 font-h2">Details</h2>
    <ul>
      <li>
        <strong>Max Guests:</strong>{' '}
        {details.maxGuests || 'No information provided'}
      </li>
      {details.location?.address && (
        <li>
          <strong>Address:</strong> {details.location.address}
        </li>
      )}
      {details.location?.zip && (
        <li>
          <strong>ZIP Code:</strong> {details.location.zip}
        </li>
      )}
      {details.location?.country && (
        <li>
          <strong>Country:</strong> {details.location.country}
        </li>
      )}
      {details.location?.continent && (
        <li>
          <strong>Continent:</strong> {details.location.continent}
        </li>
      )}
    </ul>
  </div>
)

VenueDetails.propTypes = {
  details: PropTypes.shape({
    maxGuests: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string,
      continent: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
}

export default VenueDetails
