import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useApi from '@/services/Api/UseApi'
import FormattedDate from '@/utils/FormattedDate'
import Loader from '../../Shared/Loader'

const ProfileBookings = ({ profileName, isOwnProfile }) => {
  const { isLoading, isError, sendRequest } = useApi()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (profileName) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/bookings?_venue=true`,
        method: 'get',
      })
        .then((data) => {
          setBookings(data.data)
        })
        .catch(console.error)
    }
  }, [profileName, sendRequest])

  if (isLoading) return <Loader />
  if (isError) return <div>Error fetching bookings.</div>
  if (bookings.length === 0)
    return (
      <div className="flex-1">
        <h2 className="text-h2 font-h2">Bookings</h2>
        {isOwnProfile ? (
          <p>
            You currently have no bookings. Book your stay{' '}
            <Link to="/" className="text-primary underline">
              here
            </Link>
            .
          </p>
        ) : (
          <p>{profileName} currently has no bookings.</p>
        )}
      </div>
    )

  return (
    <div className="flex-1">
      <h2 className="mb-4 text-h2 font-h2">Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="flex space-x-4 rounded-lg border border-gray-200 bg-cardBg p-4 shadow-sm"
          >
            <div className="flex h-24 w-24 items-center justify-center bg-gray-200">
              {booking.venue.media[0]?.url ? (
                <img
                  src={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || 'Venue image'}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                  Image missing
                </div>
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <Link
                to={`/venues/${booking.venue.id}`}
                className="truncate text-lg font-semibold hover:underline"
              >
                {booking.venue.name}
              </Link>
              <p className="truncate">
                From: <FormattedDate date={booking.dateFrom} /> - To:{' '}
                <FormattedDate date={booking.dateTo} />
              </p>
              <p className="truncate">{booking.guests} guests</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileBookings.propTypes = {
  profileName: PropTypes.string.isRequired,
  isOwnProfile: PropTypes.bool.isRequired,
}

export default ProfileBookings
