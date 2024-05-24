import PropTypes from 'prop-types'
import { useState } from 'react'

const VenueMedia = ({ url, alt, className, imgClassName }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={`lg:h-120 flex h-48 w-full items-center justify-center bg-gray-200 md:h-96 ${className}`}
    >
      {!url || imgError ? (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
          Image missing
        </div>
      ) : (
        <img
          src={url}
          alt={alt || 'Venue image'}
          className={`h-full w-full rounded-t-lg object-cover ${imgClassName}`}
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
