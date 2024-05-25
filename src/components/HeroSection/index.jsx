import { useEffect } from 'react'
import PropTypes from 'prop-types'
import SearchForm from '../SearchForm'
import campingImage from '@/assets/images/camping.jpg'
import { preloadImage } from '@/utils/PreloadImage'

function HeroSection({ onResults }) {
  useEffect(() => {
    preloadImage(campingImage)
  }, [])

  return (
    <section className="relative h-96">
      <img
        src={campingImage}
        alt="Camping"
        className="absolute inset-0 h-full w-full object-cover"
        width="1920"
        height="1080"
      />
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <SearchForm onResults={onResults} />
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  onResults: PropTypes.func.isRequired,
}

export default HeroSection
