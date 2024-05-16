import PropTypes from 'prop-types'
import SearchForm from '../SearchForm'
import campingImage from '@/assets/images/camping.jpg'

function HeroSection({ onResults }) {
  return (
    <section className="relative h-96">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${campingImage})` }}
      ></div>
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <SearchForm onResults={onResults} />
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  onResults: PropTypes.func.isRequired,
}

export default HeroSection
