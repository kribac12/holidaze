import VenueList from '@/components/VenueList'
import FeatureSection from '@/components/FeatureSection'

import HeroSection from '@/components/HeroSection'

function Home() {
  return (
    <div>
      <section className="mt-section">
        <HeroSection />
      </section>
      <section className="mt-section">
        <VenueList />
      </section>
      <section className="mt-section">
        <FeatureSection />
      </section>
    </div>
  )
}

export default Home
