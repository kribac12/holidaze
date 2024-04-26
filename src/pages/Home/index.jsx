import VenueList from '@/components/VenueList'
import FeatureSection from '@/components/FeatureSection'
import SearchForm from '@/components/SearchForm'

function Home() {
  return (
    <div>
      <section className="mt-section">
        <SearchForm />
      </section>
      <section className="mt-section">
        <h1 className="mb-heading text-h1 font-h1">Destinations</h1>

        <VenueList />
      </section>
      <section className="mt-section">
        <FeatureSection />
      </section>
    </div>
  )
}

export default Home
