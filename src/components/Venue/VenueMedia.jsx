import PropTypes from 'prop-types'
import { useState } from 'react'

const VenueMedia = ({ url, alt, className, imgClassName }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={`w-full h-48 md:h-96 lg:h-120 flex items-center justify-center bg-gray-200 ${className}`}
    >
      {!url || imgError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
          Image missing
        </div>
      ) : (
        <img
          src={url}
          alt={alt || 'Venue image'}
          className={`w-full h-full object-cover rounded-t-lg ${imgClassName}`}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}

VenueMedia.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  imgClassName: PropTypes.string,
}

VenueMedia.defaultProps = {
  className: '',
  imgClassName: '',
}

export default VenueMedia
