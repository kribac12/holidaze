import PropTypes from 'prop-types'
import VenueMedia from './VenueMedia'
import { FaStar } from 'react-icons/fa'

const VenueHeader = ({ venue }) => (
  <div className="shadow rounded-lg bg-cardBg">
    <VenueMedia media={venue.media || []} />
    <div className="p-4">
      <h1 className="font-h1 text-h1">{venue.name}</h1>
      <div className="flex flex-row gap-2 items-center ">
        {' '}
        <FaStar />
        <p className="text-lg">Rating: {venue.rating || 'N/A'}</p>
      </div>

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
