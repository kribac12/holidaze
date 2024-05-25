import Slider from 'react-slick'
import PropTypes from 'prop-types'
import VenueMedia from './VenueMedia'

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
      <div className="lg:h-120 h-48 w-full md:h-96">
        <VenueMedia url={media[0].url} alt={media[0].alt} />
      </div>
    )
  }

  return (
    <div className="lg:h-120 mb-3 h-48 w-full md:h-96">
      <Slider {...settings}>
        {media.map((item, index) => (
          <div key={index} className="lg:h-120 h-48 w-full md:h-96">
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
