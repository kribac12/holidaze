import PropTypes from 'prop-types'
import VenueInfoCard from './VenueInfoCard'

const VenueHeader = ({ venue }) => (
  <VenueInfoCard
    venue={venue}
    titleLevel={1}
    className="specific-venue-header"
  />
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
    location: PropTypes.shape({
      country: PropTypes.string,
    }),
  }).isRequired,
}
export default VenueHeader
