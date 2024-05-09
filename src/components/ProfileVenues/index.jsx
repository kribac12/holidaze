import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'

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

  if (isLoading) return <div>Loading venues...</div>
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
    <div>
      <h2 className="font-h2 text-h2 mb-4">Venues</h2>
      <ul className="space-y-4">
        {venues.map((venue) => (
          <li
            key={venue.id}
            className="border border-gray-200 rounded-lg shadow-sm p-4 flex space-x-4"
          >
            {/* Venue Image */}
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt || 'Venue Image'}
              className="w-24 h-24 rounded-lg object-cover"
            />
            {/* Venue Details */}
            <div className="flex flex-col">
              <Link
                to={`/venues/${venue.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {venue.name}
              </Link>
              <p className="text-sm">{venue.description}</p>
              <div className="text-sm mt-2">
                <p>Price: ${venue.price}</p>
                <p>Guests: {venue.maxGuests}</p>
                <p>Rating: {venue.rating}</p>
                <p>
                  Address: {venue.location.country}, {venue.location.city}
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
