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
        <h2 className="font-h2 text-h2">Venues</h2>
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
      <h2 className="font-h2 text-h2 mb-4">Venues</h2>
      <ul className="space-y-4">
        {venues.map((venue) => (
          <li
            key={venue.id}
            className="bg-cardBg border border-gray-200 rounded-lg shadow-sm p-4 flex space-x-4"
          >
            <div className="w-24 h-24 flex items-center justify-center bg-gray-200">
              {venue.media[0]?.url ? (
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || 'Venue image'}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) =>
                    (e.target.src = 'path/to/placeholder-image.jpg')
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  Image missing
                </div>
              )}
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
              <Link
                to={`/venues/${venue.id}`}
                className="text-lg font-semibold hover:underline truncate"
              >
                {venue.name}
              </Link>
              <p className="mt-1 text-sm text-gray-600 truncate">
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
