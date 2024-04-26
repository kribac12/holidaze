import PropTypes from 'prop-types'

const VenueMedia = ({ media }) => {
  if (!media || media.length === 0) return null // Check if media is not provided or empty
  return (
    <img
      src={media[0].url}
      alt={media[0].alt || 'Venue image'}
      className="w-full h-48 object-cover rounded-t-lg"
    />
  )
}

VenueMedia.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
}

export default VenueMedia
