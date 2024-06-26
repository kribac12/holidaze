import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '@/components/HeroSection'
import SearchResults from '@/components/SearchForm/SearchResults'
import VenueList from '@/components/VenueList'
import FeatureSection from '@/components/FeatureSection'
import { Notification, Loader, Button } from '@/components/Shared'
import Head from '@/components/HeadMeta'
import BackToTopButton from '@/components/BackToTopButton'

function Home() {
  const [searchResults, setSearchResults] = useState([])
  const [visibleResults, setVisibleResults] = useState(9)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const location = useLocation()
  const [notification, setNotification] = useState({
    title: location.state?.title || '',
    message: location.state?.message || '',
    type: location.state?.type || '',
  })

  useEffect(() => {
    if (location.state && location.state.message) {
      setNotification(location.state)
      // Clear the state after displaying the notification
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

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

  const clearNotification = () => {
    setNotification({ title: '', message: '', type: '' })
  }

  return (
    <div>
      <Head
        title="Holidaze home"
        description="Holidaze, book your dream stay today!"
      />
      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onDismiss={clearNotification}
        />
      )}
      <HeroSection onResults={handleResults} />
      <section>
        {isLoading ? (
          <Loader />
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
              <div className="mt-4 flex justify-center">
                <Button type="primary" onClick={handleShowMore}>
                  Show More
                </Button>
              </div>
            )}
          </>
        ) : hasSearched && !isLoading ? (
          <div className="my-0 text-center text-xl md:my-6">
            No venues found, try another search.
          </div>
        ) : null}
      </section>
      <section className="mt-section">
        <VenueList />
        <BackToTopButton />
      </section>
      <section className="mt-section">
        <FeatureSection />
      </section>
    </div>
  )
}

export default Home
