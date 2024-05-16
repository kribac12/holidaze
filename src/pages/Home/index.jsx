import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import SearchResults from '@/components/SearchForm/SearchResults'
import VenueList from '@/components/VenueList'
import FeatureSection from '@/components/FeatureSection'
import Button from '@/lib/Buttons'

function Home() {
  const [searchResults, setSearchResults] = useState([])
  const [visibleResults, setVisibleResults] = useState(9)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleResults = (data, loading, error) => {
    setSearchResults(data)
    setIsLoading(loading)
    setIsError(error)
    setVisibleResults(9) // Reset visible results count when new data is fetched
    setHasSearched(true)
  }

  const handleShowMore = () => {
    setVisibleResults((prev) => prev + 9) // Load more results
  }

  return (
    <div>
      <HeroSection onResults={handleResults} />
      <section className="mt-section">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div className="text-red-500">An error occurred.</div>
        ) : searchResults.length > 0 ? (
          <>
            <SearchResults
              data={searchResults.slice(0, visibleResults)}
              isLoading={isLoading}
              isError={isError}
            />
            {visibleResults < searchResults.length && (
              <div className="flex justify-center mt-4">
                <Button type="primary" onClick={handleShowMore}>
                  Show More
                </Button>
              </div>
            )}
          </>
        ) : hasSearched && !isLoading ? (
          <div>No venues found.</div>
        ) : null}
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
