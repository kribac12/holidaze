import SearchForm from '../SearchForm'
import campingImage from '@/assets/images/camping.jpg'

function HeroSection() {
  return (
    <section className="relative h-96">
      <div
        className="absolute inset-0 bg-cover bg-center h-full"
        style={{ backgroundImage: `url(${campingImage})` }}
      ></div>

      <div className="relative z-10 flex items-center justify-center h-full ">
        <SearchForm />
      </div>
    </section>
  )
}

export default HeroSection
