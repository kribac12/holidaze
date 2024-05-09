import PropTypes from 'prop-types'

const VenueDetails = ({ details }) => (
  <div className="relative my-4 py-4">
    <div className="absolute top-0 left-0 w-2/3 h-px bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
    <h2 className="font-h2 text-h2 mb-2">Details</h2>
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
      {details.location?.lat && (
        <li>
          <strong>Latitude:</strong> {details.location.lat}
        </li>
      )}
      {details.location?.lng && (
        <li>
          <strong>Longitude:</strong> {details.location.lng}
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
