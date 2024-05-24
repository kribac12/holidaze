import Slider from 'react-slick'
import PropTypes from 'prop-types'
import VenueMedia from './VenueMedia' // Import VenueMedia component

const VenueCarousel = ({ media }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  if (media.length === 1) {
    return (
      <div className="w-full h-48 md:h-96 lg:h-120">
        <VenueMedia url={media[0].url} alt={media[0].alt} />
      </div>
    )
  }

  return (
    <div className="w-full h-48 md:h-96 lg:h-120 mb-3">
      <Slider {...settings}>
        {media.map((item, index) => (
          <div key={index} className="w-full h-48 md:h-96 lg:h-120">
            <VenueMedia url={item.url} alt={item.alt} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

VenueCarousel.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
}

export default VenueCarousel
