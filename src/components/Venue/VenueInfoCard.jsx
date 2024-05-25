import PropTypes from 'prop-types'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import { truncateText } from '@/utils/TextUtils'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import VenueCarousel from './VenueCarousel'
import React from 'react'

const VenueInfoCard = React.memo(
  ({ venue, className = '', titleLevel = 2 }) => {
    const titleClasses = `font-${titleLevel} text-h${titleLevel}`
    const TitleTag = `h${titleLevel}`

    return (
      <div
        className={`${className} flex h-full flex-col overflow-hidden rounded-lg bg-cardBg shadow`}
      >
        <VenueCarousel media={venue.media || []} />
        <div className="space-y-2 p-4">
          <TitleTag className={titleClasses}>
            {truncateText(venue.name, 50)}
          </TitleTag>
          <div className="flex flex-row items-center gap-2">
            <FaMapMarkerAlt className="text-lg text-accent" />
            <p className="truncate">
              {venue.location?.country || 'Unknown location'}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaStar className="text-lg text-accent" />
            <p>{venue.rating || 'Not rated'}</p>
          </div>
          <p className="truncate">Price: ${venue.price} per night</p>
        </div>
      </div>
    )
  }
)

VenueInfoCard.propTypes = {
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
  className: PropTypes.string,
  titleLevel: PropTypes.oneOf([1, 2, 3, 4]),
}

export default VenueInfoCard
