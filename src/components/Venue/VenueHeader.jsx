import PropTypes from 'prop-types'
import VenueMedia from './VenueMedia'

const VenueHeader = ({ venue }) => (
  <div className="p-4 shadow rounded-lg bg-cardBg">
    <VenueMedia media={venue.media || []} />
    <div className="p-4">
      <h1 className="text-2xl font-bold">{venue.name}</h1>
      <p className="text-lg">Rating: {venue.rating || 'N/A'}</p>
      <p className="font-bold">Price: ${venue.price} per night</p>
    </div>
  </div>
)

VenueHeader.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    price: PropTypes.number.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default VenueHeader
