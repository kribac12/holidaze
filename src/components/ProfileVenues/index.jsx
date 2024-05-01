import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'

const ProfileVenues = ({ profileName }) => {
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
  if (venues.length === 0)
    return (
      <div>
        {' '}
        <h2 className="font-h2 text-h2">Venues</h2>
        {profileName} has no venues.
      </div>
    )

  return (
    <div>
      <h2>Venues</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <strong>{venue.name}</strong> - {venue.description}
            <div>
              <img
                src={venue.media[0]?.url}
                alt={venue.media[0]?.alt || 'Venue Image'}
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            Price: ${venue.price}, Guests: {venue.maxGuests}, Rating:{' '}
            {venue.rating}
            <div>
              Address: {venue.location.address}, {venue.location.city}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileVenues.propTypes = {
  profileName: PropTypes.string.isRequired,
}

export default ProfileVenues
