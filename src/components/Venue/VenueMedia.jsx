import PropTypes from 'prop-types'
import { useState } from 'react'

const VenueMedia = ({ media }) => {
  const [imgError, setImgError] = useState(false)
  const hasMedia = media && media.length > 0

  return (
    <div className="w-full h-48 object-cover rounded-t-lg flex items-center justify-center bg-gray-200">
      {!hasMedia || imgError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
          Image missing
        </div>
      ) : (
        <img
          src={media[0].url}
          alt={media[0].alt || 'Venue image'}
          className="w-full h-full object-cover rounded-t-lg"
          onError={() => setImgError(true)}
        />
      )}
    </div>
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
