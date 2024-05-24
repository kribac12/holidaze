import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useApi from '@/services/Api/UseApi'
import Loader from '@/components/Shared/Loader'
import { truncateText } from '@/utils/TextUtils'

const ProfileVenues = ({ profileName, isOwnProfile }) => {
  const { isLoading, isError, sendRequest } = useApi()
  const [venues, setVenues] = useState([])

  useEffect(() => {
    if (profileName) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/venues`,
        method: 'get',
      })
        .then((data) => {
          setVenues(data.data)
        })
        .catch(console.error)
    }
  }, [profileName, sendRequest])

  if (isLoading) return <Loader />
  if (isError) return <div>Error fetching venues.</div>
  if (venues.length === 0) {
    return (
      <div>
        <h2 className="text-h2 font-h2">Venues</h2>
        {isOwnProfile ? (
          <p>
            You currently manage no venues. Add your first venue{' '}
            <Link to="/create-venue" className="text-primary underline">
              here
            </Link>
            .
          </p>
        ) : (
          <p>{profileName} currently manages no venues.</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1">
      <h2 className="mb-4 text-h2 font-h2">Venues</h2>
      <ul className="space-y-4">
        {venues.map((venue) => (
          <li
            key={venue.id}
            className="flex space-x-4 rounded-lg border border-gray-200 bg-cardBg p-4 shadow-sm"
          >
            <div className="flex h-24 w-24 items-center justify-center bg-gray-200">
              {venue.media[0]?.url ? (
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || 'Venue image'}
                  className="h-24 w-24 rounded-lg object-cover"
                  onError={(e) =>
                    (e.target.src = 'path/to/placeholder-image.jpg')
                  }
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                  Image missing
                </div>
              )}
            </div>
            <div className="flex flex-grow flex-col overflow-hidden">
              <Link
                to={`/venues/${venue.id}`}
                className="truncate text-lg font-semibold hover:underline"
              >
                {venue.name}
              </Link>
              <p className="mt-1 truncate text-sm text-gray-600">
                {truncateText(venue.description, 100)}
              </p>
              <div className="mt-2 flex flex-col space-y-1 truncate">
                <p>Price: ${venue.price}</p>
                <p>Guests: {venue.maxGuests}</p>
                <p>Rating: {venue.rating}</p>
                <p>
                  Place:{' '}
                  {[venue.location.country, venue.location.city]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileVenues.propTypes = {
  profileName: PropTypes.string.isRequired,
  isOwnProfile: PropTypes.bool.isRequired,
}

export default ProfileVenues
